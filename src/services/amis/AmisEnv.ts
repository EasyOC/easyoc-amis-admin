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
import AppSettings from '../appSettings';

const amisRequest = axios.create({
    baseURL: AppSettings.API_BASE_URL,
    timeout: 10 * 1000,
})

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