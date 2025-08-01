<script setup lang="ts">
import NavBar from "@/components/common/NavBar/NavBar.vue";
import { useRouter } from "vue-router";
defineOptions({
  name: "ListDetailNav"
});
const { opacity = 0 } = defineProps<{
  opacity: number;
  name: string;
}>();
const router = useRouter();
const goBack = () => {
  router.go(-1);
};
</script>

<template>
  <div
    class="list-nav"
    :style="{
      'background-color': `rgba(255,255,255,${opacity})`,
      color: `rgb(${255 * (1 - opacity)},${255 * (1 - opacity)},${
        255 * (1 - opacity)
      })`
    }"
  >
    <nav-bar>
      <template #left>
        <span class="iconfont icon-back1 back" @click="goBack"></span>
      </template>
      <template #center>
        <div class="center">{{ opacity > 0.5 ? name : "歌单详情" }}</div>
      </template>
    </nav-bar>
  </div>
</template>

<style lang="less" scoped>
.list-nav {
  position: absolute;
  width: 100%;
  z-index: 5;
  .center {
    width: calc(100vw - 120px);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 16px;
  }
}
</style>
