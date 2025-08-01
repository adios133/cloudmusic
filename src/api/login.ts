import request from "./request";

//
export function logIn(phone: string, password: string) {
  return request({
    url: "/login/cellphone",
    method: "post",
    data: {
      phone,
      password
    },
    withCredentials: true
  });
}
export const getUserId = () => {
  // 加上时间戳，使得每次请求不同
  const timestamp = +new Date();
  return request({
    url: "/user/account?timestamp=" + timestamp
  });
};
