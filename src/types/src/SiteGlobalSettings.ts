import type { MenuDataItem, ProLayoutProps } from '@ant-design/pro-components';
import { CurrentUser } from "./CurrentUser"
import { RenderOptions } from 'amis';
export type EocMenuDataItem = MenuDataItem & {
  meta?: {
    schemaId?: string;
    [key: string]: any;
  };
  fullPath: string;
};

export type DynamicMenuData = {
  menuData: EocMenuDataItem[];
  dynamicMenuDict: {
    [key: string]: {
      schemaStr: string;
      contentItemId: string;
      useLayout: boolean;
      description: string;
      displayText: string;
    };
  };
  serverMenus: any[];
};

export type EocLayoutSettings = Partial<ProLayoutProps> & {
  pwa?: boolean;
  logo?: string;
  loginBg?: string;
  locale?: {
    default: string;
  };
  showLangSelect?: boolean;
  amis?: {
    locale?: string;
    toastConf: {
      position: 'top-right' | 'top-center' | 'top-left' | 'bottom-center' | 'bottom-left' | 'bottom-right' | 'center'
    }
    theme?: 'cxd' | 'antd';
  };
  subTitle?: string;
  serverTitle: string | false | undefined;
  dynamicMenuData: Partial<DynamicMenuData>;
};

export type EocInitialState = {
  settings?: Partial<EocLayoutSettings>;
  amisEnv?: RenderOptions;
  showSettingsDrawer?: boolean;
  currentUser?: CurrentUser;
  accessToken?: string;
  loading?: boolean;
};
