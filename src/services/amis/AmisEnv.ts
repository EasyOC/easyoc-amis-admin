import { RenderOptions, toast } from 'amis';
import { alert, confirm } from 'amis';
import copy from 'copy-to-clipboard';
import axios from 'axios';
import authService from '../auth/authService';
import { attachmentAdpator, makeTranslator, extendLocale, ActionObject } from 'amis-core';
//自定义过滤器
import './filters';
import { currentLocale } from 'i18n-runtime';
import zhCN from '@/locales/zh-CN';
import enUS from '@/locales/en-US';
import defaultRequest from '../requests';

// const amisRequest = nativeRquest
export const amisRequest = defaultRequest;
const currentLang = currentLocale();
const $t = makeTranslator(currentLang);

switch (currentLang) {
    case 'en-US':
        extendLocale(currentLang, enUS);
        break;
    case 'zh-CN':
    default:
        extendLocale(currentLang, zhCN);
        break;
}

const buildResponse = (response) => {
    if (response.headers['content-disposition']) {
        return response;
    } else {
        console.log('amis env result: ', response);
        return response.data ?? response;
    }
};

export const amisAxios = async (api: any) => {
    if (api === false) {
        return await Promise.resolve();
    }
    //检查使用本地数据
    if (api.useLocal === true) {
        if (api.getData) return api.getData();
        else {
            return api.data;
        }
    }
    console.log('amisAxios api: ', api);
    const {
        url, // 接口地址
        method, // 请求方法 get、post、put、delete
        responseType,
        headers,
        // 其他配置
    } = api;
    let data = api.data; // 请求数据
    const config = api.config || {};

    config.withCredentials = false;
    responseType && (config.responseType = responseType);

    if (config.cancelExecutor) {
        config.cancelToken = new axios.CancelToken(config.cancelExecutor);
    }
    config.headers = headers || {};
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

    if (method !== 'post' && method !== 'put' && method !== 'patch') {
        if (data) {
            config.params = data;
        }

        let response = await amisRequest[method](url, config);
        console.log('response: ', response);
        response = await attachmentAdpator(response, $t);

        return buildResponse(response);
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
    let response = await amisRequest[method](url, data, config);

    // console.log('response: ', response);
    // processResponseMessage(response.data?.msg)
    response = await attachmentAdpator(response, $t);

    return buildResponse(response);
};


export const getAmisEnvTheme = (checkOnly?) => {
    let theme = localStorage.getItem('amis-theme');
    if (checkOnly && !theme) {
        theme = 'cxd';
        localStorage.setItem('amis-theme', theme);
    }
    return theme
}
export const setAmisEnvTheme = (theme) => {
    localStorage.setItem('amis-theme', theme);
}


//由于引入了一些antd 组件，保持风格一致
let theme = getAmisEnvTheme()



const AmisEnv = {
    //当前语言
    locale: currentLang,
    //翻译方法
    translate: $t,
    theme: theme,
    fetcher: amisAxios,
    isCancel: (value: any) => (axios as any).isCancel(value),
    notify: (type: 'success' | 'error' | 'info', msg: string, conf) => {
        if (!msg || msg == '暂无数据') {
            console.log('[notify]', type, msg, conf);
            return;
        }
        // @ts-ignore
        if (type == 'infomation') {
            // eslint-disable-next-line no-param-reassign
            type = 'info';
        }
        !!toast[type] ? toast[type](msg) : toast.info(msg, conf);
        console.log('[notify]', type, msg, conf);
    },
    alert,
    confirm,
    enableAMISDebug: localStorage.getItem('enableAMISDebug') == '1',
    copy: (
        contents: string,
        options: {
            debug?: boolean;
            message?: string;
            format?: string; // MIME type
            onCopy?: (clipboardData: object) => void;
            shutup?: boolean;
        } = {},
    ) => {
        const ret = copy(contents, options);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        ret && (!options || options.shutup !== true) && toast.info('内容已拷贝到剪切板');
        return ret;
    },
} as RenderOptions;
console.log('AmisEnv: ', AmisEnv);

export default AmisEnv;
