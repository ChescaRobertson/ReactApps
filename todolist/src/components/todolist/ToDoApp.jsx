import React, { Component } from 'react';

class ToDoApp extends Component {
  render() {
    return (
      <div className="ToDoApp">
        <LoginComponent />
      </div>
    );
  }
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
      console.log(`successful`);
      this.setState({ showSuccessMessage: true });
      this.setState({ hasLoginFalied: false });
    } else {
      this.setState({ showSuccessMessage: false });
      this.setState({ hasLoginFalied: true });
      console.log('invalid');
    }
    //console.log(this.state);
  }

  render() {
    return (
      <div>
        <ShowInvalidCredentials
          hasLoginFalied={
            this.state.hasLoginFalied && <div>Invalid Creditentials</div>
          }
        />
        <ShowLoginSuccess showSuccessMessage={this.state.showSuccessMessage} />
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

function ShowInvalidCredentials(props) {
  if (props.hasLoginFalied) {
    return <div>Invalid Creditentials</div>;
  }
  return null;
}

function ShowLoginSuccess(props) {
  if (props.showSuccessMessage) {
    return <div>Login Successful</div>;
  }
}
export default ToDoApp;
