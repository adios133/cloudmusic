<script setup lang="ts">
import { fixNumber } from "@/common/utils";
defineOptions({
  name: "ListDetailCount"
});
const {
  shareCount = 0,
  commentCount = 0,
  subscribedCount = 0
} = defineProps<{
  shareCount: number;
  commentCount: number;
  subscribedCount: number;
}>();
</script>

<template>
  <div class="list-detail-count">
    <div class="subscribed">
      <span
        ><span class="iconfont icon-icons-"></span
        >{{ fixNumber(subscribedCount) }}</span
      >
    </div>
    <div class="comment">
      <span
        ><span class="iconfont icon-comment"></span
        >{{ fixNumber(commentCount) }}</span
      >
    </div>
    <div class="share">
      <span
        ><span class="iconfont icon-share"></span
        >{{ fixNumber(shareCount) }}</span
      >
    </div>
  </div>
</template>

<style lang="less" scoped>
.list-detail-count {
  position: absolute;
  top: 218px;
  left: 13vw;
  display: flex;
  justify-content: space-evenly;
  width: 74vw;
  height: 35px;
  line-height: 40px;
  font-size: 16px;
  background-color: #fff;
  border-radius: 30px;
  box-shadow: 0 2px 3px 3px rgba(0, 0, 0, 0.08);
  z-index: 4;
  div {
    width: 33.333%;
    text-align: center;
  }
  .iconfont {
    font-size: 18px;
    margin-right: 3px;
  }
  .comment > span {
    display: inline-block;
    width: 100%;
    height: 20px;
    line-height: 20px;
    margin-top: 10px;
    border-left: 1.5px solid #ccc;
    border-right: 1.5px solid #ccc;
  }
}
</style>
