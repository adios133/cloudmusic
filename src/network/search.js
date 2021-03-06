import request from './request'

// 获取热搜列表
export function getHotSearch() {
  return request({
    url:'/search/hot/detail'
  })
}

// 搜索接口
export function searchSong(keywords) {
  return request({
    url:'/search',
    params: {
      keywords
    }
  })
}