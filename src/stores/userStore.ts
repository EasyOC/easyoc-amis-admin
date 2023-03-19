import axios from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';

class UserStore {
  currentUser = null;

  constructor() {
    makeAutoObservable(this);
  }

  async login(username: string, password: string) {
    const { data } = await axios.post('/api/login', { username, password });
    runInAction(() => {
      this.currentUser = data;
    });
  }

  async logout() {
    await axios.post('/api/logout');
    runInAction(() => {
      this.currentUser = null;
    });
  }

  async fetchCurrentUser() {
    const { data } = await axios.get('/api/current_user');
    runInAction(() => {
      this.currentUser = data;
    });
  }
}

const userStore = new UserStore();

export default userStore;
