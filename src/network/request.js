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
    console.log(err);
  })

  // 响应拦截
  instance.interceptors.response.use(response=> {
    return response.data
  },err=> {
    console.log(err);
  })

  // 返回实例
  return instance(config)
}
