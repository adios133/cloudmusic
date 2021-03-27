<template>
  <div class='playing' v-if="musicInfo">
    <play-bg :picUrl="musicInfo.al.picUrl" />
    <div class="container">
      <play-nav :musicInfo="musicInfo" />
      <van-swipe :loop="false" indicator-color="#fff">
        <van-swipe-item>
          <play-cover :picUrl="musicInfo.al.picUrl" />
        </van-swipe-item>
        <van-swipe-item>
          <play-volume />
          <lyric :lyric="lyric" />
        </van-swipe-item>
      </van-swipe>
      <play-progress-bar />
      <playing-controller />
    </div>
  </div>
</template>

<script>

import PlayingController from './childCpn/PlayingController'


import {getMusicInfo} from 'network/playing'

import {LyricModule,PlayAndFm} from 'common/mixin'

export default {
  name:"Playing",
  mixins:[LyricModule,PlayAndFm],
  components: {
    PlayingController,
  },
  data () {
    return {
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