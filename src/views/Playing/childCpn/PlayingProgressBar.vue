<template>
  <div class='progress-bar'>
    <div class="current-time">{{data.currentTime | times}}</div>
    <div class="bar" @click="seekTo" ref="bar">
      <div class="now" :style="{'width':data.currentTime / data.duration *100 + '%'}"></div>
      <div class="buffered" :style="{'width':data.bufferedtime / data.duration *100 + '%'}"></div>
      <van-loading type="spinner" size="12" color="#888" class="loading" v-if="data.bufferedtime === 0" />
      <div class="dot" :style="{'left':data.currentTime / data.duration *100 + '%'}" v-else></div>
    </div>
    <div class="duration">{{data.duration | times}}</div>
  </div>
</template>

<script>
import {padLeftZero} from 'common/utils'
import Vue from 'vue'
import {Loading} from 'vant'
Vue.use(Loading)
export default {
  name:"PlayingProgressBar",
  data() {
    return {
      // 给个初始值，不然还没触发发事件时，渲染使用filters没有值会报错
      data:{
        bufferedtime:0,
        currentTime:0,
        duration:0,
        id:''
      }
    }
  },
  filters:{
    times(num) {
      const seconds = num.toFixed(0)
      const m = Math.floor(seconds / 60).toString()
      const s =  (seconds % 60).toString()
      return padLeftZero(m) + ':' + padLeftZero(s)
    }
  },
  methods: {
    seekTo(e) {
      const x = e.pageX - this.$refs.bar.offsetLeft;
      const percent = x / this.$refs.bar.offsetWidth
      this.$bus.$emit('seekTo',percent)
    }
  },
  mounted() {
    this.$bus.$on('playingsong',data=> {
      
        this.data = data
      
    })
  }
  }
</script>

<style lang="scss" scoped>
  .progress-bar {
    display: flex;
    position: absolute;
    bottom: 110px;
    left: 0;
    width: 100%;
    font-size: 14px;
    color: #fff;
    .current-time {
      width: 65px;
      margin-right: 5px;
      text-align: right;
    }
    .duration {
      width: 65px;
      margin-left: 5px;
      text-align: left;
    }
    .bar {
      position: relative;
      flex: 1;
      top: 7px;
      width: 65%;
      height: 2px;
      background-color: rgba(255,255,255,.3);
      .now {
        position: absolute;
        top: 0;
        height: 100%;
        width: 0%;
        background-color: #D43C33;
        z-index: 3;
      }
      .buffered {
        position: absolute;
        height: 100%;
        top: 0;
        width: 50%;
        background-color: rgba(255,255,255,.5);
        z-index: 1;
      }
      .dot {
        position: absolute;
        top: 0;
        left: 0%;
        height: 8px;
        width: 8px;
        margin-top: -3px;
        margin-left: -4px;
        background-color: #f5f5f5;
        border-radius: 4px;
        z-index: 4;
      }
      .loading {
        position: absolute;
        top: -6px;
        left: -6px;
        padding: 1px;
        background-color: rgba(255,255,255,.5);
        border-radius: 7px;
      }
    }
  }
</style>