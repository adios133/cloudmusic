<template>
  <div class="home-rank">
    <van-swipe class="rank-scroll" :show-indicators="false" :stop-propagation="false">
      <van-swipe-item v-for="(item,index) in rankIdList" :key="item.id" class="van-item">
        <div class="rank-item">
          <h4 class="title" @click="toListDetail(item.id)">{{ item.title }}</h4>
        <div class="list" v-for="(song, indey) in item.songList" :key="indey" @click="toPlaying(song.id,index)">
          <img :src="song.al.picUrl" alt="" />
          <div class="rank">{{ indey + 1 }}</div>
          <div class="song-info">
            <span class="song-name">{{ song.name }} -</span>
            <span class="artists">
              <span v-for="(artist, indez) in song.ar" :key="artist.id">
                {{ artist.name }}<span v-if="indez < song.ar.length - 1">/</span>
              </span>
            </span>
          </div>
        </div>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import Vue from 'vue'
import {Swipe, SwipeItem } from 'vant'
Vue.use(Swipe)
Vue.use(SwipeItem)
export default {
  name: "HomeRank",
  props: {
    rankIdList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      startX:0,
      moveX:0,
      x:0
    }
  },
  methods: {
    // 跳转到歌单详情页面，携带id
    toListDetail(id) {
      // 会打印两次
      this.$router.push("/listdetail/" + id);
    },
    // 跳转到播放页面，传递id
    toPlaying(id,index) {
      this.$store.commit('setPlaylist',this.rankIdList[index].songList)
      this.$router.push("/playing/" + id);
      this.$store.commit('setState',false)
      this.$store.commit("setLine",0)
      this.$store.commit('setFm',false)
      this.$bus.$emit('playsong',id)
    },
  },
};
</script>

<style lang="scss" scoped>
.home-rank {
  width: 100vw;
  height: 255px;
  .rank-scroll {
    width: 100%;
    .rank-item {
      width: 90%;
      margin: 0 auto;
      padding: 5px;
      border-radius: 1rem;
      border: 1px solid rgba(0, 0, 0, 0.08);
      .title {
        height: 2.5rem;
        line-height: 2.5rem;
        text-align: center;
        border-bottom: 1px solid #eee;
        &::after {
          content: "";
          display: inline-block;
          width: 10px;
          height: 10px;
          border-top: 1.5px solid #333;
          border-right: 1.5px solid #333;
          transform: rotate(45deg);
        }
      }
      .list {
        display: flex;
        margin: 8px 0;
        img {
          width: 3.125rem;
          height: 3.125rem;
          margin-right: 10px;
          vertical-align: middle;
          border-radius: 0.625rem;
        }
        .rank,
        .song-name,
        .artists {
          line-height: 3.125rem;
        }
        .rank {
          margin: 0 10px;
        }
        .song-info {
          width: 14rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          .artists {
            color: #aaa;
            font-size: 14px;
          }
        }
        
      }
    }
  }
}
</style>
