import request from './request'

export function getUserId() {
  // 加上时间戳，使得每次请求不同
  const timestamp = +new Date()
  return request({
    url:'/user/account?timestamp='+ timestamp
  })
}