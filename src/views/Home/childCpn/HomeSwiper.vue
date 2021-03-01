<template>
  <div class='home-swiper'>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#EC4141">
      <van-swipe-item v-for="item in bannerList" :key="item.bannerId">
        <img :src="item.pic" alt="">
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import Vue from 'vue'
import {Swipe, SwipeItem} from 'vant'
Vue.use(Swipe)
Vue.use(SwipeItem)
export default {
  name:"HomeSwiper",
  props: {
    bannerList:{
      type:Array,
      default() {
        return []
      }
    }
  },
  data () {
    return {
      
    };
  },
  computed: {
    
  },
  methods: {
    
  },
  }
</script>

<style lang="scss" scoped>
  .home-swiper {
    width: 100vw;
    // height: 9.375rem;
    text-align: center;
    .my-swipe {
      overflow: hidden;
      width: 90%;
      margin: 10px auto;
      border-radius: 20px;
      background-image: linear-gradient(rgba(237, 238, 220,.2),#fff);
      img {
        width: 100%;
        border-radius: 20px;
      }
    
    }
  }
</style>