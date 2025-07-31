import request from "./request";
// 获取用户信息，主要为id
export function getUserInfo(uid: string) {
  return request({
    url: "/user/detail",
    params: {
      uid
    }
  });
}

// 获取用户喜欢歌单id
export function getLikeId(uid: string) {
  return request({
    url: "/user/playlist",
    params: {
      uid
    }
  });
}
