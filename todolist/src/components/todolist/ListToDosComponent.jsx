import React, { Component } from 'react';
import ToDoDataService from '../../api/todo/ToDoDataService';
import AuthenticationService from './AuthenticationService';

class ListToDosComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      message: null,
    };

    this.deleteTodoClicked = this.deleteTodoClicked.bind(this);
  }

  // componentWillUnmount() {
  //   console.log('componentunmount');
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('should update');
  //   console.log(nextProps);
  //   console.log(nextState);
  //   return true;
  // }

  // First time a page is loaded called mounting
  componentDidMount() {
    this.refreshTodos();
  }

  refreshTodos = async () => {
    let username = AuthenticationService.getLoggedInUser();
    const response = await ToDoDataService.retrieveAllTodos(username);
    this.setState({ todos: response.data });
  };

  deleteTodoClicked = async (id) => {
    let username = AuthenticationService.getLoggedInUser();
    try {
      await ToDoDataService.deleteTodo(username, id);
      this.setState({ message: `Delete of todo ${id} successful` });
      this.refreshTodos();
    } catch (error) {
      console.log(error);
    }
  };

  updateTodoClicked = async (id) => {
    this.props.navigate(`/todos/${id}`);
  };

  render() {
    return (
      <div>
        <h1>ToDo List</h1>
        {this.state.message && (
          <div className="alert alert-success">{this.state.message}</div>
        )}
        <div className="conatiner">
          <table className="table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Done</th>
                <th>Target Date</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.state.todos.map((todo) => (
                <tr key={todo.id}>
                  <td>{todo.description}</td>
                  <td>{todo.done.toString()}</td>
                  <td>{todo.targetDate.toString()}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => this.updateTodoClicked(todo.id)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => this.deleteTodoClicked(todo.id)}
                    >
                      Delete
                    </button>
                  </td>
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
