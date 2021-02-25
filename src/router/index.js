import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = ()=> import('views/Home/Home')
const Music = ()=> import('views/Music/Music')
const Video = ()=> import('views/Video/Video')
const Profile = ()=> import('views/Profile/Profile')
const Login = ()=> import('views/Login/Login')
const Playing = ()=> import('views/Playing/Playing')
const ListDetail = ()=> import('views/ListDetail/ListDetail')
const Search = ()=> import('views/Search/Search')
const SongList = ()=> import('views/SongList/SongList')
const Rank = ()=> import('views/Rank/Rank')
const Recommend = ()=> import('views/Recommend/Recommend')
const RecentPlay = ()=> import('views/RecentPlay/RecentPlay')


Vue.use(VueRouter)

const routes = [
  {
    path:'',
    redirect:'/home',
    meta: {
      showTab:true,
      showPlaybar:true
    }
  },
  {
    path:'/home',
    component:Home,
    meta: {
      showTab:true,
      showPlaybar:true
    }
  },
  {
    path:'/music',
    component:Music,
    meta: {
      showTab:true,
      showPlaybar:true
    }
  },
  {
    path:'/video',
    component:Video,
    meta: {
      showTab:true,
      showPlaybar:false
    }
  },
  {
    path:'/profile',
    component:Profile,
    meta: {
      showTab:true,
      showPlaybar:true
    }
  },
  {
    path:'/login',
    component:Login,
    meta: {
      showTab:false,
      showPlaybar:false
    }
  },
  {
    path:'/playing/:id',
    component:Playing,
    meta: {
      showTab:false,
      showPlaybar:false
    }
  },
  {
    path:'/rank',
    component:Rank,
    meta: {
      showTab:false,
      showPlaybar:true
    }
  },
  {
    path:'/recommend',
    component:Recommend,
    meta: {
      showTab:false,
      showPlaybar:true
    }
  },
  {
    path:'/search',
    component:Search,
    meta: {
      showTab:false,
      showPlaybar:false
    }
  },
  {
    path:'/listdetail/:id',
    component:ListDetail,
    meta: {
      showTab:false,
      showPlaybar:true
    }
  },
  {
    path:'/songlist',
    component:SongList,
    meta: {
      showTab:false,
      showPlaybar:true
    }
  },
  {
    path:'/recent',
    component:RecentPlay,
    meta:{
      showTab:false,
      showPlaybar:true
    }
  }


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};

export default router
