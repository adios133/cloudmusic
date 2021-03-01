<template>
  <div class='play-bar' :class="{'at-bottom':atBottom}">
    <div class="music-info left" @click="toPlaying">
      <div class="song-cover">
        <!-- to be modify -->
        <img src="~assets/img/test/test.jpg" alt="" :class="{playing:isPlaying}">
      </div>
      <span class="song-name">歌曲名称 - </span>
      <span class="singer">歌手</span>
    </div>
    <div class="music-controll right">
      <!-- to be modify -->
      <van-circle layer-color="#E4E4E4" color="#5A5A5A" :stroke-width="30" size="24px" v-model="currentRate" :rate="50" class="song-rate"  />
      <!-- to be modify -->
      <span class="iconfont  play" :class="iconDisplay" @click="playSong"></span>
      <span class="iconfont icon-24gl-playlist" @click="showList"></span>
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
    playState:{
      type:Boolean,
      default:false
    },
    atBottom: {
      type:Boolean,
      default:false
    }
  },
  data () {
    return {
      // to be modify
      currentRate:90,
      isPlaying:this.playState

    };
  },
  computed:{
    // 计算边播放按键
    iconDisplay() {
      return this.isPlaying ? 'icon-24gl-pause' :'icon-24gl-play'
    }
  },
  methods: {
    // 控制右边播放按键
    playSong() {
      this.isPlaying = !this.isPlaying
    },
    // 跳转到播放页面
    toPlaying() {
      this.$router.push('/playing').catch(e=>e)
    },
    // 弹出播放列表
    showList() {
      this.$emit("showList")
    }
  },
  }
</script>

<style lang="scss" scoped>
  @keyframes rotateCover {
  from {
    transform:rotate(0deg);
  }
  to {
    transform:rotate(360deg)
  }
  }
  div.at-bottom {
    bottom: 0;
    height: 49px;
    .music-info {
      line-height: 49px;
      .song-cover {
      top: 7px;
      width: 35px;
      height: 35px;
      border: 7px solid #161616;
      border-radius: 18px;
      img {
      border-radius: 18px;
      }
    }
    }
    .music-controll {
      line-height: 49px;
    }
  }
  .play-bar {
    position: fixed;
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
        .playing {
          // animation: rotateCover 8s linear infinite;
          animation-play-state: running;
        }
        img {
          width: 100%;
          vertical-align: top;
          border-radius: 15px;
          animation: rotateCover 8s linear infinite;
          animation-play-state: paused;
        }
      }
      span {
          margin-left: 5px;
        }
      .song-name {
        font-size: 16px;
      }
      .singer {
        color: #999;
        font-size: 14px;
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
        left: -17px;
        font-size: 12px;
      }
    }
  }
</style>