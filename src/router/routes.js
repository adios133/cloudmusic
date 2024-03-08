export default [
  {
    path: "/",
    redirect: "",
  },
  {
    path: "",
    name: "index",
    component: () => import("@/views/Home/Home.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login/Login.vue"),
  },
]
