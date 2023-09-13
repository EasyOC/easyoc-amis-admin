import { action, computed, decorate, observable } from 'mobx';
import authService from '../services/auth/authService';
import { CurrentUser } from '../types/src/CurrentUser';
import { User } from 'oidc-client-ts';
import { isArray } from '@/utils';
import { getUserInfo } from '@/services/auth';


class UserStore {

  @observable
  user: CurrentUser


  @computed
  get name() {
    return this.user?.name || ""
  };



  @action
  async isAuthenticated() {
    return await authService.isLoggedIn();
  }

  @action
  async login() {
    await authService.goLogin()
  }
  // add your initial state properties here
  /**
   *  用于从服务获取当前登录的用户信息，获取完成后保存到 currentUser 属性里
   */
  @action
  async fetchUserInfo() {
    this.user = await getUserInfo();
    return this.user;
  }


  @action
  async logout() {
    localStorage.setItem('authenticated', '');
    await authService.logout();
  }

}
export default UserStore;