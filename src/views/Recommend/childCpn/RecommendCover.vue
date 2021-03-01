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
    getToday() {
      const now = new Date()
      const month = now.getMonth() + 1
      const day = now.getDate()
      this.month = padLeftZero(month.toString())
      this.day = padLeftZero(day.toString())
    },
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
      background-color: rgba(255,255,255,.5);
      box-shadow: 0 0 10px 10px rgba(255,255,255,.5);
    }
    .date {
      position: absolute;
      left: 15px;
      bottom: 30px;
      width: 60px;
      height: 30px;
      line-height: 30px;
      color: #333;
      text-align: center;
      background-color: rgba(255,255,255,.5);
      border-radius: 10px;
      box-shadow: 0 0 10px 10px rgba(255,255,255,.5);
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