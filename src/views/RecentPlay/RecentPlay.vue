<template>
  <div class='recent-play'>
    <recent-nav @switchItem="switchItem" />
    <scroll class="content" ref="scroll">
      <music-item v-for="(item,index) in songList" :key="index"
      :songInfo="item"
      :isCount="true"
      :rank="index"
      @saveList="saveList"
      />
    </scroll>
  </div>
</template>

<script>
import RecentNav from './childCpn/RecentNav'
import MusicItem from 'components/content/MusicItem/MusicItem'
import Scroll from 'components/common/Scroll/Scroll'
import {getRecent} from 'network/recent'

import {getUserID} from 'common/mixin'



import Vue from 'vue'
import { Toast } from 'vant'
Vue.use(Toast)
export default {
  name:"RecentPlay",
  mixins:[getUserID],
  components: {
    RecentNav,
    MusicItem,
    Scroll
  },
  data() {
    return {
      songList:[],
      index:1
    }
  },
  methods: {
    
    // get userId mixins
    // _getUserId() {
    //   getUserId().then(res=> {
    //     if(res.profile) {
    //       Toast.loading('加载中...')
    //       this.$store.commit("setUid",res.profile.userId)
    //       this._getRecent(res.profile.userId)
    //     }else {
    //       Toast.fail({
    //         message:'需要登陆',
    //         duration:1500,
    //         onClose:()=>{
    //           this.$router.push('/login')
    //         }
    //       })
    //     }
    //   })
    // },

    // get list based on userId
    _getRecent(uid,type) {
      getRecent(uid,type).then(res=>{
        Toast.clear()
        this.$refs.scroll.scrollTo(0,0,300)
        if(type === 0) {
          // playcount在外,组织进入song中,做到与其他页面统一
          const temp = []
          res.allData.map(item => {
            item.song.playCount = item.playCount;
            item.song.score = item.score;
            temp.push(item.song)
          })
          this.songList = temp
        }else {
          const temp = []
          res.weekData.map(item => {
            item.song.playCount = item.playCount;
            item.song.score = item.score;
            temp.push(item.song)
          })
          this.songList = temp
        }
      })
    },
    // click to switch list
    switchItem(index) {
      Toast.loading('加载中...')
      if(index === 1) {
        this.index = 0
        this._getRecent(this.$store.state.userId,0)
      }else {
        this.index = 1
        this._getRecent(this.$store.state.userId)
      }
    },
    saveList() {
      this.$store.commit('setPlaylist',this.songList)
    }
  },
  activated() {
    this._getUserId().then(res=> {
      Toast.loading('加载中...')
      this._getRecent(res,this.index)
    }).catch(err=> {
      Toast.fail({
        message:err,
        duration:1500,
        onClose:()=>{
          this.$router.push('/login')
        }
      })
    })
  },
  }
</script>

<style lang="scss" scoped>
  .content {
    height: calc(100vh - 93px);
  }
</style>