import {IMainStore} from '@/stores';
import {inject, observer} from 'mobx-react';
import React, {useEffect, useState} from 'react';
import {Route, useHistory, useLocation} from 'react-router-dom';
import {routerPathName} from '@/utils/urlHelper';
import queryString from 'query-string';
import {PageLoading} from '@ant-design/pro-components';
import authService from '@/services/auth/authService';
import appSettings from '@/services/appsettings';
import AntdProLayout from '@/Layout/AntdProLayout';
const loginPage = appSettings.loginPage;

const WITHELIST = [
  loginPage,
  '/auth/login',
  '/auth/redirect',
  '/auth/logout_redirect'
];
//定义一个 react函数式组件，它可以包含其它组件//导出默认的组件
const PermissionWaper: React.FC<{
  store: IMainStore;
}> = props => {
  const {store} = props;
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    const {search} = location;
    (async () => {
      store.userStore.isAuthenticated = await authService.isLoggedIn();
      if (!store.userStore.isAuthenticated) {
        const currentPath = routerPathName();
        if (!WITHELIST.includes(currentPath)) {
          store.loading = false;
          let query = queryString.parse(search) as any;
          let redirect = currentPath + (search || '').toLowerCase();
          if (query.redirect) {
            redirect = query.redirect;
          }
          history.push(loginPage + '?redirect=' + redirect);
        }
      }
    })();
  }, [history, location]);
  /**
   * 配置未加载完成或配置加载中 显示一个loading
   */
  const [showLoading, setShowLoading] = useState(
    store.settingsLoading || !store.settingsLoaded
  );
  useEffect(() => {
    setShowLoading(store.settingsLoading || !store.settingsLoaded);
  }, [store.settingsLoaded, store.settingsLoading]);

  //返回包含子组件的 JSX
  return <>{showLoading ? <PageLoading /> : <AntdProLayout store={store} />}</>;
};
// export default PermissionWaper;
//observer 会在store变化时重新渲染，此处移除
export default observer(PermissionWaper);
