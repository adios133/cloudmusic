<template>
  <div class='songlist'>
    <song-list-nav />
    <song-list-category :tagList="tagList" @cateClick="cateClick" />
    <scroll class="songlist-scroll" :pullUpLoad="true" ref="scroll" @pullingUpLoad="pullingUpLoad" >
      <div class="content">
        <div class="item-box" v-for="(item,index) in songList" 
          :key="index" @click="goListDetail(item.id)">
          <list-item  
          :imgSrc="item.coverImgUrl" 
          :desc="item.name"
          :playCount="item.playCount" 
          class="songlist-item"
           />
        </div>
        
      </div>
    </scroll>
  </div>
</template>

<script>
import SongListNav from './childCpn/SongListNav'
import SongListCategory from './childCpn/SongListCategory'
import Scroll from 'components/common/Scroll/Scroll'
import ListItem from 'components/content/ListItem/ListItem'


import {getListCategory,getSongList} from 'network/songlist'

import Vue from 'vue'
import {Toast} from 'vant'
Vue.use(Toast)

export default {
  name:"SongList",
  components: {
    SongListNav,
    Scroll,
    SongListCategory,
    ListItem
  },
  data () {
    return {
      tagList:[],
      songList:[],
      limit:50,   //每页多少
      offset:0,   //分页数据
      tag:''
    };
  },
  methods: {
    // 获取分类列表
    _getListCategory() {
      getListCategory().then(res=> {
        Toast.clear()
        this.tagList = res.tags
        this.tagList.unshift({name:'全部'})
      })
    },
    // 获取列表对应歌单，limit ，order没用上，可以用但没必要
    _getSongList(cat,offset,limit,order) {
      getSongList(cat,offset,limit,order).then(res=> {
        Toast.clear()
        this.songList.push(...res.playlists)
        this.$refs.scroll.scroll.finishPullUp()
      })
    },
    // 点击分类切换
    cateClick(tag) {
      this.offset = 0
      this.songList = []
      this.tag = tag
      Toast.loading('加载中...')
      this._getSongList(tag)
    },
    // 上拉加载更多
    pullingUpLoad() {
      this.offset+=1
      this._getSongList(this.tag,this.offset)
    },
    // 点击事件
    goListDetail(id) {
      this.$router.push('/listdetail/' + id)
    }
  },
  created(){
    // 上来加载全部分类
    Toast.loading('加载中...')
    this._getListCategory()
    this._getSongList()
  }
  }
</script>

<style lang="scss" scoped>
  .songlist-scroll {
    height: calc(100vh - 137.5px);
    .item-box {
      display: inline-block;
      width: 33.333%;
      vertical-align: top;
    }
    .songlist-item {
      margin: 10px auto;
    }
  }
</style>