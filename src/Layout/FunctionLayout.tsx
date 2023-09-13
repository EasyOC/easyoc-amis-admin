import React from 'react';
import {
  NotFound,
  Layout,
  AsideNav,
  AlertComponent,
  Button,
  Drawer,
  Spinner,
  ToastComponent,
  Select,
  SearchBox
} from 'amis';
import {eachTree} from 'amis-core';
import 'amis-ui/lib/locale/en-US';
import {RouteComponentProps, withRouter} from 'react-router';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  Link,
  NavLink
} from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import {IMainStore} from '@/stores';
import AppSettings from '@/services/appSettings';
import Navigations2routeComponents from './Components/Navigations2routeComponents';
import _t from '@/services/amis/translate';
const _hmt: any = [];

let ContextPath = AppSettings.PUBLIC_PATH;

export function getContextPath() {
  return ContextPath;
}

const themes = [
  {
    label: '云舍',
    ns: 'cxd-',
    value: 'cxd'
  },
  {
    label: '仿 AntD',
    ns: 'antd-',
    value: 'antd'
  },
  {
    label: 'ang',
    ns: 'a-',
    value: 'ang'
  }
];

const locales = [
  {
    label: '中文',
    value: 'zh-CN'
  },

  {
    label: 'English',
    value: 'en-US'
  }
];

const viewModes = [
  {
    label: '桌面端',
    value: 'pc'
  },

  {
    label: '移动端',
    value: 'mobile'
  }
];

function getPath(path: string) {
  return path
    ? path[0] === '/'
      ? ContextPath + path
      : `${ContextPath}/${path}`
    : '';
}
function isActive(link: any, location: any) {
  return !!(link.path && getPath(link.path) === location.pathname);
}

export function navigations2route(
  navigations: any,
  additionalProperties?: any
) {
  let routes: any = [];

  navigations.forEach((root: any) => {
    root.children &&
      eachTree(root.children, (item: any) => {
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

const loadMenus = async () => {
  return [
    {
      label: 'Home',
      url: '/',
      redirect: '/pageA'
    },
    {
      label: '示例',
      children: [
        {
          label: '页面A',
          url: 'pageA',
          schema: {
            type: 'page',
            title: '页面A',
            body: '页面A'
          },

          children: [
            {
              label: '页面A-1',
              url: '1',
              schema: {
                type: 'page',
                title: '页面A-1',
                body: '页面A-1'
              }
            },

            {
              label: '页面A-2',
              url: '2',
              schemaId: '123124',
              schema: {
                type: 'page',
                title: '页面A-2',
                body: '页面A-2'
              }
            },

            {
              label: '页面A-3',
              url: '3',
              schema: {
                type: 'page',
                title: '页面A-3',
                body: '页面A-3'
              }
            }
          ]
        },

        {
          label: '页面B',
          schema: {
            type: 'page',
            title: '页面B',
            body: '页面B'
          }
        },

        {
          label: '页面C',
          schema: {
            type: 'page',
            title: '页面C',
            body: '页面C'
          }
        },

        {
          label: '表单',
          url: '/form',
          icon: 'fa fa-plus',
          schemaApi: '/api/mock2/service/schema?type=form'
        },
        {
          label: '列表',
          url: '/crud/list',
          icon: 'fa fa-list',
          schemaApi: '/api/mock2/service/schema?type=crud'
        }
      ]
    },

    {
      label: '分组2',
      children: [
        {
          label: '用户管理',
          schema: {
            type: 'page',
            title: '用户管理',
            body: '页面C'
          }
        },

        {
          label: '外部链接',
          link: 'http://baidu.gitee.io/amis'
        },

        {
          label: '部门管理',
          schemaApi: '/api/mock2/service/form?tpl=tpl3'
        }
      ]
    }

    // {
    //   label: '404',
    //   visible: false,
    //   isDefaultPage: true,
    //   schema: {
    //     type: 'page',
    //     body: '自定义 404 页面，可以不配置'
    //   }
    // }
  ];
};

// @ts-ignore

@inject('store')(observer(props => {}))
export default class extends React.PureComponent<
  {
    history: History;
    location: Location;
    store: IMainStore;
  } & RouteComponentProps
> {
  state: {store: IMainStore} & any = {
    viewMode: localStorage.getItem('amis-viewMode') || 'pc',
    offScreen: false,
    folded: false,
    headerVisible: true,
    themes: themes,
    theme:
      themes.find(item => item?.value === localStorage.getItem('amis-theme')) ||
      themes[0],
    locale: localStorage.getItem('amis-locale')
      ? localStorage.getItem('amis-locale')?.replace('zh-cn', 'zh-CN')
      : '',
    navigations: [],
    filter: '', // 导航过滤，方便找组件
    store: {}
  };

  constructor(props: any) {
    super(props);
    // const navigations = this.props.store.pages.map(item => ({
    //   label: item.label,
    //   path: `/${item.path}`,
    //   icon: item.icon,
    //   component: () => schema2component(item.schema)
    // }));
    // this.state.navigations = [{label: 'Menus', children: navigations}];

    this.setNavigations = this.setNavigations.bind(this);
    this.setNavigationFilter = this.setNavigationFilter.bind(this);
    document.querySelector('body')?.classList.add(this.state.theme.value);
  }

  componentDidUpdate(preProps: any, preState: any) {
    const props = this.props;

    if (preState.theme.value !== this.state.theme.value) {
      [].slice
        .call(document.querySelectorAll('link[title]'))
        .forEach((item: HTMLLinkElement) => {
          const theme = item.getAttribute('title');
          item.disabled = theme !== this.state.theme.value;
        });
      const body = document.body;
      body.classList.remove(preState.theme.value);
      body.classList.add(this.state.theme.value);
    }

    if (props.location.pathname !== preProps.location.pathname) {
      this.setState(
        {
          offScreen: false
        },
        () => window.scrollTo(0, 0)
      );

      const loadMenusAsyc = async () => {
        await loadMenus();
      };
      loadMenusAsyc();

      _hmt && _hmt.push(['_trackPageview', props.location.pathname]);
    }
  }

  setNavigations(items: any, resetFilter = true) {
    this.setState({
      navigations: items,
      filter: resetFilter ? '' : this.state.filter
    });
  }

  renderHeader() {
    const location = this.props.location;
    const theme = this.state.theme;

    if (location.pathname === '/edit') {
      return (
        <div id="headerBar" className="box-shadow bg-dark">
          <div className={`${theme.ns}Layout-brand`}>amis 可视化编辑器</div>
        </div>
      );
    }

    return (
      <>
        <div className={`${theme.ns}Layout-brandBar `}>
          <div
            onClick={() => this.setState({offScreen: !this.state.offScreen})}
            className={`${theme.ns}Layout-offScreen-btn pull-right visible-xs`}
          >
            <i className="bui-icon iconfont icon-collapse"></i>
          </div>

          <div className={`${theme.ns}Layout-brand text-ellipsis`}>
            <i className="fa fa-paw" />
            <span className="hidden-folded m-l-sm">AMIS 示例</span>
          </div>
        </div>

        <div
          className={`${theme.ns}Layout-headerBar  'DocLayout-headerBar pc:inline-flex' : 'pc:flex'
          } items-center`}
        >
          <Button
            onClick={() => this.setState({folded: !this.state.folded})}
            type="button"
            level="link"
            className="navbar-btn"
          >
            <i
              className={`fa fa-${
                this.state.folded ? 'indent' : 'dedent'
              } fa-fw`}
            ></i>
          </Button>
          <ul className={`HeaderLinks`}>
            <NavLink
              to={`/editor`}
              activeClassName="is-inactive"
              target="_blank"
            >
              编辑器
            </NavLink>
          </ul>

          <div className="hidden-xs ml-auto">
            <Select
              overlayPlacement="right-bottom-right-top"
              clearable={false}
              theme={this.state.theme.value}
              value={this.state.locale || 'zh-CN'}
              options={locales}
              onChange={(locale: any) => {
                this.setState({locale: (locale as any).value});
                localStorage.setItem('amis-locale', (locale as any).value);
                window.location.reload();
              }}
            />
          </div>

          <div className="hidden-xs ml-2">
            <Select
              overlayPlacement="right-bottom-right-top"
              clearable={false}
              theme={this.state.theme.value}
              value={this.state.theme}
              options={this.state.themes}
              onChange={(theme: any) => {
                this.setState({theme});
                localStorage.setItem('amis-theme', `${(theme as any).value}`);
                document
                  .querySelector('body')
                  ?.classList[
                    (theme as any).value === 'dark' ? 'add' : 'remove'
                  ]('dark');
              }}
            />
          </div>

          <div className="hidden-xs ml-2">
            <Select
              overlayPlacement="right-bottom-right-top"
              clearable={false}
              theme={this.state.theme.value}
              value={this.state.viewMode || 'pc'}
              options={viewModes}
              onChange={(viewMode: any) => {
                this.setState({viewMode: (viewMode as any).value});
                localStorage.setItem('amis-viewMode', (viewMode as any).value);
                window.location.reload();
              }}
            />
          </div>

          <div id="Header-toolbar"></div>
        </div>
      </>
    );
  }

  setNavigationFilter(value: string) {
    this.setState({
      filter: value
    });
  }

  renderNavigation() {
    return (
      <div>
        <SearchBox
          className="m-b m-r-md justify-center"
          style={{paddingLeft: '20px'}}
          placeholder={_t('搜索菜单')}
          value={this.state.filter}
          onSearch={this.setNavigationFilter}
          onChange={this.setNavigationFilter}
          clearable={true}
          mini={false}
          history={{enable: true}}
        />

        {this.renderAsideNav()}
      </div>
    );
  }

  renderAsideNav() {
    const filterReg = new RegExp(
      this.state.filter.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&'),
      'i'
    );

    return (
      <AsideNav
        navigations={this.state.navigations.map((item: any) => ({
          ...item,
          children: item.children
            ? item.children
                .filter((item: any) => {
                  if (item.label) {
                    return filterReg.exec(item.label);
                  }
                  return true;
                })
                .map((item: any) => ({
                  ...item,
                  className: 'is-top'
                }))
            : []
        }))}
        renderLink={({
          link,
          active,
          toggleExpand,
          classnames: cx,
          depth
        }: any) => {
          let children = [];

          if (link.children && link.children.length) {
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
          } else if (this.state.folded && depth === 1) {
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
            <span className={cx('AsideNav-itemLabel')} key="label">
              {link.label}
            </span>
          );

          return link.path ? (
            /^https?\:/.test(link.path) ? (
              <a target="_blank" href={link.path} rel="noopener">
                {children}
              </a>
            ) : (
              <Link
                to={
                  getPath(link.path) ||
                  (link.children && getPath(link.children[0].path))
                }
              >
                {children}
              </Link>
            )
          ) : (
            <a onClick={link.children ? () => toggleExpand(link) : undefined}>
              {children}
            </a>
          );
        }}
        isActive={(link: any) => isActive(link, location)}
      />
    );
  }

  renderContent = () => {
    const locale = 'zh-CN'; // 暂时不支持切换，因为目前只有中文文档
    const {theme} = this.state;

    return (
      <React.Suspense
        fallback={<Spinner overlay spinnerClassName="m-t-lg" size="lg" />}
      >
        <Switch>
          {/* {this.loadMenus().map(item => (
            <Route
              key={item.url}
              path={`/${item.url}`}
              children={item.children}
              // component={schema2component(item.children)}
            />
          ))} */}
          <Route
            path={`${ContextPath}`}
            render={(props: any) => (
              <Navigations2routeComponents
                {...{
                  setNavigations: this.setNavigations,
                  navigations: this.state.navigations,
                  theme: theme.value,
                  classPrefix: theme.ns,
                  viewMode: this.state.viewMode,
                  locale: this.state.locale,
                  offScreen: this.state.offScreen,
                  ContextPath,
                  showCode: false
                }}
                {...props}
              />
            )}
          />
        </Switch>
      </React.Suspense>
    );
  };
  render() {
    const theme = this.state.theme;

    return (
      <Layout
        theme={theme.value}
        offScreen={this.state.offScreen}
        folded={this.state.folded}
        header={this.renderHeader()}
        aside={this.renderNavigation()}
        // aside={this.renderAsideNav()}
      >
        <ToastComponent theme={theme.value} locale={this.state.locale} />
        <AlertComponent theme={theme.value} locale={this.state.locale} />

        {/* {React.cloneElement(this.props.children as any, {
          key: theme.value,
          ...(this.props.children as any).props,
          setNavigations: this.setNavigations,
          theme: theme.value,
          classPrefix: theme.ns,
          viewMode: this.state.viewMode,
          locale: this.state.locale,
          offScreen: this.state.offScreen,
          ContextPath
        })} */}
        {/* <BackTop /> */}

        {this.renderContent()}
      </Layout>
    );
  }
}
