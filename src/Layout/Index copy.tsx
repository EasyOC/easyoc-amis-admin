import React from 'react';
import {observer, inject} from 'mobx-react';
import {IMainStore} from '../stores';
import {Button, AsideNav, Layout, confirm, Select} from 'amis';
import {RouteComponentProps, matchPath, Switch, Route} from 'react-router';
import {Link} from 'react-router-dom';
import NotFound from '@/pages/404';
import AMISRenderer, {schema2component} from '@/components/AMISRenderer';
import AddPageModal from '@/components/AddPageModal';
function isActive(link: any, location: any) {
  const ret = matchPath(location.pathname, {
    path: link ? link.replace(/\?.*$/, '') : '',
    exact: true,
    strict: true
  });
  return !!ret;
}

export default inject('store')
  (
    observer(function ({
      store,
      location,
      history
    }: {store: IMainStore} & RouteComponentProps) {
      function renderHeader() {
        return (
          <div>
            <div className={`a-Layout-headerBar`}>
              <div className="hidden-xs p-t-sm pull-right px-2">
                <Button size="sm" className="m-r-xs" level="success" disabled>
                  全部导出
                </Button>
                <Button
                  size="sm"
                  level="info"
                  onClick={() => store.setAddPageIsOpen(true)}
                >
                  新增页面
                </Button>
              </div>
            </div>
          </div>
        );
      }

      function renderAside() {
        const navigations = store.pages.map(item => ({
          label: item.label,
          path: `/${item.path}`,
          icon: item.icon
        }));
        const paths = navigations.map(item => item.path);

        return (
          <AsideNav
            key={store.asideFolded ? 'folded-aside' : 'aside'}
            navigations={[
              {
                label: '导航',
                children: navigations
              }
            ]}
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

              link.active ||
                children.push(
                  <i
                    key="delete"
                    data-tooltip="删除"
                    data-position="bottom"
                    className={'navbtn fa fa-times'}
                    onClick={(e: React.MouseEvent) => {
                      e.preventDefault();
                      confirm('确认要删除').then(confirmed => {
                        confirmed && store.removePageAt(paths.indexOf(link.path));
                      });
                    }}
                  />
                );

              children.push(
                <i
                  key="edit"
                  data-tooltip="编辑"
                  data-position="bottom"
                  className={'navbtn fa fa-pencil'}
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                    history.push(`/edit/${paths.indexOf(link.path)}`);
                  }}
                />
              );

              children.push(
                <span key="label" className={cx('AsideNav-itemLabel')}>
                  {link.label}
                </span>
              );

              return link.path ? (
                link.active ? (
                  <a>{children}</a>
                ) : (
                  <Link to={link.path[0] === '/' ? link.path : `${link.path}`}>
                    {children}
                  </Link>
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
            isActive={(link: any) =>
              isActive(
                link.path && link.path[0] === '/' ? link.path : `${link.path}`,
                location
              )
            }
          />
        );
      }

      function handleConfirm(value: {label: string; icon: string; path: string}) {
        store.addPage({
          ...value,
          schema: {
            type: 'page',
            title: value.label,
            body: '这是你刚刚新增的页面。'
          }
        });
        store.setAddPageIsOpen(false);
      }
      renderHeader(docPage = true) {
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
            <div
              className={`${theme.ns}Layout-brandBar ${
                docPage ? 'DocLayout-brandBar' : ''
              }`}
            >
              <div
                onClick={() => this.setState({offScreen: !this.state.offScreen})}
                className={`${theme.ns}Layout-offScreen-btn ${
                  docPage ? 'DocLayout-offScreen-btn' : ''
                } pull-right visible-xs`}
              >
                <i className="bui-icon iconfont icon-collapse"></i>
              </div>
    
              {docPage ? (
                <div
                  className={`${theme.ns}Layout-brand  ${
                    docPage ? 'DocLayout-brand' : ''
                  }`}
                >
                  <Link to={`${ContextPath}/docs`}>
                    <div className="logo"></div>
                  </Link>
                </div>
              ) : (
                <div className={`${theme.ns}Layout-brand text-ellipsis`}>
                  <i className="fa fa-paw" />
                  <span className="hidden-folded m-l-sm">AMIS 示例</span>
                </div>
              )}
            </div>
    
            <div
              className={`${theme.ns}Layout-headerBar ${
                docPage ? 'DocLayout-headerBar pc:inline-flex' : 'pc:flex'
              } items-center`}
            >
              {docPage ? null : (
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
              )}
    
              <ul className={`HeaderLinks`}>
                <NavLink
                  to={`${ContextPath}/zh-CN/docs`}
                  activeClassName="is-active"
                >
                  文档
                </NavLink>
    
                <NavLink
                  to={`${ContextPath}/zh-CN/components`}
                  activeClassName="is-active"
                >
                  组件
                </NavLink>
                <NavLink
                  to={`${ContextPath}/zh-CN/style`}
                  activeClassName="is-active"
                >
                  样式
                </NavLink>
                <NavLink
                  to={`${ContextPath}/examples/index`}
                  activeClassName="is-active"
                >
                  示例
                </NavLink>
                <a
                  href="https://github.com/fex-team/amis-editor-demo"
                  target="_blank"
                >
                  编辑器
                </a>
                {/* <a href="https://suda.bce.baidu.com" target="_blank">
                  爱速搭
                </a> */}
              </ul>
    
              <div className="hidden-xs ml-auto">
                <Select
                  overlayPlacement="right-bottom-right-top"
                  clearable={false}
                  theme={this.state.theme.value}
                  value={this.state.locale || 'zh-CN'}
                  options={locales}
                  onChange={locale => {
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
                  onChange={theme => {
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
                  onChange={viewMode => {
                    this.setState({viewMode: (viewMode as any).value});
                    localStorage.setItem('amis-viewMode', (viewMode as any).value);
                    window.location.reload();
                  }}
                />
              </div>
    
              <div className="hidden-xs ml-2">
                <Select
                  overlayPlacement="right-bottom-right-top"
                  clearable={false}
                  theme={this.state.theme.value}
                  value={docVersions[0].value}
                  options={docVersions}
                  onChange={(doc: any) => {
                    if (doc.url && /^https?\:\/\//.test(doc.url)) {
                      window.open(doc.url);
                    } else {
                      window.location.href = doc.url;
                    }
                  }}
                />
              </div>
    
              <div id="Header-toolbar"></div>
            </div>
    
            {docPage ? (
              <>
                <div
                  className={`${theme.ns}Layout-searchBar ${
                    docPage ? 'DocLayout-searchBar' : ''
                  } hidden-xs hidden-sm`}
                >
                  <DocSearch theme={theme} />
                </div>
                <a
                  className="gh-icon"
                  href="https://github.com/baidu/amis"
                  target="_blank"
                >
                  <i className="fa fa-github" />
                </a>
              </>
            ) : null}
          </>
        );
      }
    
      return (
        <Layout
          aside={renderAside()}
          brandName={'JiZhouSoft'}
          logo={() => (
            <svg
              t={'1610181550507'}
              style={'width: 30px; height: 30px;'}
              viewBox={'0 0 1024 1024'}
              version={'1.1'}
              xmlns={'http://www.w3.org/2000/svg'}
              p-id={'2528'}
              width={'200'}
              height={'200'}
            >
              <path
                d="M217.090828 534.490224c99.683327-20.926612 86.12145-137.343041 83.128279-162.838715-4.906753-39.223327-52.112891-107.812471-116.217908-102.372575-80.693834 7.058766-92.487438 120.948653-92.487438 120.948653C80.583828 442.927855 117.654119 555.449581 217.090828 534.490224L217.090828 534.490224zM322.936505 737.004567c-2.907213 8.211009-9.413394 29.170366-3.781116 47.381124 11.123338 40.874943 51.108005 34.208103 51.108005 34.208103l56.034201 0L426.297594 706.525392l-56.034201 0C345.158622 713.864544 325.65543 728.85291 322.936505 737.004567L322.936505 737.004567zM402.144498 339.233168c55.081503 0 99.57588-61.946864 99.57588-138.461515 0-76.491115-44.494377-138.40728-99.57588-138.40728-54.974056 0-99.599416 61.916165-99.599416 138.40728C302.545082 277.286304 347.170442 339.233168 402.144498 339.233168L402.144498 339.233168zM639.288546 348.395852c73.635067 9.331529 120.925117-67.407226 130.340557-125.57195 9.582239-58.081837-37.906332-125.577067-90.024339-137.174196-52.219315-11.712763-117.390617 70.044286-123.329886 123.305327C549.187459 274.094612 565.853024 339.149257 639.288546 348.395852L639.288546 348.395852zM819.642171 690.38069c0 0-113.866351-86.12145-180.37716-179.167612-90.108251-137.176243-218.121809-81.367169-260.908288-11.604292C335.745229 569.372685 269.286608 613.477182 259.841491 625.187899c-9.552563 11.489682-137.50984 79.010495-109.128443 202.314799s135.49802 131.180691 135.49802 131.180691 66.203818-3.168156 151.517879-21.829168c85.312014-18.48705 158.833495 4.598738 158.833495 4.598738s199.320605 65.22349 253.866918-60.3546C904.897903 755.497757 819.642171 690.38069 819.642171 690.38069L819.642171 690.38069zM482.333842 874.629018 342.241176 874.629018c-55.946196-1.313925-71.552639-45.587268-74.354452-51.943023-2.777253-6.473435-18.606777-36.478819-10.226922-87.473237 24.179702-76.490092 84.613096-84.695984 84.613096-84.695984l84.053348 0L426.326247 566.464449l56.036247 0 0 308.164568L482.333842 874.629018zM706.478831 874.629018l-140.090619 0c-55.16746-2.355651-56.124252-52.927443-56.124252-52.927443l0.086981-171.2155 56.037271 0L566.388213 790.57874c3.697205 15.438621 28.016077 28.015054 28.016077 28.015054l56.037271 0L650.441561 650.486074l56.038294 0L706.479855 874.629018 706.478831 874.629018zM931.037237 446.066335c0-27.816532-23.675212-111.617124-111.395066-111.617124-87.919399 0-99.660814 79.093383-99.660814 135.016043 0 53.344952 4.592598 127.816061 113.806999 125.490086C943.00071 592.633459 931.037237 474.058876 931.037237 446.066335L931.037237 446.066335zM931.037237 446.066335"
                p-id="2529"
              ></path>
            </svg>
          )}
          header={renderHeader()}
          folded={store.asideFolded}
          offScreen={store.offScreen}
        >
          <Switch>
            {store.pages.map(item => (
              <Route
                key={item.id}
                path={`/${item.path}`}
                component={schema2component(item.schema)}
              />
            ))}
            <Route component={NotFound} />
          </Switch>
          <AddPageModal
            show={store.addPageIsOpen}
            onClose={() => store.setAddPageIsOpen(false)}
            onConfirm={handleConfirm}
            pages={store.pages.concat()}
          />
        </Layout>
      );
    })
);
