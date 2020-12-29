import React from 'react';
import {Route, Switch} from 'react-router-dom';
import keepwaiting from '../posts/keepwaiting/Keepwaiting.md';
import {HashRouter as Router} from 'react-router-dom';
import App from '../App'
import Home from '../Home'

export const RoutesList = {
    HOME: '/',
    KEEP_WAITING: '/keepwaiting'
}

export default function AppRouter() {
  return (
      <Router>
        <Switch>
          <Route
              path={RoutesList.KEEP_WAITING}
              render={() => <App key="keepwaiting" contentFilePath={keepwaiting}
                                 gitIssue={1}/>}/>
          <Route exact
                 path={RoutesList.HOME}
                 render={() => <Home key="home"/>}/>
        </Switch>
      </Router>
  );
}
