<script setup lang="ts">
import NavBar from "@/components/common/NavBar/NavBar.vue";
import { useRouter } from "vue-router";
defineOptions({
  name: "RecommendNav"
});
const { opacity = 0 } = defineProps<{
  opacity: number;
}>();
const router = useRouter();
const backClick = () => {
  router.push("/home");
};
</script>

<template>
  <div
    class="rec-nav"
    :style="{
      'background-color': `rgba(255,255,255,${opacity})`,
      color: `rgb(${255 * (1 - opacity)},${255 * (1 - opacity)},${
        255 * (1 - opacity)
      })`
    }"
  >
    <nav-bar @click="backClick">
      <template #left>
        <span class="iconfont icon-back1 back" @click="backClick"></span>
      </template>
      <template #center>
        <div class="center">{{ opacity > 0.5 ? "每日推荐" : "" }}</div>
      </template>
    </nav-bar>
  </div>
</template>

<style lang="less" scoped>
.rec-nav {
  position: absolute;
  width: 100%;
  font-size: 16px;
  z-index: 5;
  .back {
    position: absolute;
    left: 20px;
    font-weight: 600;
    &::before {
      background-color: rgba(255, 255, 255, 0.3);
      box-shadow: 0 0 10px 10px rgba(255, 255, 255, 0.3);
      color: #333;
      border-radius: 10px;
    }
  }
}
</style>
