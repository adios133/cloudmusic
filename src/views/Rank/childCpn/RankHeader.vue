<script setup lang="ts">
import NavBar from "@/components/common/NavBar/NavBar.vue";
import { useRouter } from "vue-router";
defineOptions({
  name: "RankHeader"
});
const router = useRouter();
const goBack = () => {
  router.go(-1);
};
</script>

<template>
  <div class="rank-head">
    <nav-bar>
      <template v-slot:left>
        <span class="iconfont icon-back1" @click="goBack"></span>
      </template>
      <template v-slot:center>
        <span>排行榜</span>
      </template>
    </nav-bar>
  </div>
</template>

<style lang="less" scoped>
.rank-head {
  border-bottom: 1px solid #eee;
}
</style>
