/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosHeaders } from 'axios'
import { downloadFile } from '..'
import { getToken } from '../auth'

import Request, { type RequestConfig } from '@bwrong/request'
import { handleNetworkError, handleShowTips } from './helper'

const { VITE_API_HOST } = import.meta.env
//接口服务器地址

// 统一配置请求返回数据类型
export type ResponseType = {
  code: number
  status: number
  message: string
  data: {
    current: number
    list: any[]
    size: number
    total: number
  }
  [key: string]: any
}
const request = new Request<ResponseType>({
  timeout: 1000, // 30000, // 超时 30S //Junn
  baseURL: VITE_API_HOST, // 接口地址
  withCredentials: false, // 是否允许带cookie
  headers: { 'Content-Type': 'application/json;charset=UTF-8' },
  // validateStatus: function () {
  // 使用async-await，处理reject情况较为繁琐，所以全部返回resolve，在业务代码中处理异常
  // return true;
  // }
  // 取消重复请求
  cancelDuplicateRequest: false,
  interceptors: {
    requestInterceptor(config) {
      // 注入认证信息
      const token = getToken()
      if (token) {
        config.headers = config.headers || ({} as AxiosHeaders)
        config.headers['Authorization'] = `Bearer ${token}`
      }
      // 如果是 formData 的数据请求，则不限制请求时间
      if (config.data instanceof FormData) {
        config.timeout = 0
      }
      return config
    },
    responseInterceptor({ data, config }) {
      // 跳过拦截器
      if ((config as RequestConfig).skipIntercept) return Promise.resolve(data)
      if (data.status === 200) {
        // 接口自动提示
        handleShowTips(data, config)
        console.log('data', data)
        return Promise.resolve(data.data)
      }
      $message.error(data.message)
      return Promise.reject(data)
    },
    responseInterceptorCatch(error) {
      // 处理网络错误
      handleNetworkError(error)
      return Promise.reject(error)
    },
  },
})

export default request

export const get = request.get.bind(request)
export const post = request.post.bind(request)
export const put = request.put.bind(request)
export const patch = request.patch.bind(request)
export const del = request.delete.bind(request)
/**
 * 下载文件
 * @param fileName 文件名
 * @param url
 * @param data
 * @param config
 * @returns
 */
export const download = (fileName: string, url: string, data?: any, config?: RequestConfig) => {
  return request
    .get<Blob>(url, data, {
      skipIntercept: true,
      skipShowTips: true,
      responseType: 'blob',
      ...config,
    })
    .then(res => downloadFile(res, fileName))
    .catch(err => {
      console.log('文件下载失败：', err)
    })
}
/**
 * 上传文件
 * @param url
 * @param data
 * @param config
 * @returns
 */
export const upload = (url: string, data?: any, config?: RequestConfig) => {
  return request.post(url, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
    ...config,
  })
}
