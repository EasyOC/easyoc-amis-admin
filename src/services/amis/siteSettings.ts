import { clone, has, merge, unset } from 'lodash';
import authService from '../auth/authService';
import { apiUrl } from '../../utils/urlHelper';
import { JSONC } from '../../utils/json';
import { listToTree, treeMap } from '../../utils/helper/tree';
import { deepMerge } from '../../utils/deep-merge';
import { mustStartsWith, safeEval } from '../../utils';
import { NavItem } from '../../types'
import { currentLocale, extendLocale, translate } from 'i18n-runtime';
import { gql, useQuery } from '@apollo/client';
import { DynamicMenuData, EocLayoutSettings } from '../../types/src/SiteGlobalSettings';
import { CurrentUser } from '../../types/src/CurrentUser';
import defaultRequest from '../requests';




const addTranslate = (element) => {

    const currlang = currentLocale();

    //菜单多语言处理
    if (currlang == "zh-CN" && element.zhCN) {
        extendLocale(currlang, { [element.keyPath]: element.zhCN || element.name })
        console.log('element.keyPath:zhCN ', element.keyPath, element.zhCN, element);
    } else if (currlang == "en-US" && element.enUS) {
        extendLocale(currlang, { [element.keyPath]: element.enUS })
        console.log('element.keyPath: en-US', element.keyPath, element.enUS, element);
    } else if (element.lang && element.lang[currlang]) {
        extendLocale(currlang, { [element.keyPath]: element.lang[currlang] })
        console.log('element.keyPath: lang', element.keyPath, element.lang, element);
    } else {
        extendLocale(currlang, { [element.keyPath]: element.name })
    }

}


export const loadMenuData = async (serverMenus: any): Promise<NavItem> => {
    const dynamicMenuDict: { [key: string]: string } = {}

    console.log('begin loadMenuData: ', serverMenus);
    let menus = treeMap(serverMenus || [], {
        children: 'routes',
        conversion: (item: any) => {
            // if (item.layout === false || item.hideInMenu || item.redirect || !item.name) {
            //     return item
            // }

            if (item.routes) {
                // item.children.push(...rItem)//.sort((a, b) => a.order - b.order);
                item.routes.forEach((element: any) => {
                    element.parentNode = item;
                    // if (item.contentItemId) {
                    //     dynamicMenuDict[`${element.parentNode.path}/${element.path}`] = element.contentItemId
                    // }
                });
            }
            if (!!item.locale) {
                item.keyPath = item.locale
            } else {
                console.log('item: ', item);

                if (!item.parentNode) {
                    item.keyPath = 'menu.' + item.name;
                } else {
                    // debugger
                    item.keyPath = item.parentNode.keyPath + (item.name ? '.' + item.name : "")
                    if (item.contentItemId) {
                        dynamicMenuDict[`${item.parentNode.path.toLowerCase()}/${item.path.toLowerCase()}`] = item.contentItemId
                    }
                }
                item.locale = item.keyPath
            }
            addTranslate(item)
            if (item.contentItemId) {
                dynamicMenuDict[item.path.toLowerCase()] = item.contentItemId
            }
            return item;
        },
    });
    menus = menus.sort((a, b) => a.orderIndex - b.orderIndex)
    console.log('loadMenuData result: ', menus);

    return {
        //修复图标
        menuData: menus
    } as DynamicMenuData;
};

const buildDynamicMenus = (antdMenuItems) => {
    const menuData = antdMenuItems?.map((x: any) => {
        if (x.menuType == "DynamicPage") {
            const schemaConfigName = x.schemaConfig?.schemaDetails?.name
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

const getAntdMenus = async (): Promise<any[]> => {
    const { data: menuList } = useQuery(GET_MENUS)
    console.log('menuList: ', menuList);
    if (menuList.userMenus?.items) {
        return menuList.userMenus?.items
    } else {
        return []
    }
}


/**
 * 获取站点配置
 * ../..returns 
 */

export const getSiteGlobalSettings = async (currentUser?: CurrentUser): Promise<EocLayoutSettings> => {
    //站点全局设置，不需要授权 { withToken: false }
    const isLoggedIn = await authService.isLoggedIn();
    let rawResult: {
        data: any
    }
    console.log('monitor: getInitialState.fetchServerSideSettings.isLoggedIn: ', isLoggedIn);
    if (isLoggedIn) {
        rawResult = await defaultRequest.get('/api/AntdSettings/GetSitePrivateSettings', { withCredentials: true });
    }
    else {
        //未登录用户专用，不需要授权 , { withCredentials: false }
        rawResult = await defaultRequest.get('/api/AntdSettings/GetSitePublicSettings', { withCredentials: false })
    }
    console.log('AntdSettingsresult: ', rawResult);
    const result = rawResult.data;
    const siteConfig = {} as any;
    // siteConfig.enableLoginPage = result.enableLoginPage
    if (result?.siteSettingsData) {
        const tempSiteSettingsData = JSONC.parse(result.siteSettingsData);
    }

    if (isLoggedIn) {

        let IsAdmin = false;
        if (currentUser?.roles && currentUser?.roles.length > 0) {
            IsAdmin = currentUser?.roles?.includes("Administrator")
        }
        const serverMenus = await getAntdMenus();
        const antdMenus = buildDynamicMenus(serverMenus);
        let menuData = [...antdMenus];
        if (IsAdmin) {
            let menuDataObj = safeEval(result.menuData)
            console.log('menuDataObj: ', menuDataObj);
            menuData.push(...menuDataObj)
        }
        const dynamicMenuData = await loadMenuData(menuData);
        siteConfig.menuData = dynamicMenuData.menuData
        siteConfig.serverMenus = serverMenus
        siteConfig.dynamicMenuDict = dynamicMenuData.dynamicMenuDict

    }
    console.log('GetSettings result: ', siteConfig);


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


