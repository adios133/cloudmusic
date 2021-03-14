<template>
  <div class='playing' v-if="musicInfo">
    <playing-bg :picUrl="musicInfo.al.picUrl" />
    <div class="container">
      <playing-nav :musicInfo="musicInfo" />
      <van-swipe indicator-color="#fff" :loop="false">
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
        this._getLyric(vm.$route.params.id)
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
    /*
    _getLyric(id) {
      getLyric(id).then(res => {
        if (res.nolyric) {
          this.lyric = [{time:0,msg:'纯音乐'}]
        }else if (res.uncollected) {
          this.lyric = [{time:0,msg:'暂无歌词'}]
        }else {
          this.lyricsFormat(res.lrc.lyric)
        }
      })
    },
    lyricsFormat(lrc) {
      this.lyric = []
      if (lrc.length == 0) return;
      const lrcs = lrc.split('\n')
      for (let i in lrcs) { 
        lrcs[i] = lrcs[i].replace(/(^\s*)|(\s*$)/g, "")
        const t = lrcs[i].substring(lrcs[i].indexOf("[") + 1, lrcs[i].indexOf("]"))
        const s = t.split(":")
        if (!isNaN(parseInt(s[0]))) {
          const arr = lrcs[i].match(/\[(\d+:.+?)\]/g)
          let start = 0
          for (let k in arr) {
            start += arr[k].length
          }
          const content = lrcs[i].substring(start)
          for (let k in arr) {
            const t = arr[k].substring(1, arr[k].length - 1)
            const s = t.split(":")
            this.lyric.push({
              time: Number((parseFloat(s[0]) * 60 + parseFloat(s[1])).toFixed(3)),
              msg: content
            })
          }
        }
      }	
      this.lyric.sort((a,b)=>  a.time - b.time)
    }
    */
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