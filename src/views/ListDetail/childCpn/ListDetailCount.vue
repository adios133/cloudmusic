<template>
  <div class="list-detail-count">
    <div class="subscribed">
      <span
        ><span class="iconfont icon-icons-"></span
        >{{ fixedNum(subscribedCount) }}</span
      >
    </div>
    <div class="comment">
      <span
        ><span class="iconfont icon-comment"></span
        >{{ fixedNum(commentCount) }}</span
      >
    </div>
    <div class="share">
      <span
        ><span class="iconfont icon-share"></span
        >{{ fixedNum(shareCount) }}</span
      >
    </div>
  </div>
</template>

<script>
import { fixedNum } from "@/common/mixin";
export default {
  name: "ListDetailCount",
  mixins: [fixedNum],
  props: {
    shareCount: {
      type: Number,
      default: 0
    },
    commentCount: {
      type: Number,
      default: 0
    },
    subscribedCount: {
      type: Number,
      default: 0
    }
  },
  methods: {
    fixedNum(num) {
      if (num > 100000000) {
        return (num / 100000000).toFixed(1) + "亿";
      } else if (num > 10000) {
        return (num / 10000).toFixed(1) + "万";
      } else {
        return num;
      }
    }
  }
};
</script>

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
  box-shadow: 0 2px 3px 3px rgba($color: #111, $alpha: 0.08);
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
