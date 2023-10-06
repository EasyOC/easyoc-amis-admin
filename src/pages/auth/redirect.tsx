// 原来
import authService from '@/services/auth/authService';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import {PageLoading} from '@ant-design/pro-components';
import {ConfirmBox, Spinner, alert, confirm, toast} from 'amis-ui';
import {inject, observer} from 'mobx-react';
import React from 'react';
import {useEffect, useState} from 'react';
import {IMainStore} from '@/stores';
import _t from '@/services/amis/translate';
import {useHistory} from 'react-router-dom';
import {Popconfirm} from 'antd';

const LoginCallBack: React.FC<{
  store: IMainStore;
}> = props => {
  const history = useHistory();
  const [state, setState] = useState({mounted: false, loginTimeOut: false});
  const returnUrl = localStorage.getItem('returnUrl');

  useEffect(() => {
    if (state.mounted) {
      return;
    }
    setState({...state, mounted: true});
    (async () => {
      const isLoggedIn = await authService.isLoggedIn();
      //如果用户已完成登录，则不再执行后续逻辑
      if (isLoggedIn) {
        localStorage.removeItem('returnUrl');
        history.push(returnUrl || '/');
        return;
      }
      try {
        await authService.completeLogin();
        var userInfo = await authService.getLocalUserInfo();
        if (userInfo) {
          props.store.userStore.login(userInfo);
          await props.store.loadServerSideSettings();
          toast.success(_t('pages.login.success'));
          localStorage.removeItem('returnUrl');
          history.push(returnUrl || '/');
        }
      } catch (error) {
        console.log('登录失败：error: ', error);
        setState({...state, loginTimeOut: true});

        const result = await confirm('login faild click ok to retry.', 'Faild');
        console.log('result: ', result);

        history.push('/');
        //  confirm({
        //   title: 'Confirm',
        //   icon: <ExclamationCircleOutlined />,
        //   okText: 'Retry',
        //   onConfirm: () => {
        //     history.push('/');
        //   }
        // });
      }
    })();
  }, [history, state]);

  const RenderText = () => {
    if (!state.loginTimeOut) {
      return (
        <div>
          <Spinner overlay>
            <div>Logging in, please wait...</div>
          </Spinner>
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
export default inject('store')(observer(LoginCallBack));
