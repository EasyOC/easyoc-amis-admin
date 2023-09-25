import AMISComponent from '@/components/AMISComponent';
import React from 'react';
import jsonschema from './dynamicIndex.json';

const DynamicIndex: React.FC = () => {
  return <AMISComponent schema={jsonschema} />;
};

export default DynamicIndex;
