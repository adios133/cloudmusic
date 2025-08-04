import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosRequestConfig
} from "axios";
import { showLoadingToast, closeToast, showFailToast } from "vant";
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
const http: <T>(config?: AxiosRequestConfig) => Promise<ResponseType<T>> =
  new HttpRequest().instance;

export const request = async (config?: AxiosRequestConfig) => {
  try {
    showLoadingToast("");
    http(config);
  } catch (err) {
    console.log(err);
    showFailToast(err);
  } finally {
    closeToast();
  }
};
export default http;
