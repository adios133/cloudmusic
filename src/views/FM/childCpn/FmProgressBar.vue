<template>
  <div class='progress-bar'>
    <div class="current-time">{{data.currentTime | times}}</div>
    <div class="bar" @click="seekTo" ref="bar">
      <div class="now" :style="{'width':data.currentTime / data.duration *100 + '%'}"></div>
      <div class="dot" :style="{'left':data.currentTime / data.duration *100 + '%'}"></div>
    </div>
    <div class="duration">{{data.duration | times}}</div>
  </div>
</template>

<script>
import {padLeftZero} from 'common/utils'
export default {
  name:"FmProgressBar",
  data() {
    return {
      // 给个初始值，不然还没触发发事件时，渲染使用filters没有值会报错
      data:{
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
    // 点击跳转到指定播放位置
    seekTo(e) {
      const x = e.pageX - this.$refs.bar.offsetLeft;
      const percent = x / this.$refs.bar.offsetWidth
      this.$bus.$emit('seekTo',percent)
    }
  },
  mounted() {
    // 监听音乐播放进度
    this.$bus.$on('playingsong',data=> {
      if(data.currentTime !=0 ) {
        this.data = data
      }
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
      background-color: rgba(255,255,255,.5);
      .now {
        height: 100%;
        width: 0%;
        background-color: #D43C33;
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
      }
    }
  }
</style>