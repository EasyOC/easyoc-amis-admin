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
import menus from '@/pages/sys/menus';
const AmisEditor = React.lazy(() => import('@/pages/amis/editor'));
const genTypeFromRDBMS = React.lazy(
  () => import('@/pages/sys/type-management/genTypeFromRDBMS')
);
const ModelEditor = React.lazy(
  () => import('@/pages/sys/type-management/edit')
);
const typeManagement = React.lazy(() => import('@/pages/sys/type-management'));
const dynamicIndex = React.lazy(
  () => import('@/pages/sys/develop/dynamicIndex')
);
const SchemaVersions = React.lazy(
  () => import('@/pages/sys/develop/SchemaVersions')
);
const ManagePages = React.lazy(() => import('@/pages/sys/develop/ManagePages'));
const AmisPreview = React.lazy(() => import('@/pages/sys/develop/AmisPreview'));
const svgIndex = React.lazy(() => import('@/pages/dashboard/svgIndex'));

const RootRoute = function (props: {store: IMainStore}) {
  const {store} = props;

  let toastPosition = store.settings?.amis?.toastConf?.position || 'top-center';

  const AmisDynamicPage = React.lazy(
    () => import('@/pages/amis/AmisDynamicPage')
  );

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
          {/* 不需要授权的页面 */}
          <Route path="/auth/login" component={login} />
          <Route path="/auth/redirect" component={redirect} />
          <Route path="/auth/logout_redirect" component={logout_redirect} />

          <Route path="/404" component={PageNotFound} />
          <Switch>
            <Redirect exact path={'/'} to={'/dashboard'} />
            <Route exact path={'/dashboard'} component={svgIndex} />
            <Route path={'/sys'}>
              <Redirect from="/sys" to={'/sys/develop/ManagePages'}></Redirect>

              <Route path={'develop'}>
                <Redirect from="develop" to={'ManagePages'}></Redirect>
                <Route path={'Preview/:versionId'} component={AmisPreview} />
                <Route path={'ManagePages'} component={ManagePages} />
                <Route path={'SchemaVersions'} component={SchemaVersions} />
                <Route path={'page-editor'} component={AmisEditor} />
                <Route path={'dynamicIndex'} component={dynamicIndex} />
                <Route path={'menus'} component={dynamicIndex} />
                <Route path={'dynamicIndex'} component={menus} />
              </Route>
              <Route path={'type-management'}>
                <Route path={'contentTypeList'} component={typeManagement} />
                <Route path={'editModel'} component={ModelEditor} />
                <Route path={'genTypeFromRDBMS'} component={genTypeFromRDBMS} />
                <Route path={'dynamicIndex'} component={menus} />
              </Route>
            </Route>
            {/* 动态构建的树形路径 */}
            <Route component={AmisDynamicPage} />
          </Switch>
        </React.Suspense>
      </div>
    </Router>
  );
};
export default observer(RootRoute);
