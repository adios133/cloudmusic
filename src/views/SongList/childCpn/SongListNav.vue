<script setup lang="ts">
import NavBar from "@/components/common/NavBar/NavBar.vue";
import { useRouter } from "vue-router";
defineOptions({
  name: "SongListNav"
});
const router = useRouter();
const goBack = () => {
  router.go(-1);
};
</script>

<template>
  <div class="songlist-nav">
    <nav-bar>
      <template v-slot:left>
        <span class="iconfont icon-back1" @click="goBack"></span>
      </template>
      <template v-slot:center> 歌单广场 </template>
    </nav-bar>
  </div>
</template>

<style lang="less" scoped>
.songlist-nav {
  font-size: 16px;
  border-bottom: 1px solid #eee;
}
</style>
