import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
export default createRouter({
  routes,
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {top: 0}
    }
  }
})