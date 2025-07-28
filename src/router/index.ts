import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";

const router = createRouter({
  history: createWebHistory(),
  routes
});
router.beforeEach((to, from) => {
  // console.log("to", to);
  to.meta.__fromPath__ = from.path;
});

export default router;
