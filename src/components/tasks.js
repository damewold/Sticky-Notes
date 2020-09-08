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
            id:'',
            task:'',
           dueDate:'',
           status:'',
          
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
            const iStatus =[]
            const arr = [...new Set(response.data)]
              arr.forEach(item => iStatus.push(item.status))
      // console.log('this is a new array', ...arr)
      // console.log('this is each tasks status', Object.values(iStatus))
      const itemStatus = iStatus.map(item => item)
      
            this.setState({
              taskList: response.data,
              status: itemStatus.forEach(item=>item),
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
      
      // addTaskItem = (event) => {
      //   event.preventDefault();
      //   axios.post('/tasks',{
      //     task: this.state.task, 
      //     dueDate:this.state.dueDate, 
      //     status:'Task Not Completed'
      //    })
      //  this.props.getTaskItem()
      // }
      
      deleteTaskItem = (event)=>{
        event.preventDefault();
       let id = this.props.task.id
        axios.delete(`/tasks/${id}`)
        console.log(event.target.value)
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
                   onChange={(event) => {this.handleInputChangeFor(event,'id')}}  
                   />

             <label>Task:</label><Textarea 
                  type="text"
                   name="task"
                   value={this.state.task}
                   onChange={(event) => {this.handleInputChangeFor(event,'task')}}
                   />
             <label>Due Date:</label><Input 
                  type="text"
                   name="dueDate"
                   value={moment(this.state.dueDate).format('MMM-Do-YYYY')}
                   onChange={(event) => {this.handleInputChangeFor(event,'dueDate')}}
                   />
             <label>Status</label><Input 
                    type="text" 
                    name='status'
                    value={this.state.status}
                    onChange={(event) => {this.handleInputChangeFor(event,'status')}}
             />
         </Form>
         }else{
           itemToRender =
          <Form key={task.id}>
           <label>ID:</label><p>{task.id}</p>
                             <label>Task:</label><p>{task.task}</p>
                             <label>Due Date:</label><p>{moment(task.dueDate).format('MMM-Do-YYYY')}</p>
                             <label>Status:</label><p>{task.status}</p>
                             <button value={task.id} onClick={this.deleteTaskItem}>Delete</button>
                             <button value={task.id} onClick={this.deleteTaskItem}>Edit</button>
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