import { createApp } from "vue"
import App from "./App.vue"
import { createPinia } from "pinia"
import "@/assets/css/normalize.css"
import "@/assets/css/style.css"
import router from "@/router/index"

createApp(App).use(router).use(createPinia()).mount("#app")
