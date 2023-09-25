import AmisDynamicPage from '@/pages/amis/AmisDynamicPage';
import editor from '@/pages/amis/editor';
import AmisPreview from '@/pages/sys/develop/AmisPreview';
import ManagePages from '@/pages/sys/develop/ManagePages';
import SchemaVersions from '@/pages/sys/develop/SchemaVersions';
import dynamicIndex from '@/pages/sys/develop/dynamicIndex';
import menus from '@/pages/sys/menus';
import typeManagement from '@/pages/sys/type-management';
import edit from '@/pages/sys/type-management/edit';
import genTypeFromRDBMS from '@/pages/sys/type-management/genTypeFromRDBMS';

import {MenuDataItem} from '@ant-design/pro-components';

type Route = MenuDataItem;
const routeConfig = [
  // {
  //   path: '/welcome',
  //   name: '欢迎',
  //   icon: <SmileFilled />,
  //   component: svgIndex
  // },
  // {
  //   name: 'dashboard',
  //   path: '/',
  //   icon: <SmileFilled />,
  //   locale: 'menu.home',
  //   hideInMenu: true,
  //   component: svgIndex
  // },
  {
    name: 'system',
    locale: false,
    icon: 'setting',
    path: '/sys',
    routes: [
      // {
      //   name: 'account',
      //   path: 'account',
      //   component: './sys/ou/account'
      // },
      // {
      //   name: 'rolesAndPermission',
      //   path: 'rolesAndPermission',
      //   component: './sys/roles'
      // },
      {
        name: 'develop',
        locale: false,
        icon: 'build',
        path: 'dev',
        routes: [
          {
            locale: false,
            path: 'develop',
            redirect: 'ManagePages'
          },
          {
            name: '动态页面预览',
            hideInMenu: false,
            path: 'Preview/:versionId',
            component: AmisPreview
          },
          {
            locale: false,
            name: 'amisPages',
            path: 'ManagePages',
            component: ManagePages
          },
          {
            locale: false,
            name: 'SchemaVersions',
            hideInMenu: true,
            path: 'SchemaVersions',
            component: SchemaVersions
          },
          {
            locale: false,
            name: 'page-editor',
            path: 'page-editor',
            component: editor
          },
          {
            locale: false,
            name: 'dynamicIndex',
            path: 'dynamicIndex',
            component: dynamicIndex
          },
          {
            locale: false,
            path: 'menus',
            name: 'menus',
            component: menus
          }
        ]
      },
      {
        name: 'type-management',
        path: 'type-management',
        routes: [
          {
            name: 'contentTypeList',
            hideInMenu: true,
            path: 'contentTypeList',
            component: typeManagement
          },
          {
            name: 'editModel',
            hideInMenu: true,
            path: 'edit',
            component: edit
          },
          {
            name: 'genTypeFromRDBMS',
            hideInMenu: true,
            path: 'genTypeFromRDBMS',
            component: genTypeFromRDBMS
          }
          // {
          //   name: 'ModelsER',
          //   path: 'ModelsER',
          //   component: ModelsER
          // },
          // {
          //   name: 'workflow',
          //   path: 'workflow',
          //   component: WorkflowIndex
          // }
          // {
          //   name: 'xflow',
          //   path: 'xflow',
          //   component: './sys/type-management/xflow',
          // },
        ]
      }

      // {
      //   path: 'account',
      //   locale: false,
      //   name: 'Account',
      //   icon: 'smile',
      //   component: './sys/account',
      // }
    ]
  },
  // {
  //   path: '/admin',
  //   name: '管理页',
  //   icon: <CrownFilled />,
  //   access: 'canAdmin',
  //   component: './Admin',
  //   routes: [
  //     {
  //       path: '/admin/editor',
  //       name: '编辑器',
  //       icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
  //       component: editor
  //     },
  //     {
  //       path: '/admin/sub-page2',
  //       name: '二级页面',
  //       icon: <CrownFilled />,
  //       component: './Welcome'
  //     },
  //     {
  //       path: '/admin/sub-page3',
  //       name: '三级页面',
  //       icon: <CrownFilled />,
  //       component: './Welcome'
  //     }
  //   ]
  // },
  {
    //后台数据库中查找到的 AntdMenu 列表动态构建的树形路径
    locale: false,
    hideInMenu: true,
    name: 'dynamic_SubModulePage',
    path: '*',
    // path: '/:module/:subModule/:pageName',
    component: AmisDynamicPage
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
