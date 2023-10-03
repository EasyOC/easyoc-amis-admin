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
import appSettings from '@/services/appsettings';
import ContentRoutes from '@/route/ContentRoutes';
import {treeFind} from '@/utils';
const loginPage = appSettings.loginPage;

const AntdProLayout: FC<{
  store: IMainStore;
}> = props => {
  const {store} = props;

  // const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
  //   ...(store.settings as Partial<ProSettings>),
  //   navTheme: 'light',
  //   contentWidth: 'Fluid',
  //   colorPrimary: '#1677FF',
  //   siderMenuType: 'sub',
  //   fixSiderbar: true,
  //   layout: 'mix',
  //   // "title": "SalesPortal",
  //   // "footerRender": false,
  //   fixedHeader: false,
  //   // "fixSiderbar": true,
  //   // pwa: true,
  //   // logo: '/media/siteassets/jz-logo.svg',
  //   // loginBg: '/media/siteassets/loginbg.png',
  //   // locale: {
  //   //   default: 'zh-CN'
  //   // },
  //   splitMenus: true
  // });

  const history = useHistory();

  // useEffect(() => {
  //   setSetting(s => ({...s, ...store.settings} as Partial<ProSettings>));
  // }, [store, history, children]);

  //使用 useEffect hook，检查登录状态
  const layoutLocaion = useLocation();
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
            breadcrumbRender={false}
            {...store.settings}
            location={layoutLocaion}
            onPageChange={newlocation => {
              //处理默认跳转
              let pathKey = newlocation?.pathname as string;
              if (store.settings.menuData) {
                const redirectMenu = treeFind(
                  store.settings.menuData,
                  node => node.fullPath.toLowerCase() == pathKey.toLowerCase()
                );
                //如果是节点路径，则应该自动跳转
                if (
                  redirectMenu?.children &&
                  redirectMenu?.children?.length > 0
                ) {
                  //解析路由默认跳转
                  //尝试从路由节点本身查找redirect 属性
                  let redirect = redirectMenu?.redirect;
                  //@ts-ignore
                  if (!redirect) {
                    //@ts-ignore 尝试从子节点查找 redirect 属性
                    redirect = redirectMenu.children.find(
                      x => x.redirect
                    )?.redirect;
                    //使用第一个节点的 路径作为 redirect
                    if (!redirect) {
                      //@ts-ignore
                      redirect = redirectMenu.children[0].fullPath;
                    }
                  }
                  if (redirect) {
                    history.push(redirect);
                  }
                }
              }
            }}
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
            onMenuHeaderClick={e => history.push('/')}
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
            <ContentRoutes />
            {/* <PageContainer
              loading={store.loading}
              subTitle={store.settings?.subTitle}
            >
              <ProCard
                style={{
                  height: '200vh',
                  minHeight: 800
                }}
              >
                <ContentRoutes />
              </ProCard>
            </PageContainer> */}
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
