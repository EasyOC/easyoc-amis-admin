import {
  GithubFilled,
  HighlightOutlined,
  InfoCircleFilled,
  LogoutOutlined,
  QuestionCircleFilled
} from '@ant-design/icons';
import type {ProSettings} from '@ant-design/pro-components';
import {ProLayout, SettingDrawer} from '@ant-design/pro-components';
import {Dropdown, FloatButton, Select} from 'antd';
import React, {FC, useEffect, useState} from 'react';
import {inject, observer} from 'mobx-react';
import {IMainStore} from '@/stores';
import {useHistory, useLocation} from 'react-router';
import authService from '@/services/auth/authService';
import {treeFind} from '@/utils';
import {i18n, setLocale} from 'i18n-runtime';
import './styles/index.less';
import {setAmisEnvTheme} from '@/services/amis/AmisEnv';
import {EocLayoutSettings} from '@/types/src/SiteGlobalSettings';

const themes = [
  {
    label: '云舍',
    ns: 'cxd-',
    value: 'cxd'
  },
  {
    label: '仿 AntD',
    ns: 'antd-',
    value: 'antd'
  },
  {
    label: 'ang',
    ns: 'a-',
    value: 'ang'
  }
];

const locales = [
  {
    label: '中文',
    value: 'zh-CN'
  },

  {
    label: 'English',
    value: 'en-US'
  }
];

const AntdProLayout: FC<{
  store: IMainStore;
  [key: string]: any;
}> = props => {
  const {store, children} = props;

  const [settings, setSetting] = useState<Partial<EocLayoutSettings>>(
    store.settings
  );
  //监听配置变化
  useEffect(() => {
    setSetting(store.settings);
  }, [store.settings]);

  const location = useLocation();
  const history = useHistory();
  //使用 useEffect hook，检查登录状态
  if (typeof document === 'undefined') {
    return <div />;
  }
  return (
    <div className="app-wrapper">
      <ProLayout
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
          return message.defaultMessage ?? i18n(message.id);
        }}
        route={{children: store.settings.menuData}}
        // menu={{
        //   locale: false,
        //   defaultOpenAll: true,
        //   params: {
        //     userId: store.userStore?.user?.name
        //   },
        //   request: async (params: any, defaultMenuData: MenuDataItem[]) => {
        //     // debugger;
        //     // const newSettings = await store.reloadSettings();
        //     return store.settings?.menuData as MenuDataItem[];
        //   }
        // }}
        avatarProps={{
          src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
          size: 'small',
          title: store.userStore?.name,
          render: (_props, dom) => {
            const menuItems = [];
            if (store.userStore.isAdmin) {
              menuItems.push({
                key: 'themeSettings',
                onClick: async () => {
                  setSetting(s => ({...s, showSettingsDrawer: true}));
                  console.log('store.settings: ', store.settings);
                },
                icon: <HighlightOutlined rev={undefined} />,
                label: '主题设置'
              });
            }
            menuItems.push({
              key: 'logout',
              onClick: async () => {
                await authService.logout();
              },
              //@ts-ignore
              icon: <LogoutOutlined />,
              label: '退出登录'
            });
            return (
              <Dropdown
                menu={{
                  items: menuItems
                }}
              >
                {dom}
              </Dropdown>
            );
          }
        }}
        //头像旁边的 按钮
        actionsRender={props => {
          if (props.isMobile) return [];
          if (typeof window === 'undefined') return [];
          return [
            // <InfoCircleFilled key="InfoCircleFilled" />,
            // <QuestionCircleFilled key="QuestionCircleFilled" />,
            // <GithubFilled key="GithubFilled" />,

            <Select
              style={{width: '100px'}}
              value={store.settings.amis?.locale}
              options={locales}
              onChange={locale => {
                console.log('locale: ', locale);
                // store.updateSettings({...store.settings, amis: {locale}});
                setLocale(locale);
                window.location.reload();
              }}
            />,
            <Select
              value={store.amisEnv.theme}
              options={themes}
              onChange={theme => {
                console.log('theme: ', theme);
                setAmisEnvTheme(theme);
                window.location.reload();
                // store.updateEnv({theme});
                // document
                //   .querySelector('body')
                //   ?.classList[
                //     (theme as any).value === 'dark' ? 'add' : 'remove'
                //   ]('dark');
              }}
            />
          ];
        }}
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
        <FloatButton.BackTop style={{right: '2px'}} />
        {store.userStore.isAdmin ? (
          <SettingDrawer
            getContainer={(e: any) => {
              if (typeof window === 'undefined') return e;
              return document.getElementById('amis-pro-layout');
            }}
            onCollapseChange={val => {
              setSetting(s => ({...s, showSettingsDrawer: val}));
              // await store.updateSettings({showSettingsDrawer: val});
            }}
            collapse={settings?.showSettingsDrawer}
            settings={{...(settings as any)}}
            onSettingChange={async changedSetting => {
              await store.updateSettings(changedSetting);
              setSetting(
                s => ({...s, ...changedSetting} as Partial<ProSettings>)
              );
              console.log('changedSetting: ', changedSetting);
            }}
          />
        ) : (
          <></>
        )}
      </ProLayout>
    </div>
  );
};
// export default AntdProLayout;
export default inject('store')(observer(AntdProLayout));
