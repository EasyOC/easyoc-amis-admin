import { action, computed, decorate, observable } from 'mobx';
import authService from '../services/auth/authService';
import type { CurrentUser } from '../types/src/CurrentUser';
import { User } from 'oidc-client-ts';
import { isArray } from '@/utils';
import { getUserInfo } from '@/services/auth';


class UserStore {

  @observable
  user: CurrentUser = null

  @computed
  get name() {
    return this.user?.name || ""
  };

  @observable
  isAuthenticated: boolean = false

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
    return await getUserInfo();
  }


  @action
  resetUserInfo() {
    this.user = null
    this.isAuthenticated = false
  }

}
export default UserStore;