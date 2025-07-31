<script setup lang="ts">
import { ref, watch, useTemplateRef } from "vue";
defineOptions({
  name: "VideoItem"
});
const { isVideo = false, videoInfo = {} } = defineProps<{
  videoInfo: any;
  isVideo: boolean;
}>();
const emits = defineEmits<{
  coverClick: [{ id: string; index: number }];
}>();
const url = ref("");
const showVideo = ref(false);
const videoRef = useTemplateRef("video");
watch(
  () => isVideo,
  (val) => {
    showVideo.value = val;
  }
);
const coverClick = (id: string) => {
  emits("coverClick", { id, index: videoInfo.index });
};
// const canPlayed = () => {
//   videoRef.value.play();
// };
defineExpose({
  url
});
</script>

<template>
  <div class="video-item">
    <div class="video-box" @click="coverClick(videoInfo.vid)">
      <video
        :src="url"
        :poster="videoInfo.coverUrl"
        controls
        autoplay
        v-if="showVideo"
        ref="video"
      ></video>
      <img :src="videoInfo.coverUrl" alt="" class="cover" v-else />
    </div>
    <div class="title">{{ videoInfo.title }}</div>
    <div class="video-info">
      <div class="creator">
        <img :src="videoInfo.creator.avatarUrl" alt="" class="avatar" />
        <div class="nickname">{{ videoInfo.creator.nickname }}</div>
      </div>
      <div class="oprations">
        <div class="share-count">
          <span class="iconfont icon-share"></span> {{ videoInfo.shareCount }}
        </div>
        <div class="comment-count">
          <span class="iconfont icon-comment"></span>
          {{ videoInfo.commentCount }}
        </div>
        <div class="more"><span class="iconfont icon-moreif"></span></div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.video-item {
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  .video-box {
    width: 100%;
    height: 11.87rem;
    .cover,
    video {
      border-radius: 5px;
      width: 100%;
      height: 100%;
    }
  }
  .title {
    padding: 0 3px;
    margin: 10px 0;
    height: 30px;
    line-height: 1.2;
    font-size: 16px;
  }
  .video-info {
    display: flex;
    justify-content: space-between;
    height: 40px;
    line-height: 40px;
    .creator {
      display: flex;
      .avatar {
        width: 40px;
        margin-right: 5px;
        border-radius: 20px;
        vertical-align: middle;
      }
      .nickname {
        font-size: 14px;
      }
    }
    .oprations {
      display: flex;
      font-size: 14px;
      .comment-count {
        margin: 0 8px;
      }
    }
  }
}
</style>
