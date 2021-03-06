<template>
    <van-popup v-model="show" position="left" :style="{height:'100%',width:'70%'}" duration=".2" @click-overlay="closeSlide" class="page">
      <div class="user">
        <div class="avatar" @click="logIn">
          <img :src="userInfo.avatarUrl" alt="" v-if="userInfo.nickname">
          <img src="~assets/img/default/missing-face.png" alt="" v-else>
        </div>
        <div class="username" @click="logIn">{{userInfo.nickname ? userInfo.nickname : '登录'}}</div>
      </div>
      <ul class="item">
        <li class="cloud" @click="goCloud"><span>我的云盘</span><span class="iconfont icon-more"></span></li>
        <li class="signin" @click="signIn"><span>{{msg}}</span><span class="iconfont icon-more"></span></li>
        <li class="about" @click="aboutMe"><span>项目源码</span><span class="iconfont icon-more"></span></li>
      </ul>
    </van-popup>
</template>

<script>
import Vue from 'vue'
import {Popup} from 'vant'
Vue.use(Popup)

import {getUserInfo} from 'network/profile'
import {getSignIn} from 'network/home'
import {getUserID} from 'common/mixin'

export default {
  name:"HomeSlide",
  mixins:[getUserID],
  props: {
    isShow:{
      type:Boolean,
      default:false
    },
  },
  data () {
    return {
      show:false,
      userInfo:{},
      msg:'签到'
    };
  },
  watch: {
    isShow() {
      this.show = this.isShow
    }
  },
  beforeRouteEnter (to, from, next) {
    /* 使用组件内导航守卫，记录来时路由，
      由于beforeRouteEnter 不能访问this，使用next回调将来时path存在data中
    */
    next(vm=> {
      vm.path = from.path
    })
  },
  created() {
    // keepalive 只会调用一次
      if(this.$store.state.userId === '') {
        // this._getUserId() mixin ,返回 id
        this._getUserId().then(res=> {
        this._getUserInfo(res)
      })
    }else {
      this._getUserInfo(this.$store.state.userId)
    }
  },
  activated() {
    // 但是当是通过login进来时，需要刷新页面
    if (this.path === '/login') {
      this._getUserInfo(this.$store.state.userId)
    }
  },
  methods: {
   closeSlide() {
     this.$emit('closeSlide')
   },
   logIn() {
     this.$router.push('/login')
   },
   _getUserInfo(id) {
      getUserInfo(id).then(res=>{
        this.userInfo = res.profile
        // 等级不在对象之内，
        this.userInfo.level = res.level
      })
    },
    goCloud() {
      this.$router.push('/cloud')
    },
    signIn() {
      getSignIn().then(res=> {
        if (res.code === 200) {
          this.msg = '已签到'
        }
      })
    },
    aboutMe() {
      location.href = 'https://github.com/lanslorin/cloudmusic'
    }
  },
  }
</script>

<style lang="scss" scoped>
  .page {
    background-color: #F7F7F7;
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
      border-bottom: .5px solid #eee;
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