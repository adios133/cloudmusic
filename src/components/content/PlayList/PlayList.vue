<template>
    <van-popup 
    v-model="show" 
    position="bottom" 
    :style="{'height':'70%','width':'100%'}" 
    duration=".2" 
    @click-overlay="closeList" 
    class="play-list" closeable 
    @click-close-icon="closeList">
      <div class="title">播放列表</div>
      <div class="container">
        <div class="item" v-for="(item,index) in list" :key="'m'+index" :class="{'playing':playingSong === index}">
          <span>{{index + 1}}</span>
          <span>{{item.name}} - </span>
          <span v-for="(artist, indey) in item.ar" :key="artist.id">{{ artist.name }}<span v-if="indey < item.ar.length - 1">/</span>
            </span>
        </div>
      </div>
    </van-popup>
</template>

<script>
import Vue from 'vue'
import {Popup,List} from 'vant'
Vue.use(Popup)
Vue.use(List)
import Scroll from 'components/common/Scroll/Scroll'
export default {
  name:"HomeSlide",
  components:{
    Scroll
  },
  props: {
    isShow:{
      type:Boolean,
      default:false
    }
  },
  data () {
    return {
      show:false,
      list:[]
    };
  },
  watch: {
    isShow() {
      this.show = this.isShow
      this.list = this.$store.state.playlist
      
    }
  },
  computed: {
    playingSong() {
      const id = this.$store.state.playing.id
      let idx
      this.$store.state.playlist.forEach((item,index) => {
        if (item.id === id) return idx = index
      })
      return idx
    }
  },
  methods: {
   closeList() {
     this.$emit('closeList')
   }
  },
  
  }
</script>

<style lang="scss" scoped>
  .play-list {
    font-size: 16px;
    color: #333;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    .title {
      height: 50px;
      line-height: 50px;
      padding: 0 20px;
      font-weight: 700;
      border-bottom: 1px solid #ddd;
    }
    .container {
      overflow: auto;
      height: calc(70vh - 50px);
      .item {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #f5f5f5;
        &>span:first-child {
          display: inline-block;
          width: 50px;
          text-align: center;
          font-weight: 700;
        }
      }
      .playing {
        color: #D43C33;
      }
    }
  }
</style>