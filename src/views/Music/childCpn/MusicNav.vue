<template>
  <div class="music-nav">
    <nav-bar>
      <template v-slot:center>
        <div class="item">
          <span
            v-for="(item, index) in itemList"
            :key="index"
            @click="itemClick(index)"
            :class="{ active: currentIndex === index }"
            >{{ item }}</span
          >
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar/NavBar.vue";

export default {
  name: "MusicNav",
  components: {
    NavBar
  },
  data() {
    return {
      itemList: ["创建的歌单", "收藏的歌单"],
      currentIndex: 0
    };
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("musicNavClick", index);
    }
  }
};
</script>

<style lang="less" scoped>
.item {
  display: flex;
  justify-content: space-evenly;
  span {
    padding: 0 10px;
  }
  .active {
    color: #d43c33;
    border-bottom: 2px solid #d43c33;
  }
}
</style>
