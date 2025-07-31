import request from "./request";
export function getRecent(uid: string, type = 1) {
  return request({
    url: "/user/record",
    params: {
      uid,
      type
    }
  });
}
