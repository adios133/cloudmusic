<script setup lang="ts">
import { closeToast, showLoadingToast, showFailToast } from "vant";
import { getVideoCate, getViedoList, getVideoUrl } from "@/api/video";
import Scroll from "@/components/common/Scroll/BetterScroll.vue";
import VideoNav from "./childCpn/VideoNav.vue";
import VideoItem from "./childCpn/VideoItem.vue";
import { ref, useTemplateRef, onActivated } from "vue";
import mitter from "@/mitt";
import useStore from "@/store";

defineOptions({
  name: "Video"
});
const store = useStore();
const videoItemRefs = useTemplateRef("vItem");
const scrollRef = useTemplateRef("scroll");
const cateList = ref<any[]>([]);
const videoGroup = ref<any[]>([]);
const offset = ref(0);
const groupId = ref("");
const currentPlayId = ref("");
const _getViedoList = async (id: string, offse?: number) => {
  const res = await getViedoList(id, offse);
  // 加载更多，使用push
  closeToast();
  // 为每个对追加index属性，以便后续点击确定获取是哪个的url，由于有上拉加载更多，且使用push，后续的index需要处理
  res.datas.map((item, index) => {
    item.data.index = index + offset.value * res.datas.length;
  });
  videoGroup.value.push(...res.datas);
};
const _getVideoUrl = async (info) => {
  const res = await getVideoUrl(info.id);
  videoItemRefs.value[info.index].url = res.urls[0].url;
};
const cateClick = (id: string) => {
  // 每次点击重置offset,清空videoGroup
  offset.value = 0;
  videoGroup.value = [];
  groupId.value = id;
  showLoadingToast("加载中...");
  _getViedoList(id);
};
const coverClick = (info: any) => {
  // currentPlayId是用于点击那个，那个变为video，其他变成img
  currentPlayId.value = info.id;
  _getVideoUrl(info);
};
const pullingUpLoad = () => {
  offset.value += 1;
  _getViedoList(groupId.value, offset.value);
  // 结束上拉，可进行下一次上拉，不然只会触发一次
  scrollRef.value.scroll.finishPullUp();
};
onActivated(() => {
  getVideoCate()
    .then((res) => {
      // 变量存储
      showLoadingToast("加载中...");
      // pop删除最后一个，最后一个为mv，里面的数据和其他的不一样，直接删除
      res.data.pop();
      cateList.value = res.data;
      // 上来加载列表第一个
      groupId.value = cateList.value[0].id;
      _getViedoList(groupId.value);
    })
    .catch((err) => {
      showFailToast({
        message: err.response.data.msg,
        duration: 1500
      });
    });
});
// beforeRouteEnter
store.setState(false);
mitter.emit("stateChange", false);
</script>

<template>
  <div id="video">
    <video-nav :cateList="cateList" @cateClick="cateClick" />
    <scroll
      class="video-scroll"
      :pullUpLoad="true"
      @pullingUpLoad="pullingUpLoad"
      ref="scroll"
    >
      <div class="v-item" v-for="(item, index) in videoGroup" :key="index">
        <video-item
          :videoInfo="item.data"
          class="v_item"
          @coverClick="coverClick"
          ref="vItem"
          :isVideo="currentPlayId === item.data.vid"
        />
      </div>
    </scroll>
  </div>
</template>

<style lang="less" scoped>
.video-scroll {
  height: calc(100vh - 93.5px);
  .v_item {
    width: 90%;
    margin: 0 auto;
  }
}
</style>
