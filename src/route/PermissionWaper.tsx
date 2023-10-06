import {IMainStore} from '@/stores';
import {inject, observer} from 'mobx-react';
import React, {useEffect, useState} from 'react';
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation
} from 'react-router-dom';
import {routerPathName} from '@/utils/urlHelper';
import queryString from 'query-string';
import authService from '@/services/auth/authService';
import appSettings from '@/services/appsettings';
import AntdProLayout from '@/Layout/AntdProLayout';
import {Spinner} from 'amis';
import ContentRoutes from './ContentRoutes';

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
      if (!(await authService.isLoggedIn())) {
        const currentPath = routerPathName();
        if (!WITHELIST.includes(currentPath)) {
          props.store.setLoading(false);
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
  return (
    <>
      {showLoading ? (
        <Spinner overlay className="m-t-lg" size="lg" />
      ) : (
        <AntdProLayout store={store}>
          <ContentRoutes store={store} />
        </AntdProLayout>
      )}
    </>
  );
};
// export default PermissionWaper;
//observer 会在store变化时重新渲染，此处移除
export default inject('store')(observer(PermissionWaper));
