<template>
  <div class='list-detail'>
    <scroll class="list-scroll">
      <list-detail-header :listInfo="listInfo" :creatorInfo="creatorInfo" />
      <list-detail-count 
      :subscribedCount="listInfo.subscribedCount"
      :shareCount="listInfo.shareCount"
      :commentCount="listInfo.commentCount" />
      <div class="content">
        <img src="~assets/img/default/arc1.png" alt="" class="arc">
        <list-detail-pLay-all :num="songList.length" />
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
    MusicItem
  },
  data () {
    return {
      listInfo:{},
      creatorInfo:{},
      songList:[]
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
    }
  },
  activated() {
    Toast.loading('加载中...')
    this._getListDetail(this.$route.params.id)
  }
  }
</script>

<style lang="scss" scoped>
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
</style>