import { CurrentUser } from '@/types/src/CurrentUser';
import { isArray } from 'lodash';
import { User } from 'oidc-client-ts';
import authService from './authService';


/** 获取当前的用户 GET */
export async function getUserInfo(user?: User) {

    const oidcUser = user || await authService.getUserInfo();
    window.amisExt ??= {}
    window.amisExt.session = {
        user: oidcUser
    };
    const currentUser = await authService.getLocalUserInfo()
    return currentUser
}
