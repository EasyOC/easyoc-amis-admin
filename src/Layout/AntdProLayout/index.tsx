import {
  GithubFilled,
  InfoCircleFilled,
  LogoutOutlined,
  QuestionCircleFilled
} from '@ant-design/icons';
import type {ProSettings} from '@ant-design/pro-components';
import {
  PageContainer,
  ProCard,
  ProConfigProvider,
  ProLayout,
  SettingDrawer
} from '@ant-design/pro-components';
import {ConfigProvider, Dropdown} from 'antd';
import React, {FC, useEffect, useState} from 'react';
import defaultProps from './defaultProps';
import {inject, observer} from 'mobx-react';
import {IMainStore} from '@/stores';
import {Route, Switch, useHistory} from 'react-router';
import appSettings from '@/services/appsettings';
import routeConfig from '@/route/routeConfig';
import {eachTree} from 'amis';
import {mustStartsWith, treeMap, treeTraverse} from '@/utils';
import authService from '@/services/auth/authService';
import {merge} from 'lodash';
import {apiUrl, localPath} from '@/utils/urlHelper';

// 过滤出需要显示的路由, 这里的filterFn 指 不希望显示的层级
const filterRoutes = (routes: Route[], filterFn: (route: any) => boolean) => {
  if (routes.length === 0) {
    return [];
  }

  let newRoutes: any = [];
  for (const route of routes) {
    const newRoute: any = {...route};
    if (filterFn(route)) {
      if (Array.isArray(newRoute.routes)) {
        newRoutes.push(...filterRoutes(newRoute.routes, filterFn));
      }
    } else {
      if (Array.isArray(newRoute.children)) {
        newRoute.children = filterRoutes(newRoute.children, filterFn);
        newRoute.routes = newRoute.children;
      }
      newRoutes.push(newRoute);
    }
  }

  return newRoutes;
};

// 格式化路由 处理因 wrapper 导致的 菜单 path 不一致
const mapRoutes = (routes: any[]) => {
  if (routes.length === 0) {
    return [];
  }
  return routes.map(route => {
    // 需要 copy 一份, 否则会污染原始数据
    const newRoute = {...route};
    if (route.originPath) {
      newRoute.path = route.originPath;
    }

    if (Array.isArray(route.routes)) {
      newRoute.routes = mapRoutes(route.routes);
    }

    if (Array.isArray(route.children)) {
      newRoute.children = mapRoutes(route.children);
    }

    return newRoute;
  });
};

const AntdProLayout: FC<{store: IMainStore}> = props => {
  const {store, children} = props;
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
    ...(store.settings as Partial<ProSettings>),
    fixSiderbar: true,
    layout: 'mix',
    splitMenus: true
  });

  // const newRoutes = filterRoutes(
  //   routeConfig.filter(route => route.id === 'ant-design-pro-layout'),
  //   route => {
  //     return (
  //       (!!route.isLayout && route.id !== 'ant-design-pro-layout') ||
  //       !!route.isWrapper
  //     );
  //   }
  // );
  const [route] = mapRoutes(store.settings.route.routes);

  const history = useHistory();
  // const RenderContent = () => {
  //   let routes: any = [];
  //   let ContextPath = appSettings.publicPath;
  //   routes = treeMap(routeConfig, {
  //     children: 'routes',
  //     conversion: current => {
  //       return;
  //     }
  //   });

  //   [routeConfig].forEach((routeItem: any) => {
  //     const subFolder = ContextPath == '/' ? '' : ContextPath;
  //     routeItem &&
  //       eachTree(routeItem, (item: any) => {
  //         if (item.path) {
  //           routes.push(
  //             <Route
  //               key={item.name}
  //               path={mustStartsWith(item.path, '/')}
  //               render={(props: any) => <item.component {...props} />}
  //             />
  //           );
  //         }
  //       });
  //   });
  //   debugger;
  //   return <Switch>{routes}</Switch>;
  //   // return routes.find(
  //   //   x =>
  //   //     x.props.path?.toLowerCase() == history.location.pathname.toLowerCase()
  //   // );
  // };
  useEffect(() => {
    setSetting({...setSetting});
  }, [history, store.settings]);

  if (typeof document === 'undefined') {
    return <div />;
  }
  return (
    <div
      id="amis-pro-layout"
      style={{
        height: '100vh',
        overflow: 'auto'
      }}
    >
      <ProConfigProvider hashed={false}>
        <ConfigProvider
          getTargetContainer={() => {
            return document.getElementById('amis-pro-layout') || document.body;
          }}
        >
          <ProLayout
            {...store.settings}
            // route={defaultProps.route}
            // route={route}
            prefixCls="my-prefix"
            bgLayoutImgList={[
              {
                src: localPath('/assets/imgs/tps-609-606.png'),
                left: 85,
                bottom: 100,
                height: '303px'
              },
              {
                src: localPath('/assets/imgs/tps-609-606.png'),
                bottom: -68,
                right: -45,
                height: '303px'
              },
              {
                src: localPath('/assets/imgs/tps-884-496.png'),
                bottom: 0,
                left: 0,
                width: '331px'
              }
            ]}
            location={{
              pathname: history.location.pathname
            }}
            token={{
              header: {
                colorBgMenuItemSelected: 'rgba(0,0,0,0.04)'
              }
            }}
            siderMenuType="group"
            menu={{
              collapsedShowGroupTitle: true
            }}
            avatarProps={{
              src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
              size: 'small',
              title: store.userStore.name,
              render: (_props, dom) => {
                return (
                  <Dropdown
                    menu={{
                      items: [
                        {
                          key: 'logout',
                          onClick: async () => {
                            await authService.logout();
                          },
                          icon: <LogoutOutlined />,
                          label: '退出登录'
                        }
                      ]
                    }}
                  >
                    {dom}
                  </Dropdown>
                );
              }
            }}
            actionsRender={props => {
              if (props.isMobile) return [];
              if (typeof window === 'undefined') return [];
              return [
                <InfoCircleFilled key="InfoCircleFilled" />,
                <QuestionCircleFilled key="QuestionCircleFilled" />,
                <GithubFilled key="GithubFilled" />
              ];
            }}
            // headerTitleRender={(logo, title, _) => {
            //   const defaultDom = (
            //     <>
            //       {logo}
            //       {title}
            //     </>
            //   );
            //   if (typeof window === 'undefined') return defaultDom;
            //   if (document.body.clientWidth < 1400) {
            //     return defaultDom;
            //   }
            //   if (_.isMobile) return defaultDom;
            //   return <>{defaultDom}</>;
            // }}
            menuFooterRender={props => {
              if (props?.collapsed) return undefined;
              return (
                <div
                  style={{
                    textAlign: 'center',
                    paddingBlockStart: 12
                  }}
                >
                  <div>© 2021 Made with love</div>
                  <div>by Ant Design</div>
                </div>
              );
            }}
            onMenuHeaderClick={e => console.log(e)}
            menuItemRender={(item, dom) => (
              <div
                onClick={() => {
                  history.push(item.path);
                }}
              >
                {dom}
              </div>
            )}
            isChildrenLayout={true}
            {...settings}
          >
            <PageContainer
              loading={store.loading}
              subTitle={store.settings.subTitle}
            >
              <ProCard
                style={{
                  height: '200vh',
                  minHeight: 800
                }}
              >
                {children}
                {/* {route} */}
                {/* <RenderContent /> */}
              </ProCard>
            </PageContainer>
            <SettingDrawer
              pathname={history.location.pathname}
              enableDarkTheme
              getContainer={(e: any) => {
                if (typeof window === 'undefined') return e;
                return document.getElementById('amis-pro-layout');
              }}
              settings={settings}
              onSettingChange={changeSetting => {
                merge(store.settings, changeSetting);
              }}
              disableUrlParams={false}
            />
          </ProLayout>
        </ConfigProvider>
      </ProConfigProvider>
    </div>
  );
};
// export default AntdProLayout;
export default inject('store')(observer(AntdProLayout));
