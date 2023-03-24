import React, {useEffect} from 'react';
import {ToastComponent, AlertComponent, Spinner} from 'amis';
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import {observer} from 'mobx-react';
import {IMainStore} from '../stores';
import Permission from './Permissions';
import AutoLayout from '@/Layout/SchemaLayout';
import {schema2component} from '@/components/AMISRenderer';
import {set} from 'lodash';
// const mainLayout = React.lazy(() => import('@/Layout/Index'));
// const mainLayout = React.lazy(() => import('@/App1'));
const Editor = React.lazy(() => import('../pages/editor/editor'));
// import '@/Layout/styles/autolayout.less';

export default observer(function (props: {store: IMainStore}) {
  // const appSchema = AutoLayout;
  // set(appSchema, 'pages', props.store.pages);
  // const amisInstance = schema2component(appSchema);

  return (
    <Router>
      <div className="routes-wrapper">
        <ToastComponent key="toast" position={'top-right'} />
        <AlertComponent key="alert" />
        <React.Suspense
          fallback={<Spinner overlay className="m-t-lg" size="lg" />}
        >
          <Switch>
            {/* 不需要授权的页面 */}
            <Route
              path="/auth/login"
              component={React.lazy(() => import('../pages/auth/login'))}
            />
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
              <Route path="/editor" component={Editor} />
              <Route
                component={React.lazy(() => import('@/Layout/CustomLayout'))}
              />
              {/* <Route component={amisInstance} /> */}
            </Route>
          </Switch>
        </React.Suspense>
      </div>
    </Router>
  );
});
