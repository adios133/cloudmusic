<template>
  <div class='recommend'>
    <scroll class="rec-scroll">
      <recommend-cover :imgUrl="recList[0]" />
      <div class="content">
        <img src="~assets/img/default/arc1.png" alt="" class="arc">
        <recommend-play-all />
        <div class="list" v-for="(item,index) in recList" :key="index">
          <music-item :isRecommend="true" :songInfo="item" :rank="index" @saveList="saveList" />
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import {getRecommend} from 'network/recommend'
import Vue from 'vue'
import {Toast} from 'vant'
Vue.use(Toast)

import Scroll from 'components/common/Scroll/Scroll'
import MusicItem from 'components/content/MusicItem/MusicItem'
import RecommendCover from './childCpn/RecommendCover'
import RecommendPlayAll from './childCpn/RecommendPlayAll'
export default {
  name:"Rrecommend",
  components: {
    Scroll,
    RecommendCover,
    MusicItem,
    RecommendPlayAll    
  },
  data () {
    return {
      recList:[]
    };
  },
  methods: {
    _getRecommend() {
      getRecommend().then(res=> {
        Toast.clear()
        this.recList = res.data.dailySongs
      }).catch(err=> {
        Toast.fail({
          message:err.response.data.msg,
          duration:1500,
          onClose:()=> {
            this.$router.push('/login')
          }
        })
      })
    },
    saveList() {
      this.$store.commit('setPlaylist',this.recList)
    }
  },
  created() {
    Toast.loading('加载中...')
    this._getRecommend()
  }
  }
</script>

<style lang="scss" scoped>
  .recommend {
    background-color: #fff;
    .rec-scroll {
      height: calc(100vh - 49px);
      .content {
        position: relative;
        top: -10px;
        font-size: 0;
        .arc {
          width: 100%;
        }
      }
    }
  }
</style>