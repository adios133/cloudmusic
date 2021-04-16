import axios from 'axios'

export default (config)=> {
  const instance = axios.create({
    // 线上地址
    baseURL:process.env.VUE_APP_BASE_URL,
    timeout:30000,
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
  })

  // 返回实例
  return instance(config)
}
