import request from "@/utils/request";

// 获取排行榜数据
export function getRank(): AxiosResponseFormat<any> {
  return request({
    url: "/toplist/detail"
  });
}
