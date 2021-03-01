import request from './request'

// 获取排行榜数据
export function getRank() {
  return request({
    url:'/toplist/detail'
  })
}