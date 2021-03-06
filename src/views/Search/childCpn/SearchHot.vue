<template>
  <div class='search-hot'>
    <div class="title">热搜榜</div>
    <div class="list">
      <span class="list-item"
      v-for="(item,index) in hotSearch" :key="index">
      <span class="rank" :class="{'hot-index': item.score > 1200000}">{{index+1}}</span>
      <i :class="{'hot-item':item.score > 1200000}">{{item.searchWord}}</i>
      <img v-if="item.iconUrl" :src="item.iconUrl" alt="">
      </span>
    </div>
  </div>
</template>

<script>

export default {
  name:"SearchHot",
  components: {
    
  },
  data () {
    return {
      
    };
  },
  props: {
    hotSearch: {
      type:Array,
      default() {
        return []
      }
    }
  },
  methods: {
    
  },
  }
</script>

<style lang="scss" scoped>
  .search-hot {
    .title {
      margin: 10px;
      font-weight: 700;
      font-size: 16px;
    }
    .list {
      font-size: 15px;
      line-height: 2;
      .list-item {
        overflow: hidden;
        display: inline-block;
        width: 50%;
        text-overflow: ellipsis;
        white-space: nowrap;
        span {
          display: inline-block;
          width: 20px;
          margin: 0 10px;
          text-align: center;
          font-weight: 600;
        }
        .hot-index {
          color: #EC4141;
        }
        i {
          font-style: normal;
        }
        .hot-item {
          font-weight: 700;
        }
        img {
          position: relative;
          top: 2px;
          height: 15px;
          margin: 0 5px;
        }
      }
    }
  }
</style>