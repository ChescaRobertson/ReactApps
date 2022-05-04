import React, { Component } from 'react';
import FirstComponent from './components/learningcomponents/FirstComponent';
import SecondComponent from './components/learningcomponents/SecondComponent';
import ThirdComponent from './components/learningcomponents/ThirdComponent';
import Counter from './components/counter/Counter';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Counter />
      </div>
    );
  }
}

class LearningComponents extends Component {
  render() {
    return (
      <div className="LearningComponents">
        Hello World <FirstComponent></FirstComponent>
        <SecondComponent></SecondComponent>
        <ThirdComponent></ThirdComponent>
      </div>
    );
  }
}

export default App;
