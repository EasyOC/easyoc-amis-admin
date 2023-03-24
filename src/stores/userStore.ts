import { action, decorate, observable } from 'mobx';
import axios from 'axios';
import authService from '../services/auth/authService';
import { CurrentUser } from '../types/src/CurrentUser';
import { merge } from 'lodash';
/**
 * 管理当前用户状态
*/
class UserStore {
  userInfo: CurrentUser
  constructor() {
    this.userInfo = new CurrentUser()
  }

  //更新用户
  updateUser(userProps: Partial<CurrentUser>) {
    merge(this.userInfo, userProps)
  }
}

decorate(UserStore, {
  userInfo: observable,
  updateUser: action
});

export default new UserStore();

