import {checkLogin} from '@/services/permissions';
import {IMainStore} from '@/stores';
import {inject, observer} from 'mobx-react';
import React, {useEffect} from 'react';
import {History} from 'history';
import {useHistory} from 'react-router-dom';
import appSettings from '@/services/appSettings';
import {routerPathName} from '@/utils/urlHelper';
import queryString from 'query-string';
import {PageLoading} from '@ant-design/pro-components';
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
    debugger;
    const init = async () => {
      const currentPath = routerPathName();
      if (!WITHELIST.includes(currentPath)) {
        store.loading = false;
        doLogin();
      }
    };
    if (!store.userStore.isAuthenticated) {
      init();
    }
  }, [history, store.userStore.isAuthenticated]);

  //返回包含子组件的 JSX
  return (
    <>{store.userStore.isAuthenticated ? props.children : <PageLoading />}</>
  );
};
export default inject('store')(observer(PermissionWaper));
//observer 会在store变化时重新渲染，此处移除
// export default inject('store')(PermissionWaper);
