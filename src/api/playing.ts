import request from "./request";

// 获取歌曲信息
export function getMusicInfo(ids: string) {
  return request({
    url: "/song/detail",
    params: {
      ids
    }
  });
}
