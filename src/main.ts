import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import { createPinia } from "pinia";
// import FastClick from "fastclick";
// vant
// showToast
import "vant/es/toast/style";
// showDialog
import "vant/es/dialog/style";
// showNotify
import "vant/es/notify/style";
// showImagePreview
import "vant/es/image-preview/style";

// FastClick(document.body);
createApp(App).use(router).use(createPinia()).mount("#app");
