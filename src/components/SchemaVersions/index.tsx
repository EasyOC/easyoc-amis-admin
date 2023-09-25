//TODO: 内容版本管理 组件，需要复用
import AMISComponent from '@/components/AMISComponent';
import React, {useState} from 'react';
import schema from './schema.json';
import {useLocation} from 'react-router-dom';
export default props => {
  //AMISComponent 组件内信息 执行一些操作
  const [amisScope, setAmisScope] = useState();
  const location = useLocation();
  console.log('location: ', location);

  // schema.data = {
  //   //传递路由参数等信息
  //   ...props,
  // };
  return (
    <AMISComponent
      schema={schema}
      amisMounted={scope => setAmisScope(scope)}
      trackerFn={(a, b) => {
        console.log('Version components tracker', a, b);
      }}
    />
  );
};
