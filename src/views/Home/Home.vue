<template>
  <div id='home'>
    <home-nav @showSlide="showSlide" />
    <home-slide :isShow="show" @closeSlide="closeSlide" />
    <scroll class="home-scroller">
      <home-swiper :bannerList="bannerList" />
      <home-recommend />
      <item-title title="推荐歌单" class="rec-title" path="/songlist" />
      <home-song-rec :recommendList="recommendList" />
      <item-title title="排行榜" class="rec-title" path="/rank" />
      <home-rank :rankIdList="rankIdList" />
    </scroll>
  </div>
</template>

<script>
import HomeNav from './childCpn/HomeNav'
import HomeSlide from './childCpn/HomeSlide'
import HomeSwiper from './childCpn/HomeSwiper'
import HomeRecommend from './childCpn/HomeRecommend'
import ItemTitle from 'components/content/ItemTitle/ItemTitle'
import HomeSongRec from './childCpn/HomeSongRec'
import Scroll from 'components/common/Scroll/Scroll'
import HomeRank from './childCpn/HomeRank'

import {getSwiper,getRecommend,getRankList,getListDetail,homeRank} from 'network/home'


export default {
  name:"Home",
  components: {
    HomeNav,
    HomeSlide,
    HomeSwiper,
    HomeRecommend,
    ItemTitle,
    HomeSongRec,
    Scroll,
    HomeRank
  },
  data () {
    return {
      show:false,
      bannerList:[],
      recommendList:[],
      rankIdList:[]
    };
  },
  computed: {
    
  },
  methods: {
    showSlide() {
      this.show = true
    },
    closeSlide() {
      this.show = false
    },

    // 封装网络请求
    _getSwiper(type) {
      getSwiper(type).then(res=> {
        this.bannerList = res.banners
      })
    },
    _getRecommend(limit) {
      getRecommend(limit).then(res=> {
        this.recommendList = res.result
      })
    },
    _getRankListId() {
      getRankList().then(res=> {
        res.list.slice(0, 5).forEach(item => {
          this._getListDetail(item.id)
        })
      })
    },
    _getListDetail(id) {
      getListDetail(id).then(res=> {
        const songList = res.playlist.tracks.slice(0,3)
        const item = new homeRank(res.playlist,songList)
        this.rankIdList.push(item)
      })
    }
  },
  created() {
    // 获取banner数据
    this._getSwiper()
    // 获取推荐歌单
    this._getRecommend()
    // 获取排行榜id
    this._getRankListId()

  }
  }
</script>

<style lang="scss" scoped>
.home-scroller {
  height: calc(100vh - 133px);
  .rec-title {
    margin: 20px 20px;
  }
}
  
</style>