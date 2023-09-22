import {checkLogin} from '@/services/permissions';
import {IMainStore} from '@/stores';
import {inject, observer} from 'mobx-react';
import React, {useEffect} from 'react';
import {History} from 'history';
import {useHistory} from 'react-router-dom';
import appSettings from '@/services/appSettings';
import {routerPathName} from '@/utils/urlHelper';
import queryString from 'query-string';
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
    if (!store.loading) {
      store.loading = true;
      const init = async () => {
        const currentPath = routerPathName();
        if (!WITHELIST.includes(currentPath)) {
          store.loading = false;
          doLogin();
        }
      };
      if (!store.userStore.isAuthenticated) {
        init().then(() => (store.loading = false));
      } else {
        store.fetchServerSideSettings().then(() => (store.loading = false));
      }
    }
    return () => {
      store.loading = false;
    };
  }, [history, store.userStore.isAuthenticated]);

  //返回包含子组件的 JSX
  return (
    <>{store.userStore.isAuthenticated ? props.children : <>loading...</>}</>
  );
};
export default inject('store')(observer(PermissionWaper));
