import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

import Stories from './components/Stories';
import StoryDetails from './components/StoryDetails';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Router>
        <Switch>
          <Route exact path="/" component={Stories} />
          <Route path="/:id" component={StoryDetails} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
