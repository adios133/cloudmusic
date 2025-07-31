<script setup lang="ts">
import CloudNav from "./childCpn/CloudNav.vue";
import Scroll from "@/components/common/Scroll/BetterScroll.vue";
import { getCloudMusic } from "@/api/cloud";
import CloudItem from "./childCpn/CloudItem.vue";
import { Toast } from "vant";
import { ref, useTemplateRef } from "vue";
import useStore from "@/store";
defineOptions({
  name: "Cloud"
});
const songList = ref<any[]>();
const limit = ref<number>(100);
const offset = ref<number>(0);
const scrollRef = useTemplateRef("scroll");
const store = useStore();
const _getCloudMusic = async (limit?: number, offset?: number) => {
  const res = await getCloudMusic(limit, offset);
  Toast.clear();
  songList.value.push(...res.data);
};
const pullingUpLoad = () => {
  offset.value += limit.value;
  _getCloudMusic(limit.value, offset.value);
  scrollRef.value.scroll.finishPullUp();
};
// 播放，保存播放列表
const saveList = () => {
  const list = [];
  songList.value.forEach((item) => {
    list.push(item.simpleSong);
  });
  store.setPlaylist(list);
};
Toast.loading({
  message: "加载中"
});
_getCloudMusic();
</script>

<template>
  <div class="cloud">
    <cloud-nav />
    <scroll
      pullUpLoad
      @pullingUpLoad="pullingUpLoad"
      class="scroll"
      v-if="songList.length > 1"
      ref="scroll"
    >
      <cloud-item
        v-for="(item, index) in songList"
        :key="index"
        :rank="index"
        :songInfo="item"
        @saveList="saveList"
      />
    </scroll>
  </div>
</template>

<style lang="less" scoped>
.cloud {
  .scroll {
    height: calc(100vh - 93px);
  }
}
</style>
