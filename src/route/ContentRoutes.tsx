import AntdProLayout from '@/Layout/AntdProLayout';
import appSettings from '@/services/appsettings';
import {Spinner} from 'amis-ui';
import {observer} from 'mobx-react';
import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

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

const ContentRoutes = () => {
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
      {/* <Route path={'/sys/type-management/editModel'} component={ModelEditor} /> */}
      {/* <Route
        path={'/sys/type-management/genTypeFromRDBMS'}
        component={genTypeFromRDBMS}
      /> */}
      <Route path={'/sys/Preview/:versionId'} component={AmisPreview} />
      {/* 动态构建的路径 */}
      <Route path="*" component={AmisDynamicPage} />
    </Switch>
  );
};
export default observer(ContentRoutes);

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
