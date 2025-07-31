<script setup lang="ts">
import NavBar from "@/components/common/NavBar/NavBar.vue";
import { useRouter } from "vue-router";
defineOptions({
  name: "CloudNav"
});
const router = useRouter();
const goBack = () => {
  router.push("/home");
};
</script>

<template>
  <div class="cloud-nav">
    <nav-bar>
      <template v-slot:left>
        <span class="iconfont icon-back1" @click="goBack"></span>
      </template>
      <template v-slot:center>
        <span>我的云盘</span>
      </template>
    </nav-bar>
  </div>
</template>

<style lang="less" scoped>
.cloud-nav {
  border-bottom: 1px solid #eee;
}
</style>
