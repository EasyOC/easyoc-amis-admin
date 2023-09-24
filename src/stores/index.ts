import UserStore from './userStore';
import { action, computed, flow, observable } from 'mobx';
import { EocLayoutSettings } from '@/types/src/SiteGlobalSettings';
import { type RenderOptions } from 'amis';
import type CurrentUser from '@/types/src/CurrentUser';
import { getSiteGlobalSettings } from '@/services/amis/siteSettings';
import { deepMerge } from '@/utils';
import defaultAmisEnv from '@/services/amis/AmisEnv';

const _userStore = new UserStore();

class IMainStore {

  @observable
  settings: Partial<EocLayoutSettings> = {};

  @observable
  amisEnv: RenderOptions = { ...defaultAmisEnv } as RenderOptions

  @observable
  userStore = _userStore

  @observable
  showSettingsDrawer?: boolean;

  @observable
  loading?: boolean;

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
      const serverConfig = yield getSiteGlobalSettings(userInfo); //使用 yield 代替 await
      console.log('fetchServerSideSettings: from server ', serverConfig);
      this.settings = deepMerge(this.settings, serverConfig)
      this.amisEnv = deepMerge(this.amisEnv, serverConfig?.amis);
      this.settingsLoaded = true
      return this.settings;
    } catch (error) {
      console.log("ensureServerSideSettings Faild.", error)
    } finally {
      this.settingsLoading = false;
      return this.settings;
    }
  })
}

const mainStore = new IMainStore()

export { mainStore, IMainStore }; 