import request from "@/utils/request";

export function getCloudMusic(
  limit = 100,
  offset = 0
): AxiosResponseFormat<any> {
  return request({
    url: "/user/cloud",
    params: {
      limit,
      offset
    }
  });
}
