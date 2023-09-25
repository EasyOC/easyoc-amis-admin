import AMISComponent from '@/components/AMISComponent';
import {set} from 'lodash';
import defaultJsonSchema from './menus.json';
import {IMainStore} from '@/stores';
import React from 'react';
import {inject, observer} from 'mobx-react';
const Menus: React.FC<{store: IMainStore}> = ({store}) => {
  //注入要调用的 js函数
  set(defaultJsonSchema, 'data.reloadMenus', () => store?.reloadSettings?.());
  return <AMISComponent schema={defaultJsonSchema} />;
};
export default inject('store')(observer(Menus));
