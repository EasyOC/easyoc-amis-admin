import UserStore from './userStore';
import SettingsStore from './settingsStore';
import { types, getEnv } from 'mobx-state-tree';
import authService from '@/services/auth/authService';
import { action, computed, observable } from 'mobx';
import { EocLayoutSettings } from '@/types/src/SiteGlobalSettings';
import { type RenderOptions } from 'amis';
import type CurrentUser from '@/types/src/CurrentUser';
import { getSiteGlobalSettings } from '@/services/amis/siteSettings';
import { deepMerge } from '@/utils';
import AmisEnv from '@/services/amis/AmisEnv';

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
  settings?: Partial<EocLayoutSettings>;

  @observable
  amisEnv?: RenderOptions = AmisEnv as RenderOptions

  @observable
  showSettingsDrawer?: boolean;

  @observable
  accessToken?: string;

  @observable
  loading?: boolean;

  @computed
  get userStore() {
    return _userStore;
  }

  /**
  * 用于 从服务器获取站点配置，获取完成后保存 到settings 里
  */
  @action
  async fetchServerSideSettings(
  ): Promise<Partial<EocLayoutSettings> | undefined> {
    const serverConfig = await getSiteGlobalSettings(this.userStore.user);
    console.log('fetchServerSideSettings: from server ', serverConfig);
    this.settings = serverConfig
    this.amisEnv = deepMerge({ ...AmisEnv }, serverConfig?.amis);

    return serverConfig;
  }
}

const mainStore = new IMainStore()

export { mainStore, IMainStore }; 