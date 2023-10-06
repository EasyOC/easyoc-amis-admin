import AMISComponent from '@/components/AMISComponent';
import React from 'react';
import jsonschema from './ManagePages.json';
const ManagePages: React.FC = () => {
  return <AMISComponent schema={jsonschema} />;
};

export default ManagePages;
