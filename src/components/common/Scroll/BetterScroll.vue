<script setup lang="ts">
import BScroll from "@better-scroll/core";
import ObserveImage from "@better-scroll/observe-image";
import ObserveDOM from "@better-scroll/observe-dom";
import Pullup from "@better-scroll/pull-up";
import PullDown from "@better-scroll/pull-down";
import { computed, useTemplateRef, onMounted } from "vue";
BScroll.use(PullDown);
BScroll.use(Pullup);
BScroll.use(ObserveDOM);
BScroll.use(ObserveImage);

defineOptions({
  name: "BetterScroll"
});
const {
  probeType = 0,
  pullUpLoad = false,
  pullDownRefresh = false,
  click = true,
  scrollX = false,
  scrollY = false,
  momentum = true
} = defineProps<{
  probeType: number;
  pullUpLoad: boolean;
  pullDownRefresh: boolean;
  click: boolean;
  scrollX: boolean;
  scrollY: boolean;
  momentum: boolean;
}>();
const emits = defineEmits<{
  scrolling: [position: any];
  pullingUpLoad: [];
  pullingDownLoad: [];
}>();
const contentModeX = computed(() => {
  return scrollX ? { display: "inline-block" } : {};
});
const wrapperModeX = computed(() => {
  return scrollX ? { "white-space": "nowrap" } : {};
});

// refs
const wrapper = useTemplateRef("wrapper");

let scroll = null;
const _createScrollInstance = () => {
  new BScroll(wrapper.value, {
    click: click,
    observeDOM: true,
    observeImage: true,
    pullDownRefresh: pullDownRefresh,
    pullUpLoad: pullUpLoad ? { threshold: 350 } : false,
    probeType: probeType,
    scrollX: scrollX,
    scrollY: scrollY,
    momentum: momentum
  });
};
const _emitHandler = () => {
  if (probeType === 2 || probeType === 3) {
    scroll.on("scroll", (position: any) => {
      emits("scrolling", position);
    });
  }
  // 监听上来加载更多
  if (pullUpLoad) {
    scroll.on("pullingUp", () => {
      emits("pullingUpLoad");
    });
  }
  // 监听下拉刷新
  if (pullDownRefresh) {
    scroll.on("pullingDown", () => {
      emits("pullingDownLoad");
    });
  }
};
onMounted(() => {
  _createScrollInstance();
  _emitHandler();
});
const scrollTo = (x: number, y: number, time: number = 500) => {
  scroll && scroll.scrollTo(x, y, time);
};
const finishPullUp = () => {
  scroll && scroll.finishPullUp();
};
const finishPullDown = () => {
  scroll && scroll.finishPullDown();
};
defineExpose({
  scrollTo,
  finishPullUp,
  finishPullDown
});
</script>

<template>
  <div class="wrapper" ref="wrapper" :style="wrapperModeX">
    <div class="content" :style="contentModeX">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="less" scoped>
.wrapper {
  overflow: hidden;
}
</style>
