<script setup lang="ts">
import { computed } from "vue";
import useStore from "@/store";
import mitter from "@/mitt";
defineOptions({
  name: "FmController"
});
const props = defineProps<{
  like: boolean;
}>();
const emits = defineEmits<{
  nextFm: [];
  trashSong: [];
  likeSong: [];
}>();
const store = useStore();
const iconDisplay = computed(() => {
  return isPlaying.value ? "icon-24gl-pause" : "icon-24gl-play";
});
const isPlaying = computed(() => {
  return store.state.isplay;
});
const likeIcon = computed(() => {
  return props.like ? "icon-like2" : "icon-like";
});

const contrlClick = () => {
  store.setState(!isPlaying.value);
  mitter.emit("stateChange", isPlaying.value);
};
// 上一首,下一首
const nextSong = () => {
  store.setState(false);
  store.setLine(0);
  emits("nextFm");
};
// 垃圾桶
const trashSong = () => {
  emits("trashSong");
};
// 喜欢
const likeSong = () => {
  emits("likeSong");
};
</script>

<template>
  <div class="controller">
    <div class="play-dislike">
      <span class="iconfont icon-trash" @click="trashSong"></span>
    </div>
    <div class="play-like">
      <span class="iconfont" :class="likeIcon" @click="likeSong"></span>
    </div>
    <div class="play-state">
      <span
        class="play iconfont"
        :class="iconDisplay"
        @click="contrlClick"
      ></span>
    </div>
    <div class="play-next">
      <span class="iconfont icon-24gl-next" @click="nextSong"></span>
    </div>
    <div class="playcomment">
      <span class="iconfont icon-custom-comment"></span>
    </div>
  </div>
</template>

<style lang="less" scoped>
.controller {
  position: absolute;
  display: flex;
  justify-content: space-evenly;
  bottom: 20px;
  left: 0;
  width: 100%;
  color: #fff;
  .iconfont {
    font-size: 20px;
  }
  .play {
    position: relative;
    top: -8px;
    font-size: 36px;
    font-weight: 300;
  }
}
</style>
