import React, {useEffect, useState} from 'react';
import {ToastComponent, AlertComponent, Spinner} from 'amis';
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect
} from 'react-router-dom';
import {IMainStore} from '../stores';
import login from '@/pages/auth/login';
import logout_redirect from '@/pages/auth/logout_redirect';
import redirect from '@/pages/auth/redirect';
import PageNotFound from '@/pages/PageNotFound';
import {inject, observer} from 'mobx-react';
import AntdProLayout from '@/Layout/AntdProLayout';
import PermissionWaper from './PermissionWaper';

const RootRoute = function (props: {store: IMainStore}) {
  const {store} = props;

  let toastPosition = store.settings?.amis?.toastConf?.position || 'top-center';

  return (
    <Router>
      <ToastComponent
        key="toast"
        position={toastPosition}
        {...store.amisEnv}
        closeButton={true}
      />
      <AlertComponent key="alert" {...store.amisEnv} />
      <div className="routes-wrapper">
        {/* 需要授权的页面 */}

        <React.Suspense
          fallback={<Spinner overlay className="m-t-lg" size="lg" />}
        >
          <Switch>
            {/* 不需要授权的页面 */}
            <Route path="/auth/login" component={login} />
            <Route path="/auth/redirect" component={redirect} />
            <Route path="/auth/logout_redirect" component={logout_redirect} />
            <Route path="/404" component={PageNotFound} />
            <PermissionWaper store={store}></PermissionWaper>
          </Switch>
        </React.Suspense>
      </div>
    </Router>
  );
};
export default observer(RootRoute);
