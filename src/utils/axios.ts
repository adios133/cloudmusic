import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse
} from "axios";
// 有点难搞
interface ResponseType<T = any> {
  code: number | string;
  data: T;
  [k: string]: any;
}
class HttpRequest {
  public instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_APP_BASE_URL,
      timeout: 5000
    });
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        return config;
      },
      (err: AxiosError) => {
        return Promise.reject(err);
      },
      {}
    );
    this.instance.interceptors.response.use(
      (response: AxiosResponse<ResponseType>): AxiosResponse["data"] => {
        if (response.status === 200) {
          return response.data;
        } else {
          return Promise.reject(response.statusText);
        }
      },
      (err: AxiosError) => {
        return Promise.reject(err);
      }
    );
  }
}
const http = new HttpRequest();
export default http;
