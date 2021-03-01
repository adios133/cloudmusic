%
<template>
  <div
    class="rank-item"
    v-if="Object.keys(rankInfo).length > 0"
    @click="goDetail(rankInfo.id)"
  > <div class="bg">
    <img :src="rankInfo.coverImgUrl" alt="">
  </div>
    <div class="info">{{ rankInfo.updateFrequency }}</div>
    <div class="content">
      <div class="cover">
        <div class="name">{{ rankInfo.name }}</div>
        <img :src="rankInfo.coverImgUrl" alt="" />
      </div>
      <div class="shortcut">
        <div class="song" v-for="(item, index) in rankInfo.tracks" :key="index">
          <span class="rank">{{ index + 1 }} . </span>
          <span class="song-name">{{ item.first }}</span>
          <span class="artist">- {{ item.second }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RankItem",
  components: {},
  props: {
    rankInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {},
  methods: {
    goDetail(id) {
      this.$router.push("/listdetail/" + id);
    },
  },
};
</script>

<style lang="scss" scoped>
$color1:#fff;
$color2:#eee;
.rank-item {
  position: relative;
  overflow: hidden;
  width: 90%;
  margin: 10px auto;
  padding: 10px 0;
  font-size: 16px;
  color: $color1;
  border-radius: 12px;
  .bg {
    position:absolute;
    transform: translate(0,-10px);
    filter: blur(20px);
    z-index: -1;
    img {
      width: 100%;
    }
  }
  .info {
    margin-right: 10px;
    text-align: right;
    color: $color2;
    font-size: 14px;
  }
  .content {
    display: flex;
    .cover {
      width: 90px;
      .name {
        font-weight: 700;
        text-align: center;
        line-height: 1.5;
        color: $color1;
      }
      img {
        width: 80px;
        height: 80px;
        margin-left: 5px;
        border-radius: 10px;
      }
    }
    .shortcut {
      width: calc(100% - 90px);
      margin-top: 20px;
      margin-left: 10px;
      color: $color1;
      .song {
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
        line-height: 2;
      }
    }
  }
}
</style>
