<template>
  <div class="play-nav">
    <nav-bar>
      <template v-slot:left>
        <span class="back iconfont icon-back1" @click="goBack"></span>
      </template>
      <template v-slot:center>
        <div class="name">
          <span>{{ musicInfo.name }}</span>
        </div>
        <!-- fm页面和播放页面的歌手名字不一样,判断一下 -->
        <div class="artists" v-if="musicInfo.ar">
          <span v-for="(artist, index) in musicInfo.ar" :key="artist.id">
            {{ artist.name
            }}<span v-if="index < musicInfo.ar.length - 1">/</span>
          </span>
        </div>
        <div class="artists" v-else>
          <span v-for="(artist, index) in musicInfo.artists" :key="artist.id">
            {{ artist.name
            }}<span v-if="index < musicInfo.artists.length - 1">/</span>
          </span>
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar/NavBar.vue";
export default {
  name: "PlayNav",
  components: {
    NavBar
  },
  props: {
    musicInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.play-nav {
  background-color: rgba(255, 255, 255, 0.05);
  box-shadow: 0 0 20px 15px rgba(255, 255, 255, 0.05);
  color: #333;
  font-size: 16px;
  .name {
    width: 70vw;
    margin: 0 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 60%;
    font-size: 15px;
    line-height: 28px;
  }
  .artists {
    width: 70vw;
    margin: 0 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 12px;
    height: 40%;
    line-height: 16px;
    color: #555;
  }
}
</style>
