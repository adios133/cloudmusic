<template>
  <div class='fm' v-if="musicInfo">
    <fm-bg :picUrl="musicInfo.album.picUrl" />
    <div class="container">
      <fm-nav :musicInfo="musicInfo" />
      <fm-cover :picUrl="musicInfo.album.picUrl" />
      <fm-progress-bar :like="like" />
      <fm-controller @nextFm="nextFm" @likeSong="likeSong" @trashSong="trashSong" />
    </div>
  </div>
</template>

<script>

import FmBg from './childCpn/FmBg'
import FmNav from './childCpn/FmNav'
import FmCover from './childCpn/FmCover'
import FmProgressBar from './childCpn/FmProgressBar'
import FmController from './childCpn/FmController'

import {getFm,getMusicInfo,likeSong,trashSong} from 'network/fm'

import Vue from 'vue'
import {Toast} from 'vant'
Vue.use(Toast)
export default {
  name:"Fm",
  components: {
    FmNav,
    FmBg,
    FmCover,
    FmProgressBar,
    FmController
  },
  data () {
    return {
      musicInfo:null,
      like:true
    };
  },
  methods:{
    _getFm() {
      getFm().then(res => {
        this.musicInfo = res.data[0]
        this._getMusicInfo(res.data[0].id) 
      })
    },
    _getMusicInfo(id) {
      getMusicInfo(id).then(res => {
        this.$store.commit('setPlaylist',[res.songs[0]])
        this.$store.commit('setPlaying',res.songs[0])
        this.$bus.$emit('playsong',res.songs[0].id) 
      })
    },
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
    _trashSong(id) {
      trashSong(id).then(res=> {
        if (res.code === 200) {
          this._getFm()
        }
      }).catch(err => {
        Toast.fail({
          message:err.response.data.msg,
          duration:1500,
          position:'bottom'
        })
      })
    },
    nextFm() {
      this._getFm()
      this.like = true
    },
    likeSong() {
      this._likeSong(this.musicInfo.id,this.like)
    },
    trashSong() {
      this._trashSong(this.musicInfo.id)
    }
  },
  
  created() {
    this._getFm()
  },
  mounted() {
    
  }
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