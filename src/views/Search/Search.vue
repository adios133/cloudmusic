<script setup lang="ts">
import { getHotSearch, searchSong } from "@/api/search";
import SearchBox from "./childCpn/SearchBox.vue";
import SearchHistory from "./childCpn/SearchHistory.vue";
import SearchHot from "./childCpn/SearchHot.vue";
import SearchList from "./childCpn/SearchList.vue";
import Scroll from "@/components/common/Scroll/BetterScroll.vue";
import { ref, computed } from "vue";
defineOptions({
  name: "Search"
});
const hotSearch = ref<any[]>([]);
const searchWord = ref("");
let timer: any = null;
const searchList = ref<any[]>([]);
const words = computed(() => {
  return searchWord.value.trim();
});
// 热搜列表
const _getHotSearch = async () => {
  const res = await getHotSearch();
  hotSearch.value = res.data;
};
// 搜索封装
const _searchSong = async (keyword: string) => {
  const res = await searchSong(keyword);
  res.result ? (searchList.value = res.result.songs) : "";
};
// 发送搜索请求，防抖
const getContent = async (content: string) => {
  searchWord.value = content;
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    _searchSong(words.value);
  }, 500);
};

_getHotSearch();
</script>

<template>
  <div class="search">
    <search-box @getContent="getContent" />
    <scroll class="search-scroll">
      <div class="content" v-if="words === ''">
        <search-history />
        <search-hot :hotSearch="hotSearch" />
      </div>
      <search-list v-else :searchList="searchList" />
    </scroll>
  </div>
</template>

<style lang="less" scoped>
.search {
  padding: 10px;
  .search-scroll {
    height: calc(100vh - 44px);
  }
}
</style>
