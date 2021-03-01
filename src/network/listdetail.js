import request from './request'

export function getListDetail(id) {
  return request({
    url:'/playlist/detail',
    params:{
      id
    }
  })
}
export class ListInfo {
  constructor(playlist) {
    this.coverUrl = playlist.coverImgUrl;
    this.name = playlist.name;
    this.id = playlist.id
  }
}
export class CreatorInfo {
  constructor(creator) {
    this.avatar = creator.avatarUrl
    this.name = creator.nickname
    this.uid = creator.userId
  }
}