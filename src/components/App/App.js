import React, { Component } from 'react';
// import './App.css';
import axios from 'axios'
import Tasks from '../tasks'
import Panel from 'muicss/lib/react/panel';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Textarea from 'muicss/lib/react/textarea';
// import moment from 'moment';


class App extends Component {
  //create state
  constructor() {
    super();
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
      }
  

      handleInputChangeFor = propertyName => (event) =>{
        this.setState({
          [propertyName]:event.target.value
        })
      } 
        getTaskItem = () => {
          console.log('I am in getTaskItem')
        axios.get('/tasks')
          .then( response => {
            console.log('I was Clicked several times')
            this.setState({
              taskList: response.data
            })
          })
          .catch( error => {
            alert(`Couldn't get inventory. Try again later`);
            console.log('Error ', error);
          })
      }
        addTaskItem = () => {
        // e.preventDefault();
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
              <Form >  <label>Task:</label><Textarea
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
         
              <button onClick={this.addTaskItem}>Add Task</button></Form>
            
              <div className='stickyNotes-Container'>
           {this.state.taskList.map(task =><Panel key={task.id}><Tasks  getTaskItem={this.getTaskItem} task={task}/></Panel>)}
           </div>
            </div>
          
                
    )
  }

}

export default App;
