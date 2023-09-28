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
    <React.Suspense fallback={<Spinner overlay className="m-t-lg" size="lg" />}>
      <Switch>
        <Redirect exact path={'/'} to={'/dashboard'} />
        <Route exact path={'/dashboard'} component={svgIndex} />
        <Route path={'/sys'}>
          <Redirect from="/sys" to={'/sys/develop/ManagePages'}></Redirect>
          <Route path={'dev'}>
            <Redirect from="dev" to={'ManagePages'}></Redirect>
            <Route path={'Preview/:versionId'} component={AmisPreview} />
            <Route path={'ManagePages'} component={ManagePages} />
            <Route path={'SchemaVersions'} component={SchemaVersions} />
            <Route path={'page-editor'} component={AmisEditor} />
            <Route path={'dynamicIndex'} component={dynamicIndex} />
            <Route path={'menus'} component={menus} />
          </Route>
          <Route path={'type-management'}>
            <Redirect from="type-management" to={'contentTypeList'} />
            <Route path={'contentTypeList'} component={typeManagement} />
            <Route path={'editModel'} component={ModelEditor} />
            <Route path={'genTypeFromRDBMS'} component={genTypeFromRDBMS} />
          </Route>
        </Route>
        {/* 动态构建的树形路径 */}
        <Route component={AmisDynamicPage} />
      </Switch>
    </React.Suspense>
  );
};

export default observer(ContentRoutes);
