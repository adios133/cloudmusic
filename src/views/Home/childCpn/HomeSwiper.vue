<script setup lang="ts">
import { Swipe as VanSwipe, SwipeItem as VanSwipeItem } from "vant";

const { bannerList = [] } = defineProps<{
  bannerList: any[];
}>();
</script>

<template>
  <div class="home-swiper">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#EC4141">
      <van-swipe-item v-for="item in bannerList" :key="item.bannerId">
        <img :src="item.pic" alt="" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<style lang="less" scoped>
.home-swiper {
  width: 100vw;
  text-align: center;
  .my-swipe {
    overflow: hidden;
    width: 90%;
    margin: 10px auto;
    border-radius: 20px;
    background-image: linear-gradient(rgba(237, 238, 220, 0.2), #fff);
    img {
      width: 100%;
      border-radius: 20px;
    }
  }
}
</style>
