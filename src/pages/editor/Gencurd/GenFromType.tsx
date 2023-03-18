import AMISComponent from '@/components/AMISComponent';
import { wrapedResultRequest } from '@/services/requests';
import React, { useEffect, useState } from 'react';
import buildCrud from './GenCrud';
import scemaJsonData from './GenFromType.json';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GenFromType: React.FC<{ setSchemaHandle?: (schemaOutput: any) => void }> = (_props) => {
  // const [modalSchema, setModalSchema] = React.useState({});
  const [schema, setSchema] = React.useState({});
  const [scope, setScope] = React.useState<any>(null);
  const [currentTypeName, setCurrentTypeName] = React.useState('');
  let modalSchema = {};

  //@ts-ignore
  scemaJsonData.body[0].body[0].onEvent.change.actions[0].script = (a, b, c) => {
    console.log(' scemaJsonData body[0].body[0].onEventa,b,c: ', a, b, c);
    setCurrentTypeName(c.data.value);
  };
  //@ts-ignore
  scemaJsonData.body[0].actions[0].onEvent.click.actions[0].script = (a: any, b: any, c: any) => {
    console.log(' scemaJsonData toolbar: ', a, b, c);
    if (_props.setSchemaHandle) {
      _props.setSchemaHandle?.(modalSchema);
    }
    // else {
    //   setInitialState((s) => ({
    //     ...s,
    //     schemaConfig: {
    //       inputSchema: modalSchema,
    //       schemaVersionId: '',
    //       showEditor: true,
    //     },
    //   }));
    // }
  };
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    if (!isMounted) {
      setSchema(scemaJsonData);
      setIsMounted(true);
    }
  }, [isMounted]);

  useEffect(() => {
    if (currentTypeName) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      modalSchema = {};
      //查询出所有字段
      wrapedResultRequest
        .request({
          url: `/api/ContentTypeManagement/GetTypeDefinitionForEdit`,
          method: 'GET',
          params: {
            name: currentTypeName,
          },
        })
        .then((res) => {
          buildCrud(res.data).then((json) => {
            modalSchema = json;
            if (scope?.getComponentById) {
              const svr = scope?.getComponentById?.('svrPreview');
              if (svr) {
                svr.setData(json);
              }
            }
          });
        });
    }
  }, [currentTypeName]);
  return (
    <AMISComponent
      schema={schema}
      trackerFn={(a, b) => {
        console.log('GenFromType tracker scope', scope);

        console.log('GenFromType tracker', a, b);
      }}
      amisMounted={(amisScoped) => {
        setScope(amisScoped);
        console.log('GenFromType scope', amisScoped);
      }}
    />
  );
};

export default GenFromType;
