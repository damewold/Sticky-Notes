import React, { Component } from 'react';
import '../App/App.css';
import axios from 'axios'
import Tasks from '../tasks'
// import moment from 'moment';


class App extends Component {
  //create state
        state = {
          taskList:[],
            id:'',
            task:'',
           dueDate:'',
           status:'',
        }
  
      
    componentDidMount(){
        this.getTaskItem();
      }
  
        getTaskItem = (event) => {
        // event.preventDefault();
        console.log('in getTaskItem')
        axios.get('/tasks')
          .then( response => {
            this.setState({
              taskList: response.data,
              status: '',
            })
          })
          .catch( error => {
            alert(`Couldn't get inventory. Try again later`);
            console.log('Error ', error);
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

          handleInputChangeFor = propertyName => (event) =>{
                this.setState({
                  [propertyName]:event.target.value
                })
              } 
     render(){
    return(
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
              <thead><tr><th>id</th><th>Task</th><th>due Date</th><th><button onClick={this.showStatus}>Status</button></th></tr></thead>
              <div> {this.state.taskList.map(task =>  <Tasks  key={task.id} task={task}/>
              )} </div>
            </div>
          
                
    )
  }

}

export default App;
