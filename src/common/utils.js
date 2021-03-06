export function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};

// 防抖函数
export function debounce(callback, delay) {
  let timer = null;
  return function(...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(()=> {
      callback.apply(this,args)
    },delay)
  }
}