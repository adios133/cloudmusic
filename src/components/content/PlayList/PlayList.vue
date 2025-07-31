<script setup lang="ts">
import { Popup as VanPopup } from "vant";
import { ref, watch, computed, useTemplateRef } from "vue";
import useStore from "@/store";
import mitter from "@/mitt";
defineOptions({
  name: "HomeSlide"
});
const { isShow = false } = defineProps<{
  isShow?: boolean;
}>();
const emits = defineEmits<{
  closeList: [];
}>();
const store = useStore();
const show = ref(false);
const list = ref<any[]>([]);
const containerRef = useTemplateRef("container");
watch(
  () => isShow,
  (val) => {
    show.value = val;
    list.value = store.state.playlist;
  }
);
const playingSong = computed(() => {
  const id = store.state.playing.id;
  let idx: number;
  store.state.playlist.forEach((item: any, index: number) => {
    if (item.id === id) return (idx = index);
  });
  return idx;
});
// 关闭播放列表
const closeList = () => {
  emits("closeList");
};
//  每次打开，滚动到当前播放位置
// todo
const pageShow = () => {
  containerRef.value.scroll(
    0,
    (containerRef.value.children[playingSong.value] as HTMLDivElement)
      .offsetTop - 50
  );
};
//  播放列表点击项目 播放对应音乐
const goPlay = (item: any, index: number) => {
  mitter.emit("playsong", item.id);
  mitter.emit("nextSong", index);
  store.setState(false);
  store.setLine(0);
};
</script>

<template>
  <van-popup
    v-model="show"
    position="bottom"
    :style="{ height: '70%', width: '100%' }"
    duration=".2"
    @click-overlay="closeList"
    class="play-list"
    closeable
    @click-close-icon="closeList"
    @opened="pageShow"
  >
    <div class="title">播放列表</div>
    <div class="container" ref="container">
      <div
        class="item"
        v-for="(item, index) in list"
        :key="'m' + index"
        :class="{ playing: playingSong === index }"
        @click="goPlay(item, index)"
      >
        <span>{{ index + 1 }}</span>
        <span>{{ item.name }} - </span>
        <span v-for="(artist, indey) in item.ar" :key="artist.id"
          >{{ artist.name }}<span v-if="indey < item.ar.length - 1">/</span>
        </span>
      </div>
    </div>
  </van-popup>
</template>

<style lang="less" scoped>
.play-list {
  font-size: 16px;
  color: #333;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  .title {
    height: 50px;
    line-height: 50px;
    padding: 0 20px;
    font-weight: 700;
    border-bottom: 1px solid #ddd;
  }
  .container {
    overflow: auto;
    height: calc(70vh - 50px);
    .item {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #f5f5f5;
      & > span:first-child {
        display: inline-block;
        width: 50px;
        text-align: center;
        font-weight: 700;
      }
    }
    .playing {
      color: #d43c33;
    }
  }
}
</style>
