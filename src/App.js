import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

import Stories from './components/Stories';
import StoryDetails from './components/StoryDetails';

function App() {
  return (
    <div className="App">
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
