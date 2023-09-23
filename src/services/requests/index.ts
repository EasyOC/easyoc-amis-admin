import axios from 'axios'
import { processResponseMessage } from './processResponseMessage'
import { toast } from 'amis'
import Axios from 'axios'
import authService from '../auth/authService'
import appSettings from '../appSettings'

const defaultRequest = axios.create({
  baseURL: appSettings.apiBaseUrl, // url = base url + request url
  timeout: 1000000,
  withCredentials: false // send cookies when cross-domain requests
})

// Request interceptors
defaultRequest.interceptors.request.use(
  async (config) => {
    const token = await authService.getAccessToken()
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    return config
  },
  (error) => {
    debugger
    Promise.reject(error)
  }
)

//为axios 对象添加处理请求结果的自定义函数，比如 展开结果
defaultRequest.interceptors.response.use(response => {
  console.log('interceptors response: ', response);
  // const msg = response.data?.msg
  //处理 amis 默认提示之外的提示信息
  const errorMsgs = processResponseMessage(response?.data, true)
  if (errorMsgs && errorMsgs.length > 0) {
    return Promise.reject(errorMsgs);
  }
  // 对响应数据做点什么
  return response;
}, async error => {
  // 对响应错误做点什么
  console.log('response error: ', error);
  if (error instanceof Axios.Cancel) {
    console.error("请求已取消", error)
  }
  if (error.response) {
    if (error.response?.data?.msg) {
      const errorMsgs = processResponseMessage(error.response?.data)
      if (errorMsgs && errorMsgs.length > 0) {
        return Promise.reject(errorMsgs);
      }
    } else {
      switch (error.response?.data?.status) {
        case 400:
          toast.error("请求参数错误")
          break;
        case 401:
          toast.error("用户未登录")
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
    }

  }
  return Promise.reject(error);
});
export default defaultRequest
export { defaultRequest }
