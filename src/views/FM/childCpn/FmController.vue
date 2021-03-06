<template>
  <div class='controller'>
    <div class="play-method"><span class="iconfont" :class="orderIcon" @click="orderChange"></span></div>
    <div class="play-pre"><span class="iconfont icon-24gl-previous" @click="preSong"></span></div>
    <div class="play-state"><span class="play iconfont" :class="iconDisplay" @click="contrlClick"></span></div>
    <div class="play-next"><span class="iconfont icon-24gl-next" @click="nextSong"></span></div>
    <div class="playlist"><span class="iconfont icon-24gl-playlist-copy" @click="showList"></span></div>
  </div>
</template>

<script>
import Vue from 'vue'
import {Toast} from 'vant'
Vue.use(Toast)
import {randomFn} from 'common/mixin'
export default {
  name:"FmController",
  mixins:[randomFn],
  data () {
    return {
      order:'list',
    };
  },
  computed: {
    iconDisplay() {
      return this.isPlaying ? 'icon-24gl-pause' :'icon-24gl-play'
    },
    isPlaying() {
      return this.$store.state.isplay
    },
    orderIcon() {
      if (this.$store.state.playorder === 'list') {
        return 'icon-liebiaoshunxu-copy'
      }else if(this.$store.state.playorder === 'random') {
        return 'icon-24gl-shuffle'
      }else {
        return 'icon-hanhan-01-01'
      }
    }
  },
  methods: {
    // 控制播放暂停
    contrlClick() {
      this.$store.commit('setState',!this.isPlaying)
      this.$bus.$emit('stateChange',this.isPlaying)
    },
    // 切换播放顺序
    orderChange() {
      if (this.$store.state.playorder === 'list') {
        this.$store.commit('setOrder','random')
        Toast({
          message:'随机播放',
          position:'bottom'
        })
      }else if(this.$store.state.playorder === 'random') {
        this.$store.commit('setOrder','one')
        Toast({
          message:'单曲循环',
          position:'bottom'
        })
      }else {
        this.$store.commit('setOrder','list')
        Toast({
          message:'顺序播放',
          position:'bottom'
        })
      }
    },

    // 上一首,下一首
    nextSong() {
      // 顺序播放
      if (this.$store.state.playorder === 'list') {
        const id = this.$store.state.playing.id
        let idx
        this.$store.state.playlist.forEach((item,index) => {
          if (item.id === id) return idx = index
        })
        if (idx === this.$store.state.playlist.length -1 ) idx = -1
        this.$bus.$emit('nextSong',idx + 1)
      }else if (this.$store.state.playorder === 'random') {
        // 随机播放
        let idx = this.getRandom(0,this.$store.state.playlist.length)
        this.$bus.$emit('nextSong',idx)

      }else {
        // 单曲循环
        this.$bus.$emit('oneSong')
      }
    },
    preSong() {
      // 顺序播放
      if (this.$store.state.playorder === 'list') {
        const id = this.$store.state.playing.id
        let idx
        this.$store.state.playlist.forEach((item,index) => {
          if (item.id === id) return idx = index
        })
        if (idx === 0 ) idx = this.$store.state.playlist.length
        this.$bus.$emit('nextSong',idx - 1)
      }else if (this.$store.state.playorder === 'random') {
        // 随机播放
        let idx = this.getRandom(0,this.$store.state.playlist.length)
        this.$bus.$emit('nextSong',idx)

      }else {
        this.$bus.$emit('oneSong')
      }
    },
    showList() {
      this.$bus.$emit("showList")
    },
    // 随机播放获取随机数
    
  },
  created() {
    
  }
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