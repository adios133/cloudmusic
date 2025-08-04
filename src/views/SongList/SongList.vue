<script setup lang="ts">
import SongListNav from "./childCpn/SongListNav.vue";
import SongListCategory from "./childCpn/SongListCategory.vue";
import Scroll from "@/components/common/Scroll/BetterScroll.vue";
import ListItem from "@/components/content/ListItem/ListItem.vue";
import { getListCategory, getSongList } from "@/api/songlist";
import { closeToast, showLoadingToast } from "vant";
import { ref, useTemplateRef } from "vue";
import { useRouter } from "vue-router";
defineOptions({
  name: "SongList"
});
const router = useRouter();
const tagList = ref<any[]>([]);
const songList = ref<any[]>([]);
const limit = ref(50);
const offset = ref(0);
const tag = ref("");
const scrollRef = useTemplateRef("scroll");
const _getListCategory = async () => {
  const res = await getListCategory();
  closeToast();
  tagList.value = res.tags;
  tagList.value.unshift({ name: "全部" });
};
const _getSongList = async (cat?, offset?, limit?, order?) => {
  const res = await getSongList(cat, offset, limit, order);
  closeToast();
  songList.value.push(...res.playlists);
  scrollRef.value.scroll.finishPullUp();
};
// 点击分类切换
const cateClick = (tags) => {
  offset.value = 0;
  songList.value = [];
  tag.value = tags;
  showLoadingToast("加载中...");
  _getSongList(tags);
};
const pullingUpLoad = () => {
  offset.value++;
  _getSongList(tag.value, offset.value);
};
// 点击事件
const goListDetail = (id: string) => {
  router.push("/listdetail/" + id);
};

// created
showLoadingToast("加载中...");
_getListCategory();
_getSongList();
</script>

<template>
  <div class="songlist">
    <song-list-nav />
    <song-list-category :tagList="tagList" @cateClick="cateClick" />
    <scroll
      class="songlist-scroll"
      :pullUpLoad="true"
      ref="scroll"
      @pullingUpLoad="pullingUpLoad"
    >
      <div class="content">
        <div
          class="item-box"
          v-for="(item, index) in songList"
          :key="index"
          @click="goListDetail(item.id)"
        >
          <list-item
            :imgSrc="item.coverImgUrl"
            :desc="item.name"
            :playCount="item.playCount"
            class="songlist-item"
          />
        </div>
      </div>
    </scroll>
  </div>
</template>

<style lang="less" scoped>
.songlist-scroll {
  height: calc(100vh - 137.5px);
  .item-box {
    display: inline-block;
    width: 33.333%;
    vertical-align: top;
  }
  .songlist-item {
    margin: 10px auto;
  }
}
</style>
