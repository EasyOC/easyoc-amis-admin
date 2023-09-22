import * as React from 'react';
import {
  RouteComponentProps,
  Link,
  Switch,
  Redirect,
  matchPath
} from 'react-router-dom';
import {Space} from 'antd';
import {Avatar, Dropdown} from 'antd';
import {Layout, Button, AsideNav} from 'amis';
import {IMainStore} from '@/stores';
import {inject, observer} from 'mobx-react';
import {toast} from 'amis';
import {UserOutlined} from '@ant-design/icons';
import axios from 'axios';
import AppSettings from '@/services/appSettings';
import {loadMenus} from '@/services/amis/menus';
import {treeFind} from '@/utils';
import {schema2component} from '@/components/AMISRenderer';

type NavItem = {
  label: string;
  children?: Array<NavItem>;
  icon?: string;
  path?: string;
  component?: React.ReactType;
  getComponent?: () => Promise<React.ReactType>;
};

function isActive(link: any, location: any) {
  const ret = matchPath(location.pathname, {
    path: link ? link.replace(/\?.*$/, '') : '',
    exact: true,
    strict: true
  });

  return !!ret;
}

export interface AdminProps extends RouteComponentProps<any> {
  store: IMainStore;
}

@inject('store')
@observer
export default class Admin extends React.Component<AdminProps, any> {
  state = {
    hasLoadMenu: false,
    navigations: []
  };

  logout = () => {
    const store = this.props.store;
    store.logout();
  };

  async componentDidMount() {
    const store = this.props.store;
    console.log('componentDidMount, store.user:', store.userStore.user);
    // this.refreshMenu();
    store.fetchPages();
  }

  async componentDidUpdate() {
    const store = this.props.store;
    let pathname = this.props.location.pathname;
    this.setState({...this.state, navigations: store.pages});
    console.log('location:', pathname);
    console.log('store.user:', store.userStore.user);
    // await this.refreshMenu();
  }

  refreshMenu = async () => {
    const store = this.props.store;
    let pathname = this.props.location.pathname;
    console.log('location:', pathname);
    console.log('store.user:', store.userStore.user);
    const isAuthenticated = await store.userStore.isAuthenticated();
    if (
      pathname != 'login' &&
      pathname != '/' &&
      !this.state.hasLoadMenu &&
      isAuthenticated
    ) {
      store.fetchPages();
      this.setState({
        navigations: store.pages,
        hasLoadMenu: true
      });
    }
  };

  renderHeader() {
    const store = this.props.store;

    const items = [
      {
        key: '1',
        label: <span onClick={this.logout}>退出登录</span>
      }
    ];

    return (
      <div>
        <div className={`cxd-Layout-brandBar`}>
          <button
            onClick={store.toggleOffScreen}
            className="pull-right visible-xs"
          >
            <i className="fa fa-bars text-white"></i>
          </button>
          <div className={`cxd-Layout-brand`}>
            <i className="fa fa-paw"></i>
            <span className="hidden-folded m-l-sm">react-amis-admin</span>
          </div>
        </div>
        <div className={`cxd-Layout-headerBar`}>
          <div className="nav navbar-nav hidden-xs pull-left">
            <Button
              level="link"
              className="no-shadow navbar-btn"
              onClick={store.toggleAsideFolded}
              tooltip="展开或收起侧边栏"
              placement="bottom"
              iconOnly
            >
              <i
                className={store.asideFolded ? 'fa fa-indent' : 'fa fa-outdent'}
              />
            </Button>
          </div>

          <div className="m-l-auto hidden-xs pull-right pt-2">
            <Dropdown
              menu={{items}}
              placement="bottomLeft"
              trigger={['click', 'hover']}
            >
              <Button>
                <Space>
                  <Avatar icon={<UserOutlined />} />
                  admin
                </Space>
              </Button>
            </Dropdown>
          </div>
        </div>
      </div>
    );
  }

  renderAside() {
    const location = this.props.location;
    const store = this.props.store;

    return (
      <AsideNav
        key={store.asideFolded ? 'folded-aside' : 'aside'}
        navigations={this.state.navigations}
        renderLink={({link, toggleExpand, classnames: cx, depth}: any) => {
          if (link.hidden) {
            return null;
          }
          let children = [];

          if (link.children) {
            children.push(
              <span
                key="expand-toggle"
                className={cx('AsideNav-itemArrow')}
                onClick={e => toggleExpand(link, e)}
              ></span>
            );
          }

          link.badge &&
            children.push(
              <b
                key="badge"
                className={cx(
                  `AsideNav-itemBadge`,
                  link.badgeClassName || 'bg-info'
                )}
              >
                {link.badge}
              </b>
            );

          if (link.icon) {
            children.push(
              <i key="icon" className={cx(`AsideNav-itemIcon`, link.icon)} />
            );
          } else if (store.asideFolded && depth === 1) {
            children.push(
              <i
                key="icon"
                className={cx(
                  `AsideNav-itemIcon`,
                  link.children ? 'fa fa-folder' : 'fa fa-info'
                )}
              />
            );
          }
          children.push(
            <span key="label" className={cx('AsideNav-itemLabel')}>
              {link.label}
            </span>
          );

          return link.path ? (
            link.active ? (
              <a>{children}</a>
            ) : (
              <Link to={link.path}>{children}</Link>
            )
          ) : (
            <a
              onClick={
                link.onClick
                  ? link.onClick
                  : link.children
                  ? () => toggleExpand(link)
                  : undefined
              }
            >
              {children}
            </a>
          );
        }}
        isActive={(link: any) => isActive(link.path, location)}
      />
    );
  }

  renderSchema() {
    // debugger;
    let pathKey = location?.pathname as string;
    const store = this.props.store;
    // 是这个位置除了问题好像
    console.log('store.pages: ', store.pages);
    // if (store.pages) {
    // if (store.pages && store.pages.length > 0) {
    // debugger;
    const menuConfig = treeFind(store.pages, node => node.fullPath == pathKey);
    console.log(
      '🚀 ~ file: CustomLayout.tsx:246 ~ renderSchema ~ menuConfig:',
      menuConfig
    );
    // if (menuConfig) {
    const schemaInfo = menuConfig?.schemaConfig?.schemaDetails;
    console.log(
      '🚀 ~ file: CustomLayout.tsx:249 ~ renderSchema ~ schemaInfo:',
      schemaInfo
    );
    // if (schemaInfo?.schemaStr) {
    console.log(
      '🚀 ~ file: CustomLayout.tsx:252 ~ renderSchema ~ schemaInfo.schemaStr:',
      schemaInfo.schemaStr
    );
    const schema = JSON.parse(schemaInfo.schemaStr);
    console.log(
      '🚀 ~ file: CustomLayout.tsx:252 ~ renderSchema ~ schema:',
      schema
    );
    try {
      return schema2component(schema);
    } catch (error) {
      console.error('页面加载失败', menuConfig, error);
      return <Redirect to={`/404`} />;
    }
    // }
    // }
    // }
    // return <Redirect to={`/404`} />;
  }

  render() {
    const store = this.props.store;
    let pathname = this.props.location.pathname;
    // if (
    //   (! && pathname == 'auth/login') ||
    //   pathname == '/'
    // ) {
    //   return (
    //     <Switch>
    //       <Redirect to={`/404`} />
    //     </Switch>
    //   );
    // }
    {
      return (
        <Layout
          aside={this.renderAside()}
          header={this.renderHeader()}
          folded={store.asideFolded}
          offScreen={store.offScreen}
        >
          <Switch>
            {this.renderSchema()}
            {/* <Redirect to={`/404`} /> */}
          </Switch>
        </Layout>
      );
    }
  }
}
