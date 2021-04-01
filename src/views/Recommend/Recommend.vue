<template>
  <div class='recommend'>
    <recommend-nav :opicity="opicity" />
    <recommend-play-all class="fakeall" v-show="isShow" ref="playall1" v-cloak />
    <scroll class="rec-scroll" :probeType="3" @scrolling="scrolling">
      <recommend-cover :imgUrl="recList[0]" />
      <div class="content" ref="content" >
        <img src="~assets/img/default/arc1.png" alt="" class="arc">
        <recommend-play-all ref="playall2" v-show="show" />
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
import RecommendNav from './childCpn/RecommendNav'

import {barCeiling} from 'common/mixin'

export default {
  name:"Rrecommend",
  mixins:[barCeiling],
  components: {
    Scroll,
    RecommendCover,
    MusicItem,
    RecommendPlayAll,
    RecommendNav   
  },
  data () {
    return {
      recList:[],
      // opicity:0,
      // isShow:false,
      show:false
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
    },
  },
  created() {
    Toast.loading('加载中...')
    this._getRecommend()
  },
  beforeUpdate() {
      this.show = true
  }
  }
</script>

<style lang="scss" scoped>
  .recommend {
    background-color: #fff;
    .fakeall {
      position: absolute;
      top: 44px;
      width: 100%;
      z-index: 5;
    }
    .rec-scroll {
      height: calc(100vh - 49px);
      .content {
        position: relative;
        top: -10px;
        font-size: 0;
        .arc {
          width: 100%;
        }
        [v-clock] {
          display: none;
        }
      }
    }
  }
</style>