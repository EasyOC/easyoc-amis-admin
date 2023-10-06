import appSettings from '@/services/appsettings';
import authService from '@/services/auth/authService';
import {IMainStore} from '@/stores';
import {inject, observer} from 'mobx-react';
import React from 'react';
import {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';

function LoutCallBack(props: {store: IMainStore}) {
  console.log('props: ', props);

  const [state, setState] = useState({mounted: false});
  const history = useHistory();

  useEffect(() => {
    if (!state.mounted) {
      setState({mounted: true});
      const completeLogout = async () => {
        await authService.completeLogout();
        //重置登录信息
        props.store.userStore.afterLogout();
        await props.store.loadServerSideSettings();
        const {pathname} = location;
        // const urlParams = queryString.parse(search);
        /** 此方法会跳转到 redirect 参数所在的位置 */
        // const redirect = urlParams.redirect;
        const loginPage = appSettings.loginPage;
        // Note: There may be security issues, please note
        if (pathname !== loginPage) {
          history.push(loginPage);
        }
      };
      completeLogout();
    }
  }, [history, state.mounted]);

  return <div>Signing out... </div>;
}

export default inject('store')(observer(LoutCallBack));
