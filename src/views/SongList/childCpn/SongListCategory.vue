<script setup lang="ts">
import Scroll from "@/components/common/Scroll/BetterScroll.vue";
import { ref, useTemplateRef } from "vue";
const { tagList = [] } = defineProps<{
  tagList: any[];
}>();
const emits = defineEmits<{
  cateClick: [id: string];
}>();

const currentIndex = ref(0);
const navItemRefs = useTemplateRef("navItem");
const scrollRef = useTemplateRef("scroll");
const itemClick = (index: number, params: string) => {
  currentIndex.value = index;
  emits("cateClick", params);
  // animation
  /* 获取点击包裹父元素宽度，
         当点击元素左边距与父元素宽度（即最右边距离小于窗口宽度时，就固定滚动位置了）
      */
  const width = (navItemRefs.value[index].parentNode as HTMLDivElement)
    .offsetWidth;
  const finalX = width - window.innerWidth;
  if (width - navItemRefs.value[index].offsetLeft > window.innerWidth) {
    scrollRef.value.scrollTo(-navItemRefs.value[index].offsetLeft, 0, 300);
  } else {
    scrollRef.value.scrollTo(-finalX, 0, 300);
  }
};
</script>

<template>
  <div class="songlist-cate">
    <scroll :scrollX="true" ref="scroll">
      <span
        v-for="(item, index) in tagList"
        :key="index"
        class="nav-item"
        :class="{ active: currentIndex === index }"
        @click="itemClick(index, item.name)"
        ref="navItem"
        >{{ item.name }}</span
      >
    </scroll>
  </div>
</template>

<style lang="less" scoped>
@color: #d43c33;
.nav-item {
  font-size: 16px;
  height: 45px;
  line-height: 45px;
  padding: 5px 10px;
}
.active {
  color: @color;
  border-bottom: 2px solid @color;
}
</style>
