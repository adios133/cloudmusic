<template>
  <div class='list-item'>
    <img src="~assets/img/default/default.jpg" alt="" v-if="imgSrc === ''">
    <img v-lazy="imgSrc" alt="" v-else>
    <div class="desc">{{desc}}</div>
    <div class="count"><span class="iconfont icon-24gl-play-copy"></span>{{playCount | count}}</div>
  </div>
</template>

<script>
import {fixedNum} from 'common/mixin'
export default {
  name:"ListItem",
  mixins:[fixedNum],
  props:{
    imgSrc:{
      type:String,
      default:''
    },
    desc:{
      type:String,
      default:'歌单'
    },
    playCount:{
      type:Number,
      default:0
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
      font-size: 12px;
      line-height: 1.2;
      word-break:break-all;  
      // 英文单词过长，空间利用率不高，不美观
    }
    .count {
      position: absolute;
      top:3px;
      right: 7px;
      font-size: 12px;
      color: #fff;
      background-color: rgba($color: #000000, $alpha: .1);
      border-radius: 6px;
    }
  }
</style>