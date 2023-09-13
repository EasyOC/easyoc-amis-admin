import React from 'react';
import {Provider} from 'mobx-react';
import {MainStore} from './stores/index';
import RootRoute from './route/index';
import AmisEnv from './services/amis/AmisEnv';
import {extendLocale} from 'amis-core';
import zhCN from './locales/zh-CN';
import enUS from './locales/en-US';

extendLocale('zh-CN', zhCN);
extendLocale('en-US', enUS);

export default function (): JSX.Element {
  const store = ((window as any).store = MainStore.create(
    {},
    {
      ...AmisEnv
    }
  ));

  return (
    <Provider store={store}>
      <RootRoute store={store} />
    </Provider>
  );
}
