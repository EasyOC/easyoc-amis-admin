import {EocLayoutSettings} from '@/types/src/SiteGlobalSettings';
import {localPath} from '@/utils/urlHelper';
import {currentLocale} from 'i18n-runtime';
const currentLang = currentLocale();

//@ts-expect-error
export default {
  // route: {path: '/', routes: [...routeConfig]},
  // route: {
  //   path: '/',
  //   name: 'home',
  //   component: svgIndex,
  //   routes: [...routeConfig]
  // },
  bgLayoutImgList: [
    {
      src: '/assets/imgs/tps-609-606.png',
      left: 85,
      bottom: 100,
      height: '303px'
    },
    {
      src: '/assets/imgs/tps-609-606.png',
      bottom: -68,
      right: -45,
      height: '303px'
    },
    {
      src: '/assets/imgs/tps-884-496.png',
      bottom: 0,
      left: 0,
      width: '331px'
    }
  ],
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
    default: currentLang
  },
  amis: {
    theme: 'cxd',
    locale: currentLang
  },
  siderMenuType: 'group',
  splitMenus: true
} as Partial<EocLayoutSettings>;
