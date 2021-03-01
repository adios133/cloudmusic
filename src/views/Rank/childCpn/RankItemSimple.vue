<template>
  <div class='list-item'>
    <img src="~assets/img/default/default.jpg" alt="" v-if="imgSrc === ''">
    <img :src="imgSrc" alt="" v-else>
    <div class="desc">{{desc}}</div>
    <div class="info">{{updateFrequency}}</div>
  </div>
</template>

<script>

export default {
  name:"RankItemSimple",
  props:{
    imgSrc:{
      type:String,
      default:''
    },
    desc:{
      type:String,
      default:'歌单'
    },
    updateFrequency:{
      type:String,
      default:''
    }
  },
  }
</script>

<style lang="scss" scoped>
  .list-item {
    position: relative;
    width: 6.25rem;
    img {
      width: 6.25rem;
      height: 6.25rem;
      border-radius: 20px
    };
    .desc {
      display: -webkit-box;
      overflow: hidden;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      text-overflow: ellipsis;
      white-space: normal;
      width: 100%;
      margin-top: 5px;
      font-size: 13px;
      text-align: center;
      font-weight: 700;
      line-height: 1.2;
      word-break:break-all;  
      // 英文单词过长，空间利用率不高，不美观
    }
    .info {
      position: absolute;
      right: 5px;
      top: 5px;
      color: #fff;
      font-size: 12px;
      background-color: rgba(255,255,255,.2);
      border-radius: 5px;
    }
  }
</style>