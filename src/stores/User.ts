import { types, getEnv } from 'mobx-state-tree';
import { string } from 'mobx-state-tree/dist/internal';
export const UserStore = types
  .model('User', {
    name: '',
    displayName: '',
    avatar: '',
    userid: '',
    email: '',
    roles: types.array(string)
  })
  .views(self => ({}))
  .actions(self => {
    function updateUser(user: Partial<IUserStore>) {
      Object.assign(self, user)
    }

    return {
      updateUser
    };
  });

export type IUserStore = typeof UserStore.Type;
