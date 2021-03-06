import request from './request'

// 获取歌曲信息
export function getMusicInfo(ids) {
  return request({
    url:'/song/detail',
    params:{
      ids
    }
  })
}