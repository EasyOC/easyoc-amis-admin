import AMISComponent from '@/components/AMISComponent';
import { PageContainer } from '@ant-design/pro-components';
import jsonschema from './roles.json';

export default () => {
  return (
    <PageContainer>
      <AMISComponent schema={jsonschema} />
    </PageContainer>
  );
};
