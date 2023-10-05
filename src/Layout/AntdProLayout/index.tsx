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
  ProLayout,
  SettingDrawer
} from '@ant-design/pro-components';
import {ConfigProvider, Dropdown} from 'antd';
import React, {Children, FC, useEffect, useState} from 'react';
import {inject, observer} from 'mobx-react';
import {IMainStore} from '@/stores';
import {useHistory, useLocation} from 'react-router';
import authService from '@/services/auth/authService';
import appSettings from '@/services/appsettings';
import ContentRoutes from '@/route/ContentRoutes';
import {treeFind} from '@/utils';
import {i18n} from 'i18n-runtime';
const loginPage = appSettings.loginPage;

const AntdProLayout: FC<{
  store: IMainStore;
}> = props => {
  const {store, children} = props;

  const [settings, setSetting] = useState<ProSettings>();
  //监听配置变化
  useEffect(() => {
    setSetting(store.settings as Partial<ProSettings>);
  }, []);

  const location = useLocation();
  const history = useHistory();
  const [tabIndex, setTabIndex] = useState(0);
  useEffect(() => {
    try {
      //处理默认跳转
      let pathKey = location.pathname as string;
      if (store?.settings?.menuData) {
        const redirectMenu = treeFind(
          store.settings.menuData,
          node => node?.fullPath.toLowerCase() == pathKey.toLowerCase()
        );
        //如果是节点路径，则应该自动跳转
        //解析路由默认跳转
        //尝试从路由节点本身查找redirect 属性
        let redirect = redirectMenu?.redirect;
        if (!redirect) {
          if (redirectMenu?.children && redirectMenu?.children?.length > 0) {
            //使用第一个节点的 路径作为 redirect
            redirect = redirectMenu.children[0]?.fullPath;
          }
        }
        if (redirect) {
          history.push(redirect);
        }
      }
    } catch (error) {
      console.log('onPageChangeerror: ', error);
    }
  }, [location.pathname]);

  //使用 useEffect hook，检查登录状态
  if (typeof document === 'undefined') {
    return <div />;
  }
  return (
    <ProLayout
      tabIndex={tabIndex}
      {...settings}
      // 面包屑
      // itemRender={() => null}
      // breadcrumbRender={false}
      // onPageChange={newlocation => {
      //   history.push(newlocation.pathname);
      // }}
      menuItemRender={(item, dom) => (
        <div
          onClick={() => {
            history.push(item.path);
          }}
        >
          {dom}
        </div>
      )}
      formatMessage={message => {
        console.log('message: ', message);
        return message.defaultMessage ?? i18n(message.id);
      }}
      menu={{
        locale: false,
        defaultOpenAll: true,
        params: {
          userId: store.userStore?.user?.name
        },
        request: async (params: any, defaultMenuData: MenuDataItem[]) => {
          // debugger;
          // const newSettings = await store.reloadSettings();
          return store.settings?.menuData as MenuDataItem[];
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
      //头像旁边的 按钮
      // actionsRender={props => {
      //   if (props.isMobile) return [];
      //   if (typeof window === 'undefined') return [];
      //   return [
      //     <InfoCircleFilled key="InfoCircleFilled" />,
      //     <QuestionCircleFilled key="QuestionCircleFilled" />,
      //     <GithubFilled key="GithubFilled" />
      //   ];
      // }}
      //菜单底部
      // menuFooterRender={props => {
      //   if (props?.collapsed) return undefined;
      //   return (
      //     <div
      //       style={{
      //         textAlign: 'center',
      //         paddingBlockStart: 12
      //       }}
      //     >
      //       <div>© 2021 Made with love</div>
      //       <div>by Ant Design</div>
      //     </div>
      //   );
      // }}
      // onMenuHeaderClick={e => {
      //   history.push('/');
      // }}
    >
      {children}
      {/* <PageContainer
        loading={store.loading}
        subTitle={store.settings?.subTitle}
      >
        <ProCard
          style={{
            minHeight: 800
          }}
        >
          {children}
        </ProCard>
      </PageContainer> */}
      <SettingDrawer
        enableDarkTheme
        getContainer={(e: any) => {
          if (typeof window === 'undefined') return e;
          return document.getElementById('amis-pro-layout');
        }}
        settings={{...settings}}
        onSettingChange={async changedSetting => {
          await store.updateSettings(changedSetting);
          setSetting(s => ({...s, ...changedSetting} as Partial<ProSettings>));
          console.log('changedSetting: ', changedSetting);
        }}
      />
    </ProLayout>
  );
};
// export default AntdProLayout;
export default inject('store')(observer(AntdProLayout));
