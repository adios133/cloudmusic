<script setup lang="ts">
import Scroll from "@/components/common/Scroll/BetterScroll.vue";
import ProfileBackground from "./childCpn/ProfileBackground.vue";
import ProfileUserCart from "./childCpn/ProfileUserCart.vue";
import ProfileFavor from "./childCpn/ProfileFavor.vue";
import { getUserInfo, getLikeId } from "@/api/profile";
import { getUserId } from "@/api/login";
import useStore from "@/store";
import { ref, onActivated } from "vue";
import { useRoute } from "vue-router";
defineOptions({
  name: "Profile"
});
const route = useRoute();
const store = useStore();
const userInfo = ref<{ [k: string]: any }>({});
const likeListId = ref("");
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
const _getUserInfo = async (id: string) => {
  const res = await getUserInfo(id);
  userInfo.value = res.profile;
  // 等级不在对象之内，
  userInfo.value.level = res.level;
  _getLikeId(store.state.userId);
};
const _getLikeId = async (uid: string) => {
  const res = await getLikeId(uid);
  // 用户歌单第一个歌单为喜欢歌单
  likeListId.value = res.playlist[0].id.toString();
};
onActivated(() => {
  if (route.meta.__fromPath__ === "/login") {
    _getUserInfo(store.state.userId);
  }
});
const _init = async () => {
  // keepalive 只会调用一次
  if (store.state.userId === "") {
    // this._getUserId() mixin ,返回 id
    const res = await _getUserId();
    _getUserInfo(res);
  } else {
    _getUserInfo(store.state.userId);
  }
};
_init();
</script>

<template>
  <div id="profile">
    <scroll class="profile-scroll">
      <profile-background :picUrl="userInfo.backgroundUrl" />
      <img src="@/assets/img/default/arc.png" alt="" />
      <div class="content">
        <profile-user-cart :userInfo="userInfo" />
        <profile-favor :favorListId="likeListId" />
      </div>
    </scroll>
  </div>
</template>

<style lang="less" scoped>
.profile-scroll {
  height: calc(100vh - 89px);
  .content {
    position: relative;
    margin-top: -100px;
    padding-bottom: 50px;
    background-color: #f8f8f8;
  }
  img {
    position: relative;
    top: -92px;
    width: 100%;
  }
}
</style>
