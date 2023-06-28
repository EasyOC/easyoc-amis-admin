import authService from '@/services/auth/authService';
import {IMainStore} from '@/stores';
import {LoginForm, LoginFormPage} from '@ant-design/pro-components';
import {inject, observer} from 'mobx-react';
import React from 'react';

function Lgoin() {
  const goLogin = async () => {
    await authService.goLogin('/');
  };
  // useEffect(() => {
  //   goLogin();
  // });
  return (
    <div>
      <LoginForm onClick={goLogin}>
        <div style={{height: '40vh'}}></div>
        Click to start auth
      </LoginForm>
    </div>
  );
}
export default Lgoin;
