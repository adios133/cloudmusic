<template>
  <div id='music'>
    <music-nav @musicNavClick="musicNavClick" ref="musicNav"/>
    <scroll class="music-scroll" :probeType="3" @scrolling="scrolling" ref="scroll">
      <div class="create">
        <div class="title">创建的歌单({{createList.length}})</div>
        <music-item v-for="(item,index) in createList" :key="index" :listInfo="item"/>
      </div>
      <div class="subscribled" ref="subscribled">
        <div class="title">收藏的歌单({{subscribedList.length}})</div>
        <music-item v-for="(item,index) in subscribedList" :key="index" :listInfo="item"/>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/Scroll/Scroll'
import MusicNav from './childCpn/MusicNav'
import MusicItem from './childCpn/MusicListItem'

import {getUserID} from 'common/mixin'
import {getUserList} from 'network/music'

import Vue from 'vue'
import {Toast} from 'vant'
Vue.use(Toast)
export default {
  name:"Music",
  mixins:[getUserID],
  components: {
    Scroll,
    MusicNav,
    MusicItem
  },
  data () {
    return {
      createList:[],
      subscribedList:[],
    };
  },
  methods: {
    // 请求 封装获取用户歌单函数
    _getUserList(uid,limit,offset) {
      getUserList(uid,limit,offset).then(res=> {
        Toast.clear()
        res.playlist.forEach(item=> {
          // 区分收藏的和自己创建的
          if(item.subscribed) {
            this.subscribedList.push(item)
          }else {
            this.createList.push(item)
          }
        })
      })
    },

    // 操作方法
    musicNavClick(index) {
      if (index === 0) {
        this.$refs.scroll.scrollTo(0,0,300)
      }else {
        this.$refs.scroll.scrollTo(0,-this.$refs.subscribled.offsetTop,300)
      }
    },
    scrolling(position) {
      // console.log(position);
      if(-position.y >= 0 && -position.y < this.$refs.subscribled.offsetTop) {
        this.$refs.musicNav.currentIndex = 0
      }else {
        this.$refs.musicNav.currentIndex = 1
      }
    }
  },
  created() {
    this._getUserId().then(res=> {
      Toast.loading('加载中...')
      this._getUserList(res)
    }).catch(err=> {
      Toast.fail({
        message:err,
        duration:1500,
      })
    })
    
  },
  }
</script>

<style lang="scss" scoped>
#music {
  font-size: 16px;
  .music-scroll {
    height: calc(100vh - 133px);
    position: relative;
    .create,.subscribled {
      .title {
        height: 50px;
        line-height: 50px;
        text-indent: 15px;
        border-bottom: 1px solid #eee;
      }
    }
  }
}
  
</style>