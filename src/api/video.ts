import request from "@/utils/request";

export function getVideoCate(): AxiosResponseFormat<any> {
  return request({
    url: "/video/category/list"
  });
}

// 获取分类对应视频列表id
export function getViedoList(id: string, offset = 0): AxiosResponseFormat<any> {
  return request({
    url: "/video/group",
    params: {
      id,
      offset
    }
  });
}

// 获取video播放url
export function getVideoUrl(id: string): AxiosResponseFormat<any> {
  return request({
    url: "/video/url",
    params: {
      id
    }
  });
}
