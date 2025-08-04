<script setup lang="ts">
import { getRecommend } from "@/api/recommend";
import { closeToast, showFailToast, showLoadingToast } from "vant";
import Scroll from "@/components/common/Scroll/BetterScroll.vue";
import MusicItem from "@/components/content/MusicItem/MusicItem.vue";
import RecommendCover from "./childCpn/RecommendCover.vue";
import RecommendPlayAll from "./childCpn/RecommendPlayAll.vue";
import RecommendNav from "./childCpn/RecommendNav.vue";
import { ref, onBeforeUpdate, useTemplateRef } from "vue";
import { GRADIENT_DISTANCE } from "@/common/const";
import { useRouter } from "vue-router";
import useStore from "@/store";
defineOptions({
  name: "Rrecommend"
});
const router = useRouter();
const store = useStore();
const opacity = ref(0);
const isShow = ref(false);
const show = ref(false);
const recList = ref<any[]>([]);
const contentRef = useTemplateRef("content");
const playAllRef = useTemplateRef("playall2");
const scrolling = (position: any) => {
  opacity.value = -position.y / GRADIENT_DISTANCE;
  isShow.value =
    -position.y >=
    playAllRef.value.$el.offsetTop + contentRef.value.offsetTop - 44;
};
const _getRecommend = async () => {
  try {
    const res = await getRecommend();
    closeToast();
    recList.value = res.data.dailySongs;
  } catch (err) {
    showFailToast({
      message: err.response.data.msg,
      duration: 1500,
      onClose: () => {
        router.push("/login");
      }
    });
  }
};
const saveList = () => {
  store.setPlaylist(recList.value);
};
showLoadingToast("加载中...");
_getRecommend();

onBeforeUpdate(() => {
  show.value = true;
});
</script>

<template>
  <div class="recommend">
    <recommend-nav :opacity="opacity" />
    <recommend-play-all class="fakeall" v-show="isShow" ref="playall1" />
    <scroll class="rec-scroll" :probeType="3" @scrolling="scrolling">
      <recommend-cover :imgUrl="recList[0]" />
      <div class="content" ref="content">
        <img src="@/assets/img/default/arc1.png" alt="" class="arc" />
        <recommend-play-all ref="playall2" v-show="show" />
        <div class="list" v-for="(item, index) in recList" :key="index">
          <music-item
            :isRecommend="true"
            :songInfo="item"
            :rank="index"
            @saveList="saveList"
          />
        </div>
      </div>
    </scroll>
  </div>
</template>

<style lang="less" scoped>
.recommend {
  background-color: #fff;
  .fakeall {
    position: absolute;
    top: 44px;
    width: 100%;
    z-index: 5;
  }
  .rec-scroll {
    height: calc(100vh - 49px);
    .content {
      position: relative;
      top: -10px;
      font-size: 0;
      .arc {
        width: 100%;
      }
    }
  }
}
</style>
