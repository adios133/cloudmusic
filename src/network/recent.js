import request from './request'
export function getRecent(uid,type=1) {
  return request({
    url:'/user/record',
    params:{
      uid,type
    }
  })
}