import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import withNavigation from './WithNavigation';
import withParams from './withParams';
import AuthenticationService from './AuthenticationService';
import HeaderComponent from './HeaderComponent';

class ToDoApp extends Component {
  render() {
    const LoginComponentWithNavigation = withNavigation(LoginComponent);
    const WelcomeComponentWithParams = withParams(WelcomeComponent);
    const HeaderComponentWithNavigation = withNavigation(HeaderComponent);
    return (
      <div className="ToDoApp">
        <Router>
          <HeaderComponentWithNavigation />
          <Routes>
            <Route path="/" element={<LoginComponentWithNavigation />} />
            <Route path="/login" element={<LoginComponentWithNavigation />} />
            <Route
              path="/welcome/:name"
              element={<WelcomeComponentWithParams />}
            />
            <Route path="/todos" element={<ListToDosComponent />} />
            <Route path="/logout" element={<LogoutComponent />} />
            <Route path="*" element={<ErrorComponent />} />
          </Routes>
          <FooterComponent />
        </Router>
      </div>
    );
  }
}

class FooterComponent extends Component {
  render() {
    return (
      <div>
        <footer className="footer">
          <span className="text-muted">
            Copyright 2022 All Rights Reserved Francesca Robertson
          </span>
        </footer>
      </div>
    );
  }
}

class LogoutComponent extends Component {
  render() {
    return (
      <div>
        <h1>You are logged out</h1>
        <div className="container">
          Thank You for Using ToDoList Application
        </div>
      </div>
    );
  }
}

class WelcomeComponent extends Component {
  render() {
    return (
      <>
        <h1>Welcome</h1>
        <div className="container">
          Welcome {this.props.params.name}. You can manage your todos{' '}
          <Link to="/todos">Here</Link>
        </div>
      </>
    );
  }
}

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
                <th>ID</th>
                <th>Description</th>
                <th>Done</th>
                <th>Target Date</th>
              </tr>
            </thead>
            <tbody>
              {this.state.todos.map((todo) => (
                <tr>
                  <td>{todo.id}</td>
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

function ErrorComponent() {
  return <div>An Error Has Occured. Contact support at errorsupport.com</div>;
}

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'admin',
      password: 'pass',
      hasLoginFalied: false,
      showSuccessMessage: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.loginClicked = this.loginClicked.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  loginClicked() {
    if (this.state.username === 'admin' && this.state.password === 'pass') {
      AuthenticationService.registerSuccessfulLogin(
        this.state.username,
        this.state.password
      );
      this.props.navigate(`/welcome/${this.state.username}`);
    } else {
      this.setState({ showSuccessMessage: false });
      this.setState({ hasLoginFalied: true });
    }
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <div className="container">
          {this.state.hasLoginFalied && (
            <div className="alert alert-warning">Invalid Creditentials</div>
          )}
          {this.state.showSuccessMessage && <div>Login Successful</div>}
          Username:{' '}
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          Password:{' '}
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button className="btn btn-sucess" onClick={this.loginClicked}>
            Login
          </button>
        </div>
      </div>
    );
  }
}

export default ToDoApp;
