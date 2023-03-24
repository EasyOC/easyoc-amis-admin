import { CurrentUser } from '@/types/src/CurrentUser';
import { isArray } from 'lodash';
import { User } from 'oidc-client-ts';
import authService from './authService';


/** 获取当前的用户 GET */
export async function getUserInfo(user?: User) {

    const oidcUser = user || await authService.getUserInfo();
    const currentUser: CurrentUser = {
        displayName: oidcUser?.profile?.name,
        name: oidcUser?.profile?.name,
        avatar: '',//url?.length > 0 ? url[0] : '',
        // userid:  oidcUser?.profile
        email: oidcUser?.profile?.email,
        roles: []
    };
    if (oidcUser.profile?.lastName && oidcUser.profile?.lastName) {
        currentUser.displayName = `${oidcUser.profile.firstName}, ${oidcUser.profile.lastName} - ${oidcUser.profile.userName}`;
    }
    //

    if (oidcUser?.profile?.roles) {
        if (isArray(oidcUser?.profile.roles)) {
            currentUser.roles?.push(...(oidcUser?.profile.roles as Array<string>))
        } else {
            currentUser.roles?.push(oidcUser?.profile?.roles as string)
        }
    }

    console.log('userinfo result: ', currentUser);
    return currentUser
}
