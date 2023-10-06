import React, {useEffect, useState} from 'react';
import {
  AlertComponent,
  filter,
  render as renderAmis,
  RenderOptions,
  ToastComponent,
  updateEnv
} from 'amis';
//link button 样式丢失 时
//比如 text-danger 不红了，把下面这行注释掉保存，刷新页面，再取消注释
import 'amis/lib/helper.css'; //amis精简过的 辅助 class 参考自tailwindcss, 做了精简，把一些不常用的剔除了，响应式方面只保留 pc 和手机两种，css 未压缩版本大概是 800K 左右，比 tailwind 要小很多。
import './components/index';
import {inject, observer} from 'mobx-react';
import {IMainStore} from '@/stores';
import {useHistory} from 'react-router-dom';
import qs from 'query-string';
interface AMISComponentProps {
  schema: any;
  amisMounted?: (amisScoped: any) => void;
  session?: string;
  embedMode?: boolean;
  trackerFn?: (
    tracker: any,
    props: any
  ) => boolean | void | Promise<boolean> | Promise<void>;
}

const AMISComponent: React.FC<AMISComponentProps & any> = (
  inputProps: AMISComponentProps & {
    store: IMainStore;
  }
) => {
  const {store} = inputProps;

  const history = useHistory();

  const getCurrentEnv = () => {
    const normalizeLink = (to: string, preserveHash?: boolean) => {
      if (/^\/api\//.test(to)) {
        return to;
      }

      to = to || '';
      const currentQuery = qs.parse(location.search);
      to = filter(
        to.replace(/\$\$/g, qs.stringify(currentQuery)),
        currentQuery
      );

      if (to && to[0] === '#') {
        to = location.pathname + location.search + to;
      } else if (to && to[0] === '?') {
        to = location.pathname + to;
      }

      const idx = to.indexOf('?');
      const idx2 = to.indexOf('#');
      let pathname = ~idx
        ? to.substring(0, idx)
        : ~idx2
        ? to.substring(0, idx2)
        : to;
      let search = ~idx ? to.substring(idx, ~idx2 ? idx2 : undefined) : '';
      let hash = ~idx2 ? to.substring(idx2) : preserveHash ? location.hash : '';

      if (!pathname) {
        pathname = location.pathname;
      } else if (pathname[0] != '/' && !/^\w+\:/.test(pathname)) {
        let relativeBase = location.pathname;
        const paths = relativeBase.split('/');
        paths.pop();
        let m;
        while ((m = /^\.\.?\//.exec(pathname))) {
          if (m[0] === '../') {
            paths.pop();
          }
          pathname = pathname.substring(m[0].length);
        }
        pathname = paths.concat(pathname).join('/');
      }

      return pathname + search + hash;
    };

    const isCurrentUrl = (to: string) => {
      const link = normalizeLink(to);
      const location = history.location;
      let pathname = link;
      let search = '';
      const idx = link.indexOf('?');
      if (~idx) {
        pathname = link.substring(0, idx);
        search = link.substring(idx);
      }

      if (search) {
        if (pathname !== location.pathname || !location.search) {
          return false;
        }
        const currentQuery = qs.parse(location.search);
        const query = qs.parse(search);

        return Object.keys(query).every(
          key => query[key] === currentQuery[key]
        );
      } else if (pathname === location.pathname) {
        return true;
      }
      return false;
    };
    const jumpTo = (to: string, action?: any) => {
      if (to === 'goBack') {
        return history.goBack();
      }

      to = normalizeLink(to);

      if (isCurrentUrl(to)) {
        return;
      }

      if (action && action.actionType === 'url') {
        if (action.blank === false) {
          if (/^https?:\/\//.test(to)) {
            window.location.href = to;
          } else {
            history.push(to);
          }
        } else {
          window.open(to, '_blank');
        }
        return;
      } else if (action && action.blank) {
        window.open(to, '_blank');
        return;
      }

      if (/^https?:\/\//.test(to)) {
        window.location.href = to;
      } else {
        history.push(to);
      }
    };
    const updateLocation = (location: string, replace: boolean) => {
      if (location === 'goBack') {
        return history.goBack();
      } else if (/^https?\:\/\//.test(location)) {
        return (window.location.href = location);
      }

      history[replace ? 'replace' : 'push'](normalizeLink(location, replace));
    };
    return {
      ...store.amisEnv,
      session: inputProps.session || 'page',
      isCurrentUrl,
      updateLocation: updateLocation,
      jumpTo: jumpTo,
      tracker: handleTrace,
      preview: false,
      //CRUD 顶部固定时距离顶部的偏移量 ,为页面顶部固定时预留空间
      affixOffsetTop: inputProps.embedMode ? 0 : 50
    };
  };

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
    setSchema(inputProps.schema || {type: 'page', body: '空页面'});
    updateEnv({
      ...getCurrentEnv(),
      tracker: inputProps.trackerFn || handleTrace,
      session: inputProps.session
    } as RenderOptions);
    return () => {
      updateEnv({...getCurrentEnv()} as RenderOptions);
    };
  }, [inputProps]);

  return (
    <div className="schema-wrapper">
      {renderAmis(
        // 这里是 amis 的 Json 配置。
        schema,
        {
          scopeRef: handleScope,
          locale: store.settings?.amis?.locale || 'zh-CN'
        },
        {
          ...(getCurrentEnv() as RenderOptions)
        }
      )}
    </div>
  );
};
export default inject('store')(observer(AMISComponent));
