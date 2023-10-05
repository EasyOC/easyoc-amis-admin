import UserStore from './userStore';
import { action, computed, flow, observable } from 'mobx';
import { EocLayoutSettings } from '@/types/src/SiteGlobalSettings';
import { type RenderOptions } from 'amis';
import type CurrentUser from '@/types/src/CurrentUser';
import { getSiteGlobalSettings } from '@/services/amis/siteSettings';
import { deepMerge } from '@/utils';
import defaultAmisEnv from '@/services/amis/AmisEnv';
import authService from '@/services/auth/authService';

const _userStore = new UserStore();

class IMainStore {
  @observable theme: 'cxd'

  @observable asideFixed: true

  @observable asideFolded: false

  @observable offScreen: false

  @observable
  settings: Partial<EocLayoutSettings> = {};

  @observable
  amisEnv: RenderOptions = { ...defaultAmisEnv } as RenderOptions

  @observable
  userStore = _userStore

  @observable
  showSettingsDrawer: boolean = false;

  @observable
  loading: boolean = false;

  /**
   * 标记站点设置是否已加载
   */
  @observable
  settingsLoaded: boolean = false;

  @observable
  settingsLoading: boolean = false;

  /**
  * 确保已从服务器获取站点配置，获取完成后保存 到settings 里
  * 配合 store.settingsLoaded=false 重置加载
  */
  loadServerSideSettings = flow(function* (this: IMainStore, userInfo?: CurrentUser) { // <- 注意*号，这是生成器函数！
    // flows 相关文档https://cn.mobx.js.org/best/actions.html#flows
    this.settingsLoading = true;
    try {
      if (!userInfo) {
        if (yield authService.isLoggedIn()) {
          userInfo = yield authService.getLocalUserInfo();
        }
      }
      //只尝试一次，不管能不能取到 直接传入到下一步
      this.userStore.user = userInfo
      return yield this.reloadSettings(userInfo)
    } catch (error) {
      console.log("loadServerSideSettings Faild.", error)
    } finally {
      return this.settings;
    }
  })


  @action
  updateSettings = (newSettingsProps: Partial<EocLayoutSettings>) => {
    deepMerge(this.settings, newSettingsProps)
  }

  @action
  reloadSettings = flow(function* (this: IMainStore, userInfo?: CurrentUser) { // <- 注意*号，这是生成器函数！
    const serverConfig = yield getSiteGlobalSettings(userInfo); //使用 yield 代替 await
    console.log('fetchServerSideSettings: from server ', serverConfig);
    this.settings = deepMerge(this.settings, serverConfig)
    this.amisEnv = deepMerge(this.amisEnv, serverConfig?.amis);
    // this.settings.menuData = []
    this.settingsLoading = false;
    this.settingsLoaded = true
    return this.settings;
  })

}

const mainStore = new IMainStore()

export { mainStore, IMainStore }; 