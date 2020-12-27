/**
 * 图片模块
 */

 import request from '@/utils/request'

 export const updataImages=(data)=>{
   return request({
     method:'POST',
     url:'/mp/v1_0/user/images',
     data
   })
 }

/**
 * 获取素材列表
 */
export const getImages = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/images',
    params
  })
}
/**
 * 收藏素材列表
 */
export const collectImage = (imageId,collect) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/user/images/${imageId}`,
    data:{collect}
  })
}
/**
 * 收藏素材列表
 */
export const deleteImg = (imageId) => {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/user/images/${imageId}`
  })
}
