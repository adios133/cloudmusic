import request from './request'

export function getFm() {
  const timestamp = +new Date()
  return request({
    url:'/personal_fm',
    params:{
      timestamp
    }
  })
}