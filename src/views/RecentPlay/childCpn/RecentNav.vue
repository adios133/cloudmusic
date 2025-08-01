<script setup lang="ts">
import NavBar from "@/components/common/NavBar/NavBar.vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
defineOptions({
  name: "RecentNav"
});
const emits = defineEmits<{
  switchItem: [idx: number];
}>();
const router = useRouter();
const title = ["最近一周", "所有时间"];
const currentIndex = ref(0);
const switchItem = (index: number) => {
  currentIndex.value = index;
  emits("switchItem", index);
};
const goBack = () => {
  router.go(-1);
};
</script>

<template>
  <div class="recent-nav">
    <nav-bar>
      <template v-slot:left>
        <span class="iconfont icon-back1" @click="goBack"></span>
      </template>
      <template v-slot:center>
        <div class="bar-item">
          <div
            v-for="(item, index) in title"
            :key="index"
            @click="switchItem(index)"
            :class="{ active: currentIndex === index }"
          >
            {{ item }}
          </div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<style lang="less" scoped>
.recent-nav {
  font-size: 16px;
  .bar-item {
    display: flex;
    justify-content: space-evenly;
    div {
      padding: 0 15px;
    }
    .active {
      color: #d43c33;
      border-bottom: 2px solid #d43c33;
    }
  }
}
</style>
