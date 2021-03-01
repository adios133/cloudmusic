import request from './request'

export function getVideoCate() {
  return request({
    url:'/video/category/list'
  })
}

// 获取分类对应视频列表id
export function getViedoList(id,offset=0) {
  return request({
    url:'/video/group',
    params:{
      id,offset
    }
  })
}

// 获取video播放url
export function getVideoUrl(id) {
  return request({
    url:'/video/url',
    params:{
      id
    }
  })
}