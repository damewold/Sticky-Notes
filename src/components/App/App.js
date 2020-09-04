import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import moment from 'moment';


class App extends Component {

constructor(){
  super()
  this.state = {
    taskList:[],
      id:'',
      task:'',
     dueDate:'',
     status:''
  }
}

componentDidMount(){
  this.getTaskItem();
}


getTaskItem = (event) => {
  // event.preventDefault();
  console.log('in getTaskItem')
  axios.get('/tasks')
    .then( response => {
console.log(response.data)
      this.setState({
        taskList: response.data
      })
    })
    .catch( error => {
      alert(`Couldn't get inventory. Try again later`);
      console.log('Error ', error);
    })
}

handleInputChangeFor = propertyName => (event) =>{
  this.setState({
    [propertyName]:event.target.value
  })
} 

addTaskItem = (event) => {
  event.preventDefault();
  axios.post('/tasks',{
    task: this.state.task, 
    dueDate:this.state.dueDate, 
    status:'Task Not Completed'
   })
}




  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">To Do App</h1>
        </header>
        <label>Task:</label><input 
                                              id='task' 
                                              type="text" 
                                              placeholder="Write the task to be done"   
                                              value={this.state.task}
                                              onChange={this.handleInputChangeFor("task")}
                                              />

        <label>Due Date:</label><input 
                                                       id='dueDate' 
                                                       type='date'
                                                       value={this.state.dueDate}
                                                       onChange={this.handleInputChangeFor("dueDate")}
                                                       />
   
        <button onClick={this.addTaskItem}>Add Task</button>
         <table>
        <thead><tr><th>id</th><th>Task</th><th>due Date</th><th>Status</th></tr></thead>
         <tbody>{this.state.taskList.map(task=><tr key={task.id}><td>{task.id}</td><td>{task.task}</td><td>{moment(task.dueDate).format('MMM-Do-YYYY')}</td><td>{task.status}</td><td><button>Delete</button></td></tr>)}</tbody>
         </table>
      </div>
    );
  }
}

export default App;
