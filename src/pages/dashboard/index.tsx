import './assets/styles.less';
import homeSvg from './assets/dashboard.svg';
import React, {useEffect, useState} from 'react';
import {inject, observer} from 'mobx-react';

const SvgDashboard: React.FC = (props: any) => {
  const {store} = props;
  const [siteTitle, setSiteTitle] = useState<string>();

  useEffect(() => {
    setSiteTitle(store?.settings?.serverTitle as string);
  }, [store?.settings]);

  return (
    <div className="SvgDashboard">
      <div className="title-warpper">
        <div className="title">
          <div className="title-top">Welcome to</div>
          <div className="title-sub">{siteTitle}</div>
        </div>
      </div>
      <div className="img-warpper">
        <img src={homeSvg} style={{maxWidth: '100%', maxHeight: '100%'}} />
      </div>
    </div>
  );
};
export default inject('store')(observer(SvgDashboard));
