<script setup lang="ts">
import { computed } from "vue";
import mitter from "@/mitt";
import useStore from "@/store";
import { useRouter } from "vue-router";
defineOptions({
  name: "SearchList"
});
const { searchList = [] } = defineProps<{
  searchList: any[];
}>();
const router = useRouter();
const store = useStore();
const searchListFixed = computed(() => {
  const list = [];
  searchList.forEach((item: any) => {
    const t1: any = {};
    t1.al = item.album;
    t1.ar = item.artists;
    t1.name = item.name;
    t1.id = item.id;
    list.push(t1);
  });
  return list;
});
const goPlay = (id: string, index: number) => {
  // 记录历史
  let arr = [];
  const item = JSON.parse(localStorage.getItem("history"));
  const noSame = item && !item.some((el: any) => el == searchList[index].name);
  if (item && noSame) {
    arr = [...item, searchList[index].name];
  } else {
    arr.push(searchList[index].name);
  }
  localStorage.setItem("history", JSON.stringify(arr));
  // 播放页
  store.setState(false);
  store.setLine(0);
  mitter.emit("playsong", id);
  router.push("/playing/" + id);
  store.setFm(false);
  // 数据不一样,不搞列表了只有选中的一个单曲循环
  store.setPlaylist([searchListFixed[index]]);
};
</script>

<template>
  <div class="search-list">
    <div
      class="item"
      v-for="(item, index) in searchList"
      :key="index"
      @click="goPlay(item.id, index)"
    >
      {{ item.name }} - {{ item.artists[0].name }}
    </div>
  </div>
</template>

<style lang="less" scoped>
@border: 1px solid #eee;
.search-list {
  font-size: 15px;
  // border: @border;
  .item {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 35px;
    margin: 10px 0;
    line-height: 28px;
    text-indent: 10px;
    border-bottom: @border;
  }
}
</style>
