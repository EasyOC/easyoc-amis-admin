import React, {useEffect} from 'react';
import {Provider} from 'mobx-react';
import {IMainStore} from './stores/index';
import RootRoute from './route/index';
import {extendLocale} from 'amis-core';
import zhCN from './locales/zh-CN';
import enUS from './locales/en-US';
import '@/services/amis/AmisExt';

extendLocale('zh-CN', zhCN);
extendLocale('en-US', enUS);

export default () => {
  const store = new IMainStore();

  useEffect(() => {
    if (!store.settingsLoaded && !store.settingsLoading) {
      store.loadServerSideSettings();
    }
  }, []); // 仅在组件挂载时运行
  return (
    <Provider store={store}>
      <RootRoute store={store} />
    </Provider>
  );
};
