import axios, { AxiosResponse } from "axios";
const instance = axios.create({
  // 线上地址
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 30000,
  withCredentials: true
});
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    throw err;
  }
);
instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (err) => {
    throw err;
  }
);
// function request<T>() {
//   return instance;
// }
export default instance;
