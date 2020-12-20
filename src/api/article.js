/**
 * 获取文章列表
 */

 import request from '@/utils/request'

// 文章列表
export const getArticle = (params)=>{
  return request({
    method:'GET',
    url:'/mp/v1_0/articles',
    params
  })
}
// 文章频道
export const getArticleChannels = (params)=>{
  return request({
    method:'GET',
    url:'/mp/v1_0/channels',
    params
  })
}
// 删除
export const deleteArticle = (articleDeleteId)=>{
  return request({
    method:'DELETE',
    url:`/mp/v1_0/articles/${articleDeleteId}`,
  })
}
// 添加
export const addArticle = (data,draft)=>{
  return request({
    method:'POST',
    url:'/mp/v1_0/articles',
    params:{
      draft
    },
    data

  })
}
// 获取指定文章
export const getArticleID = (articleId)=>{
  return request({
    method:'GET',
    url:`/mp/v1_0/articles/${articleId}`

  })
}

// 编辑文章（修改）
export const updataArticle = (articleId,data,draft)=>{
  return request({
    method:'PUT',
    url:`/mp/v1_0/articles/${articleId}`,
    params:{
      draft
    },
    data

  })
}
