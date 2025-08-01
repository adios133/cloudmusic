<script setup lang="ts">
import { showToast } from "vant";
import { ref, computed } from "vue";
import useStore from "@/store";
import mitter from "@/mitt";
defineOptions({
  name: "PlayingController"
});
const store = useStore();
const order = ref("list");
const iconDisplay = computed(() => {
  return isPlaying.value ? "icon-24gl-pause" : "icon-24gl-play";
});
const isPlaying = computed(() => {
  return store.state.isplay;
});
const orderIcon = computed(() => {
  if (store.state.playorder === "list") {
    return "icon-liebiaoshunxu-copy";
  } else if (store.state.playorder === "random") {
    return "icon-24gl-shuffle";
  } else {
    return "icon-hanhan-01-01";
  }
});

const getRandom = (min: number, max: number) => {
  const mins = Math.floor(min);
  const maxs = Math.ceil(max);
  return Math.floor(Math.random() * (maxs - mins)) + mins;
};
// 控制播放暂停
const contrlClick = () => {
  store.setState(!isPlaying.value);
  mitter.emit("stateChange", isPlaying.value);
};
// 切换播放顺序
const orderChange = () => {
  if (store.state.playorder === "list") {
    store.setOrder("random");
    showToast({
      message: "随机播放",
      position: "bottom"
    });
  } else if (store.state.playorder === "random") {
    store.setOrder("one");
    showToast({
      message: "单曲循环",
      position: "bottom"
    });
  } else {
    store.setOrder("list");
    showToast({
      message: "顺序播放",
      position: "bottom"
    });
  }
};
// 上一首,下一首
const nextSong = () => {
  store.setState(false);
  // 顺序播放
  if (store.state.playorder === "list") {
    const id = store.state.playing.id;
    let idx: number;
    store.state.playlist.forEach((item: any, index: number) => {
      if (item.id === id) return (idx = index);
    });
    if (idx === store.state.playlist.length - 1) idx = -1;
    mitter.emit("nextSong", idx + 1);
  } else if (store.state.playorder === "random") {
    // 随机播放
    let idx = getRandom(0, store.state.playlist.length);
    mitter.emit("nextSong", idx);
  } else {
    // 单曲循环
    mitter.emit("oneSong");
  }
};
const preSong = () => {
  store.setState(false);
  // 顺序播放
  if (store.state.playorder === "list") {
    const id = store.state.playing.id;
    let idx: number;
    store.state.playlist.forEach((item: any, index: number) => {
      if (item.id === id) return (idx = index);
    });
    if (idx === 0) idx = store.state.playlist.length;
    mitter.emit("nextSong", idx - 1);
  } else if (store.state.playorder === "random") {
    // 随机播放
    let idx = getRandom(0, store.state.playlist.length);
    mitter.emit("nextSong", idx);
  } else {
    mitter.emit("oneSong");
  }
};
const showList = () => {
  mitter.emit("showList");
};
</script>

<template>
  <div class="controller">
    <div class="play-method">
      <span class="iconfont" :class="orderIcon" @click="orderChange"></span>
    </div>
    <div class="play-pre">
      <span class="iconfont icon-24gl-previous" @click="preSong"></span>
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
    <div class="playlist">
      <span class="iconfont icon-24gl-playlist-copy" @click="showList"></span>
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
