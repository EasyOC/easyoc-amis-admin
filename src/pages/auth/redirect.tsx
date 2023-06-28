import authService from '@/services/auth/authService';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import {PageLoading} from '@ant-design/pro-components';
import {toast} from 'amis-ui';

import {History} from 'history';
import {translate} from 'i18n-runtime';
import {inject, observer} from 'mobx-react';
import React from 'react';
import {useEffect, useState} from 'react';
import {IMainStore} from '@/stores';
import confirm from 'antd/es/modal/confirm';

const LoginCallBack: React.FC<{
  history: History;
  store: IMainStore;
}> = props => {
  const {history} = props;
  const [state, setState] = useState({mounted: false, loginTimeOut: false});
  const returnUrl = localStorage.getItem('returnUrl');
  debugger;
  useEffect(() => {
    if (state.mounted) {
      return;
    }
    setState({...state, mounted: true});

    const completeLogin = async () => {
      const isLoggedIn = await authService.isLoggedIn();
      if (isLoggedIn) {
        localStorage.removeItem('returnUrl');
        history.push(returnUrl || '/');
        return;
      }
      await authService.completeLogin();
      try {
        console.log('props: ', props);
        debugger;
        const userInfo = await props.store.userStore.fetchUserInfo();
        console.log('res: ', userInfo);
        console.log('userInfo: ', userInfo);
        if (userInfo) {
          // UserStore.updateUser(userInfo); // 更新当前用户信息
          // if (props.store.pages.length == 0) {
          //   props.store.initPages();
          // }
          console.log('monitor: after login fetchServerSideSettings');
          toast.success(translate('pages.login.success'));
          localStorage.removeItem('returnUrl');
          history.push(returnUrl || '/');
        }
      } catch (error) {
        console.log('登录失败：error: ', error);
        setState({...state, loginTimeOut: true});
        confirm({
          title: 'Confirm',
          icon: <ExclamationCircleOutlined />,
          content: translate('pages.login.loginFaild'),
          okText: 'Retry',
          onOk: () => {
            history.push('/');
          }
        });
      }
    };
    completeLogin();
  }, [state]);

  const RenderText = () => {
    if (!state.loginTimeOut) {
      return (
        <div>
          <PageLoading>
            <div>Logging in, please wait...</div>
          </PageLoading>
        </div>
      );
    } else {
      return (
        <div>
          Login timeout, click<a href={returnUrl || '/'}>retry</a>。。。
        </div>
      );
    }
  };

  return <div>{RenderText()}</div>;
};
// export default LoginCallBack;
export default inject('MainStore')(observer(LoginCallBack));
