<template>
  <div class='fm' v-if="musicInfo">
    <play-bg :picUrl="musicInfo.album.picUrl" />
    <div class="container">
      <play-nav :musicInfo="musicInfo" />
      <van-swipe indicator-color="#fff" :loop="false">
        <van-swipe-item>
          <play-cover :picUrl="musicInfo.album.picUrl" />
        </van-swipe-item>
        <van-swipe-item>
          <play-volume />
          <lyric :lyric="lyric" />
        </van-swipe-item>
      </van-swipe>
      <play-progress-bar />
      <fm-controller @nextFm="nextFm" @likeSong="likeSong" @trashSong="trashSong" />
    </div>
  </div>
</template>

<script>

import FmController from './childCpn/FmController'

import {getFm,getMusicInfo,likeSong,trashSong} from 'network/fm'
import {LyricModule,PlayAndFm} from 'common/mixin'

import Vue from 'vue'
import {Toast} from 'vant'
Vue.use(Toast)
export default {
  name:"Fm",
  mixins:[LyricModule,PlayAndFm],
  components: {
    FmController
  },
  data () {
    return {
      musicInfo:null,
      like:true
    };
  },
  methods:{
    // 获取私人fm
    _getFm() {
      getFm().then(res => {
        this.musicInfo = res.data[0]
        this._getMusicInfo(res.data[0].id) 
        this._getLyric(res.data[0].id)
      })
    },
    // 获取音乐信息，私人fm获取的音乐，信息和普通的格式不同，不好处理，故使用通用音乐信息
    _getMusicInfo(id) {
      getMusicInfo(id).then(res => {
        this.$store.commit('setPlaylist',[res.songs[0]])
        this.$store.commit('setPlaying',res.songs[0])
        this.$bus.$emit('playsong',res.songs[0].id) 
        this.$store.commit('setState',false)
        this.$store.commit("setLine",0)
      })
    },
    // 点击喜欢音乐，接口有问题，失败
    _likeSong(id,like) {
      likeSong(id,like).then(res => {
        if (res.code === 200) {
          this.like = !this.like
        }
      }).catch(err=> {
        Toast.fail({
          message:err.response.data.msg,
          duration:1500,
          position:'bottom'
        })
      })
    },
    // 将fm音乐加入垃圾桶
    _trashSong(id) {
      trashSong(id).then(res=> {
        if (res.code === 200) {
          this._getFm()
          this.like = true
        }
      }).catch(err => {
        Toast.fail({
          message:err.response.data.msg,
          duration:1500,
          position:'bottom'
        })
      })
    },
    // 下一首私人fm
    nextFm() {
      this._getFm()
      this.like = true
    },
    // 喜欢音乐
    likeSong() {
      this._likeSong(this.musicInfo.id,this.like)
    },
    // 垃圾桶
    trashSong() {
      this._trashSong(this.musicInfo.id)
    }
  },
  
  created() {
    this._getFm()
    this.$store.commit('setFm',true)
    this.$bus.$on('fmSongEnd',()=> {
      this._getFm()
    })
  },
}
</script>

<style lang="scss" scoped>
  .fm {
    width: 100vw;
    overflow: hidden;
    .container {
      position: absolute;
      width: 100vw;
      height: 100vh;
      z-index: 1;
    }
  }
  

  
</style>