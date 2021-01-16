import React from 'react';
import {Route, Switch} from 'react-router-dom';
import keepWaiting from '../posts/keepwaiting/Keepwaiting.md';
import silkDestiny1 from '../posts/silk/SilkDestiny_1.md';
import silkDestiny2 from '../posts/silk/SilkDestiny_2.md';
import silkDestiny3 from '../posts/silk/SilkDestiny_3.md';
import silkDestiny4 from '../posts/silk/SilkDestiny_4.md';
import silkDestiny5 from '../posts/silk/SilkDestiny_5.md';
import silkDestiny6 from '../posts/silk/SilkDestiny_6.md';
import {HashRouter as Router} from 'react-router-dom';
import App from '../App'
import Home from '../Home'

export const RoutesList = {
    HOME: '/',
    KEEP_WAITING: '/keep-waiting',
    SILK_DESTINY_1 : '/silk-destiny-1',
    SILK_DESTINY_2 : '/silk-destiny-2',
    SILK_DESTINY_3 : '/silk-destiny-3',
    SILK_DESTINY_4 : '/silk-destiny-4',
    SILK_DESTINY_5 : '/silk-destiny-5',
    SILK_DESTINY_6 : '/silk-destiny-6',
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

          <Route
              path={RoutesList.SILK_DESTINY_2}
              render={() => <App key="silkDestiny2" contentFilePath={silkDestiny2}
                                 gitIssue={2}/>}/>

          <Route
              path={RoutesList.SILK_DESTINY_3}
              render={() => <App key="silkDestiny3" contentFilePath={silkDestiny3}
                                 gitIssue={3}/>}/>

          <Route
              path={RoutesList.SILK_DESTINY_4}
              render={() => <App key="silkDestiny4" contentFilePath={silkDestiny4}
                                 gitIssue={4}/>}/>

          <Route
              path={RoutesList.SILK_DESTINY_5}
              render={() => <App key="silkDestiny5" contentFilePath={silkDestiny5}
                                 gitIssue={5}/>}/>

          <Route
              path={RoutesList.SILK_DESTINY_6}
              render={() => <App key="silkDestiny6" contentFilePath={silkDestiny6}
                                 gitIssue={6}/>}/>

        </Switch>
      </Router>
  );
}
