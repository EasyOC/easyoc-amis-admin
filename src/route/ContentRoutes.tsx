import PageNotFound from '@/pages/PageNotFound';
import {IMainStore} from '@/stores';
import {treeFind} from '@/utils';
import {Spinner} from 'amis-ui';
import {inject, observer} from 'mobx-react';
import React, {FC, useEffect, useState} from 'react';
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch
} from 'react-router-dom';
// import AmisEditor from '@/pages/amis/editor';
const menus = React.lazy(() => import('@/pages/sys/menus'));

//#region 在线开发相关路由

const AmisEditor = React.lazy(() => import('@/pages/amis/editor'));
const genTypeFromRDBMS = React.lazy(
  () => import('@/pages/develop/typeManagement/genTypeFromRDBMS')
);
const ModelEditor = React.lazy(
  () => import('@/pages/develop/typeManagement/edit')
);
const typeManagement = React.lazy(
  () => import('@/pages/develop/typeManagement')
);

const dynamicIndex = React.lazy(() => import('@/pages/develop/dynamicIndex'));
const SchemaVersions = React.lazy(
  () => import('@/pages/develop/SchemaVersions')
);
const ManagePages = React.lazy(() => import('@/pages/develop/ManagePages'));
const AmisPreview = React.lazy(() => import('@/pages/develop/AmisPreview'));

//#endregion 在线开发相关路由

const svgIndex = React.lazy(() => import('@/pages/dashboard/svgIndex'));

const AmisDynamicPage = React.lazy(
  () => import('@/pages/amis/AmisDynamicPage')
);

const Account = React.lazy(() => import('@/pages/sys/ou/account'));
const roles = React.lazy(() => import('@/pages/sys/roles'));

const ContentRoutes: FC<{store: IMainStore}> = ({store}) => {
  const location = useLocation();
  const history = useHistory();
  const [state, setState] = useState({
    pathname: '',
    component: Spinner
  });

  useEffect(() => {

    try {
      //处理默认跳转
      let pathKey = location.pathname as string;
      if (store.settings?.menuData) {
        const redirectMenu = treeFind(
          store.settings.menuData,
          node => node?.fullPath.toLowerCase() == pathKey.toLowerCase()
        );
        //如果是节点路径，则应该自动跳转
        //解析路由默认跳转
        //尝试从路由节点本身查找redirect 属性
        let redirect = redirectMenu?.redirect;
        if (!redirect) {
          if (redirectMenu?.children && redirectMenu?.children?.length > 0) {
            //使用第一个节点的 路径作为 redirect
            redirect = redirectMenu.children[0]?.fullPath;
          }
        }
        if (redirect) {
          history.push(redirect);
        }
      }
    } catch (error) {
      console.log('onPageChangeerror: ', error);
    }
  }, [location.pathname]);

  const routes = [
    <Redirect exact path={'/'} to={'/dashboard'} />,
    <Route exact path={'/dashboard'} component={svgIndex} />,
    <Route path={'/sys/account'} component={Account} />,
    <Route path={'/sys/rolesAndPermission'} component={roles} />,
    <Route path={'/dev/menus'} component={menus} />,
    <Route path={'/dev/ManagePages'} component={ManagePages} />,
    <Route path={'/dev/SchemaVersions'} component={SchemaVersions} />,
    <Route path={'/dev/page-editor'} component={AmisEditor} />,
    <Route path={'/dev/dynamicIndex'} {...{store}} component={dynamicIndex} />,

    <Route
      path={'/dev/type-management/contentTypeList'}
      component={typeManagement}
    />,
    <Route path={'/dev/type-management/editModel'} component={ModelEditor} />,
    <Route
      path={'/dev/type-management/genTypeFromRDBMS'}
      component={genTypeFromRDBMS}
    />,
    <Route
      path={'/dev/type-management/ModelsER'}
      component={React.lazy(
        () => import('@/pages/develop/typeManagement/ModelsER')
      )}
    />,
    <Route
      path={'/dev/type-management/workflow'}
      component={React.lazy(
        () => import('@/pages/develop/typeManagement/workflow')
      )}
    />,
    <Route path={'/dev/Preview/:versionId'} component={AmisPreview} />,
    <Route path="/404" component={PageNotFound} />,
    <Route path={'*'} component={AmisDynamicPage} />
  ];

  return (
    <React.Suspense fallback={<Spinner overlay />}>
      <Switch>{routes}</Switch>
    </React.Suspense>
  );
};
export default inject('store')(observer(ContentRoutes));
