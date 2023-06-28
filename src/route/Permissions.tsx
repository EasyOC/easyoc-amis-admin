import {checkLogin} from '@/services/permissions';
import {IMainStore} from '@/stores';
import {History} from 'history';
import React, {useEffect} from 'react';

//定义一个 react函数式组件，它可以包含其它组件//导出默认的组件
export default (props: {
  children: React.ReactNode;
  history: History;
  stroe: IMainStore;
}) => {
  //使用 useEffect hook，检查登录状态
  useEffect(() => {
    const init = async () => {
      if (await checkLogin(props.history)) {
        props.stroe.fetchPages();
      }
    };
    init();
  }, [props.history]);

  //返回包含子组件的 JSX
  return <>{props.children}</>;
};
