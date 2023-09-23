import { CurrentUser } from '@/types/src/CurrentUser';
import { isArray, merge } from 'lodash';
import { User } from 'oidc-client-ts';
import authService from './authService';


/** 获取当前的用户 GET */
export async function getUserInfo(user?: User) {

    const oidcUser = user || await authService.getUserInfo();
    const currentUser = await authService.getLocalUserInfo(oidcUser)
    window.amisExt = merge({ ...window.amisExt },
        {
            session: {
                user: oidcUser
            }
        });
    return currentUser
}
