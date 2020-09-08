import React, { Component } from 'react';
// import './App.css';
import axios from 'axios'
import Tasks from '../tasks'
import Panel from 'muicss/lib/react/panel';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
// import moment from 'moment';


class App extends Component {
  //create state
        state = {
          taskList:[],
            id:'',
            task:'',
           dueDate:'',
           status:'',
           showStatus:false
        }
  
  
    componentDidMount(){
        this.getTaskItem();
      }
  

      handleInputChangeFor = propertyName => (event) =>{
        this.setState({
          [propertyName]:event.target.value
        })
      } 
      showStatus = () =>{
        this.setState({
            showStatus: !this.state.showStatus
        })
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

       
     render(){
    return(
      <div className="App">
              <header className="App-header">
                <h1 className="App-title">To Do App</h1>
              </header>
              <Form onSubmit={this.addTaskItem}>  <label>Task:</label><Input 
                                                    id='task' 
                                                    type="text" 
                                                    placeholder="Write the task to be done"   
                                                    value={this.state.task}
                                                    onChange={this.handleInputChangeFor("task")}
                                                    />
      
              <label>Due Date:</label><Input 
                                                             id='dueDate' 
                                                             type='date'
                                                             value={this.state.dueDate}
                                                             onChange={this.handleInputChangeFor("dueDate")}
                                                             />
         
              <button>Add Task</button></Form>
            
            
           {this.state.taskList.map(task =><Panel><Tasks  key={task.id} task={task}/></Panel>)}
              
            </div>
          
                
    )
  }

}

export default App;
