<script setup lang="ts">
import PlayingController from "./childCpn/PlayingController.vue";
import { getMusicInfo } from "@/api/playing";
import Lyric from "@/components/content/Lyric/Lyric.vue";
import { getLyric } from "@/api/lyric";
import { Swipe as VanSwipe, SwipeItem as VanSwipeItem } from "vant";
import PlayBg from "@/components/content/Play/PlayBg.vue";
import PlayNav from "@/components/content/Play/PlayNav.vue";
import PlayCover from "@/components/content/Play/PlayCover.vue";
import PlayProgressBar from "@/components/content/Play/PlayProgressBar.vue";
import PlayVolume from "@/components/content/Play/PlayVolume.vue";
import { useRoute, useRouter } from "vue-router";
import useStore from "@/store";
import mitter from "@/mitt";
import { ref, onActivated, onMounted } from "vue";
defineOptions({
  name: "Playing"
});
const store = useStore();
const route = useRoute();
const router = useRouter();
const musicInfo = ref<any>(null);
const lyric = ref<any[]>([]);
const tlyric = ref<any[]>([]);
const _getLyric = async (id: string) => {
  const res = await getLyric(id);
  if (res.nolyric) {
    lyric.value = [{ time: 0, msg: "纯音乐" }];
  } else if (res.uncollected) {
    lyric.value = [{ time: 0, msg: "暂无歌词" }];
  } else if (res.tlyric.lyric) {
    lyric.value = lyricsFormat(res.lrc.lyric);
    // translate lyric
    tlyric.value = lyricsFormat(res.tlyric.lyric);
    mergeLrcTranslate(lyric.value, tlyric.value);
  } else {
    lyric.value = lyricsFormat(res.lrc.lyric);
  }
};
const lyricsFormat = (lrc: string) => {
  const lyric = [];
  if (lrc.length == 0) return;
  const lrcs = lrc.split("\n");
  for (let i in lrcs) {
    lrcs[i] = lrcs[i].replace(/(^\s*)|(\s*$)/g, "");
    const t = lrcs[i].substring(lrcs[i].indexOf("[") + 1, lrcs[i].indexOf("]"));
    const s = t.split(":");
    if (!isNaN(parseInt(s[0]))) {
      const arr = lrcs[i].match(/\[(\d+:.+?)\]/g);
      let start = 0;
      for (let k in arr) {
        start += arr[k].length;
      }
      const content = lrcs[i].substring(start);
      for (let k in arr) {
        const t = arr[k].substring(1, arr[k].length - 1);
        const s = t.split(":");
        lyric.push({
          time: Number((parseFloat(s[0]) * 60 + parseFloat(s[1])).toFixed(3)),
          msg: content
        });
      }
    }
  }
  lyric.sort((a, b) => a.time - b.time);
  return lyric;
};
const mergeLrcTranslate = (lrc: any[], tlrc: any[]) => {
  lrc.forEach((item, index) => {
    tlrc.forEach((el) => {
      if (item.time === el.time) {
        lrc[index].tmsg = el.msg;
      }
    });
  });
};
const _getMusicInfo = async (id: string) => {
  const res = await getMusicInfo(id);
  musicInfo.value = res.songs[0];
  store.setPlaylist([musicInfo.value]);
};

const onBeforeEnter = () => {
  // todo 由于search的页面的数据没有picUrl,重新获取
  if (route.meta.__fromPath__ === "/search") {
    _getMusicInfo(<string>route.params.id);
  }
};

onActivated(() => {
  if (!store.state.playlist) {
    router.push("/home");
    return;
  }
  musicInfo.value = store.state.playlist.find((item: any) => {
    // params传过来的是string ==
    return item.id == route.params.id;
  });
  _getLyric(musicInfo.value.id);
  store.setPlaying(musicInfo.value);
});

onMounted(() => {
  mitter.on("nextSong", (index: number) => {
    musicInfo.value = store.state.playlist[index];
    _getLyric(musicInfo.value.id);
    mitter.emit("playsong", musicInfo.value.id);
    store.setPlaying(musicInfo.value);
  });
});
</script>

<template>
  <div class="playing" v-if="musicInfo">
    <play-bg :picUrl="musicInfo.al.picUrl" />
    <div class="container">
      <play-nav :musicInfo="musicInfo" />
      <van-swipe :loop="false" indicator-color="#fff">
        <van-swipe-item>
          <play-cover :picUrl="musicInfo.al.picUrl" />
        </van-swipe-item>
        <van-swipe-item>
          <play-volume />
          <lyric :lyric="lyric" />
        </van-swipe-item>
      </van-swipe>
      <play-progress-bar />
      <playing-controller />
    </div>
  </div>
</template>

<style lang="less" scoped>
.playing {
  width: 100vw;
  overflow: hidden;
  .container {
    position: absolute;
    width: 100vw;
    height: 100vh;
    z-index: 1;
  }
}
</style>
