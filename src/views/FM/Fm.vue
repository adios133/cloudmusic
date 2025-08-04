<script setup lang="ts">
import PlayBg from "@/components/content/Play/PlayBg.vue";
import PlayNav from "@/components/content/Play/PlayNav.vue";
import PlayCover from "@/components/content/Play/PlayCover.vue";
import PlayProgressBar from "@/components/content/Play/PlayProgressBar.vue";
import PlayVolume from "@/components/content/Play/PlayVolume.vue";
import FmController from "./childCpn/FmController.vue";
import Lyric from "@/components/content/Lyric/Lyric.vue";
import { getFm, getMusicInfo, likeSong, trashSong } from "@/api/fm";
import { getLyric } from "@/api/lyric";
import { Swipe as VanSwipe, SwipeItem as VanSwipeItem } from "vant";
import { ref } from "vue";
import mitter from "@/mitt";
import useStore from "@/store";
defineOptions({
  name: "Fm"
});
const store = useStore();

const like = ref<boolean>(true);
const musicInfo = ref<any>(null);
const lyric = ref<any[]>([]);
const tlyric = ref<any[]>();
const _getFm = async () => {
  const res = await getFm();
  musicInfo.value = res.data[0];
  _getMusicInfo(res.data[0].id);
  _getLyric(res.data[0].id);
};
// 获取音乐信息，私人fm获取的音乐，信息和普通的格式不同，不好处理，故使用通用音乐信息
const _getMusicInfo = async (id: string) => {
  const res = await getMusicInfo(id);
  store.setPlaylist([res.songs[0]]);
  store.setPlaying(res.songs[0]);
  mitter.emit("playsong", res.songs[0].id);
  store.setState(false);
  store.setLine(0);
};
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
// 点击喜欢音乐，接口有问题，失败
const _likeSong = async (id: string, lik: boolean) => {
  const res = await likeSong(id, lik);
  if (res.code === 200) {
    like.value = !like.value;
  }
};
// 将fm音乐加入垃圾桶
const _trashSong = async (id: string) => {
  const res = await trashSong(id);
  if (res.code === 200) {
    _getFm();
    like.value = true;
  }
};
// 下一首私人fm
const nextFm = () => {
  _getFm();
  like.value = true;
};
// 喜欢音乐
const onLikeSong = () => {
  _likeSong(musicInfo.value.id, like.value);
};
// 垃圾桶
const onTrashSong = () => {
  _trashSong(musicInfo.value.id);
};
// init
_getFm();
store.setFm(true);
mitter.on("fmSongEnd", () => {
  _getFm();
});
</script>

<template>
  <div class="fm" v-if="musicInfo">
    <play-bg :picUrl="musicInfo.album.picUrl" />
    <div class="container">
      <play-nav :musicInfo="musicInfo" />
      <van-swipe indicator-color="#fff" :loop="false">
        <van-swipe-item>
          <play-cover :picUrl="musicInfo.album.picUrl" />
        </van-swipe-item>
        <van-swipe-item>
          <play-volume />
          <lyric :lyric="lyric" />
        </van-swipe-item>
      </van-swipe>
      <play-progress-bar />
      <fm-controller
        :like="false"
        @nextFm="nextFm"
        @likeSong="onLikeSong"
        @trashSong="onTrashSong"
      />
    </div>
  </div>
</template>

<style lang="less" scoped>
.fm {
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
