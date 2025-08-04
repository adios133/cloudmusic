import request from "@/utils/request";

export function getLyric(id: string): AxiosResponseFormat<any> {
  return request({
    url: "/lyric",
    params: {
      id
    }
  });
}
