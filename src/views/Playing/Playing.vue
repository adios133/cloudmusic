<template>
  <div class='playing' v-if="musicInfo">
    <playing-bg :picUrl="musicInfo.al.picUrl" />
    <div class="container">
      <playing-nav :musicInfo="musicInfo" />
      <van-swipe :loop="false" indicator-color="#fff">
        <van-swipe-item>
          <playing-cover :picUrl="musicInfo.al.picUrl" />
        </van-swipe-item>
        <van-swipe-item>
          <lyric :lyric="lyric" />
        </van-swipe-item>
      </van-swipe>
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
// import Lyric from 'components/content/Lyric/Lyric'

import {getMusicInfo} from 'network/playing'
// import {getLyric} from 'network/lyric'
import {LyricModule} from 'common/mixin'

// import Vue from 'vue'
// import {Swipe, SwipeItem} from 'vant'
// Vue.use(Swipe)
// Vue.use(SwipeItem)
export default {
  name:"Playing",
  mixins:[LyricModule],
  components: {
    PlayingNav,
    PlayingBg,
    PlayingCover,
    PlayingProgressBar,
    PlayingController,
    // Lyric
  },
  data () {
    return {
      // musicInfo:null,
      // lyric:[]
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
    },
  },
  activated() {
    if (!this.$store.state.playlist) {
      this.$router.push('/home')
      return
    }
    this.musicInfo = this.$store.state.playlist.find(item => {
      // params传过来的是string ==
      return item.id == this.$route.params.id
    });
    this._getLyric(this.musicInfo.id)
    this.$store.commit('setPlaying',this.musicInfo) 
  },
  mounted() {
    this.$bus.$on('nextSong', index => {
      this.musicInfo = this.$store.state.playlist[index]
      this._getLyric(this.musicInfo.id)
      this.$bus.$emit('playsong',this.musicInfo.id)  
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