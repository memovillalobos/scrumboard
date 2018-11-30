import React, { Component } from 'react';
import { Modal, Button, ControlLabel, FormControl } from 'react-bootstrap';
import Lane from './Lane';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      toDoTasks: [],
      inProgressTasks: [],
      doneTasks: [],
      createModalIsVisible: false
    };

    this.moveToDoTask = this.moveToDoTask.bind(this);
    this.moveInProgressTask = this.moveInProgressTask.bind(this);
  }

  componentDidMount(){
    fetch('http://nyc.pixan.io/backend/public/api/tasks')
      .then(response => response.json())
      .then(response => {
        this.setState({
          toDoTasks: response.tasks.filter(task => task.status == 1),
          inProgressTasks: response.tasks.filter(task => { return task.status == 2 }),
          doneTasks: response.tasks.filter(function(task){
            if(task.status == 3){
              return true;
            }
            return false;
          })
        });
      });
  }

  moveToDoTask(task) {
    // this.inProgressTasks.push(task);
    let tmp = this.state.inProgressTasks;
    tmp.push(task);

    let tmp2 = this.state.toDoTasks.filter(function(item){
      return item.id != task.id;
    });

    this.setState({
      inProgressTasks: tmp,
      toDoTasks: tmp2
    });
  }

  moveInProgressTask(task) {
    let tmp = this.state.doneTasks;
    tmp.push(task);

    let tmp2 = this.state.inProgressTasks.filter(function(item){
      return item.id != task.id;
    });

    this.setState({
      doneTasks: tmp,
      inProgressTasks: tmp2
    });
  }


  render() {
    return (
      <div className="App">
        <div className="Header">
          <h1>My Sprint</h1>
          <Button onClick={ () => { this.setState({ createModalIsVisible: true }) }}>Create new task</Button>
        </div>
        <div className="LaneContainer">
          <Lane label="To Do" tasks={ this.state.toDoTasks } onMoveTask={ this.moveToDoTask } />
          <Lane label="In Progress" tasks={ this.state.inProgressTasks } onMoveTask={ this.moveInProgressTask } />
          <Lane label="Done" includeDoneButton={true} tasks={ this.state.doneTasks }/>
        </div>


        <Modal show={ this.state.createModalIsVisible } onHide={() => { this.setState({ createModalIsVisible: false }) }}>
          <Modal.Header closeButton>
            <Modal.Title>Crear una tarea</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ControlLabel>Name:</ControlLabel>
            <FormControl
              type="text"
              value={this.state.name}
              placeholder="Name of the task"
              onChange={(event) => {
                this.setState({name: event.target.value});
              }}
            />
            <ControlLabel>Description:</ControlLabel>
            <FormControl
              componentClass="textarea"
              placeholder="Description of the task"
              value={this.state.description}
              onChange={(event) => {
                this.setState({description: event.target.value});
              }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => { this.setState({ createModalIsVisible: false }) }}>Close</Button>
            <Button bsStyle="primary" onClick={() => {

              alert('Ir con fetch a guardar (POST) para: '+this.state.name+ ' y '+this.state.description);
              this.setState({
                createModalIsVisible: false
              });
            }}>Guardar</Button>
          </Modal.Footer>
        </Modal>

      </div>
    );
  }
}

export default App;
