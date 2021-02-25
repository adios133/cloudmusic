import request from './request'

// 
export function logIn(phone,password) {
  return request({
    url:'/login/cellphone',
    method:'post',
    data:{
      phone,password
    },
    withCredentials: true
  })
}