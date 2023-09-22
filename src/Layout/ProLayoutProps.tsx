import {ProLayoutProps} from '@ant-design/pro-components';

export default {
  route: {
    path: '/',
    //https://ant.design/components/icon-cn
    routes: [
      {
        path: '/',
        name: 'home',
        locale: 'menu.home',
        orderIndex: -100,
        lang: {
          'zh-CN': '首页',
          'en-US': 'Home'
        },
        routes: [{redirect: '/SEA/BACalculate'}]
      },
      {
        name: 'system',
        icon: 'setting',
        //使用 管理员 筛选策略
        access: 'adminRouteFilter',
        locale: 'menu.system',
        lang: {
          'zh-CN': '系统',
          'en-US': 'Settings'
        },
        path: '/sys',
        icon: 'setting',
        redirect: '/sys/dev/ManagePages',
        routes: [
          {
            name: 'account',
            lang: {
              'zh-CN': '用户管理',
              'en-US': 'Accounts'
            },
            path: 'account'
          },
          {
            name: 'rolesAndPermission',
            lang: {
              'zh-CN': '角色与权限',
              'en-US': 'Roles & Permissions'
            },
            path: 'rolesAndPermission'
          },
          {
            name: 'develop',
            path: 'dev',
            access: 'adminRouteFilter',
            icon: 'CodepenOutlined',
            lang: {
              'zh-CN': '开发',
              'en-US': 'Develop'
            },
            routes: [
              {
                name: 'ManagePages',
                access: 'adminRouteFilter',
                path: 'ManagePages',
                lang: {
                  'zh-CN': '页面管理',
                  'en-US': 'ManagePages'
                }
              },
              {
                name: 'SchemaVersions',
                access: 'adminRouteFilter',
                path: 'SchemaVersions',
                hideInMenu: true,
                lang: {
                  'zh-CN': '页面版本',
                  'en-US': 'Page History'
                }
              },
              {
                name: 'page-editor',
                menuHeaderRender: false,
                path: 'page-editor',
                access: 'adminRouteFilter',
                hideInMenu: 'true',
                lang: {
                  'zh-CN': '页面编辑器',
                  'en-US': 'Develop'
                }
              },
              {
                name: 'menus',
                path: 'menus',
                access: 'adminRouteFilter',
                lang: {
                  'zh-CN': '菜单管理',
                  'en-US': 'Menus'
                }
              },
              {
                name: 'dynamicIndex',
                access: 'adminRouteFilter',
                lang: {
                  'zh-CN': '动态索引',
                  'en-US': 'Dynamic Index'
                },
                path: 'dynamicIndex'
              }
            ]
          },
          {
            name: 'type-management',
            path: 'type-management',
            redirect: '/sys/type-management/contentTypeList',
            icon: 'UnorderedListOutlined',
            lang: {
              'zh-CN': '模型管理',
              'en-US': 'Models'
            },
            routes: [
              {
                name: 'contentTypeList',
                path: 'contentTypeList',
                hideInMenu: false,
                lang: {
                  'zh-CN': '模型列表',
                  'en-US': 'Model List'
                }
              },
              {
                name: 'genTypeFromRDBMS',
                path: 'genTypeFromRDBMS',
                hideInMenu: false,
                lang: {
                  'zh-CN': '从关系型数据库导入',
                  'en-US': 'Gen Model From RDBMS'
                }
              },
              {
                name: 'editModel',
                path: 'editmodel',
                access: 'adminRouteFilter',
                hideInMenu: true,
                lang: {
                  'zh-CN': '编辑模型',
                  'en-US': 'Edit Model'
                }
              },
              {
                name: 'ModelsER',
                access: 'adminRouteFilter',
                lang: {
                  'zh-CN': 'ER图',
                  'en-US': 'ER'
                },
                path: 'ModelsER'
              },
              {
                name: 'workflow',
                access: 'adminRouteFilter',
                lang: {
                  'zh-CN': '流程实例',
                  'en-US': 'Instance'
                },
                path: 'workflow'
              },
              {
                name: 'xflow',
                access: 'adminRouteFilter',
                lang: {
                  'zh-CN': 'xflow流程图',
                  'en-US': 'xflow'
                },
                path: 'xflow'
              }
            ]
          }
          // {
          //     path: 'account',
          //     name: 'Account',
          //     lang: {
          //         "zh-CN": "账号管理",
          //         "en-US": "Account",
          //     },
          //     icon: 'smile',
          //     component: './sys/account',
          // }
        ]
      },
      {
        name: 'Editors',
        icon: 'highlight',
        path: '/editor',
        redirect: '/editor/flow',
        routes: [
          // {
          //     name: 'EChartEditor',
          //     icon: 'smile',
          //     lang: {
          //         "zh-CN": "EChartEditor",
          //         "en-US": "EChartEditor",
          //     },
          //     path: '/editor/EChartEditor',
          // },
          // {
          //     name: 'flowchart',
          //     lang: {
          //         "zh-CN": "flowchart",
          //         "en-US": "flowchart",
          //     },
          //     icon: 'smile',
          //     path: '/editor/flow',
          // },
          // {
          //     name: 'gg-editor-flow',
          //     lang: {
          //         "zh-CN": "gg-editor-flow",
          //         "en-US": "gg-editor-flow",
          //     },
          //     icon: 'smile',
          //     path: '/editor/flow',
          // },
          // {
          //     name: 'koni',
          //     icon: 'smile',
          //     path: '/editor/koni',
          // },
        ]
      }
    ]
  },
  location: {
    pathname: '/'
  },
  appList: [
    {
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
      title: 'Ant Design',
      desc: '杭州市较知名的 UI 设计语言',
      url: 'https://ant.design'
    },
    {
      icon: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
      title: 'AntV',
      desc: '蚂蚁集团全新一代数据可视化解决方案',
      url: 'https://antv.vision/',
      target: '_blank'
    },
    {
      icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
      title: 'Pro Components',
      desc: '专业级 UI 组件库',
      url: 'https://procomponents.ant.design/'
    },
    {
      icon: 'https://img.alicdn.com/tfs/TB1zomHwxv1gK0jSZFFXXb0sXXa-200-200.png',
      title: 'umi',
      desc: '插件化的企业级前端应用框架。',
      url: 'https://umijs.org/zh-CN/docs'
    },

    {
      icon: 'https://gw.alipayobjects.com/zos/bmw-prod/8a74c1d3-16f3-4719-be63-15e467a68a24/km0cv8vn_w500_h500.png',
      title: 'qiankun',
      desc: '可能是你见过最完善的微前端解决方案🧐',
      url: 'https://qiankun.umijs.org/'
    },
    {
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg',
      title: '语雀',
      desc: '知识创作与分享工具',
      url: 'https://www.yuque.com/'
    },
    {
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/LFooOLwmxGLsltmUjTAP.svg',
      title: 'Kitchen ',
      desc: 'Sketch 工具集',
      url: 'https://kitchen.alipay.com/'
    },
    {
      icon: 'https://gw.alipayobjects.com/zos/bmw-prod/d3e3eb39-1cd7-4aa5-827c-877deced6b7e/lalxt4g3_w256_h256.png',
      title: 'dumi',
      desc: '为组件开发场景而生的文档工具',
      url: 'https://d.umijs.org/zh-CN'
    }
  ],
  token: {
    navTheme: 'light',
    colorPrimary: '#1890ff',
    layout: 'mix',
    title: 'SalesPortal',
    loginPageSubTitle: '欢迎来到对抗路',
    contentWidth: 'Fluid',
    footerRender: false,
    fixedHeader: false,
    fixSiderbar: true,
    pwa: true,
    logo: '/media/siteassets/jz-logo.svg',
    loginBg: '/media/siteassets/loginbg.png',
    locale: {
      default: 'zh-CN'
    },
    amis: {
      theme: 'cxd'
    },
    siderMenuType: 'group',
    splitMenus: true
  }
} as ProLayoutProps;
