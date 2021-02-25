<template>
  <div class='music-item' v-if="songInfo.name" @click="toPlay">
    <div class="cover">
      <img :src="songInfo.al.picUrl" alt="" v-if="isRecommend">
      <span v-else>{{rank + 1}}</span>
    </div>
    <div class="song-info">
      <div class="song-name">
        <span>{{songInfo.name}}</span>
        <span v-if="songInfo.alia[0]" class="alia">({{songInfo.alia[0]}})</span>
      </div>
      <div class="artists">
        <span v-for="(item, index) in songInfo.ar" :key="index">
            {{ item.name }}<span v-if="index < songInfo.ar.length - 1">/</span>
        </span>
        <span v-if="songInfo.al.name != ''"> - {{songInfo.al.name}}</span>
      </div>
    </div>
    <div class="more">
      <span v-if="isCount" class="count" >
        <i class="iconfont icon-24gl-play-copy"></i>
        {{playCount}}次
      </span>
      <span v-else class="not-count">
        <i class="iconfont icon-moreif"></i>
      </span>
    </div>
  </div>
</template>

<script>

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
    playCount:{
      type:Number,
      default:0
    },
    isCount:{
      type:Boolean,
      default:false
    },
    rank:{
      type:Number,
      default:0
    }
  },
  computed: {
    
  },
  methods: {
    toPlay() {
      this.$router.push('/playing/' + this.songInfo.id)
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
    }
    .song-info {
      width: calc(100vw - 120px);
      font-size: 14px;
      color: #333333;
      .song-name,.artists {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        height: 50%;
        line-height: 40px;
      }
      .alia {
        color: #999;
      }
      .artists {
        line-height: 20px;
        font-size: 13px;
        color: #808080;
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