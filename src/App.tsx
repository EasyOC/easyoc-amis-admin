import React, {useEffect} from 'react';
import {Provider} from 'mobx-react';
import {IMainStore} from './stores/index';
import RootRoute from './route/index';
import {extendLocale} from 'amis-core';
import zhCN from './locales/zh-CN';
import enUS from './locales/en-US';

extendLocale('zh-CN', zhCN);
extendLocale('en-US', enUS);

export default function (): JSX.Element {
  const MainStore = new IMainStore();
  const store = (window.store = MainStore);
  useEffect(() => {
    if (!store.settingsLoaded && !store.settingsLoading) {
      store.ensureServerSideSettingsLoaded();
    }
  });
  return (
    <Provider store={store}>
      <RootRoute store={store} />
    </Provider>
  );
}
