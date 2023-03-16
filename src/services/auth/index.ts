// @ts-ignore
/* eslint-disable */
import { ContentTypeEnum } from '@/types';
import { isArray } from 'lodash';
import { User } from 'oidc-client-ts';
import { wrapedResultRequest } from '../requests/axios';
import { getAppConfig } from '../requests/urlHelper';
import authService from './authService';
import tokenStore, { TokenResult } from './tokenStore';


/** 获取当前的用户 GET */
export async function getUserInfo(user?: User) {
    console.log("start getUser Info currentUser")

    // const result = await excuteGraphqlGetQuery({
    //     query: `{
    //       me {
    //         ... on UserProfile {
    //           userProfile {
    //             avatar {
    //               urls
    //             }
    //             firstName
    //             lastName
    //           }
    //           author
    //           contentItemId
    //           userId
    //           contentType
    //           createdUtc
    //           displayText
    //           userName
    //           email
    //           latest
    //           modifiedUtc
    //           owner
    //         }
    //       }
    //     }`,
    // })

    // console.log('resultme: ', result);
    // const me = result.me;
    // const url = me?.userProfile?.avatar?.urls;
    const oidcUser = user || await authService.getUserInfo();
    const currentUser: API.CurrentUser = {
        displayName: oidcUser?.profile?.name,
        name: oidcUser?.profile?.name,
        avatar: '',//url?.length > 0 ? url[0] : '',
        // userid:  oidcUser?.profile
        email: oidcUser?.profile?.email,
        roles: []
    };
    // if (me.userProfile?.lastName && me.userProfile.lastName) {
    //     currentUser.displayName = `${me.userProfile.firstName}, ${me.userProfile.lastName} - ${me.userName}`;
    // }
    ////

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



/** 登录接口 POST   */
export async function login(body: API.LoginParams) {
    var appConfig = getAppConfig()
    var result = await wrapedResultRequest.request<API.LoginResult>({
        url: '/connect/token',
        headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
        method: 'POST',
        data: {
            grant_type: 'password',
            client_id: appConfig.clientId,
            username: body.username,
            password: body.password,
            rememberMe: body.autoLogin,
            scope: 'openid profile roles offline_access',
        }
    });

    if (result) {
        console.log('result:1111111111111 ', result);
        // @ts-ignore

        authService.storeUser(result)
        tokenStore.saveToken(result as TokenResult)
        return { status: 'ok' }
    }
    else {
        return { status: 'faild' }
    }
}


/** OIDC 登录接口 POST /mock/api/login/oidc */
// export async function oidcLogin(body: API.LoginParams, options?: { [key: string]: any }) {
//     return request.request<API.LoginResult>('/connect/token', {
//         method: 'POST',
//         headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
//         data: {
//             grant_type: 'password',
//             client_id: CLIENT_ID,
//             username: body.username,
//             password: body.password,
//             rememberMe: body.autoLogin,
//             scope: 'openid profile roles offline_access',
//         },
//         ...(options || {}),
//     });
// }

/** 此处后端没有提供注释 GET /mock/api/notices */
export async function getNotices(options?: { [key: string]: any }) {
    return wrapedResultRequest.request<API.NoticeIconList>({
        url: '/mock/api/notices',
        method: 'GET',
        ...(options || {}),
    });
}

/** 获取规则列表 GET /mock/api/rule */
export async function rule(
    params: {
        // query
        /** 当前的页码 */
        current?: number;
        /** 页面的容量 */
        pageSize?: number;
    },
    options?: { [key: string]: any },
) {
    return wrapedResultRequest.request<API.RuleList>({
        url: '/mock/api/rule',
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}

/** 新建规则 PUT /mock/api/rule */
export async function updateRule(options?: { [key: string]: any }) {
    return wrapedResultRequest.request<API.RuleListItem>({
        url: '/mock/api/rule',
        method: 'PUT',
        ...(options || {}),
    });
}

/** 新建规则 POST /mock/api/rule */
export async function addRule(options?: { [key: string]: any }) {
    return wrapedResultRequest.request<API.RuleListItem>({
        url: '/mock/api/rule',
        method: 'POST',
        ...(options || {}),
    });
}

/** 删除规则 DELETE /mock/api/rule */
export async function removeRule(options?: { [key: string]: any }) {
    return wrapedResultRequest.request<Record<string, any>>({
        url: '/mock/api/rule',
        method: 'DELETE',
        ...(options || {}),
    });
}
