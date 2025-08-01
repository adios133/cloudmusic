<script setup lang="ts">
import { getListDetail, ListInfo, CreatorInfo } from "@/api/listdetail";
import ListDetailHeader from "./childCpn/ListDetailHeader.vue";
import ListDetailCount from "./childCpn/ListDetailCount.vue";
import Scroll from "@/components/common/Scroll/BetterScroll.vue";
import ListDetailPLayAll from "./childCpn/ListDetailPLayAll.vue";
import MusicItem from "@/components/content/MusicItem/MusicItem.vue";
import ListDetailNav from "./childCpn/ListDetailNav.vue";
import { GRADIENT_DISTANCE } from "@/common/const";
import { ref, useTemplateRef } from "vue";
import { Toast } from "vant";
import { useRoute } from "vue-router";
import useStore from "@/store";
defineOptions({
  name: "ListDetail"
});
const route = useRoute();
const store = useStore();
const isShow = ref(false);
const opacity = ref(0);
const listInfo = ref<{ [k: string]: any }>({});
const creatorInfo = ref<{ [k: string]: any }>({});
const songList = ref<any[]>([]);
const playAllRef = useTemplateRef("playall2");
const contentRef = useTemplateRef("content");
const scrolling = (position) => {
  opacity.value = -position.y / GRADIENT_DISTANCE;
  isShow.value =
    -position.y >=
    playAllRef.value.$el.offsetTop + contentRef.value.offsetTop - 44;
};
const _getListDetail = async (id: string) => {
  const res = await getListDetail(id);
  Toast.clear();
  listInfo.value = new ListInfo(res.playlist);
  creatorInfo.value = new CreatorInfo(res.playlist.creator);
  songList.value = res.playlist.tracks;
};
const saveList = () => {
  store.setPlaylist(songList.value);
};
const init = () => {
  Toast.loading("加载中...");
  _getListDetail(route.params.id as string);
};
init();
</script>

<template>
  <div class="list-detail">
    <list-detail-nav :opacity="opacity" :name="listInfo.name" />
    <list-detail-pLay-all
      :num="songList.length"
      class="fake-title"
      v-show="isShow"
      ref="playall1"
    />
    <scroll class="list-scroll" :probeType="3" @scrolling="scrolling">
      <list-detail-header :listInfo="listInfo" :creatorInfo="creatorInfo" />
      <list-detail-count
        :subscribedCount="listInfo.subscribedCount"
        :shareCount="listInfo.shareCount"
        :commentCount="listInfo.commentCount"
      />
      <div class="content" ref="content">
        <img src="@/assets/img/default/arc1.png" alt="" class="arc" />
        <list-detail-pLay-all :num="songList.length" ref="playall2" />
        <div class="list" v-for="(item, index) in songList" :key="index">
          <music-item :songInfo="item" :rank="index" @saveList="saveList" />
        </div>
      </div>
    </scroll>
  </div>
</template>

<style lang="less" scoped>
.list-detail {
  position: relative;
  .fake-title {
    position: absolute;
    top: 44px;
    z-index: 5;
  }
  .list-scroll {
    height: calc(100vh - 49px);
    .content {
      position: relative;
      top: -14px;
      .arc {
        width: 100%;
      }
    }
  }
}
</style>
