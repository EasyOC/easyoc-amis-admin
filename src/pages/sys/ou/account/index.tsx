import AMISComponent from '@/components/AMISComponent';
import React, {useEffect} from 'react';
import scemaJsonData from './Account.json';

const Account: React.FC = () => {
  let scope: any = null;
  return (
    <AMISComponent
      schema={scemaJsonData}
      trackerFn={(a, b) => {
        //console.log('GenFromType tracker scope', scope);
        //console.log('GenFromType tracker', a, b);
      }}
      amisMounted={amisScoped => {
        scope = amisScoped;
        //console.log('GenFromType scope', amisScoped);
      }}
    />
  );
};

export default Account;
