import { RenderOptions, toast } from 'amis';
import { alert, confirm } from 'amis';
import { currentLocale } from 'i18n-runtime';

import copy from 'copy-to-clipboard';
import axios from 'axios';
import authService from '../auth/authService';
// import { umiRequest } from './umiRequest';
//自定义过滤器
import './filters'
import { unset } from 'lodash';

const amisRequest = axios.create({
    baseURL: import.meta.env.VITE_apiRoot,
    timeout: 10 * 1000,
})
// //@ts-ignore
// export const amisAxios = async (api: any) => {
//     if (api === false) {
//         return await Promise.resolve()
//     }
//     console.log('amisAxios api: ', api);
//     const {
//         url, // 接口地址
//         method, // 请求方法 get、post、put、delete
//         responseType,
//         headers,
//         // 其他配置
//     } = api
//     let data = api.data // 请求数据
//     const config = api.config || {}

//     config.withCredentials = false;
//     responseType && (config.responseType = responseType);

//     if (config.cancelExecutor) {
//         config.cancelToken = new axios.CancelToken(
//             config.cancelExecutor
//         );
//     }
//     config.headers = headers || {};
//     if (!config.ignoreToken) {
//         const token = await authService.getAccessToken()
//         if (token) {
//             if (!config.headers) {
//                 config.headers = {}
//             }
//             // jwt token
//             config.headers.Authorization = 'Bearer ' + token
//         }
//     }
//     if (config.headers.authorization) {

//         config.headers.Authorization = config.headers.authorization
//         unset(config.headers, "authorization")
//     }

//     if (method !== 'post' && method !== 'put' && method !== 'patch') {

//         if (data) {
//             config.params = data;
//         }
//         const postResult = await (amisRequest as any)[method](url, config);
//         console.log('amis env postResult.data :', postResult.data);
//         return postResult.data
//     } else if (data && data instanceof FormData) {

//         config.headers = config.headers || {};
//         config.headers['Content-Type'] = 'multipart/form-data';
//     } else if (
//         data &&
//         typeof data !== 'string' &&
//         !(data instanceof Blob) &&
//         !(data instanceof ArrayBuffer)
//     ) {

//         data = JSON.stringify(data);
//         config.headers = config.headers || {};
//         config.headers['Content-Type'] = 'application/json';
//     }

//     const result = await (amisRequest as any)[method](url, data, config);
//     console.log('amis env result.data: ', result.data);

//     return result.data
// }


const AmisEnv = {
    theme: 'cxd',
    locale: currentLocale(),
    fetcher: async ({
        url,
        method,
        data,
        config,
        responseType,
        headers
    }: any) => {
        config = config || {};

        config.withCredentials = false;
        responseType && (config.responseType = responseType);

        if (config.cancelExecutor) {
            config.cancelToken = new axios.CancelToken(config.cancelExecutor);
        }
        config.headers = config.headers || headers || {};

        if (!config.ignoreToken) {
            const token = await authService.getAccessToken();
            if (token) {
                if (!config.headers) {
                    config.headers = {};
                }
                // jwt token
                config.headers.Authorization = 'Bearer ' + token;
            }
        }
        if (config.headers.authorization) {
            config.headers.Authorization = config.headers.authorization;
            unset(config.headers, 'authorization');
        }

        if (method !== 'post' && method !== 'put' && method !== 'patch') {
            if (data) {
                config.params = data;
            }
            return (amisRequest as any)[method](url, config);
        } else if (data && data instanceof FormData) {
            // config.headers = config.headers || {};
            // config.headers['Content-Type'] = 'multipart/form-data';
        } else if (
            data &&
            typeof data !== 'string' &&
            !(data instanceof Blob) &&
            !(data instanceof ArrayBuffer)
        ) {
            data = JSON.stringify(data);
            config.headers['Content-Type'] = 'application/json';
        }

        return (amisRequest as any)[method](url, data, config);
    },
    isCancel: (e: any) => axios.isCancel(e),
    notify: (type: 'success' | 'error' | 'info', msg: string) => {
        // @ts-ignore
        if (type == 'infomation') {
            // eslint-disable-next-line no-param-reassign
            type = 'info';
        }
        toast[type]
            ? toast[type](msg, type === 'error' ? '系统错误' : '系统消息')
            : console.warn('[Notify]', type, msg);
        console.log('[notify]', type, msg);
    },
    enableAMISDebug: localStorage.getItem('enableAMISDebug') == '1',
    alert,
    confirm,
    copy: (contents: string, options: any = {}) => {
        const ret = copy(contents, options);
        ret &&
            (!options || options.shutup !== true) &&
            toast.info('内容已拷贝到剪切板');
        return ret;
    }
}
// as RenderOptions

export default AmisEnv