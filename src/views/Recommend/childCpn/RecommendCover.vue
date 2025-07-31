<script setup lang="ts">
import { padLeftZero } from "@/common/utils";
import { ref } from "vue";
defineOptions({
  name: "RecommendCover"
});
const { imgUrl = {} } = defineProps<{
  imgUrl: any;
}>();
const month = ref("");
const day = ref("");
// 每日日期
const getToday = () => {
  const now = new Date();
  const m = now.getMonth() + 1;
  const d = now.getDate();
  month.value = padLeftZero(m.toString());
  day.value = padLeftZero(d.toString());
};
getToday();
</script>

<template>
  <div class="recommend-cover" v-if="imgUrl.al">
    <img :src="imgUrl.al.picUrl" alt="" />
    <div class="date">
      <span class="day">{{ day }}/</span>
      <span class="month">{{ month }}</span>
    </div>
  </div>
</template>

<style lang="less" scoped>
.recommend-cover {
  position: relative;
  overflow: hidden;
  height: 220px;
  img {
    position: absolute;
    z-index: 0;
    width: 100%;
  }

  .date {
    background-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 0 10px 10px rgba(255, 255, 255, 0.3);
    position: absolute;
    left: 15px;
    bottom: 30px;
    width: 60px;
    height: 30px;
    line-height: 30px;
    color: #333;
    text-align: center;
    border-radius: 15px;
    z-index: 0;
    .day {
      font-size: 24px;
    }
    .month {
      font-size: 16px;
    }
  }
}
</style>
