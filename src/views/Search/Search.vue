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

<script>
import { getHotSearch, searchSong } from "@/api/search";

import SearchBox from "./childCpn/SearchBox.vue";
import SearchHistory from "./childCpn/SearchHistory.vue";
import SearchHot from "./childCpn/SearchHot.vue";
import SearchList from "./childCpn/SearchList.vue";
import Scroll from "@/components/common/Scroll/BetterScroll.vue";
export default {
  name: "Search",
  components: {
    SearchBox,
    SearchHistory,
    SearchHot,
    SearchList,
    Scroll
  },
  data() {
    return {
      hotSearch: [],
      searchWord: "",
      timer: null,
      searchList: []
    };
  },
  computed: {
    words() {
      return this.searchWord.trim();
    }
  },
  methods: {
    // 热搜列表
    _getHotSearch() {
      getHotSearch().then((res) => {
        this.hotSearch = res.data;
      });
    },
    // 搜索封装
    _searchSong(keyword) {
      searchSong(keyword).then((res) => {
        res.result ? (this.searchList = res.result.songs) : "";
      });
    },
    // 发送搜索请求，防抖
    getContent(content) {
      this.searchWord = content;
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this._searchSong(this.words);
      }, 500);
    }
  },
  created() {
    this._getHotSearch();
  }
};
</script>

<style lang="less" scoped>
.search {
  padding: 10px;
  .search-scroll {
    height: calc(100vh - 44px);
  }
}
</style>
