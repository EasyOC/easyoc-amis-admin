import { gql, useQuery } from "@apollo/client";
import { currentLocale } from "i18n-runtime";
import { NavItem } from "../../types";
import { excuteGraphqlQuery } from "../graphql/graphqlApi";


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
              name,
              schema
            }
          }
          schemaId: firstValue
        }
      }
    }
  }           
`


export const loadMenus = async (): Promise<NavItem[]> => {

  const { userMenus } = await excuteGraphqlQuery({
    query: GET_MENUS
  })
  // const { data: menuList } = useQuery(GET_MENUS)
  console.log('menuList: ', userMenus);
  if (userMenus?.items) {
    return convert2NavItem(userMenus?.items)
  } else {
    return []
  }
}


const convert2NavItem = (menuData): NavItem[] => {
  var navItems: NavItem[] = []
  const curLanguage = currentLocale(); // 获取当前语料类型

  //menuData 中  
  // contentItemId  为主键
  //将 `menuData` 转换为 NavItem 数组    
  const map = new Map<string, NavItem>();
  menuData.forEach((item) => {
    let label = item.name;
    if (curLanguage == 'zh-CN') {
      label = item.zhCN || label
    }
    if (curLanguage == 'en-US') {
      label = item.enUS || label
    }

    const navItem: NavItem = {
      id: item.contentItemId,
      label: label,
      icon: item.icon,
      path: item.path as string,
      schema: item?.schemaConfig?.schemaDetails?.schema ? JSON.parse(item?.schemaConfig?.schemaDetails?.schema) : null,
      schemaId: item?.schemaConfig?.schemaId,
      children: [],
    };
    map.set(item.contentItemId, navItem);
    //parent.firstValue  表示它的父级contentItemId 
    if (item.parent.firstValue) {
      const parent = map.get(item.parent.firstValue);
      if (parent) {
        parent?.children?.push(navItem);
      }
    } else {
      navItems.push(navItem);
    }
  });


  console.log('navItems: ', navItems);
  return navItems;

}