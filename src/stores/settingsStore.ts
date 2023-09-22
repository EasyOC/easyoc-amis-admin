import AmisEnv from '@/services/amis/AmisEnv';
import { getSiteGlobalSettings } from '@/services/amis/siteSettings';
import type { CurrentUser } from '@/types/src/CurrentUser';
import { EocLayoutSettings } from '@/types/src/SiteGlobalSettings';
import { deepMerge } from '@/utils';
import type { RenderOptions } from 'amis';
import { action, computed, decorate, observable } from 'mobx';

class SettingsStore {
    /**
    * 当前项目的配置信息
    */
    @observable
    settings?: Partial<EocLayoutSettings>;

    @observable
    amisEnv?: RenderOptions;

    @observable
    showSettingsDrawer?: boolean;

    @observable
    accessToken?: string;

    @observable
    loading?: boolean;
    /**
     * 用于 从服务器获取站点配置，获取完成后保存 到settings 里
     */
    @action
    async fetchServerSideSettings(
        currentUser?: CurrentUser,
    ): Promise<Partial<EocLayoutSettings> | undefined> {
        const serverConfig = await getSiteGlobalSettings(currentUser);
        console.log('fetchServerSideSettings: from server ', serverConfig);
        this.settings = serverConfig
        this.amisEnv = deepMerge({ ...AmisEnv }, serverConfig?.amis);

        return serverConfig;
    }

}

export default SettingsStore