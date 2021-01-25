import React from 'react';
import {Route, Switch} from 'react-router-dom';
import archive from '../posts/archive/Archive.md';
import keepWaiting from '../posts/keepwaiting/Keepwaiting.md';
import silkDestiny1 from '../posts/silk/SilkDestiny_1.md';
import silkDestiny2 from '../posts/silk/SilkDestiny_2.md';
import silkDestiny3 from '../posts/silk/SilkDestiny_3.md';
import silkDestiny4 from '../posts/silk/SilkDestiny_4.md';
import silkDestiny5 from '../posts/silk/SilkDestiny_5.md';
import silkDestiny6 from '../posts/silk/SilkDestiny_6.md';
import stolenFuture1 from '../posts/stolen-future/StolenFuture_1.md';
import stolenFuture2 from '../posts/stolen-future/StolenFuture_2.md';
import stolenFuture3 from '../posts/stolen-future/StolenFuture_3.md';
import {HashRouter as Router} from 'react-router-dom';
import App from '../App';
import Home from '../Home';

export const RoutesList = {
    HOME: '/',
    ARCHIVE: '/archive',
    KEEP_WAITING: '/keep-waiting',
    SILK_DESTINY_1 : '/silk-destiny-1',
    SILK_DESTINY_2 : '/silk-destiny-2',
    SILK_DESTINY_3 : '/silk-destiny-3',
    SILK_DESTINY_4 : '/silk-destiny-4',
    SILK_DESTINY_5 : '/silk-destiny-5',
    SILK_DESTINY_6 : '/silk-destiny-6',
    STOLEN_FUTURE_1 : '/stolen-future-1',
    STOLEN_FUTURE_2 : '/stolen-future-2',
    STOLEN_FUTURE_3 : '/stolen-future-3',
}

export default function AppRouter() {
  return (
      <Router>
        <Switch>
          <Route exact
                 path={RoutesList.HOME}
                 render={() => <Home key="home"/>}/>

          <Route
              path={RoutesList.ARCHIVE}
              render={() => <App key="Archive" contentFilePath={archive}
                                 gitIssue={1}/>}/>

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

          <Route
              path={RoutesList.STOLEN_FUTURE_1}
              render={() => <App key="stolenFuture1" contentFilePath={stolenFuture1}
                                 gitIssue={7}/>}/>

          <Route
              path={RoutesList.STOLEN_FUTURE_2}
              render={() => <App key="stolenFuture2" contentFilePath={stolenFuture2}
                                 gitIssue={6}/>}/>

          <Route
              path={RoutesList.STOLEN_FUTURE_3}
              render={() => <App key="stolenFuture3" contentFilePath={stolenFuture3}
                                 gitIssue={6}/>}/>

        </Switch>
      </Router>
  );
}
