import { RenderOptions, toast } from 'amis';
import { alert, confirm } from 'amis';

import copy from 'copy-to-clipboard';
// import authService from '../auth/authService'; 
// import { wrapedResultRequest } from '../requests/axios';
import axios from 'axios';
import type { Action } from 'amis/lib/types';
import authService from '../auth/authService';
// import { umiRequest } from './umiRequest';
//自定义过滤器
import './filters'
import { unset } from 'lodash';
import { getLocale, history } from '@umijs/max';

const amisRequest = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10 * 1000,
})
//@ts-ignore
export const amisAxios = async (api: any) => {
    if (api === false) {
        return await Promise.resolve()
    }
    console.log('amisAxios api: ', api);
    const {
        url, // 接口地址
        method, // 请求方法 get、post、put、delete
        responseType,
        headers,
        // 其他配置
    } = api
    let data = api.data // 请求数据
    const config = api.config || {}

    config.withCredentials = false;
    responseType && (config.responseType = responseType);

    if (config.cancelExecutor) {
        config.cancelToken = new axios.CancelToken(
            config.cancelExecutor
        );
    }
    config.headers = headers || {};
    if (!config.ignoreToken) {
        const token = await authService.getAccessToken()
        if (token) {
            if (!config.headers) {
                config.headers = {}
            }
            // jwt token
            config.headers.Authorization = 'Bearer ' + token
        }
    }
    if (config.headers.authorization) {

        config.headers.Authorization = config.headers.authorization
        unset(config.headers, "authorization")
    }

    if (method !== 'post' && method !== 'put' && method !== 'patch') {

        if (data) {
            config.params = data;
        }
        const postResult = await amisRequest[method](url, config);
        console.log('amis env postResult.data :', postResult.data);
        return postResult.data
    } else if (data && data instanceof FormData) {

        config.headers = config.headers || {};
        config.headers['Content-Type'] = 'multipart/form-data';
    } else if (
        data &&
        typeof data !== 'string' &&
        !(data instanceof Blob) &&
        !(data instanceof ArrayBuffer)
    ) {

        data = JSON.stringify(data);
        config.headers = config.headers || {};
        config.headers['Content-Type'] = 'application/json';
    }

    const result = await amisRequest[method](url, data, config);
    console.log('amis env result.data: ', result.data);

    return result.data
}

const jumpTo = (to: string, action?: Action & { blank: boolean }, ctx?: object) => {
    console.log('jumpTo to, action, ctx: ', to, action, ctx);
    if (action?.blank) {
        window.open(to)
    } else {
        history.push(to)
    }
}


const AmisEnv = {
    locale: getLocale(),
    // fetcher: umiRequest as any,
    fetcher: amisAxios,
    // tracker: this.handleTrace, 
    jumpTo,
    updateLocation(location, replace?) {

        console.log('updateLocation location, replace?: ', location, replace);

        if (replace) {
            history.push(location)
        } else {
            window.open(location)
        }
    },
    // adaptor: (payload: any, response: any, api: any) => {
    //     if (api.redirect) {
    //         jumpTo(api.redirect)
    //     }
    //     return response
    // },
    isCancel: (value: any) => (axios as any).isCancel(value),
    notify: (type, msg: string, conf) => {
        //
        // @ts-ignore
        if (type == "infomation") {
            // eslint-disable-next-line no-param-reassign
            type = "info"
        }
        !!toast[type]
            ? toast[type](msg)
            : toast.info(msg, 5000);
        console.log('[notify]', type, msg, conf);
    },
    alert,
    confirm,
    enableAMISDebug: localStorage.getItem("enableAMISDebug") == "1",
    copy: (contents: string, options: any = {}) => {
        const ret = copy(contents, options);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        ret && (!options || options.shutup !== true) && toast.info('内容已拷贝到剪切板');
        return ret;
    },
} as RenderOptions

export default AmisEnv