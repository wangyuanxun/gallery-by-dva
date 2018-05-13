import React from 'react';
import { Router, Route, Switch } from 'dva/router';

import Gallery from './routes/gallery'

function RouterConfig({ history,app }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path='/' exact component={Gallery} >
        </Route>
      </Switch>
    </Router>
  );
}

export default RouterConfig
