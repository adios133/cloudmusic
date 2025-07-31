<script setup lang="ts">
import { padLeftZero } from "@/common/utils";
import { Loading as VanLoading } from "vant";
import { ref, useTemplateRef, onMounted } from "vue";
import mitter from "@/mitt";
defineOptions({
  name: "PlayProgressBar"
});
const data = ref({
  bufferedtime: 0,
  currentTime: 0,
  duration: 0.01, // not 0
  id: ""
});
const barRef = useTemplateRef("bar");
const seekTo = (e: PointerEvent) => {
  const x = e.pageX - barRef.value.offsetLeft;
  const percent = x / barRef.value.offsetWidth;
  mitter.emit("seekTo", percent);
};
const times = (num: number) => {
  const seconds = Number(num.toFixed(0));
  const m = Math.floor(seconds / 60).toString();
  const s = (seconds % 60).toString();
  return padLeftZero(m) + ":" + padLeftZero(s);
};
const _emiterListener = () => {
  // 监听音乐播放进度条改变
  mitter.on("playingsong", (payload: any) => {
    data.value = payload;
  });
  mitter.on("playsong", (id: string) => {
    // 将进度条归零，duration为零 0/0 不会变，给个0.1归零，显示duration是处理过的四舍五入，还会是0
    data.value = {
      bufferedtime: 0,
      currentTime: 0,
      duration: 0.01,
      id
    };
  });
};
onMounted(() => {
  _emiterListener();
});
</script>

<template>
  <div class="progress-bar">
    <div class="current-time">{{ times(data.currentTime) }}</div>
    <div class="bar" @click="seekTo" ref="bar">
      <div
        class="now"
        :style="{ width: (data.currentTime / data.duration) * 100 + '%' }"
      ></div>
      <div
        class="buffered"
        :style="{ width: (data.bufferedtime / data.duration) * 100 + '%' }"
      ></div>
      <van-loading
        type="spinner"
        size="12"
        color="#888"
        class="loading"
        v-if="data.bufferedtime === 0"
      />
      <div
        class="dot"
        :style="{ left: (data.currentTime / data.duration) * 100 + '%' }"
        v-else
      ></div>
    </div>
    <div class="duration">{{ times(data.duration) }}</div>
  </div>
</template>

<style lang="less" scoped>
.progress-bar {
  display: flex;
  position: absolute;
  bottom: 110px;
  left: 0;
  width: 100%;
  font-size: 14px;
  color: #fff;
  .current-time {
    width: 65px;
    margin-right: 10px;
    text-align: right;
  }
  .duration {
    width: 65px;
    margin-left: 10px;
    text-align: left;
  }
  .bar {
    position: relative;
    flex: 1;
    top: 7px;
    width: 65%;
    height: 2px;
    background-color: rgba(255, 255, 255, 0.3);
    .now {
      position: absolute;
      top: 0;
      height: 100%;
      width: 0%;
      background-color: #d43c33;
      z-index: 3;
    }
    .buffered {
      position: absolute;
      height: 100%;
      top: 0;
      width: 50%;
      background-color: rgba(255, 255, 255, 0.8);
      z-index: 1;
    }
    .dot {
      position: absolute;
      top: 0;
      left: 0%;
      height: 8px;
      width: 8px;
      margin-top: -3px;
      margin-left: -4px;
      background-color: #f5f5f5;
      border-radius: 4px;
      z-index: 4;
    }
    .loading {
      position: absolute;
      top: -6px;
      left: -6px;
      padding: 1px;
      background-color: rgb(255, 255, 255);
      border-radius: 7px;
      z-index: 3;
    }
  }
}
</style>
