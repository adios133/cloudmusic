<script setup lang="ts">
import Scroll from "@/components/common/Scroll/BetterScroll.vue";
import MusicNav from "./childCpn/MusicNav.vue";
import MusicItem from "./childCpn/MusicListItem.vue";
import { getUserList } from "@/api/music";
import { getUserId } from "@/api/login";
import { closeToast, showFailToast, showLoadingToast } from "vant";
import { ref, useTemplateRef } from "vue";
import useStore from "@/store";
defineOptions({
  name: "Music"
});
const store = useStore();
const createList = ref<any[]>([]);
const subscribedList = ref<any[]>([]);
const scrollRef = useTemplateRef("scroll");
const subscribledRef = useTemplateRef("subscribled");
const navRef = useTemplateRef("musicNav");
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
// 请求 封装获取用户歌单函数
const _getUserList = async (uid: string, limit?: number, offset?: number) => {
  const res = await getUserList(uid, limit, offset);
  closeToast();
  res.playlist.forEach((item) => {
    // 区分收藏的和自己创建的
    if (item.subscribed) {
      subscribedList.value.push(item);
    } else {
      createList.value.push(item);
    }
  });
};
// 操作方法
const musicNavClick = (index: number) => {
  if (index === 0) {
    scrollRef.value.scrollTo(0, 0, 300);
  } else {
    scrollRef.value.scrollTo(0, -subscribledRef.value.offsetTop, 300);
  }
};
const scrolling = (position: any) => {
  if (-position.y < subscribledRef.value.offsetTop) {
    navRef.value.currentIndex = 0;
  } else {
    navRef.value.currentIndex = 1;
  }
};
const _init = async () => {
  try {
    const res = await _getUserId();
    showLoadingToast("加载中...");
    _getUserList(res);
  } catch (err) {
    showFailToast({
      message: err,
      duration: 1500
    });
  }
};
_init();
</script>

<template>
  <div id="music">
    <music-nav @musicNavClick="musicNavClick" ref="musicNav" />
    <scroll
      class="music-scroll"
      :probeType="3"
      @scrolling="scrolling"
      ref="scroll"
    >
      <div class="create">
        <div class="title">创建的歌单({{ createList.length }})</div>
        <music-item
          v-for="(item, index) in createList"
          :key="index"
          :listInfo="item"
        />
      </div>
      <div class="subscribled" ref="subscribled">
        <div class="title">收藏的歌单({{ subscribedList.length }})</div>
        <music-item
          v-for="(item, index) in subscribedList"
          :key="index"
          :listInfo="item"
        />
      </div>
    </scroll>
  </div>
</template>

<style lang="less" scoped>
#music {
  font-size: 16px;
  .music-scroll {
    height: calc(100vh - 133px);
    position: relative;
    .create,
    .subscribled {
      .title {
        height: 50px;
        line-height: 50px;
        text-indent: 15px;
        border-bottom: 1px solid #eee;
      }
    }
  }
}
</style>
