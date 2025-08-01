<script setup lang="ts">
import { useRouter } from "vue-router";
defineOptions({
  name: "MusicListItem"
});
const { listInfo = {} } = defineProps<{
  listInfo: { [k: string]: any };
}>();
const router = useRouter();
const itemClick = (id: string) => {
  router.push("/listdetail/" + id);
};
</script>

<template>
  <div
    class="music-list-item"
    v-if="listInfo.id"
    @click="itemClick(listInfo.id)"
  >
    <div class="cover">
      <img :src="listInfo.coverImgUrl" alt="" />
    </div>
    <div class="list-info">
      <div class="name">{{ listInfo.name }}</div>
      <div class="track-count">{{ listInfo.trackCount }}首</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.music-list-item {
  display: flex;
  height: 80px;
  padding: 0 10px;
  .cover {
    width: 80px;
    text-align: center;
    img {
      width: 64px;
      height: 64px;
      margin-top: 8px;
      vertical-align: middle;
      border-radius: 10px;
    }
  }
  .list-info {
    width: calc(100% - 80px);
    margin-left: 5px;
    .name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      height: 40px;
      line-height: 55px;
      color: #333334;
    }
    .track-count {
      height: 40px;
      line-height: 25px;
      color: #999999;
      font-size: 14px;
    }
  }
}
</style>
