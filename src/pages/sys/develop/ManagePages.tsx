import AMISComponent from '@/components/AMISComponent';
import React, {useEffect, useState} from 'react';
// import { useModel } from '@umijs/max';
import jsonschema from './ManagePages.json';
const ManagePages: React.FC = () => {
  // const { initialState, setInitialState } = useModel('@@initialState');
  // // 侧边栏编辑器，已弃用
  // // const btnOpenDesign = (data: { contentItemVersionId: any }) => {
  // //   setInitialState((s) => ({
  // //     ...s,
  // //     schemaConfig: {
  // //       schemaVersionId: data.contentItemVersionId,
  // //       inputSchema: null,
  // //       showEditor: true,
  // //     },
  // //   }));

  // //   return false;
  // // };
  // // //@ts-ignore 打开设计器
  // // jsonschema.body[0].columns[0].buttons[1].onEvent.click.actions[0].script = (a, b, c) => {
  // //   console.log('打开设计器: ', a, b, c);
  // //   btnOpenDesign(c.data);
  // // };
  // const [state, setState] = useState<{
  //   scope: any;
  //   schema: any;
  //   loadRound: number;
  // }>({
  //   schema: jsonschema,
  //   loadRound: 0,
  //   scope: null,
  // });

  // useEffect(() => {
  //   setState((s) => {
  //     return { ...s, schema: jsonschema, loadRound: state.loadRound + 1 };
  //   });
  //   if (initialState?.schemaConfig?.showEditor === false && state.scope && state.loadRound > 1) {
  //     const curd = state.scope.getComponentById('curdList');
  //     console.log('curdList', curd);
  //     curd.search();
  //   }

  //   console.log('schemaLoaded');
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [initialState?.schemaConfig?.showEditor]);

  // const AmisMounted = (scopeRef: any) => {
  //   setState((s) => {
  //     return { ...s, scope: scopeRef };
  //   });
  // };

  console.log('ManagePagesjsonschema: ', jsonschema);
  return <AMISComponent schema={jsonschema} />;
};

export default ManagePages;
