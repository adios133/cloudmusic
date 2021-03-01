<template>
  <div class='music-list-item' v-if="listInfo.id" @click="itemClick(listInfo.id)">
    <div class="cover">
      <img :src="listInfo.coverImgUrl" alt="">
    </div>
    <div class="list-info">
      <div class="name">{{listInfo.name}}</div>
      <div class="track-count">{{listInfo.trackCount}}首</div>
    </div>
  </div>
</template>

<script>

export default {
  name:"MusicListItem",
  props:{
    listInfo:{
      type:Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    itemClick(id) {
      this.$router.push('/listdetail/'+ id)
    }
  },
  }
</script>

<style lang="scss" scoped>
  .music-list-item {
    display: flex;
    height: 80px;
    padding: 0 10px;
    .cover {
      width: 80px;
      text-align: center;
      img {
        width: 80%;
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