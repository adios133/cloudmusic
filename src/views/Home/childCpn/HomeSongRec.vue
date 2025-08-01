<script setup lang="ts">
import ListItem from "@/components/content/ListItem/ListItem.vue";
import Scroll from "@/components/common/Scroll/BetterScroll.vue";
import { useRouter } from "vue-router";
defineOptions({
  name: "HomeSongRec"
});
const { recommendList = [] } = defineProps<{ recommendList: any[] }>();
const router = useRouter();
// 点击跳转到歌单详情
const songClick = (id: string) => {
  router.push("/listdetail/" + id);
};
</script>

<template>
  <div class="home-song-rec" v-if="recommendList[0]">
    <scroll :scrollX="true" class="home-scroll">
      <div
        class="scroll-item"
        v-for="item in recommendList"
        :key="item.id"
        @click="songClick(item.id)"
      >
        <list-item
          :imgSrc="item.picUrl"
          :desc="item.name"
          :playCount="item.playCount"
        />
      </div>
    </scroll>
  </div>
</template>

<style lang="less" scoped>
.home-song-rec {
  .home-scroll {
    width: 100vw;
    .scroll-item {
      display: inline-block;
      margin: 4px 8px;
      vertical-align: top;
    }
  }
}
</style>
