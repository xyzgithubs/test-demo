/**
 * 基于axios封装的请求模块
 */

import axios from 'axios'
import JSONbig from 'json-bigint'
// axios.get()
// 创建一个axios实例 == 复制了一个axios
// 通过这个实例去发请求
const request = axios.create({
    // baseURL: 'http://ttapi.research.itcast.cn/',
  baseURL: 'http://api-toutiao-web.itheima.net/',
  // 定制 axios 返回的数据操作
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理
    try {
      return JSONbig.parse(data)
    }catch(err){
      return data
    }

  }]
})

// 请求拦截器

request.interceptors.request.use(function (config) {
  const user = JSON.parse(window.localStorage.getItem('user'))
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
})

// 响应拦截
// axios.interceptors.response.use(function (response) {
//   return response;
// }, function (error) {
//   return Promise.reject(error);
// });

// 导出请求方法
export default request

// 谁要使用谁就加载 request 模块
// import request from 'request.js'
// request.xxx
