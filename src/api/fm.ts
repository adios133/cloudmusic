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
export function getMusicInfo(ids) {
  return request({
    url:'/song/detail',
    params:{
      ids
    }
  })
}

export function likeSong(id,like) {
  return request({
    url:'/like',
    params:{
      id,like
    }
  })
}
export function trashSong(id) {
  return request({
    url:'/fm_trash',
    params:{
      id
    }
  })
}