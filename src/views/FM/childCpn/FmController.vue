<template>
  <div class='controller'>
    <div class="play-dislike"><span class="iconfont icon-trash" @click="trashSong"></span></div>
    <div class="play-like"><span class="iconfont" :class="likeIcon" @click="likeSong"></span></div>
    <div class="play-state"><span class="play iconfont" :class="iconDisplay" @click="contrlClick"></span></div>
    <div class="play-next"><span class="iconfont icon-24gl-next" @click="nextSong"></span></div>
    <div class="playcomment"><span class="iconfont icon-custom-comment"></span></div>
  </div>
</template>

<script>
import Vue from 'vue'
import {Toast} from 'vant'
Vue.use(Toast)
export default {
  name:"FmController",
  data () {
    return {
      order:'list',
    };
  },
  props:{
    like:Boolean
  },
  computed: {
    iconDisplay() {
      return this.isPlaying ? 'icon-24gl-pause' :'icon-24gl-play'
    },
    isPlaying() {
      return this.$store.state.isplay
    },
    likeIcon() {
      return this.like ? 'icon-like2' : 'icon-like'
    }
  },
  methods: {
    // 控制播放暂停
    contrlClick() {
      this.$store.commit('setState',!this.isPlaying)
      this.$bus.$emit('stateChange',this.isPlaying)
    },
    // 上一首,下一首
    nextSong() {
      this.$store.commit('setState',false)
      this.$store.commit("setLine",0)
      this.$emit('nextFm')
    },
    // 垃圾桶
    trashSong() {
      this.$emit('trashSong')
    },
    // 喜欢
    likeSong() {
      this.$emit('likeSong')
    }
  },
  }
</script>

<style lang="scss" scoped>
  .controller {
    position: absolute;
    display: flex;
    justify-content: space-evenly;
    bottom: 20px;
    left: 0;
    width: 100%;
    color: #fff;
    .iconfont {
      font-size: 20px;
    }
    .play {
      position: relative;
      top: -8px;
      font-size: 36px;
      font-weight: 300;
    }
  }
</style>