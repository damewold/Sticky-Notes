import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

class App extends Component {

constructor(){
  super()
  this.state = {
    taskList:[],
    taskItem:{
      id:'',
      task:'',
     dueDate:'',
     status:''
    }
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







  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">To Do App</h1>
        </header>
         <table>
        <thead> <th>id</th> <th>Task</th> <th>due Date</th> <th>Status</th></thead>
         <tbody>  {this.state.taskList.map(task=><tr key={task.id}><td>{task.id}</td><td>{task.task}</td><td>{task.dueDate}</td><td>{task.status}</td></tr>)}</tbody>
  
         </table>
      </div>
    );
  }
}

export default App;
