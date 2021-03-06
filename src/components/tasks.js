import React, { Component } from 'react';
import axios from 'axios'
import moment from 'moment';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';
import { Textarea } from 'muicss/react';
import '../components/App/App.css';


class Tasks extends Component {

    constructor(){
        super()
        this.state = {
          taskList:[], 
          showStatus:false
        }
      }
      
    componentDidMount(){
     this.setState({
      id:this.props.task.id,
      task:this.props.task.task,
     dueDate:this.props.task.dueDate,
     status:this.props.task.status,
     })
      }
      
      showStatus = () =>{
        this.setState({
            showStatus: !this.state.showStatus
        })
      }

      handleInputChange = (event, propertyName)  =>{
        this.setState({
            [propertyName]:event.target.value
          }) 
    }
 
      deleteTaskItem = ()=>{
       let id = this.props.task.id
        axios.delete(`/tasks/${id}`)
        this.props.getTaskItem()
      }
      
      editTaskItem = ()=>{
       axios.put('/tasks', {
        id:this.state.id,
        task:this.state.task,
       dueDate:this.state.dueDate,
       status:this.state.status,
       })
        this.props.getTaskItem();
      }
      
    
    render() {

        let itemToRender;
        const task = this.props.task
         if(this.state.showStatus){
           itemToRender = <form className='form-task' onSubmit={this.editTaskItem}>
          <div className='notes'><label>TASK ID</label><Input  
                   type="text"
                   name="id"
                   value={this.state.id}
                   onChange={(event) => {this.handleInputChange(event,'id')}}  
                   />

             <label>TASK</label><Textarea
                  type="text"
                   name="task"
                   value={this.state.task}
                   onChange={(event) => {this.handleInputChange(event,'task')}}
                   />
             <label>DUE DATE</label><Input 
                  type="text"
                   name="dueDate"
                   value={this.state.dueDate}
                   onChange={(event) => {this.handleInputChange(event,'dueDate')}}
                   />
             <label>STATUS</label><Input 
                    type="text" 
                    name='status'
                    value={this.state.status}
                    onChange={(event) => {this.handleInputChange(event,'status')}}
             />
         <div className='btn-container' ><Button  className='btn-12' onClick={this.showStatus}>BACK</Button><Button className='btn-23' >SUBMIT</Button></div>
         </div>  
         </form>
         }else{
           itemToRender =
          <form className='form-Container' key={task.id}>
                           <div ><label>TASK ID</label><p className="id">{task.id}</p>
                              <label>TASK</label><p  className='task-textarea' >{task.task} </p>
                             <label>DUE DATE</label><p className='date' >{moment(task.dueDate).format('MMM-Do-YYYY')}</p>
                             <label>STATUS</label><p>{task.status}</p>
                             <div ><Button className='btn-1'  onClick={this.deleteTaskItem}>DELETE</Button>
                             <Button className='btn-2' onClick={this.showStatus}>EDIT</Button></div></div>   
         </form>
         }
          return (
          <div>
             {itemToRender}
             
            </div>
          );
        }
}
export default Tasks