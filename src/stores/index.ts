import UserStore from './userStore';
import SettingsStore from './settingsStore';
import { types, getEnv } from 'mobx-state-tree';
import authService from '@/services/auth/authService';

let pagIndex = 1;

const _userStore = new UserStore();
const _settingsStore = new SettingsStore();

const MainStore = types
  .model('MainStore', {
    theme: 'cxd',
    asideFixed: true,
    asideFolded: false,
    offScreen: false,
    addPageIsOpen: false,
    isMobile: false,
  })
  .views(self => ({
    get fetcher() {
      return getEnv(self).fetcher;
    },
    get notify() {
      return getEnv(self).notify;
    },
    get alert() {
      return getEnv(self).alert;
    },
    get copy() {
      return getEnv(self).copy;
    },
    get userStore() {
      return _userStore;
    },
    get settings() {
      return _settingsStore;
    },
  }))
  .actions(self => {
    function toggleAsideFolded() {
      self.asideFolded = !self.asideFolded;
      localStorage.setItem('asideFolded', self.asideFolded ? '1' : '');
    }
    function toggleAsideFixed() {
      self.asideFixed = !self.asideFixed;
    }

    function toggleOffScreen() {
      self.offScreen = !self.offScreen;
    }

    function setIsMobile(value: boolean) {
      self.isMobile = value;
    }

    function logout() {
      authService.logout();
    }

    return {
      toggleAsideFolded,
      toggleAsideFixed,
      toggleOffScreen,
      logout,
      setIsMobile,
      afterCreate() {
        self.asideFolded = !!localStorage.getItem('asideFolded');
      }
    };
  });

export { MainStore };

export type IMainStore = typeof MainStore.Type;
