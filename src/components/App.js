import React, { Component } from 'react';
import { Switch, Link, Route, Router } from 'react-router-dom';

import Home from './Home';
import Adopt from './Adopt';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/adopt">Adopt</Link>
        </nav>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/adopt" component={Adopt} />
        </Switch>
      </div>
    );
  }
}

export default App;
