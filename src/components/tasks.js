import React, { Component } from 'react';
import axios from 'axios'
import moment from 'moment';


class Tasks extends Component {

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
        const task = this.props.task
         if(this.state.showStatus){
           itemToRender = <tbody><tr key={task.id}>
             <td>{task.id}</td>
             <td>{task.task}</td>
             <td>{moment(task.dueDate).format('MMM-Do-YYYY')}</td>
             <td><input type="text" name='status'
                                  value={this.state.status}
                                  onChange={(event) => {this.handleInputChangeFor(event,'status')}}
             /></td>
         </tr></tbody>
         }else{
           itemToRender = 
             <tbody><tr key={task.id}><td>{task.id}</td><td>{task.task}</td><td>{moment(task.dueDate).format('MMM-Do-YYYY')}</td><td value={task.id} onClick={this.editTaskItem}>{task.status}</td><td><button value={task.id} onClick={this.deleteTaskItem}>Delete</button></td></tr></tbody>
           
         }
          return (
          <div>
               <table>
              {itemToRender}
               </table>
            </div>
          );
        }
}
export default Tasks