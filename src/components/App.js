import React, { Component } from 'react';
import { Switch, Link, Route, Router } from 'react-router-dom';

import Home from './Home';
import Adopt from './Adopt';

class App extends Component {
  render() {
    return (
      <div>
        <Link to="/">Home</Link>
        <Link to="/adopt">Adopt</Link>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/adopt" component={Adopt} />
        </Switch>
      </div>
    );
  }
}

export default App;
