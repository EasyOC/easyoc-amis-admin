import { clone, merge, unset } from 'lodash';
import authService from '../auth/authService';
import { JSONC } from '../../utils/json';
import { listToTree, treeMap } from '../../utils/helper/tree';
import { deepMerge, mustStartsWith, safeEval } from '../../utils';
import { currentLocale, extendLocale, i18n } from 'i18n-runtime';
import { gql, useQuery } from '@apollo/client';
import { DynamicMenuData, EocLayoutSettings, EocMenuDataItem } from '../../types/src/SiteGlobalSettings';
import { CurrentUser } from '../../types/src/CurrentUser';
import defaultRequest from '../requests';
import { excuteGraphqlGetQuery } from '../graphql/graphqlApi';
import ProLayoutProps from '@/Layout/AntdProLayout/defaultProps';
import { apiUrl } from '@/utils/urlHelper';
import { fixMenuItemIcon } from '@/utils/helper/iconHelper';




const translateMenuItem = (element) => {

    const currlang = currentLocale();
    if (!element.keyPath) {
        return;
    }

    //菜单多语言处理
    if (currlang == "zh-CN" && element.zhCN) {
        // tryAddMenu(currlang, element.keyPath, element.zhCN || element.displayText || element.name)
        element.name = element.zhCN || element.displayText || element.name
        // console.log('element.keyPath:zhCN ', element.keyPath, element.zhCN, element);
    } else if (currlang == "en-US" && element.enUS) {
        // tryAddMenu(currlang, element.keyPath, element.enUS || element.displayText || element.name)
        element.name = element.enUS || element.displayText || element.name

        // console.log('element.keyPath: en-US', element.keyPath, element.enUS, element);
    } else if (element.lang && element.lang[currlang]) {
        // tryAddMenu(currlang, element.keyPath, element.lang[currlang] || element.displayText || element.name)
        element.name = element.lang[currlang] || element.displayText || element.name
    }
}


export const loadMenuData = async (serverMenus: any): Promise<EocMenuDataItem[]> => {
    let result = treeMap(serverMenus || [], {
        children: 'routes',
        conversion: (item: any) => {
            item.fullPath = item.path;

            if (item.routes) {
                // item.children.push(...rItem)//.sort((a, b) => a.order - b.order);
                item.routes.forEach((element: any) => {
                    element.parentNode = item;
                });
            }
            if (!!item.locale) {
                item.keyPath = item.locale
            } else {

                if (!item.parentNode) {
                    item.keyPath = item.name;
                } else {
                    item.keyPath = item.parentNode.keyPath + (item.name ? '.' + item.name : "")
                }
                item.locale = item.keyPath
            }
            if (item.parentNode?.fullPath) {
                item.fullPath = `${item.parentNode?.fullPath}/${item.path}`;
            } else {
                item.fullPath = mustStartsWith(item.path, '/')
            }
            item.key ??= item.keyPath
            translateMenuItem(item)
            // extendLocale(currlang, menuLang[currlang])
            // item.name = i18n(item.keyPath)
            return item;
        },
    });
    result = result.sort((a, b) => a.orderIndex - b.orderIndex)
    //修复图标
    const menus = fixMenuItemIcon(result as EocMenuDataItem[])
    console.log('menus: ', menus);
    return menus;
};

const buildDynamicMenus = (antdMenuItems) => {
    const menuData = antdMenuItems?.map((x: any) => {
        if (x.menuType == "DynamicPage") {
            x.path = x.name
        }
        if (x.otherConfig) {
            try {
                const otherConfig = JSONC.parse(x.otherConfig)
                return merge(x, otherConfig)
            } catch (error) {
                console.warn(`the Menu:${x.name}'s otherConfig is invalid JSON format.`)
                return x
            }
        }
        x.key = x.contentItemId
        //因为动态菜单中设置 locale 时候使用的开关，它只能表示 true| false， 但是 antd 当 locale 为非false 的情况下会识别为翻译项，
        //所以此处将 locale 属性移除
        if (x.locale !== false) {
            //封印这个鬼。。。
            unset(x, "locale")
        }
        //使用动态路由权限规则
        x.access = x.access || "dynamicRouteFilter";
        return x
    }).sort((a, b) => a.orderIndex - b.orderIndex)
    const treeResult = listToTree(menuData, {
        pid: "parent.firstValue",
        children: "routes",
        id: "contentItemId"
    })

    console.log('menuList treeResult: ', treeResult);
    return treeResult;
}

const GET_MENUS = gql`
 query {
    userMenus {
      items {
        contentItemId
        createdUtc
        hideInMenu
        icon
        locale
        menuType
        name
        orderIndex
        otherConfig
        path
        redirect
        parent {
          firstValue
        }
        target
        enUS
        zhCN
        schemaConfig: schemaId {
          schemaDetails: firstContentItem {
            ... on AmisSchema {
              name
            }
          }
          schemaId: firstValue
        }
      }
    }
  }           
`

const getAntdMenus2 = async (): Promise<any[]> => {
    const { data: menuList } = useQuery(GET_MENUS)
    console.log('menuList: ', menuList);
    if (menuList.userMenus?.items) {
        return menuList.userMenus?.items
    } else {
        return []
    }
}

const getAntdMenus = async (): Promise<any[]> => {
    const menuList = await excuteGraphqlGetQuery({
        query: `{
            userMenus {
                contentItemId
                displayText
                createdUtc
                hideInMenu
                icon
                locale
                menuType
                name
                orderIndex
                otherConfig
                path
                redirect
                parent {
                  firstValue
                }
                target
                enUS
                zhCN
                schemaConfig: schemaId {
                  schemaDetails: firstContentItem {
                    ... on AmisSchema {
                        useLayout
                        displayText
                        layoutName
                        description
                        schemaStr: schema
                    }
                  }
                  schemaId: firstValue
                }
              
            }
          }     
      `})
    if (menuList.userMenus) {
        return menuList.userMenus
    } else {
        return []
    }

}
/**
 * 获取站点配置
 * ../..returns 
 */

export const getSiteGlobalSettings = async (currentUser?: CurrentUser): Promise<EocLayoutSettings> => {
    const isLoggedIn = await authService.isLoggedIn();
    let rawResult: {
        data: any
    }
    if (isLoggedIn) {
        rawResult = await defaultRequest.get('/api/AntdSettings/GetSitePrivateSettings');
    }
    else {
        //未登录用户专用，不需要授权 , { withCredentials: false }
        rawResult = await defaultRequest.get('/api/AntdSettings/GetSitePublicSettings')
    }
    console.log('AntdSettingsresult: ', rawResult);
    const result = rawResult.data.data;
    let siteConfig = {} as EocLayoutSettings;
    try {
        // siteConfig.enableLoginPage = result.enableLoginPage
        if (result?.siteSettingsData) {
            let tempSiteSettingsData = JSONC.parse(result.siteSettingsData) as EocLayoutSettings;
            tempSiteSettingsData = deepMerge(ProLayoutProps, tempSiteSettingsData)
            siteConfig = deepMerge(tempSiteSettingsData,
                {
                    logo: tempSiteSettingsData?.logo ? apiUrl(tempSiteSettingsData?.logo) :
                        ProLayoutProps.logo,
                    loginBg: tempSiteSettingsData?.loginBg ? apiUrl(tempSiteSettingsData?.loginBg) :
                        ProLayoutProps.loginBg
                })
            siteConfig = {
                ...siteConfig,
            }
            //解决 title 覆盖问题
            siteConfig.serverTitle = siteConfig.title
            if (window.__POWERED_BY_WUJIE__) {
                deepMerge(siteConfig, {
                    "navTheme": "light",
                    "layout": "side",
                    "fixedHeader": false,
                    "fixSiderbar": false,
                    "splitMenus": false,
                    "headerRender": false,
                    "footerRender": false,
                    "menuRender": false,
                    "menuHeaderRender": false
                })
            }
        }

        if (isLoggedIn) {
            currentUser ??= await authService.getLocalUserInfo()
            let IsAdmin = false;
            if (currentUser?.roles && currentUser?.roles.length > 0) {
                IsAdmin = currentUser?.roles?.includes("Administrator")
            }
            const serverMenus = await getAntdMenus();
            const antdMenus = buildDynamicMenus(serverMenus);
            let menuData = [...antdMenus];
            if (IsAdmin) {
                let menuDataObj = []
                if (result.menuData) {
                    try {
                        menuDataObj = safeEval(result.menuData)
                    } catch (error) {
                        console.error("服务器端菜单加载失败，使用默认菜单", menuData, error)
                    }
                }
                menuData.push(...menuDataObj)
            }
            const dynamicMenuData = await loadMenuData(menuData);
            siteConfig.menuData = dynamicMenuData;
        }

    } catch (error) {
        console.error('GetSettings siteSettingsData faild: ', result, error);
    }
    return siteConfig;
}



export const updateSiteGlobalSettings = async (configData: EocLayoutSettings): Promise<EocLayoutSettings> => {

    const data: any = {}
    if (configData.dynamicMenuData) {
        const settings = clone(configData.dynamicMenuData)
        unset(settings, "menuData")
        data.siteSettingsData = JSON.stringify(settings, null, 2)
    }


    const result = await defaultRequest.put('/api/AntdSettings/UpdateSiteSettings', {
        method: 'PUT', data
    });
    return result.data;
}


