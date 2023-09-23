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
  // {
  //   name: 'system',
  //   locale: false,
  //   hideInMenu: true,
  //   icon: 'setting',
  //   path: 'sys',
  //   routes: [
  //     {
  //       name: 'Welcome',
  //       path: 'Welcome',
  //       component: loadComponent('./sys/Welcome')
  //     },
  //     {
  //       name: 'account',
  //       path: 'account',
  //       component: loadComponent('./sys/ou/account')
  //     },
  //     {
  //       name: 'rolesAndPermission',
  //       path: 'rolesAndPermission',
  //       component: loadComponent('./sys/roles')
  //     },
  //     {
  //       name: 'develop',
  //       locale: false,
  //       icon: 'build',
  //       path: 'dev',
  //       routes: [
  //         {
  //           locale: false,
  //           path: 'develop',
  //           redirect: 'ManagePages'
  //         },
  //         {
  //           name: '动态页面预览',
  //           hideInMenu: true,
  //           path: 'Preview/:versionId',
  //           component: loadComponent('./sys/develop/AmisPreview')
  //         },
  //         {
  //           locale: false,
  //           name: 'amisPages',
  //           path: 'ManagePages',
  //           component: loadComponent('./sys/develop/ManagePages')
  //         },
  //         {
  //           locale: false,
  //           name: 'SchemaVersions',
  //           hideInMenu: true,
  //           path: 'SchemaVersions',
  //           component: loadComponent('./sys/develop/SchemaVersions')
  //         },
  //         {
  //           name: 'JsonMerge',
  //           path: 'tools/jsonMerge',
  //           component: loadComponent('./sys/develop/tools/jsonMerge')
  //         },
  //         {
  //           locale: false,
  //           menuHeaderRender: false,
  //           name: 'page-editor',
  //           path: 'page-editor',
  //           component: loadComponent('./sys/page-editor/editor.tsx')
  //         },
  //         {
  //           locale: false,
  //           name: 'dynamicIndex',
  //           path: 'dynamicIndex',
  //           component: loadComponent('./sys/develop/dynamicIndex')
  //         },
  //         {
  //           locale: false,
  //           path: 'menus',
  //           name: 'menus',
  //           component: loadComponent('./sys/menus')
  //         }
  //       ]
  //     },
  //     {
  //       name: 'type-management',
  //       path: 'type-management',
  //       routes: [
  //         {
  //           name: 'contentTypeList',
  //           hideInMenu: true,
  //           path: 'contentTypeList',
  //           component: loadComponent('./sys/type-management')
  //         },
  //         {
  //           name: 'editModel',
  //           hideInMenu: true,
  //           path: 'edit',
  //           component: loadComponent('./sys/type-management/edit')
  //         },
  //         {
  //           name: 'genTypeFromRDBMS',
  //           hideInMenu: true,
  //           path: 'genTypeFromRDBMS',
  //           component: loadComponent('./sys/type-management/genTypeFromRDBMS')
  //         },
  //         {
  //           name: 'ModelsER',
  //           path: 'ModelsER',
  //           component: loadComponent('./sys/type-management/ModelsER')
  //         },
  //         {
  //           name: 'workflow',
  //           path: 'workflow',
  //           component: loadComponent('./sys/type-management/workflow')
  //         }
  //         // {
  //         //   name: 'xflow',
  //         //   path: 'xflow',
  //         //   component: loadComponent('./sys/type-management/xflow',
  //         // },
  //       ]
  //     }

  //     // {
  //     //   path: 'account',
  //     //   locale: false,
  //     //   name: 'Account',
  //     //   icon: 'smile',
  //     //   component: loadComponent('./sys/account',
  //     // }
  //   ]
  // },
  {
    hideInMenu: true,
    path: '/editor',
    locale: false,
    component: editor
  },

  {
    hideInMenu: true,
    path: '/404',
    locale: false,
    component: loadComponent('./404')
  },

  {
    // 动态页面
    path: 'page/:id',
    name: 'AmisPage',
    component: DnynamicPage
  },
  {
    // 动态页面
    locale: false,
    hideInMenu: true,
    path: 'menu/:id',
    name: 'MenuPage',
    component: DnynamicPage
  },
  {
    // 动态页面
    locale: false,
    hideInMenu: true,
    path: 'editor',
    name: 'editor',
    component: loadComponent('./editor')
  },
  //微前端容器
  {
    // 不展示顶栏
    headerRender: false,
    // 不展示页脚
    footerRender: false,
    layout: false,
    // 不展示菜单
    menuRender: false,
    // 不展示菜单顶栏
    menuHeaderRender: false,
    // 隐藏子菜单
    hideChildrenInMenu: true,
    // 隐藏自己和子菜单
    hideInMenu: true,
    // 在面包屑中隐藏
    hideInBreadcrumb: true,
    name: 'dpage',
    locale: false,
    path: '/dpage/:module/:subModule/:pageName',
    component: DnynamicPage
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
