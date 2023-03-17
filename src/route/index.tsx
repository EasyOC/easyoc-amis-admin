import React from 'react';
import {ToastComponent, AlertComponent, Spinner} from 'amis';
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router
} from 'react-router-dom';
import {observer} from 'mobx-react';
import {IMainStore} from '../stores';

const mainLayout = React.lazy(() => import('@/Layout/Index'));
const Editor = React.lazy(() => import('@/pages/page-editor/editor'));

export default observer(function ({store}: {store: IMainStore}) {
  return (
    <Router>
      <div className="routes-wrapper">
        <ToastComponent key="toast" position={'top-right'} />
        <AlertComponent key="alert" />
        <React.Suspense
          fallback={<Spinner overlay className="m-t-lg" size="lg" />}
        >
          <Switch>
            <Redirect to={`/hello-world`} from={`/`} exact />
            <Route path="/editor" component={Editor} />
            <Route
              path="/auth/login"
              component={React.lazy(() => import('@/pages/auth/login'))}
            />
            <Route
              path="/auth/redirect"
              component={React.lazy(() => import('@/pages/auth/redirect'))}
            />
            <Route
              path="/auth/logout_redirect"
              component={React.lazy(
                () => import('@/pages/auth/logout_redirect')
              )}
            />
            <Route component={mainLayout} />
          </Switch>
        </React.Suspense>
      </div>
    </Router>
  );
});
