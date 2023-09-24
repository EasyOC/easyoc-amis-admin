import AmisDynamicPage from '@/pages/amis/AmisDynamicPage';
import editor from '@/pages/amis/editor';
import {mustEndsWith, mustNotStartsWith} from '@/utils';

import {MenuDataItem} from '@ant-design/pro-components';
import React from 'react';

type Route = MenuDataItem;
const pageComponentRoot = '../pages';
const loadComponent = (path: string) => {
  return React.lazy(
    () =>
      import(
        pageComponentRoot + mustEndsWith(mustNotStartsWith(path, '.'), '.tsx')
      )
  );
};
const DnynamicPage = loadComponent('/amis/AmisDynamicPage');
const routeConfig = [
  {
    name: 'user',
    path: '/user',
    locale: false,
    layout: false,
    hideInMenu: true,
    routes: [
      {
        name: 'login',
        locale: false,
        path: 'login',
        component: loadComponent('./User/Login')
      }
    ]
  },
  {
    name: 'dashboard',
    path: '/',
    locale: 'menu.home',
    hideInMenu: true,
    component: loadComponent('./dashboard/svgIndex')
  },
  {
    hideInMenu: true,
    path: '/editor',
    locale: false,
    component: editor
  },
  {
    // 动态页面
    locale: false,
    hideInMenu: true,
    path: 'editor',
    name: 'editor',
    component: loadComponent('./editor')
  },
  {
    //后台数据库中查找到的 AntdMenu 列表动态构建的树形路径
    locale: false,
    hideInMenu: true,
    name: 'dynamic_SubModulePage',
    path: '*',
    // path: '/:module/:subModule/:pageName',
    component: DnynamicPage
  }
] as (Route & MenuDataItem)[];

export default routeConfig;
