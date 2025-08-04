import request from "@/utils/request";

export function getRecent(uid: string, type = 1): AxiosResponseFormat<any> {
  return request({
    url: "/user/record",
    params: {
      uid,
      type
    }
  });
}
