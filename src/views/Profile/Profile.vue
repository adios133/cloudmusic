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

<script>
import Scroll from "@/components/common/Scroll/BetterScroll.vue";
import ProfileBackground from "./childCpn/ProfileBackground.vue";
import ProfileUserCart from "./childCpn/ProfileUserCart.vue";
import ProfileFavor from "./childCpn/ProfileFavor.vue";

import { getUserInfo, getLikeId } from "@/api/profile";

import { getUserID } from "@/common/mixin";

import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);

export default {
  name: "Profile",
  mixins: [getUserID],
  components: {
    ProfileBackground,
    Scroll,
    ProfileUserCart,
    ProfileFavor
  },
  data() {
    return {
      userInfo: {},
      likeListId: "",
      path: ""
    };
  },
  beforeRouteEnter(to, from, next) {
    /* 使用组件内导航守卫，记录来时路由，
      由于beforeRouteEnter 不能访问this，使用next回调将来时path存在data中
    */
    next((vm) => {
      vm.path = from.path;
    });
  },
  created() {
    // keepalive 只会调用一次
    if (this.$store.state.userId === "") {
      // this._getUserId() mixin ,返回 id
      this._getUserId().then((res) => {
        this._getUserInfo(res);
      });
    } else {
      this._getUserInfo(this.$store.state.userId);
    }
  },
  activated() {
    // 但是当是通过login进来时，需要刷新页面
    if (this.path === "/login") {
      this._getUserInfo(this.$store.state.userId);
    }
  },
  methods: {
    // get a problem , 服务端设置了缓存2分钟，导致获取时删除cookie不足2min 还是上次的结果,解决在请求时 加上时间戳 only getId就行
    //  使用混入
    // _getUserId() {
    //   getUserId().then(res=> {
    //     if(res.profile) {
    //       this.$store.commit("setUid",res.profile.userId)
    //       this._getUserInfo(res.profile.userId)
    //     }
    //   })
    // },

    _getUserInfo(id) {
      getUserInfo(id).then((res) => {
        this.userInfo = res.profile;
        // 等级不在对象之内，
        this.userInfo.level = res.level;
        this._getLikeId(this.$store.state.userId);
      });
    },
    _getLikeId(uid) {
      getLikeId(uid).then((res) => {
        // 用户歌单第一个歌单为喜欢歌单
        this.likeListId = res.playlist[0].id.toString();
      });
    }
  }
};
</script>

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
