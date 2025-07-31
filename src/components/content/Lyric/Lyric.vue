<script setup lang="ts">
import Scroll from "@/components/common/Scroll/BetterScroll.vue";
import {
  ref,
  watch,
  nextTick,
  onMounted,
  onActivated,
  useTemplateRef
} from "vue";
import emitter from "@/mitt/index";
import useStore from "@/store/index";
defineOptions({
  name: "Lyric"
});
const { lyric = [] } = defineProps<{ lyric?: any[] }>();
const lyricData = ref<any[]>([]);
const height = ref(0);
const duration = ref(0);
const scrollRef = useTemplateRef("scroll");
const lyricLineRef = useTemplateRef("item");
const store = useStore();
watch(
  () => lyric,
  (val) => {
    lyricData.value = val;
  }
);
onMounted(() => {
  emitter.on("playingsong", (data: any) => {
    height.value = (window.innerHeight - 180) / 2;
    duration.value = data.duration;
    if (
      lyricData.value.length > 0 &&
      store.state.currentLine < lyricData.value.length &&
      data.currentTime >= lyricData.value[store.state.currentLine].time
    ) {
      if (store.state.currentLine <= lyricData.value.length - 1) {
        scrollRef.value &&
          scrollRef.value.scrollTo(
            0,
            -lyricLineRef.value[store.state.currentLine].offsetTop +
              height.value,
            0
          );
        store.setLine((store.state.currentLine += 1));
      } else {
        store.setLine(lyricData.value.length - 1);
      }
    }
  });
  emitter.on("nextSong", () => {
    lyricData.value = [];
    store.setLine(0);
    scrollRef.value.scrollTo(0, 0, 0);
  });
  emitter.on("oneSong", () => {
    lyricData.value = [];
    store.setLine(0);
    scrollRef.value.scrollTo(0, 0, 0);
  });
  emitter.on("seekTo", (percent: number) => {
    // 默认会有一句的，纯音乐，或者暂无歌词，所以要大于1
    // if (this.data.length> 1) {
    //由于可能有最后一句空白行，但是他的时间是刚好为最后一句歌词的结束，就会找不到大于的行，返回-1，在监听播放时滚动和读取对应数组[-1]就会报错
    let lines = lyricData.value.findIndex(
      (item) => item.time >= percent * duration.value
    );
    lines = lines === -1 ? lyricData.value.length - 1 : lines;
    store.setLine(lines);
    nextTick(() => {
      scrollRef.value &&
        scrollRef.value.scrollTo(
          0,
          -lyricLineRef.value[store.state.currentLine].offsetTop + height.value,
          100
        );
    });
    // }
  });
});
onActivated(() => {
  scrollRef.value &&
    scrollRef.value.scrollTo(
      0,
      -lyricLineRef.value[store.state.currentLine].offsetTop + height.value,
      0
    );
});
</script>

<template>
  <div class="lyric">
    <scroll class="lyric-box" ref="scroll">
      <div class="content" ref="content">
        <div
          v-for="(item, index) in lyricData"
          :key="index"
          class="line"
          :class="{ 'now-time': index === store.state.currentLine - 1 }"
          ref="item"
        >
          <p class="lrc">{{ item.msg }}</p>
          <p class="tlrc" v-if="item.tmsg">{{ item.tmsg }}</p>
        </div>
      </div>
    </scroll>
  </div>
</template>

<style lang="less" scoped>
.lyric {
  width: 100vw;
  height: calc(100vh - 180px);
  .lyric-box {
    overflow: hidden;
    width: 100%;
    height: calc(100% - 22px);
    text-align: center;
    color: rgba(255, 255, 255, 0.7);
    .content {
      position: relative;
      width: 90%;
      margin: 0 auto;
      padding-top: calc(50vh - 111px);
      padding-bottom: calc(50vh - 81px);
      .line {
        margin: 15px;
        font-size: 14px;
        .lrc {
          line-height: 20px;
        }
        .tlrc {
          line-height: 20px;
        }
      }
      .now-time {
        font-size: 16px;
        font-weight: 600;
        color: #fff;
      }
    }
  }
}
</style>
