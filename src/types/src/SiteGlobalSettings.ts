// import type { MenuDataItem, ProLayoutProps } from '@ant-design/pro-components';
// import type { AmisEditorModalProps } from '@/components/AMISComponent/AmisEditorModal';

// export type EocMenuDataItem = MenuDataItem & {
//     meta?: {
//         schemaId?: string
//         [key: string]: any
//     }
// };

// export type EocLayoutSettings = Partial<ProLayoutProps> & {
//     pwa?: boolean;
//     logo?: string;
//     loginBg?: string;
//     locale?: {
//         default: string
//     }
//     showLangSelect?: boolean,
//     amis?: {
//         locale?: string
//         theme?: 'cxd' | 'antd'
//     }
// }

// export type DynamicMenuData = {
//     menuData: EocMenuDataItem[],
//     dynamicMenuDict: { [key: string]: string }
//     serverMenus: any[]
// }

// export type SiteGlobalSettings = {
//     // enableLoginPage: boolean,
//     siteSettingsData?: EocLayoutSettings
// } & DynamicMenuData

// export type EocInitialState = {
//     settings?: Partial<EocLayoutSettings>;
//     showSettingsDrawer?: boolean;
//     currentUser?: API.CurrentUser;
//     schemaConfig?: Partial<AmisEditorModalProps>;
//     serverSideSettings?: Partial<SiteGlobalSettings>;
//     accessToken?: string;
//     loading?: boolean;
//     fetchServerSideSettings?: (currentUser?: API.CurrentUser) => Promise<Partial<SiteGlobalSettings> | undefined>;
//     fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
// }