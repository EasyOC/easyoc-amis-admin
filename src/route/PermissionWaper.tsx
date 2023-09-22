import {checkLogin} from '@/services/permissions';
import {IMainStore} from '@/stores';
import {inject, observer} from 'mobx-react';
import React, {useEffect} from 'react';
import {History} from 'history';
import {useHistory} from 'react-router-dom';

//定义一个 react函数式组件，它可以包含其它组件//导出默认的组件
const PermissionWaper: React.FC<{
  children: React.ReactNode;
}> = (props: {store: IMainStore} & any) => {
  //使用 useEffect hook，检查登录状态
  const history = useHistory();
  useEffect(() => {
    const init = async () => {
      console.log('history', history);

      // if (await checkLogin(history)) {
      //   // props.store.fetchPages();
      // }
    };
    init();
  }, [history]);

  //返回包含子组件的 JSX
  return <>{props.children}</>;
};
export default inject('store')(observer(PermissionWaper));
