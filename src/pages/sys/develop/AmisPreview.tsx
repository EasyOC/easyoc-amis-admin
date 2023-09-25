import AMISComponent from '@/components/AMISComponent';
import {PageContainer} from '@ant-design/pro-components';
import React, {useEffect, useState} from 'react';
import {excuteGraphqlQuery} from '@/services/graphql/graphqlApi';
import {useParams} from 'react-router-dom';

const AmisPreview: React.FC = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState<{
    title: string;
    version: string;
    schema: any;
    name: string;
  }>({
    title: '',
    version: '',
    schema: {type: 'page', body: '未找到内容，版本号：'},
    name: ''
  });

  const resetState = (version: any) => {
    setState({
      title: 'NotFound',
      version: version || '',
      name: '',
      schema: {type: 'page', body: '未找到内容，版本号：' + version}
    });
  };
  const routeParams = useParams<{versionId: string}>();
  useEffect(() => {
    setLoading(true);
    const {versionId} = routeParams;
    if (versionId) {
      excuteGraphqlQuery({
        query: `{
          contentItem:contentItemByVersion(contentItemVersionId: "${versionId}") {
            ... on AmisSchema {
              contentItemId
              contentItemVersionId
              displayText
              createdUtc
              description
              schemaStr:schema
              name
            }
          }
        }`
      }).then(result => {
        if (result?.contentItem) {
          //console.log('preview result?.contentItem: ', result?.contentItem);
          const {
            schemaStr,
            name,
            contentItemVersionId: version,
            displayText: title
          } = result?.contentItem;
          try {
            const schema = JSON.parse(schemaStr);
            setState({schema, name, version, title});
          } catch {
            setState({
              schema: {type: 'page', body: 'JSON 格式错误！' + version},
              name,
              version,
              title
            });
          }
        } else {
          resetState(versionId + '1');
        }
        setLoading(false);
      });
    } else {
      resetState(versionId + '2');
    }
  }, [routeParams]);

  return (
    <PageContainer title={'预览：' + state.title} loading={loading}>
      <AMISComponent
        key={state.version}
        schema={state.schema}
        trackerFn={(a, b) => {
          //console.log('dnyamicPage tracker', a, b);
        }}
        amisMounted={amisScoped => {
          //console.log('dnyamicPage scope', amisScoped);
        }}
      />
    </PageContainer>
  );
};

export default AmisPreview;
