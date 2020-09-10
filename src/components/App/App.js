import React, { Component } from 'react';
// import './App.css';
import axios from 'axios'
import Tasks from '../tasks'
import Panel from 'muicss/lib/react/panel';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';
import { Textarea } from 'muicss/react';
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
            let arr=[];
            arr.push(...response.data)
            arr.reverse()
            this.setState({
              taskList: arr
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
                <h1 className="App-title">My Sticky Notes</h1>
              </header>
        <div className="App-container">
              <div className='container-form-create'>
              <form className="form-create">
              <h2 className='create' >ADD New Task</h2> 
                <div className='create-textarea'><label>Task:</label><Textarea
                                                    id='task' 
                                                    type="text" 
                                                    placeholder="Write the task to be done"   
                                                    value={this.state.task}
                                                    onChange={this.handleInputChangeFor("task")}
                                                    /></div>
      
             <div className='create-input'><label>Due Date:</label><Input 
                                                             id='dueDate' 
                                                             type='date'
                                                             value={this.state.dueDate}
                                                             onChange={this.handleInputChangeFor("dueDate")}
                                                             /></div> 
              <Button className='create-btn' onClick={this.addTaskItem}>Add Task</Button></form>
              </div>
             
            
              <div className='stickyNotes-Container'>
           {this.state.taskList.map(task =><Panel key={task.id}><div className='task-container'><Tasks  getTaskItem={this.getTaskItem} task={task}/></div></Panel>)}
           </div>
           </div>
            </div>
          
                
    )
  }

}

export default App;
