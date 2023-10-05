import React from 'react';
import {Route, Switch} from 'react-router-dom';

import {NavigationItem} from 'amis-ui/lib/components/menu';
import {eachTree} from 'amis-core';
import appSettings from '@/services/appsettings';
export default class Navigations2routeComponents extends React.PureComponent<any> {
  components: NavigationItem[] = [];
  constructor(props: {navigations: NavigationItem[]}) {
    super(props);
    this.components = props.navigations;
    console.log('props.navigations: ', props.navigations);
  }

  componentDidMount() {
    this.props.setNavigations(this.components, false);
  }

  componentDidUpdate(preProps: any) {
    if (this.props.location.pathname !== preProps.location.pathname) {
      this.props.setNavigations(this.components, false);
    }
  }

  render() {
    return (
      <Switch>
        {/* {schema2component({
          type: 'breadcrumb',
          items: this.components
        })} */}
        {navigations2route(this.components, {
          theme: this.props.theme,
          classPrefix: this.props.classPrefix,
          locale: this.props.locale,
          viewMode: this.props.viewMode,
          offScreen: this.props.offScreen
        })}
        {/* {React.cloneElement(this.props.children as any, {
          ...(this.props.children as any).props,
          theme: this.props.theme,
          classPrefix: this.props.classPrefix,
          locale: this.props.locale,
          viewMode: this.props.viewMode,
          offScreen: this.props.offScreen
        })} */}
      </Switch>
    );
  }
}

let ContextPath = appSettings.routeBase;

export function getContextPath() {
  return ContextPath;
}

export function navigations2route(
  navigations: any,
  additionalProperties?: any
) {
  let routes: any = [];
  debugger;
  navigations.forEach((root: any) => {
    root.children &&
      eachTree(root.children, (item: any) => {
        item.path ??= '';
        if (item.path && item.component) {
          routes.push(
            additionalProperties ? (
              <Route
                key={routes.length + 1}
                path={
                  item.path[0] === '/'
                    ? ContextPath + item.path
                    : `${ContextPath}/${item.path}`
                }
                render={(props: any) => (
                  <item.component {...additionalProperties} {...props} />
                )}
              />
            ) : (
              <Route
                key={routes.length + 1}
                path={
                  item.path[0] === '/'
                    ? ContextPath + item.path
                    : `${ContextPath}/${item.path}`
                }
                component={item.component}
              />
            )
          );
        }
      });
  });

  return routes;
}
