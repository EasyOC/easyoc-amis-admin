import AMISComponent from '@/components/AMISComponent';
import {excuteGraphqlQuery} from '@/services/graphql/graphqlApi';
import {IMainStore} from '@/stores';
import {mustEndsWith, treeFind} from '@/utils';
import {PageContainer} from '@ant-design/pro-components';
import {inject, observer} from 'mobx-react';
import React, {useEffect, useState} from 'react';
import {useHistory, useLocation} from 'react-router';
const AmisDynamicPage: React.FC<{store?: IMainStore}> = (props: any) => {
  const {store} = props as {store: IMainStore};
  const history = useHistory();
  const [state, setState] = useState<{
    title?: string;
    version?: string;
    usePageWrapper?: boolean;
    schema: any;
    name?: string;
    /**
     * 用于标记页面是否已加载，避免页面多次请求api
     */
    mounted?: boolean;
  }>({
    title: '',
    version: '',
    usePageWrapper: false,
    schema: {
      type: 'service',
      data: {},
      // api: {
      //   url: '/api/graphql',
      //   requestAdapter: async (api) => {},
      //   adapter: (response) => {},
      // },
      body: [{type: 'page', body: 'loading...'}]
    },
    name: '',
    mounted: false
  });
  const [loading, setLoading] = React.useState(false);

  const go404 = (pageName?: string) => {
    if (pageName) {
      setState({schema: {type: 'page', body: '未找到页面：' + pageName}});
      console.error('未找到页面：' + pageName);
    }
    history.push('/404', {errorPath: history.location.pathname});
  };

  const loadSchemaById = async schemaId => {
    setLoading(true);
    const result = await excuteGraphqlQuery({
      query: `{
        contentItem(contentItemId: "${schemaId}") {
          createdUtc
          displayText
          contentItemVersionId
          contentItemId
          ... on AmisSchema {
            useLayout
            layoutName
            description
            schemaStr: schema
          }
        }
      }
      `
    });
    setLoading(false);
    if (result?.contentItem) {
      console.log('result?.contentItem: ', result);
      const {
        schemaStr,
        name,
        useLayout,
        contentItemVersionId: version,
        displayText: title
      } = result?.contentItem;
      try {
        const schema = JSON.parse(schemaStr);
        console.log('schema: ', schema);
        if (
          schema.type == 'page' &&
          schema.regions?.includes('header') &&
          useLayout
        ) {
          schema.title = '';
        }

        setState(x => ({
          ...x,
          schema,
          usePageWrapper: useLayout,
          name,
          version,
          title
        }));
        return true;
      } catch (e) {
        console.error('json parseError ' + e);
        setState(x => ({
          ...x,
          schema: {type: 'page', body: 'JSON 格式错误！' + version},
          name,
          usePageWrapper: useLayout,
          version,
          title
        }));

        return false;
      }
    } else {
      setLoading(false);
      go404(schemaId);
      return false;
    }
  };

  const localtion = useLocation();

  /**
   * 根据路径信息从菜单中查找 菜单项
   */
  useEffect(() => {
    if (props?.match?.params?.id) {
      loadSchemaById(props.match.params.id);
      return;
    }
    const pathname = localtion.pathname;
    console.log('pathname: ', pathname);
    //不转换路径
    const {menuData} = store?.settings;
    if (!menuData) {
      return;
    }
    let pathKey = pathname;
    //此处只处理精确匹配，默认跳转又Layout 中的onPageChange 处理
    const menuConfig = treeFind(menuData, node => node.fullPath == pathKey);
    if (menuConfig) {
      const schemaInfo = menuConfig.schemaConfig?.schemaDetails;
      if (schemaInfo?.schemaStr) {
        const schema = JSON.parse(schemaInfo.schemaStr);
        try {
          setState(x => ({
            ...x,
            schema,
            usePageWrapper: schemaInfo.useLayout || true,
            title: menuConfig.displayText
          }));
        } catch (error) {
          console.error('页面加载失败', menuConfig, error);
        }
      }
    } else {
      go404();
    }
  }, [localtion, store?.settings?.menuData]);

  const RenderSchema = () => {
    if (state.usePageWrapper) {
      return (
        <PageContainer loading={loading}>
          <AMISComponent key={state.version} schema={state.schema} />
        </PageContainer>
      );
    } else {
      return <AMISComponent key={state.version} schema={state.schema} />;
    }
  };

  return <RenderSchema />;
};

export default inject('store')(observer(AmisDynamicPage));
