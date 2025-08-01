<script setup lang="ts">
import { Popup as VanPopup } from "vant";
import { getUserInfo } from "@/api/profile";
import { getSignIn, logOut } from "@/api/home";
import { getUserId } from "@/api/login";
import { ref, watch, onActivated } from "vue";
import { useRoute, useRouter } from "vue-router";
import useStore from "@/store";
defineOptions({
  name: "HomeSlide"
});
const { isShow = false } = defineProps<{
  isShow: boolean;
}>();
const emits = defineEmits<{
  closeSlide: [];
}>();
const route = useRoute();
const router = useRouter();
const store = useStore();
const show = ref(false);
const userInfo = ref<any>({});
const msg = ref("签到");
watch(
  () => isShow,
  (val) => {
    show.value = val;
  }
);
const _getUserId = (): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await getUserId();
      if (res.profile) {
        store.setUid(res.profile.userId);
        resolve(res.profile.userId);
      } else {
        reject("需要登录");
      }
    } catch (err) {
      reject(err);
    }
  });
};
const closeSlide = () => {
  emits("closeSlide");
};
const logIn = () => {
  if (userInfo.value.nickname) return;
  router.push("/login");
};
const goCloud = () => {
  router.push("/cloud");
};
const signIn = async () => {
  const res = await getSignIn();
  if (res.code === 200) {
    msg.value = "已签到";
  }
};
const aboutMe = () => {
  location.href = "https://github.com/adios133/cloudmusic";
};
const onLogOut = async () => {
  await logOut();
  location.reload();
};
const _getUserInfo = async (id: string) => {
  const res = await getUserInfo(id);
  userInfo.value = res.profile;
  // 等级不在对象之内，
  userInfo.value.level = res.level;
};

// create
const init = async () => {
  // keepalive 只会调用一次
  if (store.state.userId === "") {
    // this._getUserId() mixin ,返回 id
    const res = await _getUserId();
    _getUserInfo(res);
  } else {
    _getUserInfo(store.state.userId);
  }
};
init();

onActivated(() => {
  // 但是当是通过login进来时，需要刷新页面
  if (route.meta.__fromPath__ === "/login") {
    _getUserInfo(store.state.userId);
  }
});
</script>

<template>
  <van-popup
    v-model="show"
    position="left"
    :style="{ height: '100%', width: '70%' }"
    duration=".2"
    @click-overlay="closeSlide"
    class="page"
  >
    <div class="user">
      <div class="avatar" @click="logIn">
        <img :src="userInfo.avatarUrl" alt="" v-if="userInfo.nickname" />
        <img src="@/assets/img/default/missing-face.png" alt="" v-else />
      </div>
      <div class="username" @click="logIn">
        {{ userInfo.nickname ? userInfo.nickname : "登录" }}
      </div>
    </div>
    <ul class="item">
      <li class="cloud" @click="goCloud">
        <span>我的云盘</span><span class="iconfont icon-more"></span>
      </li>
      <li class="signin" @click="signIn">
        <span>{{ msg }}</span
        ><span class="iconfont icon-more"></span>
      </li>
      <li class="about" @click="aboutMe">
        <span>项目源码</span><span class="iconfont icon-more"></span>
      </li>
      <li class="about" @click="onLogOut" v-if="userInfo.nickname">
        <span>退出登录</span><span class="iconfont icon-more"></span>
      </li>
    </ul>
  </van-popup>
</template>

<style lang="less" scoped>
.page {
  background-color: #f7f7f7;
  font-size: 16px;
  .user {
    display: flex;
    padding: 10px 15px;
    .avatar {
      overflow: hidden;
      width: 60px;
      height: 60px;
      border: 1px solid #ccc;
      border-radius: 40px;
      img {
        width: 100%;
        vertical-align: middle;
      }
    }
    .username {
      height: 60px;
      line-height: 60px;
      margin-left: 10px;
      color: #333;
      font-weight: 700;
    }
  }
  .item {
    width: 88%;
    margin: 0 auto;
    padding: 10px 15px;
    font-weight: 700;
    color: #333;
    background-color: #fff;
    border-radius: 10px;
    & li:first-child {
      border-bottom: 0.5px solid #eee;
    }
    li {
      display: flex;
      height: 40px;
      line-height: 40px;
      justify-content: space-between;
    }
  }
}
</style>
