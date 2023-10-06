//TODO: 内容版本管理 组件，需要复用
import AMISComponent from '@/components/AMISComponent';
import React, {useState} from 'react';
import schema from './schema.json';
import {useLocation} from 'react-router-dom';
import {inject, observer} from 'mobx-react';
const SchemaVersions = () => {
  //AMISComponent 组件内信息 执行一些操作
  const location = useLocation();
  console.log('location: ', location);

  // schema.data = {
  //   //传递路由参数等信息
  //   ...props,
  // };
  return (
    <AMISComponent
      schema={schema}
      trackerFn={(a, b) => {
        console.log('Version components tracker', a, b);
      }}
    />
  );
};
export default observer(SchemaVersions);
