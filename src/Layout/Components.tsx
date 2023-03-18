import {schema2component} from '@/components/AMISRenderer';
import {Breadcrumb} from 'amis-ui';
import React from 'react';
import {Switch} from 'react-router-dom';
import {navigations2route} from './CustomLayout';

type NavItem = {
  label: string;
  path: string;
  component: any;
  children: NavItem[];
};

export default class Components extends React.PureComponent<any> {
  components: NavItem[] = [];
  constructor(props: {navigations: NavItem[]}) {
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
