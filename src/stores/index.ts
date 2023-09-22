import UserStore from './userStore';
import SettingsStore from './settingsStore';
import {types, getEnv, applySnapshot, getSnapshot} from 'mobx-state-tree';
import {PageStore} from './Page';
import {reaction, flow, runInAction} from 'mobx';
import {NavItem} from '@/types/src/NavItem';
import {loadMenus} from '@/services/amis/menus';
import authService from '@/services/auth/authService';

let pagIndex = 1;

const _userStore = new UserStore();
const _settingsStore = new SettingsStore();

const MainStore = types
  .model('MainStore', {
    pages: types.optional(types.array(PageStore), []),
    theme: 'cxd',
    asideFixed: true,
    asideFolded: false,
    offScreen: false,
    addPageIsOpen: false,
    preview: false,
    isMobile: false,
    schema: types.frozen()
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
    get userStore() {
      return _userStore;
    },
    get settings() {
      return _settingsStore;
    },
    get copy() {
      return getEnv(self).copy;
    }
  }))
  .actions(self => {
    // function fetchPages() {
    //   flow(function* () {
    //     const menus = yield loadMenus();
    //     runInAction(() => {
    //       self.pages = menus;
    //     });
    //   });
    // }
    function fetchPages() {
      const that = self;
      loadMenus().then(menus => {
        self.pages.push(
          PageStore.create({
            ...menus,
            id: `${++pagIndex}`
          })
        );
      });
    }

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
      fetchPages,
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

export {MainStore};

export type IMainStore = typeof MainStore.Type;
