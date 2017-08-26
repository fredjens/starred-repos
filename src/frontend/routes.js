
// src/routes.js
import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import App from './components/App';

import Authenticate from './high-order-components/auth';

import Home from './containers/Home';
import Repo from './containers/Repo';

const createRoutes = ({ history }) => (
  <Router history={history}>
    <Route path="/" component={Authenticate(App)}>
      <Route component={Home}>
        <IndexRoute />
        <Route path="/:owner/:repo" component={Repo} />
      </Route>
    </Route>
  </Router>
);

export default createRoutes;
