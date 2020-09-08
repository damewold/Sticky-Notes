import React, { Component } from 'react';
import axios from 'axios'
import moment from 'moment';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Textarea from 'muicss/lib/react/textarea';
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
      
      editTaskItem = (event)=>{
        event.preventDefault();
      //  let id = event.target.value
      //   axios.put(`/tasks/${id}`)
        console.log(event.target.value)
        // this.getTaskItem();
      }
      
    
    render() {

        let itemToRender;
        const task = this.props.task
         if(this.state.showStatus){
           itemToRender = <Form>
             <label>ID:</label><Input  
                   type="text"
                   name="id"
                   value={this.state.id}
                   onChange={(event) => {this.handleInputChange(event,'id')}}  
                   />

             <label>Task:</label><Textarea 
                  type="text"
                   name="task"
                   value={this.state.task}
                   onChange={(event) => {this.handleInputChange(event,'task')}}
                   />
             <label>Due Date:</label><Input 
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
         </Form>
         }else{
           itemToRender =
          <Form key={task.id}>
           <label>ID:</label><p>{task.id}</p>
                             <label>Task:</label><p>{task.task}</p>
                             <label>Due Date:</label><p>{moment(task.dueDate).format('MMM-Do-YYYY')}</p>
                             <label>Status:</label><p>{task.status}</p>
                             <button onClick={this.deleteTaskItem}>Delete</button>
                             <button onClick={this.showStatus}>Edit</button>
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