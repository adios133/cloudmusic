<template>
  <div class='list-detail'>  
    <list-detail-nav :opicity="opicity" :name="listInfo.name" />
    <list-detail-pLay-all :num="songList.length" class="fake-title" v-show="isShow" ref="playall1" />
    <scroll class="list-scroll" :probeType="3" @scrolling="scrolling">
      <list-detail-header :listInfo="listInfo" :creatorInfo="creatorInfo" />
      <list-detail-count 
      :subscribedCount="listInfo.subscribedCount"
      :shareCount="listInfo.shareCount"
      :commentCount="listInfo.commentCount" />
      <div class="content" ref="content">
        <img src="~assets/img/default/arc1.png" alt="" class="arc">
        <list-detail-pLay-all :num="songList.length" ref="playall2" />
        <div class="list" v-for="(item,index) in songList" :key="index">
          <music-item :songInfo="item" :rank="index" @saveList="saveList"/>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import {getListDetail,ListInfo,CreatorInfo} from 'network/listdetail'

import ListDetailHeader from './childCpn/ListDetailHeader'
import ListDetailCount from './childCpn/ListDetailCount'
import Scroll from 'components/common/Scroll/Scroll'
import ListDetailPLayAll from './childCpn/ListDetailPLayAll'
import MusicItem from 'components/content/MusicItem/MusicItem'
import ListDetailNav from './childCpn/ListDetailNav'


import Vue from 'vue'
import {Toast} from 'vant'
Vue.use(Toast)
export default {
  name:"ListDetail",
  components: {
    ListDetailHeader,
    ListDetailCount,
    Scroll,
    ListDetailPLayAll,
    MusicItem,
    ListDetailNav
  },
  data () {
    return {
      listInfo:{},
      creatorInfo:{},
      songList:[],
      opicity:0,
      isShow:false,
    };
  },
  methods: {
    _getListDetail(id) {
      getListDetail(id).then(res=> {
        Toast.clear()
        this.listInfo = new ListInfo(res.playlist)
        this.creatorInfo = new CreatorInfo(res.playlist.creator)
        this.songList = res.playlist.tracks
      })
    },
    saveList() {
      this.$store.commit("setPlaylist",this.songList)
    },
    scrolling(position) {
      this.opicity = -position.y / 190
      this.isShow = -position.y >= this.$refs.playall2.$el.offsetTop + this.$refs.content.offsetTop -44
    }
  },
  created() {
    Toast.loading('加载中...')
    this._getListDetail(this.$route.params.id)
  },
  }
</script>

<style lang="scss" scoped>
  .list-detail {
    position: relative;
    .fake-title {
    position: absolute;
    top: 44px;
    z-index: 5;
  }
  .list-scroll {
    height: calc(100vh - 49px);
    .content {
      position: relative;
      top: -14px;
      .arc {
        width: 100%;
      }
    }
  }
  }
</style>