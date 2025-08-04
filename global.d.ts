export {};
declare global {
  interface AxiosResponseData<T> {
    data: T;
    code: number;
    [k: string]: any;
  }
  // axios返回值类型定义
  type AxiosResponseFormat<T> = Promise<AxiosResponseData<T>>;
}
