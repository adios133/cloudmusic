<template>
  <div class='rank'>
    <rank-header />
    <scroll class="rank-scroll">
      <div class="offcial-rank">官方榜</div>
      <rank-item v-for="(item,index) in offcialRank" :key="index" :rankInfo="item" />
      <div class="other-rank">精选榜</div>
      <div class="content">
        <div class="item-simple" v-for="(item,index) in otherRank" 
          :key="index" 
          @click="listClick(item.id)">
          <rank-item-simple  
          :imgSrc="item.coverImgUrl" 
          :desc="item.name" 
          :updateFrequency="item.updateFrequency" 
          class="rank-item-simple"/>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/Scroll/Scroll'
import RankHeader from './childCpn/RankHeader'
import RankItem from './childCpn/RankItem'
import RankItemSimple from './childCpn/RankItemSimple'

import {getRank} from 'network/rank'

import Vue from 'vue'
import {Toast} from 'vant'
Vue.use(Toast)

export default {
  name:"Rank",
  components: {
    Scroll,
    RankHeader,
    RankItem,
    RankItemSimple
  },
  data () {
    return {
      rankList:[]
    };
  },
  computed: {
    offcialRank() {
      return this.rankList.filter(item => item.tracks.length > 0 )
    },
    otherRank() {
      return this.rankList.filter(item => item.tracks.length === 0 )
    }
  },
  methods: {
    _getRank() {
      getRank().then(res => {
        Toast.clear()
        this.rankList = res.list
      })
    },
    listClick(id) {
      this.$router.push('/listdetail/' + id)
    }
  },
  created() {
    Toast.loading('加载中...')
    this._getRank()
  }
  }
</script>

<style lang="scss" scoped>
  .rank-scroll {
    height: calc(100vh - 93px);
    .offcial-rank,.other-rank {
      height: 30%;
      line-height: 30px;
      margin-left: 20px;
      color: #333;
      font-size: 20px;
      font-weight: 700;
    }
    .item-simple {
      display: inline-block;
      width: 33.333%;
      vertical-align: top;
      .rank-item-simple {
        margin: 10px auto;
      }
    }
  }
</style>