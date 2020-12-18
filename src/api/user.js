/**
 * 用户相关模块
 *
 */
import request from '@/utils/request'

//  用户登录
// export const login = data => {
//  return request({
//     method: 'POST',
//     url: 'mp/v1_0/authorizations',
//     data
//   })
// }
export const login = (data) => {
  return request({
    method: 'POST',
    url: 'mp/v1_0/authorizations',
    data: data
  })
}
//  获取用户信息
export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/profile'

  })
}
//  修改用户信息
