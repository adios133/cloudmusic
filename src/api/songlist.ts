import request from './request'
// 热门分类列表
export function getListCategory() {
  return request({
    url:'/playlist/hot'
  })
}

// 列表对应歌单
export function getSongList(cat='全部',offset=0,limit=50,order='hot') {
  return request({
    url:'/top/playlist',
    params:{
      cat,limit,offset,order
    }
  })
}

