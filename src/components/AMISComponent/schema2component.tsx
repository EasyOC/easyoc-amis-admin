import React from 'react';
import {RouteComponentProps, useHistory, withRouter} from 'react-router';
import {inject, observer} from 'mobx-react';
import {getEnv} from 'mobx-state-tree';
import {IMainStore} from '@/stores';
import qs from 'query-string';
import {render as amisRender, utils, filter} from 'amis';

export function schema2component(
  schema: any,
  transform?: Function,
  session: string = 'page'
) {
  interface SchemaRendererProps extends RouteComponentProps<{}> {
    store: IMainStore;
    [propName: string]: any;
  }

  @inject('store')
  @observer
  class SchemaRenderer extends React.Component<SchemaRendererProps> {
    env: any;

    getEnv() {
      if (this.env) {
        return this.env;
      }

      const envProps = this.props;
      const store = envProps.store;
      const rootEnv = getEnv(store.amisEnv);

      const normalizeLink = (to: string, preserveHash?: boolean) => {
        if (/^\/api\//.test(to)) {
          return to;
        }

        to = to || '';
        const history = envProps.history;
        const location = history.location;
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
        let hash = ~idx2
          ? to.substring(idx2)
          : preserveHash
          ? location.hash
          : '';

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
        const history = this.props.history;
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
        const history = useHistory();
        if (to === 'goBack') {
          return history.goBack();
        }

        to = normalizeLink(to);

        if (isCurrentUrl(to)) {
          return;
        }

        if (action && action.actionType === 'url') {
          action.blank === false
            ? (window.location.href = to)
            : window.open(to, '_blank');
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
        const history = envProps.history;
        if (location === 'goBack') {
          return history.goBack();
        } else if (/^https?\:\/\//.test(location)) {
          return (window.location.href = location);
        }

        history[replace ? 'replace' : 'push'](normalizeLink(location, replace));
      };
      return (this.env = {
        ...rootEnv,
        session,
        isCurrentUrl,
        updateLocation: envProps.updateLocation || updateLocation,
        jumpTo: envProps.jumpTo || jumpTo,
        affixOffsetTop: envProps.embedMode ? 0 : 50,
        theme: store.amisEnv?.theme
      });
    }

    render() {
      const {
        router,
        match,
        location,
        history,
        store,
        schema: schemaProp,
        jumpTo,
        updateLocation,
        embedMode,
        ...rest
      } = this.props;
      const finalSchema = schemaProp || schema;
      let body: React.ReactNode;

      finalSchema.type || (finalSchema.type = 'page');

      body = amisRender(
        finalSchema,
        {
          location: window.location,
          data: utils.createObject({
            ...match.params,
            amisStore: store,
            pathname: location.pathname,
            params: match.params
          }),
          ...rest,
          fetcher: store.amisEnv.fetcher,
          notify: store.amisEnv.notify,
          alert: store.amisEnv.alert,
          copy: store.amisEnv.copy,
          propsTransform: transform
        },
        this.getEnv()
      );

      return <>{body}</>;
    }
  }

  return withRouter(SchemaRenderer);
}

export default schema2component;