<script setup lang="ts">
import NavBar from "@/components/common/NavBar/NavBar.vue";
import { ref } from "vue";
defineOptions({
  name: "MusicNav"
});
const emits = defineEmits<{
  musicNavClick: [idx: number];
}>();
const currentIndex = ref(0);
const itemList = ["创建的歌单", "收藏的歌单"];
const itemClick = (index: number) => {
  currentIndex.value = index;
  emits("musicNavClick", index);
};
defineExpose({
  currentIndex
});
</script>

<template>
  <div class="music-nav">
    <nav-bar>
      <template v-slot:center>
        <div class="item">
          <span
            v-for="(item, index) in itemList"
            :key="index"
            @click="itemClick(index)"
            :class="{ active: currentIndex === index }"
            >{{ item }}</span
          >
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<style lang="less" scoped>
.item {
  display: flex;
  justify-content: space-evenly;
  span {
    padding: 0 10px;
  }
  .active {
    color: #d43c33;
    border-bottom: 2px solid #d43c33;
  }
}
</style>
