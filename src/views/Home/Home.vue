<script setup lang="ts">
import HomeNav from "./childCpn/HomeNav.vue";
import HomeSlide from "./childCpn/HomeSlide.vue";
import HomeSwiper from "./childCpn/HomeSwiper.vue";
import HomeRecommend from "./childCpn/HomeRecommend.vue";
import ItemTitle from "@/components/content/ItemTitle/ItemTitle.vue";
import HomeSongRec from "./childCpn/HomeSongRec.vue";
import Scroll from "@/components/common/Scroll/Scroll.vue";
import HomeRank from "./childCpn/HomeRank.vue";
import {
  getSwiper,
  getRecommend,
  getRankList,
  getListDetail,
  HomeRankItem,
  getDefault
} from "@/network/home";
import { ref, onMounted } from "vue";
defineOptions({
  name: "Home"
});
const show = ref<boolean>(false);
const bannerList = ref<any[]>([]);
const recommendList = ref<any[]>([]);
const rankIdList = ref<any[]>([]);
const keyword = ref<string>("");
const showSlide = () => {
  show.value = true;
};
const closeSlide = () => {
  show.value = false;
};
const _getSwiper = async (type?: number) => {
  const res = await getSwiper(type);
  bannerList.value = res.banners;
};
const _getRecommend = async (limit?: number) => {
  const res = await getRecommend(limit);
  recommendList.value = res.result;
};
const _getRankListId = async () => {
  const res = await getRankList();
  res.list.slice(0, 5).forEach((item) => {
    _getListDetail(item.id);
  });
};
const _getListDetail = async (id: string) => {
  const res = await getListDetail(id);
  const songList = res.playlist.tracks.slice(0, 3);
  const item = new HomeRankItem(res.playlist, songList);
  rankIdList.value.push(item);
};
const _getDefault = async () => {
  const res = await getDefault();
  keyword.value = res.data.showKeyword;
};
onMounted(() => {
  // 获取banner数据
  _getSwiper();
  // 获取推荐歌单
  _getRecommend();
  // 获取排行榜id
  _getRankListId();
  _getDefault();
});
</script>

<template>
  <transition name="silde">
    <div id="home">
      <home-nav @showSlide="showSlide" :keyword="keyword" />
      <home-slide :isShow="show" @closeSlide="closeSlide" />
      <scroll class="home-scroller">
        <home-swiper :bannerList="bannerList" />
        <home-recommend />
        <item-title title="推荐歌单" class="rec-title" path="/songlist" />
        <home-song-rec :recommendList="recommendList" />
        <item-title title="排行榜" class="rec-title" path="/rank" />
        <home-rank :rankIdList="rankIdList" />
      </scroll>
    </div>
  </transition>
</template>

<style lang="less" scoped>
.silde-enter-active {
  transform: translateX(0);
}
.silde-leave-active {
  transform: translateX(100vw);
}
.home-scroller {
  height: calc(100vh - 133px);
  .rec-title {
    margin: 20px 20px;
  }
}
</style>
