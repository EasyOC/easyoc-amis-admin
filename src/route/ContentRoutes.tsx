import AntdProLayout from '@/Layout/AntdProLayout';
import PageNotFound from '@/pages/PageNotFound';
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

const ContentRoutes = () => {
  return (
    <React.Suspense fallback={<Spinner overlay />}>
      <Switch>
        <Redirect exact path={'/'} to={'/dashboard'} />
        <Route exact path={'/dashboard'} component={svgIndex} />

        <Route path={'/sys/account'} component={Account} />
        <Route path={'/sys/rolesAndPermission'} component={roles} />

        {/* #region 在线开发相关路由 */}
        <Route path={'/dev/menus'} component={menus} />
        <Route path={'/dev/menus'} component={menus} />
        <Route path={'/dev/ManagePages'} component={ManagePages} />
        <Route path={'/dev/SchemaVersions'} component={SchemaVersions} />
        <Route path={'/dev/page-editor'} component={AmisEditor} />
        <Route path={'/dev/dynamicIndex'} component={dynamicIndex} />

        <Route
          path={'/dev/type-management/contentTypeList'}
          component={typeManagement}
        />
        <Route
          path={'/dev/type-management/editModel'}
          component={ModelEditor}
        />
        <Route
          path={'/dev/type-management/genTypeFromRDBMS'}
          component={genTypeFromRDBMS}
        />
        <Route
          path={'/dev/type-management/ModelsER'}
          component={React.lazy(
            () => import('@/pages/develop/typeManagement/ModelsER')
          )}
        />
        <Route
          path={'/dev/type-management/workflow'}
          component={React.lazy(
            () => import('@/pages/develop/typeManagement/workflow')
          )}
        />

        <Route path={'/dev/Preview/:versionId'} component={AmisPreview} />

        {/* #endregion 在线开发相关路由 */}

        <Route path="/404" component={PageNotFound} />

        {/* 动态构建的路径 */}
        <Route path={'*'} component={AmisDynamicPage} />
      </Switch>
    </React.Suspense>
  );
};
export default observer(ContentRoutes);
