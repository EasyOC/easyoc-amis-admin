import { action, computed, decorate, observable } from 'mobx';

class SettingsStore {
    /**
    * 当前项目的配置信息
    */
    @observable
    settings: string
    /**
     * 用于 从服务器获取站点配置，获取完成后保存 到settings 里
     */
    @action
    async fetchServerSideSettings() {
        const response = await fetch('/api/settings');
        const data = await response.json();
        this.settings = data;
    }
}

export default SettingsStore