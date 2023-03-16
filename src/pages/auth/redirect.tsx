import { getUserInfo } from '@/services/auth';
import authService from '@/services/auth/authService';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { message, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { history, useIntl, useModel } from '@umijs/max';
const LoginCallBack: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [state, setState] = useState({ mounted: false, loginTimeOut: false });
  const redirect = localStorage.getItem('returnUrl');
  const intl = useIntl();

  useEffect(() => {
    (async () => {
      const isLoggedIn = await authService.isLoggedIn();
      const returnUrl = localStorage.getItem('returnUrl');
      if (isLoggedIn) {
        localStorage.removeItem('returnUrl');
        history.push(returnUrl || '/');
        return;
      }
      const user = await authService.completeLogin();
      console.log('res: ', user);
      try {
        const userInfo = await getUserInfo(user);
        console.log('userInfo: ', userInfo);
        if (userInfo) {
          const serverSideSettings = await initialState?.fetchServerSideSettings?.(userInfo);
          console.log('monitor: after login fetchServerSideSettings');
          await setInitialState((s) => ({
            ...s,
            currentUser: userInfo,
            serverSideSettings: serverSideSettings,
            settings: serverSideSettings?.siteSettingsData,
          }));
          message.success(
            intl.formatMessage({ id: 'pages.login.success', defaultMessage: '登录成功' }),
          );
          //;
          localStorage.removeItem('returnUrl');
          history.push(returnUrl || '/');
        }
      } catch (error) {
        console.log('登录失败：error: ', error);
        setState({ ...state, loginTimeOut: true });
        Modal.confirm({
          title: 'Confirm',
          icon: <ExclamationCircleOutlined />,
          content: intl.formatMessage({
            id: 'pages.login.loginFaild',
            defaultMessage: 'Login Faild',
          }),
          okText: 'Retry',
          onOk: () => {
            history.push('/');
          },
        });
      }
    })();
  }, [initialState, intl, redirect, setInitialState, state]);

  const RenderText = () => {
    if (!state.loginTimeOut) {
      return <div>Logging in, please wait...</div>;
    } else {
      return (
        <div>
          Login timeout, click<a href={redirect || '/'}>retry</a>。。。
        </div>
      );
    }
  };

  return <div>{RenderText()}</div>;
};

export default LoginCallBack;
