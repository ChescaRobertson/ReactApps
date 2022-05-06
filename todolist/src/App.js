import React, { Component } from 'react';
import ToDoApp from './components/todolist/ToDoApp';
import './App.css';
import './bootstrap.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ToDoApp />
      </div>
    );
  }
}
export default App;
