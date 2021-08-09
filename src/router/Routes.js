import React from 'react';
import { Route, Switch } from 'react-router-dom';
import now from '../posts/app-menu/Now.md';
import categories from '../posts/app-menu/Categories.md';
import tags from '../posts/app-menu/Tags.md';
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
import touch from '../posts/touch/touch.md';
import codeSmellKataGracefulExceptionHandling
  from '../posts/code-smell-katas/code_smell_katas_graceful_exception_handling.md';
import distributedSystemsPerformanceTesting
  from '../posts/distributed-systems/performance_testing_distributed_system.md';
import gitHooksUnsungRescuers from '../posts/git-hooks/git_hooks.md';
import { HashRouter as Router } from 'react-router-dom';
import App from '../App';
import Home from '../Home';
import sonar from '../posts/sonar-qube-aws/sonar-aws.md';
import kubernetes_probes from '../posts/k8s-probes/kubernetes-probes.md'; 
 //[IMPORT_PLACE_HOLDER]

export const RoutesList = {
  HOME: '/',
  NOW: '/now',
  CATEGORIES: '/categories',
  TAGS: '/tags',
  ARCHIVE: '/archive',
  KEEP_WAITING: '/keep-waiting',
  SILK_DESTINY_1: '/silk-destiny-1',
  SILK_DESTINY_2: '/silk-destiny-2',
  SILK_DESTINY_3: '/silk-destiny-3',
  SILK_DESTINY_4: '/silk-destiny-4',
  SILK_DESTINY_5: '/silk-destiny-5',
  SILK_DESTINY_6: '/silk-destiny-6',
  STOLEN_FUTURE_1: '/stolen-future-1',
  STOLEN_FUTURE_2: '/stolen-future-2',
  STOLEN_FUTURE_3: '/stolen-future-3',
  CODE_SMELL_KATAS_GRACEFUL_EXCEPTION_HANDLING: '/code-smell-katas-graceful-exception-handling',
  DISTRIBUTED_SYSTEMS_PERFORMANCE_TESTING: '/debugging-performance-of-distributed-system',
  GIT_HOOKS_UNSUNG_RESCUERS: '/git-hooks-unsung-rescuers',
  TOUCH: '/touch',
  SONAR: '/sonar-aws',
  KUBERNETES_PROBES: '/kubernetes-probes', 
 //[ROUTE_PATH_PLACE_HOLDER]
}

export default function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route exact
          path={RoutesList.HOME}
          render={() => <Home key="home" />} />

        <Route
          path={RoutesList.ARCHIVE}
          render={() => <App key="Archive" contentFilePath={archive}
            gitIssue={1} />} />

        <Route
          path={RoutesList.NOW}
          render={() => <App key="Now" contentFilePath={now}
            gitIssue={1} />} />

        <Route
          path={RoutesList.CATEGORIES}
          render={() => <App key="Categories" contentFilePath={categories}
            gitIssue={1} />} />

        <Route
          path={RoutesList.TAGS}
          render={() => <App key="Tags" contentFilePath={tags}
            gitIssue={1} />} />

        <Route
          path={RoutesList.KEEP_WAITING}
          render={() => <App key="keepWaiting" contentFilePath={keepWaiting}
            gitIssue={1} />} />

        <Route
          path={RoutesList.SILK_DESTINY_1}
          render={() => <App key="silkDestiny1"
            contentFilePath={silkDestiny1}
            gitIssue={1} />} />

        <Route
          path={RoutesList.SILK_DESTINY_2}
          render={() => <App key="silkDestiny2"
            contentFilePath={silkDestiny2}
            gitIssue={2} />} />

        <Route
          path={RoutesList.SILK_DESTINY_3}
          render={() => <App key="silkDestiny3"
            contentFilePath={silkDestiny3}
            gitIssue={3} />} />

        <Route
          path={RoutesList.SILK_DESTINY_4}
          render={() => <App key="silkDestiny4"
            contentFilePath={silkDestiny4}
            gitIssue={4} />} />

        <Route
          path={RoutesList.SILK_DESTINY_5}
          render={() => <App key="silkDestiny5"
            contentFilePath={silkDestiny5}
            gitIssue={5} />} />

        <Route
          path={RoutesList.SILK_DESTINY_6}
          render={() => <App key="silkDestiny6"
            contentFilePath={silkDestiny6}
            gitIssue={6} />} />

        <Route
          path={RoutesList.STOLEN_FUTURE_1}
          render={() => <App key="stolenFuture1"
            contentFilePath={stolenFuture1}
            gitIssue={7} />} />

        <Route
          path={RoutesList.STOLEN_FUTURE_2}
          render={() => <App key="stolenFuture2"
            contentFilePath={stolenFuture2}
            gitIssue={8} />} />

        <Route
          path={RoutesList.STOLEN_FUTURE_3}
          render={() => <App key="stolenFuture3"
            contentFilePath={stolenFuture3}
            gitIssue={9} />} />

        <Route
          path={RoutesList.CODE_SMELL_KATAS_GRACEFUL_EXCEPTION_HANDLING}
          render={() => <App key="codeSmellGracefulExceptionHandling"
            contentFilePath={codeSmellKataGracefulExceptionHandling}
            gitIssue={10} />} />

        <Route
          path={RoutesList.DISTRIBUTED_SYSTEMS_PERFORMANCE_TESTING}
          render={() => <App key="distributedSystemPerformanceTesting"
            contentFilePath={distributedSystemsPerformanceTesting}
            gitIssue={11} />} />

        <Route
          path={RoutesList.GIT_HOOKS_UNSUNG_RESCUERS}
          render={() => <App key="gitHooksUnsungRescuers"
            contentFilePath={gitHooksUnsungRescuers}
            gitIssue={12} />} />

        <Route
          path={RoutesList.TOUCH}
          render={() => <App key="touch"
            contentFilePath={touch}
            gitIssue={13} />} />

        <Route path={RoutesList.SONAR} render={() => <App key="sonar-aws" contentFilePath={sonar} gitIssue={14} />} />
        <Route path={RoutesList.KUBERNETES_PROBES} render={() => <App key="kubernetes-probes" contentFilePath={kubernetes_probes} gitIssue={15} />} /> 
 {/*ROUTE_RENDER_PLACE_HOLDER*/}

      </Switch>
    </Router>
  );
}
