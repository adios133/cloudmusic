import request from "@/utils/request";

export function getMusicUrl(id: string): AxiosResponseFormat<any> {
  return request({
    url: "/song/url",
    params: {
      id
    }
  });
}
