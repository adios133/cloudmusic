<template>
  <div class='recommend-cover' v-if="imgUrl.al">
    <img :src="imgUrl.al.picUrl" alt="">
    <nav-bar @click.native="backClick">
      <template v-slot:left>
        <span class="iconfont icon-back1 back" @click="backClick"></span>
      </template>
    </nav-bar>
    <div class="date">
      <span class="day">{{day}}/</span>
      <span class="month">{{month}}</span>
    </div>
  </div>
</template>

<script>
import NavBar from 'components/common/NavBar/NavBar'

import {padLeftZero} from 'common/utils'
export default {
  name:"RecommendCover",
  components: {
    NavBar
  },
  data () {
    return {
      month:'',
      day:''
    };
  },
  props:{
    imgUrl:{
      type:Object,
      default() {
        return {}
      }
    }
  } ,
  methods: {
    // 每日日期
    getToday() {
      const now = new Date()
      const month = now.getMonth() + 1
      const day = now.getDate()
      this.month = padLeftZero(month.toString())
      this.day = padLeftZero(day.toString())
    },
    // back
    backClick() {
      this.$router.push('/home')
    }
  },
  created() {
    this.getToday()
  }
  }
</script>

<style lang="scss" scoped>
@mixin trans-bg {
  background-color: rgba(255,255,255,.3);
  box-shadow: 0 0 10px 10px rgba(255,255,255,.3);
}
  .recommend-cover {
    position: relative;
    overflow: hidden;
    height: 220px;
    img {
      position: absolute;
      z-index: 0;
      width: 100%;
    }
    .back {
      position: absolute;
      left: 20px;
      font-weight: 600;
      &::before {
      @include trans-bg;
      color: #333;
      border-radius: 10px
      }
    }
    .date {
      @include trans-bg;
      position: absolute;
      left: 15px;
      bottom: 30px;
      width: 60px;
      height: 30px;
      line-height: 30px;
      color: #333;
      text-align: center;
      border-radius: 15px;
      z-index: 0;
      .day {
        font-size: 24px;
      }
      .month {
        font-size: 16px;
      }
    }
  }
</style>