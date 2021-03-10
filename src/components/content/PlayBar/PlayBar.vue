<template>
  <div class='play-bar' :class="{'at-bottom':atBottom}" v-show="!PlayPage">
    <div class="music-info left" @click="toPlaying" v-if="this.$store.state.playing">
      <div class="song-cover" >
        <img :src="this.$store.state.playing.al.picUrl" alt="" :class="{playing:isPlaying}">
      </div>
      <div class="info">
        <span class="song-name">{{this.$store.state.playing.name}}</span>
        <span class="singer"> - {{this.$store.state.playing.ar[0].name}}</span>
      </div>
      
    </div>
    <div class="music-info left" @click="toPlaying" v-else>
      <div class="song-cover">
        <img src="~assets/img/default/default.jpg" alt="" :class="{playing:isPlaying}">
      </div>
      <div class="info">
        <span class="song-name">暂无播放</span>
        <span class="singer"></span>
      </div>
    </div>
    <div class="music-controll right">
      <van-circle layer-color="#E4E4E4" color="#D43C33" :stroke-width="30" size="24px" v-model="currentRate" :rate="rate" class="song-rate"  />
      <span class="iconfont  play" :class="iconDisplay" @click="playSong"></span>
      <span class="iconfont icon-24gl-playlist" @click="showList"></span>
      <audio 
      :src="musicUrl" 
      autoplay
      @canplay="songCanPlay"
      @timeupdate="songPlaying"
      @play="songPlay"
      @pause="songPause" 
      @ended="songEnd"
      ref="audio"
      ></audio>
    </div>
  </div>
</template>


<script>
import Vue from 'vue'
import {Circle} from 'vant'
Vue.use(Circle)

import {getMusicUrl} from 'network/playbar'
import {randomFn} from 'common/mixin'


export default {
  name:"PlayBar",
  mixins:[randomFn],
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
      currentRate:90,
      musicUrl:'',
      id:'',
      rate:0,
      
    };
  },
  computed:{
    // 计算边播放按键
    iconDisplay() {
      return this.isPlaying ? 'icon-24gl-pause' :'icon-24gl-play'
    },
    // 在搜索界面和播放界面都存在,但不显示
    PlayPage() {
      return this.$route.path.startsWith('/playing') || this.$route.path.startsWith('/search') || this.$route.path.startsWith('/fm')
    },
    isPlaying() {
      return this.$store.state.isplay
    },
  },
  methods: {
    // 由于移动端autoplay失效，监听当音乐可以播放时，播放
    songCanPlay() {
      this.$refs.audio.play()
    },
    // 控制右边播放按键
    playSong() {
      this.$store.commit("setState",!this.isPlaying)
      if (!this.isPlaying) {
        this.$refs.audio.pause()
      }else {
        this.$refs.audio.play()
      }
    },
    // 跳转到播放页面,但没有音乐播放时阻止跳转
    toPlaying() {
      if (this.id) {
        this.$router.push('/playing/'+ this.id)
      }else {
        return
      }
    },
    // 弹出播放列表
    showList() {
      this.$bus.$emit("showList")
    },
    // 当音乐播放时持续触发传递播放进度
    songPlaying() {
          this.$bus.$emit('playingsong',{
          id:this.id,
          duration:this.$refs.audio.duration,
          currentTime:this.$refs.audio.currentTime
          })
          if (this.$refs.audio.currentTime !=0) {
            this.rate = this.$refs.audio.currentTime / this.$refs.audio.duration *100
          }  
    },
    // 控制播放状态,自动播放,播放时设置为true
    songPlay() {
      this.$store.commit('setState',true)
    },
    // 当音乐停止时设置为false
    songPause() {
      this.$store.commit('setState',false)
    },
    songEnd() {
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

    // 获取音乐播放地址
    _getMusicUrl(id) {
      getMusicUrl(id).then(res => {
        this.id = res.data[0].id
        this.musicUrl = res.data[0].url
      })
    }
    
  },
  mounted() {
    // 监听从播放列表点击，获取音乐url
    this.$bus.$on('playsong',id=> {
      this._getMusicUrl(id)
    })
    // 监听播放暂停
    this.$bus.$on('stateChange',data => {
      if (data) {
        this.$refs.audio.play()
      }else {
        this.$refs.audio.pause()
      }
    })
    // 监听点击下一首，从播放列表播放第‘index’首
    this.$bus.$on('nextSong',index => {
      const id = this.$store.state.playlist[index].id
      this._getMusicUrl(id)
    })
    // 监听如果是单曲循环，每点击下一首，设置当前播放时间为0
    this.$bus.$on('oneSong',()=> {
      this.$refs.audio.currentTime = 0
    })
    // 监听，并跳转到指定位置
    this.$bus.$on('seekTo',position => {
      this.$refs.audio.currentTime = position * this.$refs.audio.duration
    })
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
        overflow: hidden;
      top: 7px;
      width: 35px;
      height: 35px;
      border: 7px solid #161616;
      border-radius: 18px;
      img {
        width: 100%;
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
      .info {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 55vw;
        margin-left: 10px;
        // span {
        //   margin-left: 5px;
        // }
      .song-name {
        font-size: 16px;
        color: #333;
      }
      .singer {
        color: #999;
        font-size: 12px;
      }
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