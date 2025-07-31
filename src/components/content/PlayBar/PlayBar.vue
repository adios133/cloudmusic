<script setup lang="ts">
import { Circle as VanCircle } from "vant";
import { getMusicUrl } from "@/api/playbar";
import { ref, computed, useTemplateRef, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import useStore from "@/store";
import mitter from "@/mitt";
defineOptions({
  name: "PlayBar"
});
const { atBottom = false } = defineProps<{
  playState?: boolean;
  atBottom?: boolean;
}>();
const route = useRoute();
const router = useRouter();
const store = useStore();
const audioRef = useTemplateRef("audio");
const currentRate = ref(90);
const musicUrl = ref("");
const id = ref("");
const rate = ref(0);
const iconDisplay = computed(() => {
  return isPlaying.value ? "icon-24gl-pause" : "icon-24gl-play";
});
const playPage = computed(() => {
  return (
    route.path.startsWith("/playing") ||
    route.path.startsWith("/search") ||
    route.path.startsWith("/fm") ||
    route.path.startsWith("/video")
  );
});
const isPlaying = computed(() => {
  return store.state.isplay;
});
const getRandom = (min: number, max: number) => {
  const mins = Math.floor(min);
  const maxs = Math.ceil(max);
  return Math.floor(Math.random() * (maxs - mins)) + mins;
};
const songCanPlay = () => {
  audioRef.value.play();
};
const playSong = () => {
  store.setState(!isPlaying.value);
  if (!isPlaying.value) {
    audioRef.value.pause();
  } else {
    audioRef.value.play();
  }
};
// 跳转到播放页面,但没有音乐播放时阻止跳转
const toPlaying = () => {
  if (id.value && !store.state.isFm) {
    router.push("/playing/" + id.value);
  } else if (store.state.isFm) {
    router.push("/fm");
  } else {
    return;
  }
};
// 弹出播放列表
const showList = () => {
  mitter.emit("showList");
};
// 当音乐播放时持续触发传递播放进度
const songPlaying = () => {
  const bufferedTime = audioRef.value.buffered;
  let bufferedtime;
  if (bufferedTime.length > 0) {
    bufferedtime = bufferedTime.end(bufferedTime.length - 1);
  }
  if (audioRef.value.currentTime !== 0) {
    mitter.emit("playingsong", {
      id: id.value,
      duration: audioRef.value.duration,
      currentTime: audioRef.value.currentTime,
      bufferedtime
    });
    rate.value = (audioRef.value.currentTime / audioRef.value.duration) * 100;
  }
};
// 控制播放状态,自动播放,播放时设置为true
const songPlay = () => {
  store.setState(true);
};
// 当音乐停止时设置为false
const songPause = () => {
  store.setState(false);
};
const songEnd = () => {
  // 顺序播放
  store.setState(false);
  // 先判断是否为fm界面
  if (store.state.isFm) {
    mitter.emit("fmSongEnd");
    return;
  }

  if (store.state.playorder === "list") {
    const id = store.state.playing.id;
    let idx: number;
    store.state.playlist.forEach((item: any, index: number) => {
      if (item.id === id) return (idx = index);
    });
    if (idx === store.state.playlist.length - 1) idx = -1;
    mitter.emit("nextSong", idx + 1);
  } else if (store.state.playorder === "random") {
    // 随机播放
    let idx = getRandom(0, store.state.playlist.length);
    mitter.emit("nextSong", idx);
  } else {
    // 单曲循环
    mitter.emit("oneSong");
  }
};

// 获取音乐播放地址
const _getMusicUrl = async (ids: string) => {
  const res = await getMusicUrl(ids);
  id.value = res.data[0].id;
  musicUrl.value = res.data[0].url;
};
onMounted(() => {
  // 监听从播放列表点击，获取音乐url
  mitter.on("playsong", (id: string) => {
    // 将现行音乐停掉，在网络环境不好时，可能下一首歌还没加载，当前还在播放,url没替换掉
    musicUrl.value = "";
    _getMusicUrl(id);
  });
  // 监听播放暂停
  mitter.on("stateChange", (data) => {
    if (data) {
      audioRef.value.play();
    } else {
      audioRef.value.pause();
    }
  });
  // 监听点击下一首，从播放列表播放第‘index’首
  mitter.on("nextSong", (index: number) => {
    const id = store.state.playlist[index].id;
    _getMusicUrl(id);
  });
  // 监听如果是单曲循环，每点击下一首，设置当前播放时间为0
  mitter.on("oneSong", () => {
    audioRef.value.currentTime = 0;
  });
  // 监听，并跳转到指定位置
  mitter.on("seekTo", (position: number) => {
    audioRef.value.currentTime = position * audioRef.value.duration;
  });
  mitter.on("volumeChange", (percent: number) => {
    audioRef.value.volume = percent;
  });
  // 挂载读取音量
  audioRef.value.volume = store.state.volume;
});
</script>

<template>
  <div class="play-bar" :class="{ 'at-bottom': atBottom }" v-show="!playPage">
    <div class="music-info left" @click="toPlaying" v-if="store.state.playing">
      <div class="song-cover">
        <img src="@/assets/img/default/disc.png" alt="" class="disc" />
        <img
          :src="store.state.playing.al.picUrl"
          alt=""
          :class="{ playing: isPlaying }"
          class="cover"
        />
      </div>
      <div class="info">
        <span class="song-name">{{ store.state.playing.name }}</span>
        <span class="singer"> - {{ store.state.playing.ar[0].name }}</span>
      </div>
    </div>
    <div class="music-info left" @click="toPlaying" v-else>
      <div class="song-cover">
        <img src="@/assets/img/default/disc.png" alt="" class="disc" />
        <img
          src="@/assets/img/default/default.jpg"
          alt=""
          :class="{ playing: isPlaying }"
          class="cover"
        />
      </div>
      <div class="info">
        <span class="song-name">暂无播放</span>
        <span class="singer"></span>
      </div>
    </div>
    <div class="music-controll right">
      <van-circle
        layer-color="#E4E4E4"
        color="#D43C33"
        :stroke-width="30"
        size="24px"
        v-model="currentRate"
        :rate="rate"
        class="song-rate"
      />
      <span class="iconfont play" :class="iconDisplay" @click="playSong"></span>
      <span class="iconfont icon-24gl-playlist" @click="showList"></span>
      <audio
        :src="musicUrl"
        autoplay
        @canplay="songCanPlay"
        @timeupdate="songPlaying"
        @play="songPlay"
        @pause="songPause"
        @ended="songEnd"
        ref="audio"
      ></audio>
    </div>
  </div>
</template>

<style lang="less" scoped>
@keyframes rotate-cover {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
div.at-bottom {
  bottom: 0;
  height: 49px;
  .music-info {
    line-height: 49px;
    .song-cover {
      position: relative;
      width: 35px;
      height: 35px;
      .disc {
        position: absolute;
        width: 100%;
        z-index: 5;
      }
      .cover {
        position: absolute;
        top: 5px;
        left: 5px;
        width: 75%;
        height: 75%;
        border-radius: 18px;
        z-index: 4;
      }
    }
  }
  .music-controll {
    line-height: 49px;
  }
}
.play-bar {
  position: fixed;
  bottom: 49px;
  left: 0;
  width: 100vw;
  height: 40px;
  background-color: #fdfdfd;
  .music-info {
    display: flex;
    margin-left: 10px;
    height: 100%;
    line-height: 40px;
    .song-cover {
      position: relative;
      top: 5px;
      width: 30px;
      height: 30px;
      overflow: hidden;
      font-size: 0;
      border-radius: 15px;
      .disc {
        position: absolute;
        width: 100%;
        z-index: 5;
      }
      .cover {
        position: absolute;
        top: 3px;
        left: 3px;
        width: 75%;
        height: 75%;
        // vertical-align: top;
        border-radius: 15px;
        animation: rotate-cover 8s linear infinite;
        animation-play-state: paused;
        z-index: 4;
      }
      img.playing {
        animation-play-state: running;
      }
    }
    .info {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 55vw;
      margin-left: 10px;
      // span {
      //   margin-left: 5px;
      // }
      .song-name {
        font-size: 16px;
        color: #333;
      }
      .singer {
        color: #999;
        font-size: 12px;
      }
    }
  }
  .music-controll {
    height: 100%;
    line-height: 40px;
    margin-right: 10px;
    .song-rate {
      position: relative;
      top: 8px;
    }
    .play {
      position: relative;
      left: -17px;
      font-size: 12px;
    }
  }
}
</style>
