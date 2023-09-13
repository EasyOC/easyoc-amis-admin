import authService from '@/services/auth/authService';
import {LoginForm, LoginFormPage} from '@ant-design/pro-components';
import React from 'react';
import {useEffect} from 'react';

const GoLogin: React.FC = props => {
  console.log('login props', props);
  
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
};
export default GoLogin;
