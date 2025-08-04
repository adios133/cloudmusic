import request from "@/utils/request";

// 获取歌曲信息
export function getMusicInfo(ids: string): AxiosResponseFormat<any> {
  return request({
    url: "/song/detail",
    params: {
      ids
    }
  });
}
