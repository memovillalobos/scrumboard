import React, { Component } from 'react';

class Lane extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Lane">
        <h4>{ this.props.label }</h4>
        {
          this.props.tasks.map(task => {
            return (
              <div className="Task">
                <h5>{ task.name }</h5>
                <p>{ task.description }</p>
                <button onClick={ () => { this.props.onMoveTask(task) } }>Avanzar</button>
              </div>
            )
          })
        }
        {
          this.props.includeDoneButton ? (<button>Clear all done tasks</button>) : ""
        }


      </div>
    );
  }
}

export default Lane;
