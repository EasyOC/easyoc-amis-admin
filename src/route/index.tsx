import React from 'react';
import {ToastComponent, AlertComponent, Spinner} from 'amis';
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import {observer} from 'mobx-react';
import {IMainStore} from '../stores';
import Permission from './Permissions';
import login from '@/pages/auth/login';
// const mainLayout = React.lazy(() => import('@/Layout/Index'));
// const mainLayout = React.lazy(() => import('@/App1'));
// const Editor = React.lazy(() => import('../pages/editor/editor'));
// import '@/Layout/styles/autolayout.less';

export default observer(function ({store}: {store: IMainStore}) {
  return (
    <Router>
      <div className="routes-wrapper">
        <ToastComponent
          key="toast"
          position={'top-right'}
          theme={store.theme}
        />
        <AlertComponent key="alert" theme={store.theme} />

        <Switch>
          {/* 不需要授权的页面 */}
          <Route path="/auth/login" component={login} />
          <Route
            path="/auth/redirect"
            component={React.lazy(() => import('../pages/auth/redirect'))}
          />
          <Route
            path="/auth/logout_redirect"
            component={React.lazy(
              () => import('../pages/auth/logout_redirect')
            )}
          />
          {/* 需要授权的页面 */}
          <Route component={Permission}>
            <Route
              path="/editor"
              component={React.lazy(() => import('../pages/editor/editor'))}
            />
            <Route
              component={React.lazy(() => import('@/Layout/CustomLayout'))}
            />
            {/* <Route
                component={React.lazy(() => import('@/Layout/FunctionLayout'))}
              /> */}
            {/* <Route component={amisInstance} /> */}
          </Route>
        </Switch>
      </div>
    </Router>
  );
});
