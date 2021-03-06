<template>
  <div class='search-history'>
    <span class="title">历史</span>
    <span class="history">
      <span v-for="(item,index) in searchHistory" :key="index">{{item}}</span>
    </span>
    <span
    v-if="searchHistory"
    class="clear-history iconfont icon-cancel" 
    @click="clearHistory"></span>
  </div>
</template>

<script>

export default {
  name:"SearchHistory",
  data () {
    return {
      searchHistory:[]
    };
  },
  methods: {
    clearHistory() {
      this.searchHistory = null
      localStorage.removeItem('history')
    }
  },
  mounted() {
    this.searchHistory = JSON.parse(localStorage.getItem('history'))
  }
  }
</script>

<style lang="scss" scoped>
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
    background-color: rgba(155,155,155,.4);
    box-shadow: 0 0 3px 3px rgba(155,155,155,.4);
  }
  .history {
    span {
      display: inline-block;
      padding: 5px 5px;
      margin: 6px;
      color: #444;
      font-size: 13px;
      background-color: #F8F8F8;
      border-radius: 10px;
    }
  }
}
  
</style>