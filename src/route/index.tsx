import React from 'react';
import {ToastComponent, AlertComponent, Spinner} from 'amis';
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import {observer} from 'mobx-react';
import {IMainStore} from '../stores';
import {History, Location} from 'history';
import {schema2component} from '@/components/AMISRenderer';
// import AutoLayout from '@/Layout/SchemaLayout';
// import {set} from 'lodash';
// const mainLayout = React.lazy(() => import('@/Layout/Index'));
// const mainLayout = React.lazy(() => import('@/App1'));
const Editor = React.lazy(() => import('@/pages/editor/editor'));
// import '@/Layout/styles/autolayout.less';

export default observer(function ({
  store,
  history,
  localtion
}: {
  store: IMainStore;
  history?: History;
  localtion?: Location;
}) {
  // const appSchema = AutoLayout;
  // set(appSchema, 'pages', store.pages);
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
            <Route
              component={React.lazy(() => import('@/Layout/CustomLayout'))}
            />
            {/* <Route component={amisInstance} /> */}
          </Switch>
        </React.Suspense>
      </div>
    </Router>
  );
});
