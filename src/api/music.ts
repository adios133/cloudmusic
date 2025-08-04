import request from "@/utils/request";

export function getUserList(
  uid: string,
  limit = 30,
  offset = 0
): AxiosResponseFormat<any> {
  return request({
    url: "/user/playlist",
    params: {
      uid,
      limit,
      offset
    }
  });
}
