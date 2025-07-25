import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import { createPinia } from "pinia";
import FastClick from "fastclick";

FastClick.attach(document.body);
createApp(App).use(router).use(createPinia()).mount("#app");
