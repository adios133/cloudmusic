import request from "@/utils/request";

export function getRecommend(): AxiosResponseFormat<any> {
  return request({
    url: "/recommend/songs"
  });
}
