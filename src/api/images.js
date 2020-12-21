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
