import UserStore from './userStore';
import { action, computed, observable } from 'mobx';
import { EocLayoutSettings } from '@/types/src/SiteGlobalSettings';
import { type RenderOptions } from 'amis';
import type CurrentUser from '@/types/src/CurrentUser';
import { getSiteGlobalSettings } from '@/services/amis/siteSettings';
import { deepMerge } from '@/utils';
import defaultAmisEnv from '@/services/amis/AmisEnv';
import ProLayoutProps from '@/Layout/ProLayoutProps';

// let pagIndex = 1;

// const _userStore = new UserStore();
// const _settingsStore = new SettingsStore();

// const MainStore = types
//   .model('MainStore', {
//     theme: 'cxd',
//     asideFixed: true,
//     asideFolded: false,
//     offScreen: false,
//     addPageIsOpen: false,
//     isMobile: false,
//   })
//   .views(self => ({
//     get fetcher() {
//       return getEnv(self).fetcher;
//     },
//     get notify() {
//       return getEnv(self).notify;
//     },
//     get alert() {
//       return getEnv(self).alert;
//     },
//     get copy() {
//       return getEnv(self).copy;
//     },
//     get userStore() {
//       return _userStore;
//     },
//     get settingsStore() {
//       return _settingsStore;
//     },
//   }))
//   .actions(self => {
//     function toggleAsideFolded() {
//       self.asideFolded = !self.asideFolded;
//       localStorage.setItem('asideFolded', self.asideFolded ? '1' : '');
//     }
//     function toggleAsideFixed() {
//       self.asideFixed = !self.asideFixed;
//     }

//     function toggleOffScreen() {
//       self.offScreen = !self.offScreen;
//     }

//     function setIsMobile(value: boolean) {
//       self.isMobile = value;
//     }

//     function logout() {
//       authService.logout();
//     }

//     return {
//       toggleAsideFolded,
//       toggleAsideFixed,
//       toggleOffScreen,
//       logout,
//       setIsMobile,
//       afterCreate() {
//         self.asideFolded = !!localStorage.getItem('asideFolded');
//       }
//     };
//   });

// export { MainStore };
// export type IMainStore = typeof MainStore.Type;

const _userStore = new UserStore();

class IMainStore {
  @observable
  settings?: Partial<EocLayoutSettings> = { ...ProLayoutProps };

  @observable
  amisEnv?: RenderOptions = { ...defaultAmisEnv } as RenderOptions

  @observable
  showSettingsDrawer?: boolean;

  @observable
  loading?: boolean;

  @computed
  get userStore() {
    return _userStore;
  }

  /**
   * 标记站点设置是否已加载
   */
  @observable
  settingsLoaded: boolean = false;

  /**
  * 确保已从服务器获取站点配置，获取完成后保存 到settings 里
  * 配合 store.settingsLoaded=false 重置加载
  */
  @action
  async ensureServerSideSettingsLoaded(userInfo?: CurrentUser
  ): Promise<Partial<EocLayoutSettings>> {
    const serverConfig = await getSiteGlobalSettings(userInfo);
    console.log('fetchServerSideSettings: from server ', serverConfig);
    deepMerge(this.settings, serverConfig)
    deepMerge(this.amisEnv, serverConfig?.amis);
    this.settingsLoaded = true
    return this.settings;
  }
}

const mainStore = new IMainStore()

export { mainStore, IMainStore }; 