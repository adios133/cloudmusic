<template>
  <div class='playing' v-if="musicInfo">
    <playing-bg :picUrl="musicInfo.al.picUrl" />
    <div class="container">
      <playing-nav :musicInfo="musicInfo" />
      <playing-cover :picUrl="musicInfo.al.picUrl" />
      <playing-progress-bar />
      <playing-controller />
    </div>
  </div>
</template>

<script>

import PlayingBg from './childCpn/PlayingBg'
import PlayingNav from './childCpn/PlayingNav'
import PlayingCover from './childCpn/PlayingCover'
import PlayingProgressBar from './childCpn/PlayingProgressBar'
import PlayingController from './childCpn/PlayingController'

import {getMusicInfo} from 'network/playing'
export default {
  name:"Playing",
  components: {
    PlayingNav,
    PlayingBg,
    PlayingCover,
    PlayingProgressBar,
    PlayingController
  },
  data () {
    return {
      musicInfo:null,
      
    };
  },
  // 由于search的页面的数据没有picUrl,重新获取
  beforeRouteEnter (to, from, next) { 
    next(vm => {
      if (from.path === '/search') {
        vm._getMusicInfo(vm.$route.params.id)
      }
    })
  },
  methods:{
    _getMusicInfo(id) {
      getMusicInfo(id).then(res => {
        this.musicInfo = res.songs[0]
        this.$store.commit('setPlaylist',[this.musicInfo])
      })
    }
  },
  created() {
    if (!this.$store.state.playlist) {
      this.$router.push('/home')
      return
    }
    this.musicInfo = this.$store.state.playlist.find(item => {
      // params传过来的是string ==
      return item.id == this.$route.params.id
    });
    this.$store.commit('setPlaying',this.musicInfo) 
  },
  mounted() {
    this.$bus.$on('nextSong', index => {
      this.musicInfo = this.$store.state.playlist[index]
      this.$store.commit('setPlaying',this.musicInfo)
    })
  }
}
</script>

<style lang="scss" scoped>
  .playing {
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