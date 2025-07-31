import request from "./request";
export function getMusicUrl(id: string) {
  return request({
    url: "/song/url",
    params: {
      id
    }
  });
}
