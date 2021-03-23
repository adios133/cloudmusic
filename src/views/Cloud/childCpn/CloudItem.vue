<template>
  <div class='music-item' @click="toPlay">
    <div class="cover">
      <span>{{rank + 1}}</span>
    </div>
    <div class="song-info">
      <div class="song-name">
        <span>{{songInfo.songName}}</span>
      </div>
      <div class="artists">
        <span>{{songInfo.artist}}</span>
        <span v-if="songInfo.al"> - {{songInfo.al.name}}</span>
      </div>
    </div>
    <div class="more">
        <i class="iconfont icon-moreif"></i>
    </div>
  </div>
</template>

<script>

export default {
  name:"MusicItem",
  props:{
    songInfo:{
      type:Object,
      default() {
        return {}
      }
    },
    rank:{
      type:Number,
      default:0
    },
  },
  methods: {
    toPlay() {
      // 向父组件发送事件,将列表保存在vuex中
      this.$emit("saveList")
      // 跳转到playing页面
      this.$router.push('/playing/' + this.songInfo.songId)
      // 向playbar发送事件(事件总线),获取播放url
      this.$bus.$emit('playsong',this.songInfo.songId) 
      this.$store.commit('setState',false)
      this.$store.commit("setLine",0) 
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