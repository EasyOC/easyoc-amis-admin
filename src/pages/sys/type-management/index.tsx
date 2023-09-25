import AMISComponent from '@/components/AMISComponent';
import {PageContainer} from '@ant-design/pro-components';
import jsonschema from './index.json';
import React from 'react';

export default () => {
  return (
    <PageContainer>
      <AMISComponent schema={jsonschema} />
    </PageContainer>
  );
};
