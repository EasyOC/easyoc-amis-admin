import authService from '@/services/auth/authService';
import { useEffect, useState } from 'react';

const LoutCallBack: React.FC = () => {
  const [state, setState] = useState({ mounted: false });

  const { initialState, setInitialState } = useModel('@@initialState');

  useEffect(() => {
    console.log('initialState: ', initialState);
    if (!state.mounted)
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      (async () => {
        await authService.completeLogout();
        setInitialState((s) => ({ ...s, currentUser: undefined, serverSideSettings: undefined }));

        const { search, pathname } = location;
        // const urlParams = queryString.parse(search);
        /** 此方法会跳转到 redirect 参数所在的位置 */
        // const redirect = urlParams.redirect;
        const loginPage = LOGIN_PAGE || '/user/login';
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
      })();
    setState({ mounted: true });
  }, [initialState, state.mounted]);

  return <div>Signing out... </div>;
};

export default LoutCallBack;
