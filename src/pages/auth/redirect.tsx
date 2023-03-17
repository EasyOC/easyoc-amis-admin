import { getUserInfo } from '@/services/auth';
import authService from '@/services/auth/authService';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { toast } from 'amis-ui';
import { Modal } from 'antd';

import { History } from 'history';
import { translate } from 'i18n-runtime';
import { observer } from 'mobx-react';
import React from 'react';
import { useEffect, useState } from 'react';
  

const LoginCallBack: React.FC<{ history: History }> = (props) => {
  const { history}=props
  const [state, setState] = useState({ mounted: false, loginTimeOut: false });
  const redirect = localStorage.getItem('returnUrl');
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
          console.log('monitor: after login fetchServerSideSettings');
          
          toast.success(
            translate('pages.login.success'),
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
          content: translate('pages.login.loginFaild') ,
          okText: 'Retry',
          onOk: () => {
            history.push('/');
          },
        });
      }
    })();
  }, [  redirect,  state]);

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

export default observer(LoginCallBack);
