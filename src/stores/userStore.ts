import { action, computed, decorate, observable } from 'mobx';
import authService from '../services/auth/authService';
import type { CurrentUser } from '../types/src/CurrentUser';
import { User } from 'oidc-client-ts';
import { isArray } from '@/utils';


class UserStore {

  @observable
  user: CurrentUser = null

  @computed
  get name() {
    return this.user?.name || ""
  };

  @computed
  get isAdmin() {
    return this.user?.roles?.includes("Administrator")
  }

  @observable
  isAuthenticated: boolean = false

  @action
  login(userInfo: CurrentUser) {
    this.user = userInfo
    this.isAuthenticated = true
  }

  @action
  afterLogout() {
    this.user = null
    this.isAuthenticated = false
  }

}
export default UserStore;