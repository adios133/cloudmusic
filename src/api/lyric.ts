import request from "./request";

export function getLyric(id: string) {
  return request({
    url: "/lyric",
    params: {
      id
    }
  });
}
