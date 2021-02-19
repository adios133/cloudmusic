import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = ()=> import('views/Home/Home')
const Music = ()=> import('views/Music/Music')
const Video = ()=> import('views/Video/Video')
const Profile = ()=> import('views/Profile/Profile')


Vue.use(VueRouter)

const routes = [
  {
    path:'',
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/music',
    component:Music
  },
  {
    path:'/video',
    component:Video
  },
  {
    path:'/profile',
    component:Profile
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
