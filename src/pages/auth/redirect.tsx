// 原来
import authService from '@/services/auth/authService';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import {PageLoading} from '@ant-design/pro-components';
import {toast} from 'amis-ui';
import {History} from 'history';
import {inject, observer} from 'mobx-react';
import React from 'react';
import {useEffect, useState} from 'react';
import {IMainStore} from '@/stores';
import {Popconfirm} from 'antd';
import _t from '@/services/amis/translate';
import {useHistory} from 'react-router-dom';

// 重构
// import * as React from 'react';
// import axios from 'axios';
// import {toast} from 'amis';
// import {RouteComponentProps} from 'react-router-dom';
// import {withRouter} from 'react-router';
// import {UserOutlined, KeyOutlined} from '@ant-design/icons';
// import {Input, Button, Card} from 'antd';
// import appStore from '@/stores/appStore';
// interface LoginProps extends RouteComponentProps<any> {
//   store: IMainStore;
// }
// @inject('store')
// // @ts-ignore
// @withRouter
// @observer
// export default class LoginCallBack extends React.Component<LoginProps, any> {
//   returnUrl = localStorage.getItem('returnUrl');
//   constructor(props) {
//     super(props);
//     this.state = {
//       mounted: false,
//       loginTimeOut: false
//     };
//   }
//   async componentDidMount() {
//     const history = this.props.history;
//     if (this.state.mounted) {
//       return;
//     }
//     this.setState({...this.state, mounted: true});

//     const isLoggedIn = await authService.isLoggedIn();
//     console.log(
//       '🚀 ~ file: redirect.tsx:31 ~ completeLogin ~ isLoggedIn:',
//       isLoggedIn
//     );
//     if (isLoggedIn) {
//       localStorage.removeItem('returnUrl');
//       history.push(this.returnUrl || '/');
//       return;
//     }
//     await authService.completeLogin();
//     this.props.store.userStore.fetchUserInfo().then(userInfo => {
//       try {
//         if (userInfo) {
//           console.log(
//             '🚀 ~ file: redirect.tsx:43 ~ props.store.userStore.fetchUserInfo ~ userInfo:',
//             userInfo
//           );
//           // UserStore.updateUser(userInfo); // 更新当前用户信息
//           // if (props.store.pages.length == 0) {
//           //   props.store.initPages();
//           // }
//           console.log('monitor: after login fetchServerSideSettings');
//           toast.success(_t('pages.login.success'));
//           localStorage.removeItem('returnUrl');
//           // debugger;
//           history.push(this.returnUrl || '/');
//           alert('222');
//         }
//       } catch (error) {
//         console.log('登录失败：error: ', error);
//         this.setState({...this.state, loginTimeOut: true});
//         Popconfirm({
//           title: 'Confirm',
//           icon: <ExclamationCircleOutlined />,
//           // content: _t('pages.login.loginFaild'),
//           okText: 'Retry',
//           onConfirm: () => {
//             history.push('/');
//           }
//         });
//       }
//     });
//   }
//   RenderText = () => {
//     if (!this.state.loginTimeOut) {
//       return (
//         <div>
//           <PageLoading>
//             <div>Logging in, please wait...</div>
//           </PageLoading>
//         </div>
//       );
//     } else {
//       return (
//         <div>
//           Login timeout, click<a href={this.returnUrl || '/'}>retry</a>。。。
//         </div>
//       );
//     }
//   };
//   render() {
//     const returnUrl = this.returnUrl;
//     return <div>{this.RenderText()}</div>;
//   }
// }

// 原来
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
      console.log(
        '🚀 ~ file: redirect.tsx:31 ~ completeLogin ~ isLoggedIn:',
        isLoggedIn
      );
      if (isLoggedIn) {
        localStorage.removeItem('returnUrl');
        history.push(returnUrl || '/');
        return;
      }
      await authService.completeLogin();
      props.store.userStore.fetchUserInfo().then(userInfo => {
        try {
          if (userInfo) {
            console.log(
              '🚀 ~ file: redirect.tsx:43 ~ props.store.userStore.fetchUserInfo ~ userInfo:',
              userInfo
            );
            // UserStore.updateUser(userInfo); // 更新当前用户信息
            // if (props.store.pages.length == 0) {
            //   props.store.initPages();
            // }
            console.log('monitor: after login fetchServerSideSettings');
            toast.success(_t('pages.login.success'));
            localStorage.removeItem('returnUrl');
            // debugger;
            history.push(returnUrl || '/');
            alert('111');
          }
        } catch (error) {
          console.log('登录失败：error: ', error);
          setState({...state, loginTimeOut: true});
          Popconfirm({
            title: 'Confirm',
            icon: <ExclamationCircleOutlined />,
            // content: _t('pages.login.loginFaild'),
            okText: 'Retry',
            onConfirm: () => {
              history.push('/');
            }
          });
        }
      });
    })();
  }, [history, state]);

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
