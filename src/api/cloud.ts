import request from './request'

export function getCloudMusic(limit=100,offset=0) {
  return request({
    url:'/user/cloud',
    params:{
      limit,offset
    }
  })
}