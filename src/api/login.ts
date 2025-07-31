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
