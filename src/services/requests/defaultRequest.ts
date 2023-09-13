import axios from 'axios';
import authService from '../auth/authService'
import AppSettings from '../appSettings'
import { toast } from 'amis'
import { processResponseMessage } from './processResponseMessage'
//创建一个 axios 对象
const defaultRequest = axios.create({
    baseURL: AppSettings.apiBaseUrl,
    timeout: 5000//5秒超时
});

//为axios 对象添加发送请求前的自定义函数，比如添加token
defaultRequest.interceptors.request.use(async config => {
    config.headers = config.headers || {}

    //明确指定不需要登录检查
    if (config.withCredentials !== false) {
        if (!await authService.isLoggedIn()) {
            //@ts-ignore
            window.location = AppSettings.loginPage;
        }
        const token = await authService.getAccessToken()
        // jwt token
        config.headers.Authorization = 'Bearer ' + token;
    }

    config.withCredentials = false

    return config;
}, error => {
    // 对响应错误做点什么

    return Promise.reject(error);
});

//为axios 对象添加处理请求结果的自定义函数，比如 展开结果
defaultRequest.interceptors.response.use(response => {
    const msg = response.data.msg
    if (msg) {
        console.log("messages 响应头", msg)
        response.data.msg = msg;
        processResponseMessage(msg)
    }
    // 对响应数据做点什么
    return response.data;
}, async error => {
    // 对响应错误做点什么
    if (error.response) {
        switch (error.response.status) {
            case 400:
                toast.error("请求参数错误")
                break;
            case 401:
                toast.error("用户未登录11")
                await authService.goLogin(window.location.href)
                break;
            case 403:
                toast.error("用户无权限")
                break;
            case 404:
                toast.error("请求资源不存在")
                break;
            case 500:
                toast.error("服务器内部错误")
                break;
            default:
                toast.error("请求错误")
                break;
        }
    } else {
        toast.error("网络错误")
    }
    return Promise.reject(error);
});

export default defaultRequest;

