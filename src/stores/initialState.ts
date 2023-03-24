import { observable } from 'mobx';

export const initialState = observable({
    // add your initial state properties here
    /**
     *  用于从服务获取当前登录的用户信息，获取完成后保存到 currentUser 属性里
     */
    fetchUserInfo: async () => {
        const response = await fetch('/api/user');
        const data = await response.json();
        initialState.currentUser = data;
    },
    /**
     * 用于 从服务器获取站点配置，获取完成后保存 到settings 里
     */
    fetchServerSideSettings: async () => {
        const response = await fetch('/api/settings');
        const data = await response.json();
        initialState.settings = data;
    },
    /**
     * 当前用户信息
     */
    currentUser: null,
    /**
     * 当前项目的配置信息
     */
    settings: null

});


