import request from '@/utils/request'
// 请求获取文章分类列表
export const artGetChannelService = () => request.get('/my/cate/list')
// 添加文章分类请求
export const artAddChannelService = (data) => {
  request.post('/my/cate/add', data)
}
// 编辑文章分类请求
export const artEditChannelService = (data) => {
  request.put('/my/cate/info', data)
}
// 删除文章分类
export const artDelChannelService = (id) => {
  request.delete('/my/cate/del', {
    params: { id }
  })
}
// 获取文章列表
export const artGetListService = (params) => {
  return request.get('/my/article/list', { params })
}
