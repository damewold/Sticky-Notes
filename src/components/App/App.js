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
     status:'',
     showStatus:false
  }
}

componentDidMount(){
  this.getTaskItem();
  this.setState({
    status: this.state.status
})
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
 this.getTaskItem()
}

deleteTaskItem = (event)=>{
  event.preventDefault();
 let id = event.target.value
  axios.delete(`/tasks/${id}`)
  console.log(event.target.value)
  this.getTaskItem();
}

editTaskItem = (event)=>{
  event.preventDefault();
//  let id = event.target.value
//   axios.put(`/tasks/${id}`)
  console.log(event.target.value)
  // this.getTaskItem();
}

showStatus = () =>{
  this.setState({
      showStatus: !this.state.showStatus
  })
}
  
  render() {

  let itemToRender;
   if(this.state.showStatus){
     itemToRender = <tbody>{this.state.taskList.map(task=><tr key={task.id}>
       <td>{task.id}</td>
       <td>{task.task}</td>
       <td>{moment(task.dueDate).format('MMM-Do-YYYY')}</td>
       <td><input type="text" name='status'
                            value={task.status}
                            onChange={(event) => {this.handleInputChangeFor(event,'status')}}
       /></td>
   </tr>)}</tbody>
   }else{
     itemToRender = 
       <tbody>{this.state.taskList.map(task=><tr key={task.id}><td>{task.id}</td><td>{task.task}</td><td>{moment(task.dueDate).format('MMM-Do-YYYY')}</td><td value={task.id} onClick={this.editTaskItem}>{task.status}</td><td><button value={task.id} onClick={this.deleteTaskItem}>Delete</button></td></tr>)}</tbody>
     
   }
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
        <thead><tr><th>id</th><th>Task</th><th>due Date</th><th><button onClick={this.showStatus}>Status</button></th></tr></thead>
        {itemToRender}
         </table>
      </div>
    );
  }
}

export default App;
