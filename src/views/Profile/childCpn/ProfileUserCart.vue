<template>
  <div class='user-cart'>
    <!-- v-if -->
    <div class="avatar" @click="logIn">
      <img :src="userInfo.avatarUrl" alt="" v-if="userInfo.nickname">
      <img src="~assets/img/default/missing-face.png" alt="" v-else>
    </div>
    <h4 class="username" @click="logIn">{{userInfo.nickname ? userInfo.nickname : '游客'}}</h4>
    <div class="subscriber">
      <span class="followers"><i>{{userInfo.nickname? userInfo.follows : "0"}}</i> 关注</span>
      <span class="fans"><i>{{userInfo.nickname? userInfo.followeds : "0"}}</i> 粉丝</span>
      <i class="level">Lv.{{userInfo.nickname? userInfo.level : "0"}}</i>
    </div>
    <div class="signature">{{userInfo.nickname? userInfo.signature : ""}}</div>
  </div>
</template>

<script>

export default {
  name:"ProfileUserCart",
  props: {
    userInfo:{
      type:Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    logIn() {
      if (this.userInfo.nickname) return
      this.$router.push('/login')
    }
  },
  }
</script>

<style lang="scss" scoped>
  .user-cart {
    position: relative;
    top: -30px;
    width: 90%;
    height: 130px;
    margin: 0 auto;
    text-align: center;
    background-color: #fff;
    border: 1px solid transparent;
    border-radius: 20px;
    box-shadow: 1px 1px 2px 2px rgba($color: #aaa, $alpha: .05);
    opacity: .95;
    .avatar {
      position: absolute;
      overflow: hidden;
      top: -50px;
      left: 50%;
      width: 80px;
      height: 80px;
      border-radius: 50px;
      transform: translate(-50%,0);
      box-shadow: 1px 1px 2px 2px rgba($color: #aaa, $alpha: .1);
      opacity: 1;
      img {
        width: 100%;
      }
    }
    .username {
      margin-top: 40px;
      font-size: 22px;
      color: #323234;
    }
    .subscriber {
      margin-top: 10px;
      font-size: 14px;
      i {
        font-style: normal;
      }
      span {
        margin: 0 8px;
        color: #7F7F80;
        i {
          color: #323334;
        }
      }
      .level {
          margin-left: 8px;
          color: #323334;
      }
    }
    .signature {
      margin-top: 8px;
      font-size: 14px;
      color: #989899;
    }
  }
</style>