import React, { Component } from 'react';
import ToDoDataService from '../../api/todo/ToDoDataService';
import AuthenticationService from './AuthenticationService';

class ListToDosComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };
  }

  // First time a page is loaded called mounting
  componentDidMount = async () => {
    let username = AuthenticationService.getLoggedInUser();
    const response = await ToDoDataService.retrieveAllTodos(username);
    this.setState({ todos: response.data });
  };

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
