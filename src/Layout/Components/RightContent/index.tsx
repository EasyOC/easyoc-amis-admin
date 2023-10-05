import {QuestionCircleOutlined} from '@ant-design/icons';
import {useEmotionCss} from '@ant-design/use-emotion-css';
import React from 'react';
import Avatar from './AvatarDropdown';
import {IMainStore} from '@/stores';
import {inject, observer} from 'mobx-react';
import {SelectLang} from './SelectLang';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC<{menu: boolean; store: IMainStore}> = ({
  menu,
  store
}) => {
  const className = useEmotionCss(() => {
    return {
      display: 'flex',
      height: '48px',
      marginLeft: 'auto',
      overflow: 'hidden',
      gap: 8
    };
  });

  const actionClassName = useEmotionCss(({token}) => {
    return {
      'display': 'flex',
      'float': 'right',
      'height': '48px',
      'marginLeft': 'auto',
      'overflow': 'hidden',
      'cursor': 'pointer',
      'padding': '0 12px',
      'borderRadius': token.borderRadius,
      '&:hover': {
        backgroundColor: token.colorBgTextHover
      }
    };
  });

  if (!store || !store.settings) {
    return null;
  }
  const showLangSelect = () => {
    if (store.settings?.showLangSelect) {
      return <SelectLang className={actionClassName} />;
    } else {
      return <></>;
    }
  };
  return (
    <div className={className}>
      <Avatar menu={menu} store={store} />
      {showLangSelect()}
    </div>
  );
};
export default inject('store')(observer(GlobalHeaderRight));
