import {
  CaretDownFilled,
  DoubleRightOutlined,
  GithubFilled,
  InfoCircleFilled,
  LogoutOutlined,
  PlusCircleFilled,
  QuestionCircleFilled,
  SearchOutlined
} from '@ant-design/icons';
import type {ProSettings} from '@ant-design/pro-components';
import {
  PageContainer,
  ProCard,
  ProConfigProvider,
  ProLayout,
  SettingDrawer
} from '@ant-design/pro-components';
import {css} from '@emotion/css';
import {
  Button,
  ConfigProvider,
  Divider,
  Dropdown,
  Input,
  Popover,
  theme
} from 'antd';
import React, {FC, useEffect, useState} from 'react';
import defaultProps from './ProLayoutProps';
import Hello from '@/pages/Hello';
import {eachTree} from 'amis';
import {Route, useHistory} from 'react-router';
import appSettings from '@/services/appSettings';
import {getSiteGlobalSettings} from '@/services/amis/siteSettings';
import {getUserInfo} from '@/services/auth';
import {EocInitialState} from '@/types/src/SiteGlobalSettings';
import authService from '@/services/auth/authService';
import {deepMerge} from '@/utils';
import {CurrentUser} from '@/types/src/CurrentUser';
import queryString from 'query-string';
import {routerPathName} from '@/utils/urlHelper';
import {IMainStore} from '@/stores';
import {inject, observer} from 'mobx-react';
let ContextPath = appSettings.publicPath;
const RenderContent = () => {
  let routes: any = [];

  [defaultProps.route].forEach((root: any) => {
    root.routes &&
      eachTree(root.routes, (item: any) => {
        if (item.path && item.component) {
          routes.push(
            <Route
              key={routes.length + 1}
              path={
                item.path[0] === '/'
                  ? ContextPath + item.path
                  : `${ContextPath}/${item.path}`
              }
              render={(props: any) => <item.component {...props} />}
            />
          );
        }
      });
  });
  return routes;
};
const loginPage = appSettings.loginPage;

const WITHELIST = [
  loginPage,
  '/auth/login',
  '/auth/redirect',
  '/auth/logout_redirect'
];

const Layout: FC<{store: IMainStore; history: History}> = props => {
  const {store} = props;
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
    fixSiderbar: true,
    layout: 'mix',
    splitMenus: true
  });
  const history = useHistory();
  const showLayout = () => {
    const currentPath = routerPathName();
    return !WITHELIST.includes(currentPath);
  };

  const [pathname, setPathname] = useState('/list/sub-page/sub-sub-page1');
  const [num, setNum] = useState(40);
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
        <ConfigProvider
          getTargetContainer={() => {
            return document.getElementById('test-pro-layout') || document.body;
          }}
        >
          <ProLayout
            loading={store.loading}
            prefixCls="my-prefix"
            bgLayoutImgList={[
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
            ]}
            {...defaultProps}
            location={{
              pathname
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
              title: '七妮妮',
              render: (props, dom) => {
                return (
                  <Dropdown
                    menu={{
                      items: [
                        {
                          key: 'logout',
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
                  setPathname(item.path || '/welcome');
                }}
              >
                {dom}
              </div>
            )}
            {...settings}
          >
            <PageContainer
              token={{
                paddingInlinePageContainerContent: num
              }}
              subTitle="简单的描述"
            >
              <ProCard
                style={{
                  height: '200vh',
                  minHeight: 800
                }}
              >
                <RenderContent></RenderContent>
              </ProCard>
            </PageContainer>

            <SettingDrawer
              pathname={pathname}
              enableDarkTheme
              getContainer={(e: any) => {
                if (typeof window === 'undefined') return e;
                return document.getElementById('test-pro-layout');
              }}
              settings={settings}
              onSettingChange={changeSetting => {
                setSetting(changeSetting);
              }}
              disableUrlParams={false}
            />
          </ProLayout>
        </ConfigProvider>
      </ProConfigProvider>
    </div>
  );
};

export default inject('store')(observer(Layout));
