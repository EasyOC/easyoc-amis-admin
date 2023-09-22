import React from 'react';
import {ToastComponent, AlertComponent, Spinner} from 'amis';
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import {IMainStore} from '../stores';
import PermissionWaper from './PermissionWaper';
import login from '@/pages/auth/login';
import logout_redirect from '@/pages/auth/logout_redirect';
import redirect from '@/pages/auth/redirect';
import PageNotFound from '@/pages/PageNotFound';
import CustomLayout from '@/Layout/CustomLayout';
import ProLayout from '@/Layout/ProLayout';
// const mainLayout = React.lazy(() => import('@/Layout/Index'));
// const mainLayout = React.lazy(() => import('@/App1'));
// const Editor = React.lazy(() => import('../pages/editor/editor'));
// import '@/Layout/styles/autolayout.less';

const route = function (props: {store: IMainStore}) {
  const {store} = props;
  return (
    <Router>
      <div className="routes-wrapper">
        <ToastComponent
          key="toast"
          position={'top-right'}
          theme={store.amisEnv.theme}
          closeButton={true}
        />
        <AlertComponent key="alert" theme={store.amisEnv.theme} />

        <Switch>
          {/* 不需要授权的页面 */}
          <Route path="/auth/login" component={login} />
          <Route path="/auth/redirect" component={redirect} />
          <Route path="/auth/logout_redirect" component={logout_redirect} />
          <Route path="/404" component={PageNotFound} />
          {/* 需要授权的页面 */}
          <PermissionWaper store={store}>
            <Route
              path="/editor"
              component={React.lazy(() => import('../pages/editor/editor'))}
            />
            <Route component={ProLayout} />
          </PermissionWaper>
        </Switch>
      </div>
    </Router>
  );
};
export default inject('store')(observer(route));
