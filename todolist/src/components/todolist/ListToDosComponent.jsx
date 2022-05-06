import React, { Component } from 'react';

class ListToDosComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        {
          id: 1,
          description: 'Learn React',
          done: false,
          targetDate: new Date(),
        },
        {
          id: 2,
          description: 'Cook dinner',
          done: false,
          targetDate: new Date(),
        },
        {
          id: 3,
          description: 'Wash dishes',
          done: false,
          targetDate: new Date(),
        },
      ],
    };
  }
  render() {
    return (
      <div>
        <h1>ToDo List</h1>
        <div className="conatiner">
          <table className="table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Done</th>
                <th>Target Date</th>
              </tr>
            </thead>
            <tbody>
              {this.state.todos.map((todo) => (
                <tr key={todo.id}>
                  <td>{todo.description}</td>
                  <td>{todo.done.toString()}</td>
                  <td>{todo.targetDate.toString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ListToDosComponent;
