import {
  CaretDownFilled,
  InfoCircleFilled,
  LogoutOutlined
} from '@ant-design/icons';
import {
  PageContainer,
  ProBreadcrumb,
  ProCard,
  ProConfigProvider,
  ProLayout
} from '@ant-design/pro-components';
import {ConfigProvider, Dropdown, Popover} from 'antd';
import React, {FC} from 'react';
import {eachTree} from 'amis';
import {Route, useHistory} from 'react-router';
import authService from '@/services/auth/authService';
import {mustStartsWith} from '@/utils';
import {IMainStore} from '@/stores';
import {inject, observer} from 'mobx-react';
import Footer from './Components/Footer';
import routeConfig from '@/route/routeConfig';
import appSettings from '@/services/appsettings';
let ContextPath = appSettings.publicPath;

const Layout: FC<{store: IMainStore; history: History}> = props => {
  const {store} = props;

  const history = useHistory();
  const RenderContent = () => {
    let routes: any = [];

    [routeConfig].forEach((routeItem: any) => {
      const subFolder = ContextPath == '/' ? '' : ContextPath;
      routeItem.routes &&
        eachTree(routeItem.routes, (item: any) => {
          if (item.path) {
            routes.push(
              <Route
                key={routes.length + 1}
                path={subFolder + mustStartsWith(item.path, '/')}
                render={(props: any) => <item.component {...props} />}
              />
            );
          }
        });
    });
    return routes.find(
      x =>
        x.props.path?.toLowerCase() == history.location.pathname.toLowerCase()
    );
  };

  if (typeof document === 'undefined') {
    return <div />;
  }
  return (
    <div
      id="test-pro-layout"
      style={{
        height: '100vh',
        overflow: 'auto'
      }}
    >
      <ProConfigProvider hashed={false}>
        <ConfigProvider>
          <ProLayout
            //默认ProLayout属性全部采用store 中的配置
            {...{
              ...store.settings,
              menuHeaderRender: undefined,
              route: store.settings.menuData,
              menuData: store.settings.menuData,
              token: store.settings.token,
              loading: store.loading,
              prefixCls: 'my-prefix',
              bgLayoutImgList: [
                {
                  src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
                  left: 85,
                  bottom: 100,
                  height: '303px'
                },
                {
                  src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
                  bottom: -68,
                  right: -45,
                  height: '303px'
                },
                {
                  src: 'https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png',
                  bottom: 0,
                  left: 0,
                  width: '331px'
                }
              ],
              location: {
                pathname: history.location.pathname
              },
              avatarProps: {
                src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
                size: 'small',
                title: store.userStore.name,
                render: (props, dom) => {
                  return (
                    <Dropdown
                      menu={{
                        items: [
                          {
                            key: 'logout',
                            icon: <LogoutOutlined />,
                            onClick: async () => {
                              await authService.logout();
                            },
                            label: '退出登录'
                          }
                        ]
                      }}
                    >
                      {dom}
                    </Dropdown>
                  );
                }
              }
            }}
            footerRender={() => {
              if (store?.settings?.footerRender !== false) {
                return <Footer />;
              } else {
                return <></>;
              }
            }}
            actionsRender={props => {
              return [];
            }}
            headerTitleRender={(logo, title, _) => {
              const defaultDom = (
                <a>
                  {logo}
                  {title}
                </a>
              );
              if (typeof window === 'undefined') return defaultDom;
              if (document.body.clientWidth < 1400) {
                return defaultDom;
              }
              if (_.isMobile) return defaultDom;
              return <>{defaultDom}</>;
            }}
            menuItemRender={(item, dom) => (
              <div
                onClick={() => {
                  history.push(item.path || '/');
                }}
              >
                {dom}
              </div>
            )}
            headerContentRender={() => {
              return <ProBreadcrumb />;
            }}
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
                {/* <RenderContent /> */}
              </ProCard>
            </PageContainer>

            {/* <SettingDrawer
              pathname={pathname}
              enableDarkTheme
              getContainer={(e: any) => {
                if (typeof window === 'undefined') return e;
                return document.getElementById('test-pro-layout');
              }}
              settings={store.settings}
              onSettingChange={changeSetting => {
                setSetting(changeSetting);
              }}
              disableUrlParams={false}
            /> */}
          </ProLayout>
        </ConfigProvider>
      </ProConfigProvider>
    </div>
  );
};

export default inject('store')(observer(Layout));
