import {localPath} from '@/utils/urlHelper';
import {CopyrightOutlined, GithubOutlined} from '@ant-design/icons';
import {useIntl} from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  const intl = useIntl();
  const defaultMessage = intl.getMessage(
    'app.copyright.produced',
    '上海稷洲信息科技有限公司'
  );

  const currentYear = new Date().getFullYear();
  return (
    <>
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          right: 0,
          textAlign: 'right',
          width: '100%',
          backgroundColor: '#eee'
        }}
      >
        {/* <span style={{ marginRight: '40px' }}> */}
        {/* <img src={localPath('/logoblack.svg')} height={'24px'} width={'24px'}></img> */}
        {/* <span style={{ paddingRight: '20px' }}> */}
        版权所有 <CopyrightOutlined />
        &nbsp;
        {`${currentYear} ${defaultMessage}`} All rights reserved.
        {/* </span> */}
        &nbsp;&nbsp; Powered by Lowcode-Engine
        {/* </span> */}
      </div>
    </>
  );
};

export default Footer;
