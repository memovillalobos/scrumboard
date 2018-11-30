import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {


  render() {
    return (
      <div className="App">
        <div className="Header">
          <h1>My Sprint</h1>
        </div>
        <div className="LaneContainer">
          <div className="Lane">To Do</div>
          <div className="Lane">In Progress</div>
          <div className="Lane">Done</div>
        </div>
      </div>
    );
  }
}

export default App;
