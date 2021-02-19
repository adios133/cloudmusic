<template>
  <div class='play-bar'>
    <div class="music-info left">
      <div class="song-cover">
        <!-- to be modify -->
        <img src="~assets/img/test/test.jpg" alt="">
      </div>
      <span class="song-name">歌曲名称 - </span>
      <span class="singer">歌手</span>
    </div>
    <div class="music-controll right">
      <!-- to be modify -->
      <van-circle layer-color="#E4E4E4" color="#5A5A5A" :stroke-width="30" size="24px" v-model="currentRate" :rate="50" class="song-rate"  />
      <!-- to be modify -->
      <span class="iconfont icon-24gl-play play"></span>
      <span class="iconfont icon-24gl-playlist"></span>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import {Circle} from 'vant'
Vue.use(Circle)

export default {
  name:"PlayBar",
  // to be modify
  props: {

  },
  data () {
    return {
      // to be modify
      currentRate:90
    };
  },
  computed: {
    
  },
  methods: {
    
  },
  }
</script>

<style lang="scss" scoped>
  .play-bar {
    position: absolute;
    bottom: 49px;
    left: 0;
    width: 100vw;
    height: 40px;
    background-color: #FDFDFD;
    .music-info {
      display: flex;
      margin-left: 10px;
      height: 100%;
      line-height: 40px;
      .song-cover {
        position: relative;
        top: 5px;
        width: 30px;
        height: 30px;
        overflow: hidden;
        font-size: 0;
        border: 6px solid #161616;
        border-radius: 15px;
        img {
          width: 100%;
        }
      }
      span {
          margin-left: 5px;
        }
    }
    .music-controll {
      height: 100%;
      line-height: 40px;
      margin-right: 10px;
      .song-rate {
        position: relative;
        top: 8px;
      }
      .play {
        position: relative;
        left: -16px;
        font-size: 12px;
      }
    }
  }
</style>