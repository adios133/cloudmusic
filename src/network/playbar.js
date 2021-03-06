import request from './request'
export function getMusicUrl(id) {
  return request({
    url:'/song/url',
    params:{
      id
    }
  })
}