import routeConfig from '@/route/routeConfig';
import {EocLayoutSettings} from '@/types/src/SiteGlobalSettings';
import {
  ChromeFilled,
  CrownFilled,
  SmileFilled,
  TabletFilled
} from '@ant-design/icons';
import React from 'react';
//@ts-expect-error
export default {
  // route: {path: '/', routes: [...routeConfig]},
  route: {
    path: '/',
    routes: [...routeConfig]
  },
  navTheme: 'light',
  colorPrimary: '#1890ff',
  layout: 'mix',
  serverTitle: 'SalesPortal',
  loginPageSubTitle: '欢迎来到对抗路',
  contentWidth: 'Fluid',
  footerRender: false,
  fixedHeader: false,
  fixSiderbar: true,
  pwa: true,
  locale: {
    default: 'zh-CN'
  },
  amis: {
    theme: 'cxd'
  },
  siderMenuType: 'group',
  splitMenus: true
} as Partial<EocLayoutSettings>;
