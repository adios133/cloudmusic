<script setup lang="ts">
import { computed, useTemplateRef } from "vue";
import useStore from "@/store";
import mitter from "@/mitt";
defineOptions({
  name: "PlayVolume"
});
const barRef = useTemplateRef("bar");
const store = useStore();
const isMuted = computed(() => {
  return store.state.volume <= 0 ? "icon-Volume-Mute" : "icon-Volume-";
});
const volumeChange = (e: PointerEvent) => {
  const x = e.pageX - barRef.value.offsetLeft;
  let percent = x / barRef.value.offsetWidth;
  if (percent <= 0) {
    percent = 0;
  } else if (percent >= 1) {
    percent = 1;
  }
  store.setVolume(percent);
  mitter.emit("volumeChange", store.state.volume);
};
const muted = () => {
  if (store.state.volume !== 0) {
    store.setLastestVol(store.state.volume);
    store.setVolume(0);
  } else {
    store.setVolume(store.state.lastestVol);
  }
  mitter.emit("volumeChange", store.state.volume);
};
</script>

<template>
  <div class="play-volume">
    <span class="iconfont" :class="isMuted" @click="muted"></span>
    <div class="volume-bar" @click="volumeChange" ref="bar">
      <div
        class="volume"
        :style="{ width: store.state.volume * 100 + '%' }"
      ></div>
      <div class="dot" :style="{ left: store.state.volume * 100 + '%' }"></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.play-volume {
  display: flex;
  justify-content: center;
  color: #fff;
  span {
    font-size: 14px;
  }
  .volume-bar {
    position: relative;
    top: 6.5px;
    width: 65vw;
    height: 2px;
    margin: 0 10px;
    background-color: rgba(255, 255, 255, 0.6);
    .dot {
      position: absolute;
      top: -3px;
      margin-left: -4px;
      width: 8px;
      height: 8px;
      background-color: #fff;
      border-radius: 4px;
    }
    .volume {
      height: 100%;
      width: 0;
      background-color: #d43c33;
    }
  }
}
</style>
