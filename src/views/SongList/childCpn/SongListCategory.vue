<template>
  <div class="songlist-cate">
    <scroll :scrollX="true" ref="scroll">
      <span
        v-for="(item, index) in tagList"
        :key="index"
        class="nav-item"
        :class="{ active: currentIndex === index }"
        @click="itemClick(index, item.name)"
        ref="navItem"
        >{{ item.name }}</span
      >
    </scroll>
  </div>
</template>

<script>
import { navFun } from "common/mixin";
export default {
  name: "SongListCategory",
  mixins: [navFun],
  props: {
    tagList: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style lang="less" scoped>
@color: #d43c33;
.nav-item {
  font-size: 16px;
  height: 45px;
  line-height: 45px;
  padding: 5px 10px;
}
.active {
  color: @color;
  border-bottom: 2px solid @color;
}
</style>
