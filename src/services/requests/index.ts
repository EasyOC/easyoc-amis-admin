// axios配置  可自行根据项目进行更改，只需更改该文件即可，其他文件可以不动
// The axios configuration can be changed according to the project, just change the file, other files can be left unchanged

import type { AxiosResponse } from 'axios'
import {
  RequestOptions, RequestResult, RequestEnum,
  ResultEnum, ContentTypeEnum
} from '@/types'
import type { AxiosTransform, CreateAxiosOptions } from './axiosTransform'
import { toast } from 'amis';
import { VAxios } from './Axios'
import { checkStatus } from './checkStatus'
import {
  isString,
  isFunction,
  deepMerge,
  setObjToUrlParams,
} from '@/utils'
import { joinTimestamp, formatRequestDate } from './helper'
// import useI18n from '@/utils/useI18n'
import authService from '@/services/auth/authService'
import { processResponseMessage } from './processResponseMessage'
import { clone } from 'lodash'
import AppSettings from '@/services/appSettings';
/**
 * @description: 数据处理，方便区分多种处理方式
 */
const transform: AxiosTransform = {
  /**
   * @description: 处理请求数据。如果数据不是预期格式，可直接抛出错误
   */
  transformRequestHook: (
    res: AxiosResponse<RequestResult>,
    options: RequestOptions,
  ) => {
    const { isTransformResponse, isReturnNativeResponse } = options
    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    if (isReturnNativeResponse) {
      return res
    }

    // 不进行任何处理，直接返回
    // 用于页面代码可能需要直接获取code，data，message这些信息时开启
    if (!isTransformResponse) {
      return res.data
    }
    // 错误的时候返回

    const { data } = res
    if (!data) {
      // return '[HTTP] Request has no return value';
      throw new Error('api Request Failed')
    }
    //  这里 code，result，message为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
    const { statusCode, data: result, msg, succeeded } = data as any

    // 这里逻辑可以根据项目进行修改
    const hasSuccess = succeeded && statusCode === ResultEnum.SUCCESS
    if (hasSuccess) {
      return result
    }

    // 在此处根据自己项目的实际情况对不同的code执行不同的操作
    // 如果不希望中断当前请求，请return数据，否则直接抛出异常即可
    let timeoutMsg = ''
    switch (statusCode) {
      case ResultEnum.TIMEOUT:
        toast.error("请求超时");
        break
      default:
        if (msg) {
          timeoutMsg = msg
          toast.error(msg);
        }
    }
    throw new Error(timeoutMsg || 'api Request Failed!')
  },

  // 请求之前处理config
  beforeRequestHook: (config, options) => {
    console.log("111111111111  beforeRequestHook")
    const { apiUrl, joinParamsToUrl, formatDate, joinTime = true } = options

    if (apiUrl) {
      const _apuUrl = isString(apiUrl)
        ? apiUrl
        : isFunction(apiUrl)
          ? apiUrl?.()
          : ''
      config.url = `${_apuUrl}${config.url}`
    }
    const params = config.params || {}
    const data = config.data || false
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    formatDate && data && !isString(data) && formatRequestDate(data)
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(
          params || {},
          joinTimestamp(joinTime, false),
        )
      } else {
        // 兼容restful风格
        config.url = config.url + params + `${joinTimestamp(joinTime, true)}`
        config.params = undefined
      }
    } else {
      if (!isString(params)) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        formatDate && formatRequestDate(params)
        if (
          Reflect.has(config, 'data') &&
          config.data &&
          Object.keys(config.data).length > 0
        ) {
          config.data = data
          config.params = params
        } else {
          // 非GET请求如果没有提供data，则将params视为data
          config.data = params
          config.params = undefined
        }
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(
            config.url as string,
            Object.assign({}, config.params, config.data),
          )
        }
      } else {
        // 兼容restful风格
        config.url = config.url + params
        config.params = undefined
      }
    }
    return config
  },

  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors: async (config, options) => {
    // 请求之前处理config

    if (config) {
      if (!config.headers) {
        config.headers = {}
      }
      //@ts-ignore
      if (config?.dataType == "form-data" || config?.body?.file instanceof File) {
        config.headers['Content-Type'] = ContentTypeEnum.FORM_DATA
      }
      //明确指定不需要登录检查
      if (options.requestOptions?.withToken != false) {
        if (!await authService.isLoggedIn()) {
          toast.error("用户未登录")
          await authService.goLogin(window.location.href)
        }
        const token = await authService.getAccessToken()
        if (token) {
          // jwt token
          config.headers.Authorization = `${options.authenticationScheme} ${token}`
        }
      }
    }

    return config
  },

  /**
   * @description: 响应拦截器处理
   */
  responseInterceptors: (res: AxiosResponse<any>) => {
    console.log('响应头res: ', res);
    try {
      const msg = res.data.msg
      if (msg) {
        console.log("messages 响应头", msg)
        res.data.msg = msg;
        processResponseMessage(msg)
      }
    } catch (error) {
      console.warn("message 响应头处理失败", error, res.config)
    }

    // if (has(res, "data.data.data")) {
    //   res.data.data = {
    //     ...res.data.data.data,
    //   }
    //   unset(res, "data.data.data")
    //   console.log("自动处理过多的data层级", res)
    // }
    console.log('响应拦截器处理: ', res);
    if (res.data.data) {
      return {
        ...res.data,
        data: res.data.data,
      }
    }
    if (res.data.data) {
      return {
        ...res.data,
        ...res.data.data,
        data: res.data.data,
      }
    }
    return res.data
  },

  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: (error: any) => {
    console.error("responseInterceptorsCatch", error)
    const { response, code, message: message1, msg } = error.data || error || {}
    const err: string = error?.toString?.() ?? ''
    let errMessage = ''
    if (msg && !isString(msg)) {
      processResponseMessage(msg)
    } else {
      const localMsg = msg || message1
      // eslint-disable-next-line no-useless-catch
      try {
        if (code === 'ECONNABORTED' && localMsg.indexOf('timeout') !== -1) {
          errMessage = "请求超时"
        }
        if (err?.includes('Network Error')) {
          errMessage = '网络错误'
        }

        if (errMessage) {
          toast.error(errMessage)
          return Promise.reject(error)
        }
      } catch (err1) {
        throw err1
      }
      checkStatus(response?.status, localMsg || '')
    }
    return Promise.reject(error)
  },
}

export const createAxios = (opt?: Partial<CreateAxiosOptions>) => {
  const config = new VAxios(
    deepMerge(
      {
        // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes
        // authentication schemes，e.g: Bearer
        authenticationScheme: 'Bearer',
        // authenticationScheme: '',
        timeout: 10 * 1000,
        // 基础接口地址
        baseURL: AppSettings.apiBaseUrl,
        headers: { 'Content-Type': ContentTypeEnum.JSON },
        // 如果是form-data格式
        // headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
        // 数据处理方式
        transform: clone(transform),
        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
          // 是否返回原生响应头 比如：需要获取响应头时使用该属性
          isReturnNativeResponse: false,
          // 需要对返回数据进行处理
          isTransformResponse: true,
          // post请求的时候添加参数到url
          joinParamsToUrl: false,
          // 格式化提交参数时间
          formatDate: true,
          // 消息提示类型
          errorMessageMode: 'message',
          //  是否加入时间戳
          joinTime: true,
          // 忽略重复请求
          ignoreCancelToken: true,
          // 是否携带token
          withToken: true,
        },
      },
      opt || {},
    ),
  )
  return config;
}

/**
 * 处理 axiosResult.data.data
 */
export const defaultRequest = createAxios({
  requestOptions: {
    isReturnNativeResponse: true,
    isTransformResponse: true,
  }
})

export const nativeRquest = createAxios({
  requestOptions: {
    isReturnNativeResponse: true,
    isTransformResponse: false
  }
})



