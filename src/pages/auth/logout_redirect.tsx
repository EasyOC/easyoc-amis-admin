import authService from '@/services/auth/authService';
import {History} from 'history';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import React from 'react';
import {useEffect, useState} from 'react';

const LoutCallBack: React.FC<{history: History}> = props => {
  const [state, setState] = useState({mounted: false});
  const {history} = props;

  useEffect(() => {
    if (!state.mounted) {
      setState({mounted: true});
      const completeLogout = async () => {
        await authService.completeLogout();

        const {search, pathname} = location;
        // const urlParams = queryString.parse(search);
        /** 此方法会跳转到 redirect 参数所在的位置 */
        // const redirect = urlParams.redirect;
        const loginPage = '/user/login';
        // Note: There may be security issues, please note
        // if (pathname !== loginPage && !redirect) {
        if (pathname !== loginPage) {
          history.push(loginPage);
        }
        // if (!!SKIP_LOGIN_PAGE) {
        //   history.push('/');
        // } else {
        // history.push(LOGIN_PAGE || '/user/login');
        // }
      };
      completeLogout();
    }
  }, [history, state.mounted]);

  return <div>Signing out... </div>;
};

export default observer(LoutCallBack);
