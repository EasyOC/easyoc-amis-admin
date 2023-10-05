import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
  HighlightOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import {useEmotionCss} from '@ant-design/use-emotion-css';
import {Avatar, Modal, Spin} from 'antd';
import {setAlpha} from '@ant-design/pro-components';
import type {MenuInfo} from 'rc-menu/lib/interface';
import React, {useCallback} from 'react';
import HeaderDropdown from '../HeaderDropdown';
import confirm from 'antd/es/modal/confirm';
import authService from '@/services/auth/authService';
import {i18n} from 'i18n-runtime';
import {IMainStore} from '@/stores';

export type GlobalHeaderRightProps = {
  menu?: boolean;
  store: IMainStore;
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({menu, store}) => {
  const intl = {
    formatMessage: (message: {id: string; defaultMessage?: string}) => {
      return i18n(message.id);
    }
  };

  /**
   * 退出登录，并且将当前的 url 保存
   */
  const loginOut = () => {
    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      title: intl.formatMessage({
        id: 'component.account.logout',
        defaultMessage: '退出登录'
      }),
      content: intl.formatMessage({
        id: 'component.account.logoutMessage',
        defaultMessage: '是否确认退出系统？'
      }),
      // cancelText: '取消',
      // okText: '确认',
      onOk: async () => {
        await authService.goLogin();
      }
    });
  };
  const actionClassName = useEmotionCss(({token}) => {
    return {
      'display': 'flex',
      'height': '48px',
      'marginLeft': 'auto',
      'overflow': 'hidden',
      'alignItems': 'center',
      'padding': '0 8px',
      'cursor': 'pointer',
      'borderRadius': token.borderRadius,
      '&:hover': {
        backgroundColor: token.colorBgTextHover
      }
    };
  });
  const avatarClassName = useEmotionCss(({token}) => {
    return {
      marginRight: '8px',
      color: token.colorPrimary,
      verticalAlign: 'top',
      background: setAlpha(token.colorBgContainer, 0.85),
      [`@media only screen and (max-width: ${token.screenMD}px)`]: {
        margin: 0
      }
    };
  });
  const noneAvatarClassName = useEmotionCss(({token}) => {
    return {
      display: 'flex',
      height: '48px',
      marginLeft: 'auto',
      color: '#fff',
      overflow: 'hidden',
      alignItems: 'center',
      padding: '0 8px',
      cursor: 'pointer',
      borderRadius: token.borderRadius
    };
  });
  const nameClassName = useEmotionCss(({token}) => {
    return {
      width: '70px',
      height: '48px',
      color: '#fff',
      overflow: 'hidden',
      lineHeight: '48px',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      [`@media only screen and (max-width: ${token.screenMD}px)`]: {
        display: 'none'
      }
    };
  });
  const initialState = store.settings;
  const onMenuClick = useCallback(
    async (event: MenuInfo) => {
      const {key} = event;
      switch (key) {
        case 'logout':
          loginOut();
          return;
        case 'themeSettings':
          await store.updateSettings({showSettingsDrawer: true});
          return;
      }
      // history.push(`/account/${key}`);
    },
    [initialState]
  );

  const loading = (
    <span className={actionClassName}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const currentUser = store.userStore.user;

  if (!currentUser || !currentUser.name) {
    return loading;
  }

  const menuItems = [
    ...(menu
      ? [
          {
            key: 'center',
            icon: <UserOutlined />,
            label: '个人中心'
          },
          {
            key: 'settings',
            icon: <SettingOutlined />,
            label: '个人设置'
          },
          {
            type: 'divider' as const
          }
        ]
      : []),
    ...(currentUser.roles?.includes('Administrator')
      ? [
          {
            key: 'themeSettings',
            icon: <HighlightOutlined />,
            label: '主题设置'
          }
        ]
      : []),
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录'
    }
  ];

  return (
    <HeaderDropdown
      menu={{
        selectedKeys: [],
        onClick: onMenuClick,
        items: menuItems
      }}
    >
      <span
        {...(store.settings?.token?.header?.colorTextRightActionsItem
          ? {
              style: {
                color: store.settings?.token?.header?.colorTextRightActionsItem
              }
            }
          : {})}
        className={actionClassName}
      >
        <>
          {currentUser?.avatar ? (
            <Avatar
              size="small"
              className={avatarClassName}
              src={currentUser?.avatar}
              alt="avatar"
            />
          ) : (
            <UserOutlined className={noneAvatarClassName} />
          )}
          <span className={`${nameClassName} anticon`}>
            {currentUser?.name}
          </span>
        </>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
