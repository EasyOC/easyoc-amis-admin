import {IMainStore} from '@/stores';
import {inject, observer} from 'mobx-react';
import React, {useEffect, useState} from 'react';
import {Route, useHistory} from 'react-router-dom';
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
  children: React.ReactNode;
}> = props => {
  const {store} = props;
  const doLogin = async () => {
    const {search} = location;
    const currentPath = routerPathName();
    if (!WITHELIST.includes(currentPath)) {
      let query = queryString.parse(search) as any;
      let redirect = currentPath + (search || '').toLowerCase();
      if (query.redirect) {
        redirect = query.redirect;
      }
      history.push(loginPage + '?redirect=' + redirect);
    }
  };
  //使用 useEffect hook，检查登录状态
  const history = useHistory();
  useEffect(() => {
    const init = async () => {
      store.userStore.isAuthenticated = await authService.isLoggedIn();
      if (!store.userStore.isAuthenticated) {
        const currentPath = routerPathName();
        if (!WITHELIST.includes(currentPath)) {
          store.loading = false;
          doLogin();
        }
      }
    };
    init();
  }, [history]);
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
  return (
    <>
      {showLoading ? (
        <PageLoading />
      ) : (
        <Route component={AntdProLayout}></Route>
      )}
    </>
  );
};
export default inject('store')(observer(PermissionWaper));
//observer 会在store变化时重新渲染，此处移除
// export default inject('store')(PermissionWaper);
