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
import PermissionWaper from './PermissionWaper';
import appSettings from '@/services/appsettings';

const RootRoute = function (props: {store: IMainStore}) {
  const {store} = props;

  const [settings, setSettings] = useState({
    toastPosition: store.settings?.amis?.toastConf?.position || 'top-center'
  });

  useEffect(() => {
    setSettings({
      toastPosition: store.settings?.amis?.toastConf?.position || 'top-center'
    });
  }, [store.settings.amis?.toastConf?.position]);

  return (
    <>
      <ToastComponent
        key="toast"
        position={settings.toastPosition}
        {...store.amisEnv}
        closeButton={true}
      />
      <AlertComponent key="alert" {...store.amisEnv} />
      <React.Suspense fallback={<Spinner overlay />}>
        <Router basename={appSettings.routeBase ?? '/'}>
          <div className="routes-wrapper">
            {/* 需要授权的页面 */}
            <Switch>
              {/* 不需要授权的页面 */}
              <Route path="/auth/login" component={login} />
              <Route path="/auth/redirect" component={redirect} />
              <Route path="/auth/logout_redirect" component={logout_redirect} />
              <Route component={PermissionWaper}></Route>
              <Route path="/404" component={PageNotFound} />
            </Switch>
          </div>
        </Router>
      </React.Suspense>
    </>
  );
};
export default observer(RootRoute);
