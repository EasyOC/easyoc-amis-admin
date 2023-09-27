import React, {useEffect, useState} from 'react';
import {ToastComponent, AlertComponent} from 'amis';
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import {IMainStore} from '../stores';
import login from '@/pages/auth/login';
import logout_redirect from '@/pages/auth/logout_redirect';
import redirect from '@/pages/auth/redirect';
import PageNotFound from '@/pages/PageNotFound';
import AntdProLayout from '@/Layout/AntdProLayout';
import routeConfig from './routeConfig';
import {treeMap} from '@/utils';
import appSettings from '@/services/appsettings';
import {PageLoading} from '@ant-design/pro-components';
import {inject, observer} from 'mobx-react';
import AmisDynamicPage from '@/pages/amis/AmisDynamicPage';
import svgIndex from '@/pages/dashboard/svgIndex';
import AmisPreview from '@/pages/sys/develop/AmisPreview';
import ManagePages from '@/pages/sys/develop/ManagePages';
import SchemaVersions from '@/pages/sys/develop/SchemaVersions';
import dynamicIndex from '@/pages/sys/develop/dynamicIndex';
import menus from '@/pages/sys/menus';
import typeManagement from '@/pages/sys/type-management';
import ModelEditor from '@/pages/sys/type-management/edit';
import genTypeFromRDBMS from '@/pages/sys/type-management/genTypeFromRDBMS';
import AmisEditor from '@/pages/amis/editor';

const RootRoute = function (props: {store: IMainStore}) {
  const {store} = props;

  const RenderRoutes = () => {
    let routes: any = [];
    let ContextPath = appSettings.publicPath;
    treeMap(routeConfig, {
      children: 'routes',
      conversion: item => {
        if (item.component && item.path) {
          routes.push(
            <Route
              key={item.name}
              path={item.path}
              component={item.component}
            />
          );
        }

        return item;
      }
    });
    console.log('RenderRoutesroutes: ', routes);
    return routes;
  };
  let toastPosition = store.settings?.amis?.toastConf?.position || 'top-center';

  /**
   * 配置未加载完成或配置加载中 显示一个loading
   */
  const [showLoading, setShowLoading] = useState(
    store.settingsLoading || !store.settingsLoaded
  );
  useEffect(() => {
    setShowLoading(store.settingsLoading || !store.settingsLoaded);
  }, [store.settingsLoaded, store.settingsLoading]);

  return (
    <>
      <ToastComponent
        key="toast"
        position={toastPosition}
        {...store.amisEnv}
        closeButton={true}
      />
      <AlertComponent key="alert" {...store.amisEnv} />
      {showLoading ? (
        <PageLoading />
      ) : (
        <Router>
          <div className="routes-wrapper">
            <Switch>
              {/* 不需要授权的页面 */}
              <Route path="/auth/login" component={login} />
              <Route path="/auth/redirect" component={redirect} />
              <Route path="/auth/logout_redirect" component={logout_redirect} />

              <Route path="/404" component={PageNotFound} />
              {/* 需要授权的页面 */}
              <AntdProLayout {...props}>
                <Route exact path={'/'} component={svgIndex} />
                <Route path={'/sys'}>
                  <Route path={'develop'}>
                    <Route
                      path={'Preview/:versionId'}
                      component={AmisPreview}
                    />
                    <Route path={'ManagePages'} component={ManagePages} />
                    <Route path={'SchemaVersions'} component={SchemaVersions} />
                    <Route path={'page-editor'} component={AmisEditor} />
                    <Route path={'dynamicIndex'} component={dynamicIndex} />
                    <Route path={'menus'} component={dynamicIndex} />
                    <Route path={'dynamicIndex'} component={menus} />
                  </Route>
                  <Route path={'type-management'}>
                    <Route
                      path={'contentTypeList'}
                      component={typeManagement}
                    />
                    <Route path={'editModel'} component={ModelEditor} />
                    <Route
                      path={'genTypeFromRDBMS'}
                      component={genTypeFromRDBMS}
                    />
                    <Route path={'dynamicIndex'} component={menus} />
                  </Route>
                </Route>
                {/* 动态构建的树形路径 */}
                <Route path={'/*'} component={AmisDynamicPage} />
              </AntdProLayout>
            </Switch>
          </div>
        </Router>
      )}
    </>
  );
};
export default inject('store')(observer(RootRoute));
