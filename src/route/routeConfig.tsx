import AmisDynamicPage from '@/pages/amis/AmisDynamicPage';
import editor from '@/pages/amis/editor';
import svgIndex from '@/pages/dashboard/svgIndex';
import {mustEndsWith, mustNotStartsWith} from '@/utils';
import {
  SmileFilled,
  CrownFilled,
  TabletFilled,
  ChromeFilled
} from '@ant-design/icons';

import {MenuDataItem} from '@ant-design/pro-components';
import React from 'react';

type Route = MenuDataItem;
const routeConfig = [
  {
    path: '/welcome',
    name: '欢迎',
    icon: <SmileFilled />,
    component: svgIndex
  },
  {
    path: '/admin',
    name: '管理页',
    icon: <CrownFilled />,
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/editor',
        name: '编辑器',
        icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
        component: editor
      },
      {
        path: '/admin/sub-page2',
        name: '二级页面',
        icon: <CrownFilled />,
        component: './Welcome'
      },
      {
        path: '/admin/sub-page3',
        name: '三级页面',
        icon: <CrownFilled />,
        component: './Welcome'
      }
    ]
  }
] as (Route & MenuDataItem)[];
// const routeConfig = [
//   {
//     name: 'user',
//     path: '/user',
//     locale: false,
//     layout: false,
//     hideInMenu: true,
//     routes: [
//       {
//         name: 'login',
//         locale: false,
//         path: 'login',
//         component: loadComponent('./User/Login')
//       }
//     ]
//   },
//   {
//     name: 'dashboard',
//     path: '/',
//     locale: 'menu.home',
//     hideInMenu: true,
//     component: loadComponent('./dashboard/svgIndex')
//   },
//   {
//     hideInMenu: true,
//     path: '/editor',
//     locale: false,
//     component: editor
//   },
//   {
//     // 动态页面
//     locale: false,
//     hideInMenu: true,
//     path: 'editor',
//     name: 'editor',
//     component: loadComponent('./editor')
//   },
//   {
//     //后台数据库中查找到的 AntdMenu 列表动态构建的树形路径
//     locale: false,
//     hideInMenu: true,
//     name: 'dynamic_SubModulePage',
//     path: '*',
//     // path: '/:module/:subModule/:pageName',
//     component: DnynamicPage
//   }
// ] as (Route & MenuDataItem)[];

export default routeConfig;
