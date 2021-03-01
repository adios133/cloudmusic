import axios from 'axios'

export default (config)=> {
  const instance = axios.create({
    // 线上地址
    // baseURL:"http://121.4.98.241:3000",
    baseURL:"http://localhost:3000",
    timeout:10000,
    withCredentials:true
  })
  // 请求拦截
  instance.interceptors.request.use(config=> {
    return config
  },err=> {
    throw err
  })

  // 响应拦截
  instance.interceptors.response.use(response=> {
    return response.data
  },err=> {
    throw err
    // if (instance.response.code === 301) {
    //   return response.msg
    // }
  })

  // 返回实例
  return instance(config)
}
