import { RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[] = [
  {
    path: "",
    redirect: "/home",
    meta: {
      showTab: true,
      showPlaybar: true
    }
  },
  {
    path: "/home",
    component: () => import("@/views/Home/Home.vue"),
    meta: {
      showTab: true,
      showPlaybar: true
    }
  },
  {
    path: "/music",
    component: () => import("@/views/Music/Music.vue"),
    meta: {
      showTab: true,
      showPlaybar: true
    }
  },
  {
    path: "/video",
    component: () => import("@/views/Video/Video.vue"),
    meta: {
      showTab: true,
      showPlaybar: true
    }
  },
  {
    path: "/profile",
    component: () => import("@/views/Profile/Profile.vue"),
    meta: {
      showTab: true,
      showPlaybar: true
    }
  },
  {
    path: "/login",
    component: () => import("@/views/Login/Login.vue"),
    meta: {
      showTab: false,
      showPlaybar: false
    }
  },
  {
    path: "/playing/:id",
    component: () => import("@/views/Playing/Playing.vue"),
    meta: {
      showTab: false,
      showPlaybar: true
    }
  },
  {
    path: "/fm",
    component: () => import("@/views/FM/Fm.vue"),
    meta: {
      showTab: false,
      showPlaybar: true
    }
  },
  {
    path: "/rank",
    component: () => import("@/views/Rank/Rank.vue"),
    meta: {
      showTab: false,
      showPlaybar: true
    }
  },
  {
    path: "/recommend",
    component: () => import("@/views/Recommend/Recommend.vue"),
    meta: {
      showTab: false,
      showPlaybar: true
    }
  },
  {
    path: "/search",
    component: () => import("@/views/Search/Search.vue"),
    meta: {
      showTab: false,
      showPlaybar: true
    }
  },
  {
    path: "/listdetail/:id",
    component: () => import("@/views/ListDetail/ListDetail.vue"),
    meta: {
      showTab: false,
      showPlaybar: true
    }
  },
  {
    path: "/songlist",
    component: () => import("@/views/SongList/SongList.vue"),
    meta: {
      showTab: false,
      showPlaybar: true
    }
  },
  {
    path: "/recent",
    component: () => import("@/views/RecentPlay/RecentPlay.vue"),
    meta: {
      showTab: false,
      showPlaybar: true
    }
  },
  {
    path: "/cloud",
    component: () => import("@/views/Cloud/Cloud.vue"),
    meta: {
      showTab: false,
      showPlaybar: true
    }
  },
  {
    path: "",
    name: "404",
    component: () => import("@/views/exception/404.vue")
  }
];
