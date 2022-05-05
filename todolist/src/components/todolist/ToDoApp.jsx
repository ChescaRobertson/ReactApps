import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import withNavigation from './WithNavigation';

class ToDoApp extends Component {
  render() {
    const LoginComponentWithNavigation = withNavigation(LoginComponent);
    return (
      <div className="ToDoApp">
        <Router>
          <Routes>
            <Route path="/" element={<LoginComponentWithNavigation />} />
            <Route path="/login" element={<LoginComponentWithNavigation />} />
            <Route path="/welcome" element={<WelcomeComponent />} />
            <Route path="*" element={<ErrorComponent />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

class WelcomeComponent extends Component {
  render() {
    return <div>Welcome Francesca</div>;
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
    console.log(event.target.value);
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  loginClicked() {
    if (this.state.username === 'admin' && this.state.password === 'pass') {
      this.props.navigate('/welcome');
    } else {
      this.setState({ showSuccessMessage: false });
      this.setState({ hasLoginFalied: true });
    }
  }

  render() {
    return (
      <div>
        {this.state.hasLoginFalied && <div>Invalid Creditentials</div>}
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
        <button onClick={this.loginClicked}>Login</button>
      </div>
    );
  }
}

export default ToDoApp;
