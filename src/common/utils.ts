export function padLeftZero(str: string) {
  return ("00" + str).substring(str.length);
}

// 防抖函数
export function debounce(callback: (...args: any[]) => any, delay: number) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
}
export const fixNumber = (num: number) => {
  if (num > 100000000) {
    return (num / 100000000).toFixed(1) + "亿";
  } else if (num > 10000) {
    return (num / 10000).toFixed(1) + "万";
  } else {
    return num;
  }
};
