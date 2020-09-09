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
           itemToRender = <Form className='form' onSubmit={this.editTaskItem}>
             <label>Task ID</label><Input  
                   type="text"
                   name="id"
                   value={this.state.id}
                   onChange={(event) => {this.handleInputChange(event,'id')}}  
                   />

             <label>Task</label><Textarea
                  type="text"
                   name="task"
                   value={this.state.task}
                   onChange={(event) => {this.handleInputChange(event,'task')}}
                   />
             <label>Due Date</label><Input 
                  type="text"
                   name="dueDate"
                   value={this.state.dueDate}
                   onChange={(event) => {this.handleInputChange(event,'dueDate')}}
                   />
             <label>Status</label><Input 
                    type="text" 
                    name='status'
                    value={this.state.status}
                    onChange={(event) => {this.handleInputChange(event,'status')}}
             />
                       <Button  onClick={this.showStatus}>Back</Button>
                               <Button >submit</Button>
         </Form>
         }else{
           itemToRender =
          <Form className='form-Container' key={task.id}>
                              <div className='id'><label>Task ID</label><p>{task.id}</p></div>
                              <div className="task"><label>Task</label><Textarea  className='task-textarea' value={task.task} readOnly /></div>
                              <div className='dueDate'><label>Due Date</label><p>{moment(task.dueDate).format('MMM-Do-YYYY')}</p></div>
                              <div className='status'><label>Status</label><p>{task.status}</p></div>
                             <div className='btn'><Button  onClick={this.deleteTaskItem}>Delete</Button>
                             <Button className='btn' onClick={this.showStatus}>Edit</Button></div>
         </Form>
         }
          return (
          <div>
             {itemToRender}
             
            </div>
          );
        }
}
export default Tasks