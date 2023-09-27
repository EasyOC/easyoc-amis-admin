import {Button, Result} from 'antd';

import React from 'react';
import {useHistory} from 'react-router';

const NoFoundPage: React.FC = (props: any) => {
  const history = useHistory<{errorPath: string}>();
  let lostedPage = history.location.state?.errorPath || '';
  if (lostedPage) {
    lostedPage = `\"${lostedPage}\"`;
  }
  return (
    <Result
      status="404"
      title="404"
      subTitle={
        'Sorry, the page you visited ' + lostedPage + ' does not exist.'
      }
      extra={
        <Button type="primary" onClick={() => history.push('/')}>
          Back Home
        </Button>
      }
    />
  );
};

export default NoFoundPage;
