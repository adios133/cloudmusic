<script setup lang="ts">
import Scroll from "@/components/common/Scroll/BetterScroll.vue";
import RankHeader from "./childCpn/RankHeader.vue";
import RankItem from "./childCpn/RankItem.vue";
import RankItemSimple from "./childCpn/RankItemSimple.vue";
import { getRank } from "@/api/rank";
import { Toast } from "vant";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

defineOptions({
  name: "Rank"
});
const router = useRouter();
const rankList = ref<any[]>([]);
const offcialRank = computed(() => {
  return rankList.value.filter((item) => item.tracks.length > 0);
});
const otherRank = computed(() => {
  return rankList.value.filter((item) => item.tracks.length === 0);
});
const _getRank = async () => {
  const res = await getRank();
  Toast.clear();
  rankList.value = res.list;
};
const listClick = (id: string) => {
  router.push("/listdetail/" + id);
};

const _init = () => {
  Toast.loading("加载中...");
  _getRank();
};
_init();
</script>

<template>
  <div class="rank">
    <rank-header />
    <scroll class="rank-scroll">
      <div class="offcial-rank">官方榜</div>
      <rank-item
        v-for="(item, index) in offcialRank"
        :key="index"
        :rankInfo="item"
      />
      <div class="other-rank">精选榜</div>
      <div class="content">
        <div
          class="item-simple"
          v-for="(item, index) in otherRank"
          :key="index"
          @click="listClick(item.id)"
        >
          <rank-item-simple
            :imgSrc="item.coverImgUrl"
            :desc="item.name"
            :updateFrequency="item.updateFrequency"
            class="rank-item-simple"
          />
        </div>
      </div>
    </scroll>
  </div>
</template>

<style lang="less" scoped>
.rank-scroll {
  height: calc(100vh - 93px);
  .offcial-rank,
  .other-rank {
    height: 30%;
    line-height: 30px;
    margin-left: 20px;
    color: #333;
    font-size: 20px;
    font-weight: 700;
  }
  .item-simple {
    display: inline-block;
    width: 33.333%;
    vertical-align: top;
    .rank-item-simple {
      margin: 10px auto;
    }
  }
}
</style>
