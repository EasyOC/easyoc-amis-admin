import AntdProLayout from '@/Layout/AntdProLayout';
import appSettings from '@/services/appsettings';
import {IMainStore} from '@/stores';
import {treeFind} from '@/utils';
import {Spinner} from 'amis-ui';
import {inject, observer} from 'mobx-react';
import React, {FC, useEffect} from 'react';
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation
} from 'react-router-dom';

const menus = React.lazy(() => import('@/pages/sys/menus'));
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

const AmisDynamicPage = React.lazy(
  () => import('@/pages/amis/AmisDynamicPage')
);

const ContentRoutes: FC<{store: IMainStore}> = ({store}) => {
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    try {
      //处理默认跳转
      let pathKey = location.pathname as string;
      if (store?.settings?.menuData) {
        console.log('store?.settings?.menuData: ', store?.settings?.menuData);
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
            redirect = redirectMenu.children?.fullPath;
          }
        }
        if (redirect) {
          history.push(redirect);
        }
      }
    } catch (error) {
      console.log('onPageChangeerror: ', error);
    }
  }, [location]);

  return (
    <Switch>
      <Redirect exact path={'/'} to={'/dashboard'} />
      <Route exact path={'/dashboard'} component={svgIndex} />
      <Route path={'/sys/dev/menus'} component={menus} />
      <Route path={'/sys/dev/ManagePages'} component={ManagePages} />

      <Route path={'/sys'}>
        <Route path={'dev'}>
          <Route path={'/sys/dev/SchemaVersions'} component={SchemaVersions} />
          <Route path={'/sys/dev/page-editor'} component={AmisEditor} />
          <Route path={'/sys/dev/dynamicIndex'} component={dynamicIndex} />
        </Route>
      </Route>

      <Route
        path={'/sys/type-management/contentTypeList'}
        component={typeManagement}
      />
      <Route path={'/sys/type-management/editModel'} component={ModelEditor} />
      <Route
        path={'/sys/type-management/genTypeFromRDBMS'}
        component={genTypeFromRDBMS}
      />
      <Route path={'/sys/Preview/:versionId'} component={AmisPreview} />
      {/* 动态构建的路径 */}
      <Route path="*" component={AmisDynamicPage} />
    </Switch>
  );
};
export default inject('store')(observer(ContentRoutes));

// export const path2components = [
//   {
//     to: '/',
//     redicect: '/dashboard'
//   },
//   {
//     path: '/dashboard',
//     component: svgIndex
//   },
//   {path: '/sys/Preview/:versionId', component: AmisPreview},
//   {path: '/sys/dev/ManagePages', component: ManagePages},
//   {path: '/sys/dev/SchemaVersions', component: SchemaVersions},
//   {path: '/sys/dev/page-editor', component: AmisEditor},
//   {path: '/sys/dev/dynamicIndex', component: dynamicIndex},
//   {path: '/sys/dev/menus', component: menus},
//   {path: '/sys/type-management/contentTypeList', component: typeManagement},
//   {path: '/sys/type-management/editModel', component: ModelEditor},
//   {path: '/sys/type-management/genTypeFromRDBMS', component: genTypeFromRDBMS},
//   {path: '*', component: AmisDynamicPage}
// ];
// const ContentRoutes = () => {
//   const Routes = () => {
//     var routeIndex = 0;
//     return path2components.map(item => {
//       const routeKey = `RouteIndex_${routeIndex++}_${item.path ?? 'default'}`;
//       console.log(routeKey);
//       return (
//         <Route
//           key={routeKey}
//           path={`${appSettings.publicPath}${item.path}`}
//           component={item.component}
//         />
//       );
//     });
//   };
//   return <Switch>{Routes}</Switch>;
// };

// export default observer(ContentRoutes);
