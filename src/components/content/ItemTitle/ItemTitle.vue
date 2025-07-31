<template>
  <div class="item-title">
    <div class="title">{{ title }}</div>
    <div class="more" @click="seeMore">{{ more }}</div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
defineOptions({
  name: "ItemTitle"
});
const {
  title = "",
  more = "更多",
  path = ""
} = defineProps<{
  title?: string;
  more?: string;
  path?: string;
}>();
const router = useRouter();
const seeMore = () => {
  router.push(path);
};
</script>

<style lang="less" scoped>
.item-title {
  display: flex;
  justify-content: space-between;
  height: 30px;
  line-height: 30px;
  .title {
    font-size: 20px;
    font-weight: 550;
    color: #333;
  }
  .more {
    padding: 0 10px;
    font-size: 13px;
    border: 1px solid #ccc;
    border-radius: 15px;
  }
}
</style>
