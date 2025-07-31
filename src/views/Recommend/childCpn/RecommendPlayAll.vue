<script setup lang="ts">
defineOptions({
  name: "RecommendPlayAll"
});
</script>

<template>
  <div class="play-all">
    <span class="iconfont icon-play1"></span>
    <i>播放全部</i>
  </div>
</template>

<style lang="less" scoped>
.play-all {
  padding: 0 10px;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  background-color: #fff;
  border-bottom: 1px solid #eee;
  span {
    color: #d43c33;
    font-weight: 700;
  }
  i {
    margin-left: 5px;
    font-style: normal;
    font-weight: 700;
  }
}
</style>
