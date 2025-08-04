type DeviceType = "phone" | "tablet" | "desktop";

export function getDevice(): DeviceType {
  const ua = navigator.userAgent.toLowerCase();

  /* 1. 关键字 + 平板白名单 */
  const isIOS = /iphone|ipad|ipod/.test(ua);
  const isAndroid = /android/.test(ua);
  const isTabletUA = /ipad|android(?!.*mobile)/.test(ua); // 排除 Android 手机 UA
  const isPhoneUA = /iphone|android.*mobile/.test(ua);

  /* 2. 屏幕尺寸信息 */
  const {
    screen: { width, height },
    devicePixelRatio: dpr
  } = window;
  const cssWidth = Math.min(width, height) / dpr; // CSS 逻辑像素宽度

  /* 3. 触摸能力（排除无触屏的桌面浏览器） */
  const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

  /* 4. 决策树 */
  if (
    isTabletUA ||
    (isIOS && cssWidth >= 768) ||
    (isAndroid && cssWidth >= 600)
  ) {
    return "tablet";
  }
  if ((isPhoneUA || (isIOS && !isTabletUA)) && hasTouch && cssWidth < 768) {
    return "phone";
  }
  return "desktop";
}
