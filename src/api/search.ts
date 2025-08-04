import request from "@/utils/request";

// 获取热搜列表
export function getHotSearch(): AxiosResponseFormat<any> {
  return request({
    url: "/search/hot/detail"
  });
}

// 搜索接口
export function searchSong(keywords: string): AxiosResponseFormat<any> {
  return request({
    url: "/search",
    params: {
      keywords
    }
  });
}
