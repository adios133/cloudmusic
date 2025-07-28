<template>
  <div class="tab-bar-item" @click="itemClick" :style="activeStyle">
    <slot name="icon"></slot>
    <slot name="text"></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
defineOptions({
  name: "TabBarItem"
});
const { path } = defineProps<{
  path: string;
}>();
const route = useRoute();
const router = useRouter();
const isActived = computed(() => {
  return route.path.indexOf(path) !== -1;
});
const activeStyle = computed(() => {
  return isActived.value ? { color: "#D43C33" } : {};
});
const itemClick = () => {
  router.push(path).catch((e) => e);
};
</script>

<style lang="less" scoped>
.tab-bar-item {
  flex: 1;
  height: 49px;
  text-align: center;
}
</style>
