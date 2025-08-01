<script setup lang="ts">
defineOptions({
  name: "ListDetailPLayAll"
});
const { num = 0 } = defineProps<{
  num: number;
}>();
</script>

<template>
  <div class="list-playall">
    <span class="iconfont icon-play1"></span>
    <i>播放全部</i>
    <span class="number">({{ num }})</span>
  </div>
</template>

<style lang="less" scoped>
.list-playall {
  height: 40px;
  width: 100%;
  padding-left: 15px;
  line-height: 40px;
  font-weight: 700;
  font-size: 16px;
  background-color: #fff;
  border-bottom: 1px solid #eee;
  span {
    color: #d43c33;
    margin: 10px;
  }
  i {
    font-style: normal;
    font-weight: 700;
  }
  .number {
    margin: 0;
    font-weight: normal;
    color: #aaa;
  }
}
</style>
