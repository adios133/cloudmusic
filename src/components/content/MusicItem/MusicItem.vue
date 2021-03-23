<template>
  <div class='music-item' v-if="songInfo.name" @click="toPlay">
    <div class="cover">
      <img :src="songInfo.al.picUrl" alt="" v-if="isRecommend">
      <span v-else>{{rank + 1}}</span>
    </div>
    <div class="song-info">
      <div class="song-name" :class="{'no-copyright':songInfo.noCopyrightRcmd}">
        <span>{{songInfo.name}}</span>
          <span v-if="songInfo.alia[0]" class="alia">({{songInfo.alia[0]}})</span> 
      </div>
      <div class="artists">
        <span class="iconfont icon-vip1 vip" v-if="songInfo.copyright===1"></span>
        <span v-for="(item, index) in songInfo.ar" :key="index">
            {{ item.name }}<span v-if="index < songInfo.ar.length - 1">/</span>
        </span>
          <span v-if="songInfo.al.name "> - {{songInfo.al.name}}</span>
      </div>
    </div>
    <div class="more">
      <span v-if="isCount" class="count" >
        <i class="iconfont icon-24gl-play-copy"></i>
        {{songInfo.playCount}}次
      </span>
      <span v-else class="not-count">
        <i class="iconfont icon-moreif"></i>
      </span>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import{Toast} from 'vant'
Vue.use(Toast)
export default {
  name:"MusicItem",
  props:{
    isRecommend:{
      type:Boolean,
      default:false
    },
    songInfo:{
      type:Object,
      default() {
        return {}
      }
    },
    isCount:{
      type:Boolean,
      default:false
    },
    rank:{
      type:Number,
      default:0
    },
  },
  methods: {
    toPlay() {
      if (this.songInfo.noCopyrightRcmd) {
        Toast.fail({
          message:'暂无版权',
          duration:1500
        })
        return
      }
      // 向父组件发送事件,将列表保存在vuex中
      this.$emit("saveList")
      // 跳转到playing页面
      this.$router.push('/playing/' + this.songInfo.id)
      // 向playbar发送事件(事件总线),获取播放url
      this.$store.commit('setState',false)
      this.$store.commit("setLine",0)
      this.$bus.$emit('playsong',this.songInfo.id)  
    }
  },
  }
</script>

<style lang="scss" scoped>
  .music-item {
    display: flex;
    height: 60px;
    margin: 0 5px;
    .cover,.more {
      width: 60px;
      height: 100%;
      line-height: 60px;
      text-align: center;
      color: #999999;
    }
    .cover {
      img {
        width: 48px;
        height: 48px;
        vertical-align: middle;
        border-radius: 10px;
      }
      span {
        font-size: 16px;
      }
    }
    .song-info {
      width: calc(100vw - 120px);
      font-size: 14px;
      color: #333;
      .song-name,.artists {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        height: 50%;
        line-height: 40px;
      }
      .no-copyright {
        color: #aaa;
      }
      .alia {
        color: #999;
      }
      .artists {
        line-height: 20px;
        font-size: 13px;
        color: #808080;
        .vip {
          position: relative;
          top: 3px;
          color: #d43c33;
        }
      }
    }
    .more {
      font-size: 12px;
      .count {
        font-size: 10px;
      }
      .not-count {
        margin-left: 30px;
      }
    }
  }
</style>