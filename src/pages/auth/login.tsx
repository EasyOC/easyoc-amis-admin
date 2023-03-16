import authService from '@/services/auth/authService';
import React from 'react';
import { useEffect } from 'react';

const GoLogin: React.FC = (props) => {
  console.log('login props', props);
  useEffect(() => {
    (async () => {
      await authService.goLogin();
    })();
  });
  return <div>loading..</div>;
};
export default GoLogin;
