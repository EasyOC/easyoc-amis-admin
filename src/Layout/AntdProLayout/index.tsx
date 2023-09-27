import {
  GithubFilled,
  InfoCircleFilled,
  LogoutOutlined,
  QuestionCircleFilled
} from '@ant-design/icons';
import type {MenuDataItem, ProSettings} from '@ant-design/pro-components';
import {
  PageContainer,
  ProCard,
  ProConfigProvider,
  ProLayout
} from '@ant-design/pro-components';
import {ConfigProvider, Dropdown} from 'antd';
import React, {FC, useEffect, useState} from 'react';
import {inject, observer} from 'mobx-react';
import {IMainStore} from '@/stores';
import {useHistory, useLocation} from 'react-router';
import authService from '@/services/auth/authService';
import {localPath, routerPathName} from '@/utils/urlHelper';
import appSettings from '@/services/appsettings';
import queryString from 'query-string';
import RootRoute from '@/route';
const loginPage = appSettings.loginPage;

const WITHELIST = [
  loginPage,
  '/auth/login',
  '/auth/redirect',
  '/auth/logout_redirect'
];

const AntdProLayout: FC<{
  store: IMainStore;
}> = props => {
  const {store, children} = props;

  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
    ...(store.settings as Partial<ProSettings>),
    fixSiderbar: true,
    layout: 'mix',
    splitMenus: true
  });

  const history = useHistory();

  useEffect(() => {
    setSetting(s => ({...s, ...store.settings} as Partial<ProSettings>));
  }, [store, history, children]);

  //使用 useEffect hook，检查登录状态
  const location = useLocation();
  useEffect(() => {
    const {search} = location;
    (async () => {
      store.userStore.isAuthenticated = await authService.isLoggedIn();
      if (!store.userStore.isAuthenticated) {
        const currentPath = routerPathName();
        if (!WITHELIST.includes(currentPath)) {
          store.loading = false;
          let query = queryString.parse(search) as any;
          let redirect = currentPath + (search || '').toLowerCase();
          if (query.redirect) {
            redirect = query.redirect;
          }
          history.push(loginPage + '?redirect=' + redirect);
        }
      }
    })();
  }, [history, location]);

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
      <ProConfigProvider>
        <ConfigProvider
          getTargetContainer={() => {
            return document.getElementById('amis-pro-layout') || document.body;
          }}
        >
          <ProLayout
            {...settings}
            // locale={currentLocale()}
            // formatMessage={msg => {
            //   const result = i18n(msg.id);
            //   return result == msg.id ? msg.defaultMessage || msg.id : result;
            // }}
            // route={defaultProps.route}
            // route={route}
            // prefixCls="my-prefix"
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
            // onPageChange={newlocation => {
            //   history.push(newlocation.pathname);
            // }}
            // token={{
            //   header: {
            //     colorBgMenuItemSelected: 'rgba(0,0,0,0.04)'
            //   }
            // }}
            // siderMenuType="group"
            menu={{
              // collapsedShowGroupTitle: false,
              // defaultOpenAll: true,
              // hideMenuWhenCollapsed: true,
              // ignoreFlatMenu: true,
              // 每当 initialState?.currentUser?.userid 发生修改时重新执行 request
              params: {
                userId: store.userStore?.user?.name
              },
              // locale: true,
              //Menu 只是 menu ，不要妄想操作 路由。。,屎山代码。。堆在这里不要动，留个纪念
              //动态Menu可以指定一个参数路由
              // 如何动态创建菜单？后台加载🧐[问题] #9920
              //https://github.com/ant-design/ant-design-pro/issues/9920
              request: async (params: any, defaultMenuData: MenuDataItem[]) => {
                return store.settings?.menuData;
              }
            }}
            avatarProps={{
              src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
              size: 'small',
              title: store.userStore?.name,
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
          >
            <PageContainer
              loading={store.loading}
              subTitle={store.settings?.subTitle}
            >
              <ProCard
                style={{
                  height: '200vh',
                  minHeight: 800
                }}
              >
                {/* {route} */}
                {/* <RenderContent /> */}
                <RootRoute store={store}></RootRoute>
              </ProCard>
            </PageContainer>
            {/* <SettingDrawer
              enableDarkTheme
              getContainer={(e: any) => {
                if (typeof window === 'undefined') return e;
                return document.getElementById('amis-pro-layout');
              }}
              settings={store.settings as any}
              onSettingChange={changeSetting => {
                merge(store.settings, changeSetting);
              }}
            /> */}
          </ProLayout>
        </ConfigProvider>
      </ProConfigProvider>
    </div>
  );
};
// export default AntdProLayout;
export default inject('store')(observer(AntdProLayout));
