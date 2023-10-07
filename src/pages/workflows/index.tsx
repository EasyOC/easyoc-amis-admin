import {IMainStore} from '@/stores';
import {inject, observer} from 'mobx-react';
import React from 'react';
import {FC, useEffect, useState} from 'react';

const WorkflowList: FC<{store: IMainStore}> = ({store}) => {
  const changeState = () => {
    store.updateSettings({showSettingsDrawer: !store.showSettingsDrawer});
  };
  return (
    <>
      <div onClick={changeState}>
        showSettingsDrawer is {store.settings.showSettingsDrawer}
      </div>
    </>
  );
};

export default inject('store')(observer(WorkflowList));
