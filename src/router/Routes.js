import React from 'react';
import {Route, Switch} from 'react-router-dom';
import keepWaiting from '../posts/keepwaiting/Keepwaiting.md';
import silkDestiny1 from '../posts/silk/SilkDestiny_1.md';
import {HashRouter as Router} from 'react-router-dom';
import App from '../App'
import Home from '../Home'

export const RoutesList = {
    HOME: '/',
    KEEP_WAITING: '/keep-waiting',
    SILK_DESTINY_1 : '/silk-destiny-1'
}

export default function AppRouter() {
  return (
      <Router>
        <Switch>
          <Route exact
                 path={RoutesList.HOME}
                 render={() => <Home key="home"/>}/>

          <Route
              path={RoutesList.KEEP_WAITING}
              render={() => <App key="keepWaiting" contentFilePath={keepWaiting}
                                 gitIssue={1}/>}/>

          <Route
              path={RoutesList.SILK_DESTINY_1}
              render={() => <App key="silkDestiny1" contentFilePath={silkDestiny1}
                                 gitIssue={1}/>}/>

        </Switch>
      </Router>
  );
}
