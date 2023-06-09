import React, { useEffect, useState } from 'react';
import { AlertComponent, render as renderAmis, RenderOptions, ToastComponent, updateEnv } from 'amis';
import AmisEnv from '@/services/amis/AmisEnv'; 
//link button 样式丢失 时
//比如 text-danger 不红了，把下面这行注释掉保存，刷新页面，再取消注释
import 'amis/lib/helper.css'; //amis精简过的 辅助 class 参考自tailwindcss, 做了精简，把一些不常用的剔除了，响应式方面只保留 pc 和手机两种，css 未压缩版本大概是 800K 左右，比 tailwind 要小很多。
import './components/index';
interface AMISComponentProps {
  schema: any;
  amisMounted?: (amisScoped: any) => void;
  trackerFn?: (tracker: any, props: any) => boolean | void | Promise<boolean> | Promise<void>;
}

const AMISComponent: React.FC<AMISComponentProps> = (inputProps) => {
  console.log('inputProps: ', inputProps);
  const [schema, setSchema] = React.useState<any>({});
  const [amisSate, setAmisState] = useState();
  const handleScope = (scope: any) => {
    setAmisState(scope);
    // console.log('handleScope scope: ', scope);
    inputProps?.amisMounted?.(scope);
  };

  const handleTrace = (e: any, prop: any) => {
    // console.log(' handleTrace e, prop ', e, prop);
    // inputProps.trackerFn?.(e, prop);
  };

  useEffect(() => {
    setSchema(inputProps.schema || { type: 'page', body: '空页面' });
    updateEnv({ ...AmisEnv, tracker: inputProps.trackerFn || handleTrace } as RenderOptions);
    return () => {
      updateEnv({ ...AmisEnv, tracker: handleTrace } as RenderOptions);
    };
  }, [inputProps]);
 
  return (
    <div>
      <ToastComponent theme={AmisEnv.theme} key="toast" position={'top-right'} locale={AmisEnv.locale} />
      <AlertComponent theme={AmisEnv.theme} key="alert" locale={AmisEnv.locale} />
      {renderAmis(
        // 这里是 amis 的 Json 配置。
        schema,
        { 
          scopeRef: handleScope,
          locale: AmisEnv.locale,
        },
        {
          tracker: handleTrace,
          ...AmisEnv as RenderOptions,
        },
      )}
    </div>
  );
};
export default AMISComponent;
