import {QuestionCircleOutlined} from '@ant-design/icons';
import {useEmotionCss} from '@ant-design/use-emotion-css';
import React from 'react';
import Avatar from './AvatarDropdown';
import SelectLang from './SelectLang';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC<{menu: boolean}> = props => {
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

  if (!initialState || !initialState.settings) {
    return null;
  }
  const showLangSelect = () => {
    if (initialState.settings?.showLangSelect) {
      return <SelectLang className={actionClassName} />;
    } else {
      return <></>;
    }
  };
  return (
    <div className={className}>
      {/* <span
        className={actionClassName}
        onClick={() => {
          window.open('https://pro.ant.design/docs/getting-started');
        }}
      >
        <QuestionCircleOutlined />
      </span> */}
      <Avatar menu={props.menu} />
      {showLangSelect()}
    </div>
  );
};
export default GlobalHeaderRight;
