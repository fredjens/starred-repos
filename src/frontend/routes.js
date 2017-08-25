
// src/routes.js
import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import App from './components/App';
import { hashHistory } from 'react-router';

import Home from './containers/Home';
import Repo from './containers/Repo';

const Routes = (props) => (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route component={Home}>
        <IndexRoute />
        <Route path="/:owner/:repo" component={Repo} />
      </Route>
    </Route>
  </Router>
);

export default Routes;