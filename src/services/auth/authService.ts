/* eslint-disable */
import { User, UserManager, UserManagerSettingsStore, WebStorageStateStore } from 'oidc-client-ts';
import AppSettings from '../appSettings';
import { routerPathName } from '@/utils/urlHelper';
import CurrentUser from '@/types/src/CurrentUser';
import { isArray } from 'lodash';


export const initUserManager = () => {
  const config = {
    userStore: new WebStorageStateStore({ prefix: `oidc_${AppSettings.clientId}_` }),
    authority: AppSettings.apiBaseUrl,
    client_id: AppSettings.clientId,
    redirect_uri: AppSettings.clientRoot + '/auth/redirect',
    post_logout_redirect_uri: AppSettings.clientRoot + '/auth/logout_redirect',
    scope: "openid profile email roles offline_access",
    filterProtocolClaims: true,
    loadUserInfo: true,
    automaticSilentRenew: true,
    response_type: 'code',
  } as UserManagerSettingsStore
  console.log('config: ', config);

  var client = new UserManager({ ...config })
  client.events.addUserSignedIn(async function () {
    console.log('UserSignedIn :', arguments);
  })

  client.events.addUserLoaded((user) => {
    console.log('New User Loaded：', user);
    // console.log('Acess_token: ', user.access_token)
  });

  client.events.addAccessTokenExpiring(function () {
    console.log('AccessToken Expiring：', arguments);
  });

  client.events.addAccessTokenExpired(function () {
    //alert('Session expired. Going out!');
    // alert('Session expired. Going Renew!');
    client.startSilentRenew()
    // oidcClient.signoutRedirect().then(function (resp) {
    //   console.log('signed out', resp);
    // }).catch(function (err) {
    //   console.log(err)
    // })
  });

  client.events.addSilentRenewError(function () {
    console.error('Silent Renew Error：', arguments);
  });

  client.events.addUserSignedOut(function () {
    //alert('Going out!');
    console.log('UserSignedOut：', arguments);
    client.signoutRedirect().then(function (resp) {
      console.log('signed out', resp);
    }).catch(function (err) {
      console.log(err)
    })
  });
  return client;
}


let oidcClient: UserManager
oidcClient = initUserManager()


let authService = {
  get client() {
    return oidcClient;
  },
  async goLogin(redirect: string = '') {
    oidcClient.removeUser();
    oidcClient.clearStaleState();
    localStorage.setItem('returnUrl', redirect);
    await oidcClient.signinRedirect(); // Returns promise to trigger a redirect of the current window to the authorization endpoint.
  },

  async isLoggedIn() {
    const user = await this.getUserInfo();
    const userCurrent = !!user && !user.expired;
    return userCurrent;
  },

  async getUserInfo() {
    return await oidcClient.getUser();
  },
  async getLocalUserInfo(oidcUser?: User) {
    oidcUser ??= await oidcClient.getUser();
    let currentUser: CurrentUser = {
      displayName: oidcUser?.profile?.name,
      name: oidcUser?.profile?.name,
      avatar: '',//url?.length > 0 ? url[0] : '',
      // userid:  oidcUser?.profile
      email: oidcUser?.profile?.email,
      roles: []
    };


    if (oidcUser?.profile?.roles) {
      if (isArray(oidcUser?.profile.roles)) {
        currentUser.roles?.push(...(oidcUser?.profile.roles as Array<string>))
      } else {
        currentUser.roles?.push(oidcUser?.profile?.roles as string)
      }
    }
    return currentUser;
  }
  ,
  async completeLogin() {
    console.log('completeLogin user ');
    const user = await oidcClient.signinRedirectCallback(); // Returns promise to process response from the authorization endpoint. The result of the promise is the authenticated User
    console.log('completeLogin user: ', user);
    await oidcClient.storeUser(user);
    console.log('completeLogin', user)
    return user;
  },

  async logout() {
    const { search } = window.location;
    const redirect = routerPathName() + (search || "");
    localStorage.setItem('returnUrl', redirect || "/")
    await oidcClient.signoutRedirect(); // Returns promise to trigger a redirect of the current window to the end session endpoint.
  },

  async completeLogout() {
    return await oidcClient.signoutRedirectCallback(); // Returns promise to process response from the end session endpoint.
  },

  async getAccessToken() {
    const user = await oidcClient.getUser(); // Returns promise to load the User object for the currently authenticated user.
    return !!user && !user.expired ? user.access_token : null
  },
  async signinPopupCallback() {
    return oidcClient.signinPopupCallback();
  },
  async signinPopup() {
    return oidcClient.signinPopup();
  },
  // signinPopup=oidcClient.signinPopup
}

export default authService

