<script setup lang="ts">
import mitter from "@/mitt";
import { ref, onMounted } from "vue";
defineOptions({
  name: "SearchHistory"
});
const searchHistory = ref<any[]>([]);
const clearHistory = () => {
  searchHistory.value = [];
  localStorage.removeItem("history");
};
const itemClick = (e: MouseEvent) => {
  mitter.emit("fillWord", (e.target as HTMLSpanElement).innerText);
};
onMounted(() => {
  searchHistory.value = JSON.parse(localStorage.getItem("history"));
});
</script>

<template>
  <div class="search-history">
    <span class="title">历史</span>
    <span class="history" @click="itemClick">
      <span v-for="(item, index) in searchHistory" :key="index">{{
        item
      }}</span>
    </span>
    <span
      v-if="searchHistory"
      class="clear-history iconfont icon-cancel"
      @click="clearHistory"
    ></span>
  </div>
</template>

<style lang="less" scoped>
.search-history {
  padding: 10px;
  .title {
    margin: 10px;
    font-size: 16px;
    font-weight: 700;
  }
  .clear-history {
    width: 16px;
    height: 16px;
    font-size: 12px;
    color: #fff;
    border-radius: 8px;
    background-color: rgba(155, 155, 155, 0.4);
    box-shadow: 0 0 3px 3px rgba(155, 155, 155, 0.4);
  }
  .history {
    span {
      display: inline-block;
      padding: 5px 5px;
      margin: 6px;
      color: #444;
      font-size: 13px;
      background-color: #f8f8f8;
      border-radius: 10px;
    }
  }
}
</style>
