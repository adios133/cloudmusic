<script setup lang="ts">
import RecentNav from "./childCpn/RecentNav.vue";
import MusicItem from "@/components/content/MusicItem/MusicItem.vue";
import Scroll from "@/components/common/Scroll/BetterScroll.vue";
import { getRecent } from "@/api/recent";
import { closeToast, showLoadingToast, showFailToast } from "vant";
import { ref, useTemplateRef, onActivated } from "vue";
import { useRouter } from "vue-router";
import useStore from "@/store";
import { getUserId } from "@/api/login";

defineOptions({
  name: "RecentPlay"
});
const router = useRouter();
const store = useStore();
const songList = ref<any[]>([]);
const index = ref(1);
const scrollRef = useTemplateRef("scroll");

const _getUserId = async (): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await getUserId();
      if (res.profile) {
        store.setUid(res.profile.userId);
        resolve(res.profile.userId);
      } else {
        reject("需要登录");
      }
    } catch (err) {
      reject(err);
    }
  });
};
// get list based on userId
const _getRecent = async (uid: string, type?: number) => {
  const res = await getRecent(uid, type);
  closeToast();
  scrollRef.value.scrollTo(0, 0, 300);
  if (type === 0) {
    // playcount在外,组织进入song中,做到与其他页面统一
    const temp = [];
    res.allData.map((item) => {
      item.song.playCount = item.playCount;
      item.song.score = item.score;
      temp.push(item.song);
    });
    songList.value = temp;
  } else {
    const temp = [];
    res.weekData.map((item) => {
      item.song.playCount = item.playCount;
      item.song.score = item.score;
      temp.push(item.song);
    });
    songList.value = temp;
  }
};
// click to switch list
const switchItem = (idx: number) => {
  showLoadingToast("加载中...");
  if (idx === 1) {
    index.value = 0;
    _getRecent(store.state.userId, 0);
  } else {
    index.value = 1;
    _getRecent(store.state.userId);
  }
};
const saveList = () => {
  store.setPlaylist(songList.value);
};
const checkIsLogin = async () => {
  try {
    const res = await _getUserId();
    showLoadingToast("加载中...");
    _getRecent(res, index.value);
  } catch (err) {
    showFailToast({
      message: err,
      duration: 1500,
      onClose: () => {
        router.push("/login");
      }
    });
  }
};
onActivated(() => {
  checkIsLogin();
});
</script>

<template>
  <div class="recent-play">
    <recent-nav @switchItem="switchItem" />
    <scroll class="content" ref="scroll">
      <music-item
        v-for="(item, index) in songList"
        :key="index"
        :songInfo="item"
        :isCount="true"
        :rank="index"
        @saveList="saveList"
      />
    </scroll>
  </div>
</template>

<style lang="less" scoped>
.content {
  height: calc(100vh - 93px);
}
</style>
