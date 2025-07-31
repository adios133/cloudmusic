import request from "./request";
export function getUserList(uid: string, limit = 30, offset = 0) {
  return request({
    url: "/user/playlist",
    params: {
      uid,
      limit,
      offset
    }
  });
}
