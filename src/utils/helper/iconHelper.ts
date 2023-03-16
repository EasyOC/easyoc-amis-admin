import React from 'react';
import * as aliIcons from '@ant-design/icons'
import * as allCustomIcons from '@/components/icons/customIcons'
import { has } from 'lodash';
import { EocMenuDataItem } from '@/types/src/SiteGlobalSettings';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { treeMap } from './tree';
// FIX从接口获取菜单时icon为string类型
export const fixMenuItemIcon = (menus: EocMenuDataItem[], iconType = 'Outlined'): EocMenuDataItem[] => {

    menus.forEach((item) => {
        const { icon, routes } = item;
        if (typeof icon === 'string') {
            //无法直接加载 fa 图标
            // item.icon = React.createElement(FontAwesomeIcon, { icon: 'fa-calculator' }, null)

            // if (icon.startsWith('fa')) {
            //     //
            //     //<FontAwesomeIcon icon="fa-solid fa-calculator" />
            //     item.icon = React.createElement(FontAwesomeIcon, { icon: 'fa-calculator' }, null)
            //     return
            // }
            const fixIconName = icon.slice(0, 1).toLocaleUpperCase() + icon.slice(1) + iconType;
            if (has(allCustomIcons, icon)) {
                item.icon = React.createElement(allCustomIcons[icon])
            }
            const iconNode = aliIcons[fixIconName] || aliIcons[icon];
            if (iconNode) {
                item.icon = React.createElement(aliIcons[fixIconName] || aliIcons[icon]);
            }
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        if (routes && (routes as []).length > 0) {
            item.children = fixMenuItemIcon(routes)
        }
    });
    return menus;
};
