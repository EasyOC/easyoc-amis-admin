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
import {mustStartsWith} from '@/utils';

const AntdProLayout: FC<{store: IMainStore}> = props => {
  const {store, children} = props;
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
    ...(store.settings as Partial<ProSettings>),
    fixSiderbar: true,
    layout: 'mix',
    splitMenus: true
  });
  const history = useHistory();
  const RenderContent = () => {
    let routes: any = [];
    let ContextPath = appSettings.publicPath;

    [routeConfig].forEach((routeItem: any) => {
      const subFolder = ContextPath == '/' ? '' : ContextPath;
      routeItem &&
        eachTree(routeItem, (item: any) => {
          if (item.path) {
            routes.push(
              <Route
                key={item.name}
                path={mustStartsWith(item.path, '/')}
                render={(props: any) => <item.component {...props} />}
              />
            );
          }
        });
    });
    return <Switch>{routes}</Switch>;
    {
      /* return  routes.find(
      x =>
        x.props.path?.toLowerCase() == history.location.pathname.toLowerCase()
    ); */
    }
  };
  useEffect(() => {
    setSetting({...setSetting});
  }, [history, store.settings]);

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
            {...store.settings}
            route={defaultProps.route}
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
              title: '七妮妮',
              render: (_props, dom) => {
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
            {...settings}
          >
            {' '}
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
                <RenderContent />
              </ProCard>
            </PageContainer>
            <SettingDrawer
              pathname={history.location.pathname}
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
export default inject('store')(observer(AntdProLayout));
