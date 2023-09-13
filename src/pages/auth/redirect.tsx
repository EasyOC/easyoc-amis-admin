import authService from '@/services/auth/authService';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import {PageLoading} from '@ant-design/pro-components';
import {toast} from 'amis-ui';

import {History} from 'history';
import {inject, observer} from 'mobx-react';
import React from 'react';
import {useEffect, useState} from 'react';
import {IMainStore} from '@/stores';
import confirm from 'antd/es/modal/confirm';
import _t from '@/services/amis/translate';
import {useHistory} from 'react-router-dom';

const LoginCallBack: React.FC<{
  store: IMainStore;
}> = props => {
  const {history} = useHistory();
  const [state, setState] = useState({mounted: false, loginTimeOut: false});
  const returnUrl = localStorage.getItem('returnUrl');
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
        const userInfo = await props.store.userStore.fetchUserInfo();
        if (userInfo) {
          // UserStore.updateUser(userInfo); // 更新当前用户信息
          // if (props.store.pages.length == 0) {
          //   props.store.initPages();
          // }
          console.log('monitor: after login fetchServerSideSettings');
          toast.success(_t('pages.login.success'));
          localStorage.removeItem('returnUrl');
          history.push(returnUrl || '/');
        }
      } catch (error) {
        console.log('登录失败：error: ', error);
        setState({...state, loginTimeOut: true});
        confirm({
          title: 'Confirm',
          icon: <ExclamationCircleOutlined />,
          content: _t('pages.login.loginFaild'),
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
export default inject('store')(observer(LoginCallBack));
