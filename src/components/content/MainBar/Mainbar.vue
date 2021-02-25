<template>
    <tab-bar class="main-bar">
      <tab-bar-item path='/home'>
        <template v-slot:icon>
          <div class="iconfont icon-home"></div>
        </template>
        <template v-slot:text>
          <i>主页</i>
        </template>
      </tab-bar-item>
      <tab-bar-item path="/music">
        <template v-slot:icon>
          <div class="iconfont icon-musicnote"></div>
        </template>
        <template v-slot:text>
          <i>音乐</i>
        </template>
      </tab-bar-item>
      <tab-bar-item path="/video">
        <template v-slot:icon>
          <div class="iconfont icon-video1"></div>
        </template>
        <template v-slot:text>
          <i>视频</i>
        </template>
      </tab-bar-item>
      <tab-bar-item path="/profile">
        <template v-slot:icon>
          <div class="iconfont icon-wode"></div>
        </template>
        <template v-slot:text>
          <i>我的</i>
        </template>
      </tab-bar-item>
    </tab-bar>
</template>

<script>
import TabBar from "components/common/TabBar/TabBar";
import TabBarItem from "components/common/TabBar/TabBarItem";
export default {
  name: "Mainbar",
  components: {
    TabBar,
    TabBarItem,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.main-bar {
  display: flex;
  justify-content: space-evenly;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 49px;
  box-shadow: 0 -1px 1px 1px #eee;
  background-color: #fff;
  .iconfont {
    margin-top: 2px;
    font-size: 24px;
  }
  i {
    font-style: normal;
    font-size: 12px;
  }
}
</style>
