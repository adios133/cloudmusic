<script setup lang="ts">
import { useRouter } from "vue-router";
import mitter from "@/mitt";
import { ref, onMounted } from "vue";
defineOptions({
  name: "SearchBox"
});
const emits = defineEmits<{
  getContent: [val: string];
}>();
const router = useRouter();
const word = ref("");
const getKeyWord = (e: InputEvent) => {
  emits("getContent", (e.target as HTMLInputElement).value);
};
const onFocus = (e: FocusEvent) => {
  emits("getContent", (e.target as HTMLInputElement).value);
};
const goBack = () => {
  router.push("/home");
};
const setHistory = (e: KeyboardEvent) => {
  // 去重，可以使用set数据结构
  if (e.keyCode === 13) {
    let arr = [];
    const item = JSON.parse(localStorage.getItem("history"));
    const noSame =
      item && !item.some((el) => el == (e.target as HTMLInputElement).value);
    if (item && noSame) {
      arr = [...item, (e.target as HTMLInputElement).value];
    } else {
      arr.push((e.target as HTMLInputElement).value);
    }
    localStorage.setItem("history", JSON.stringify(arr));
  }
};
onMounted(() => {
  mitter.on("fillWord", (text: string) => {
    word.value = text;
  });
});
</script>

<template>
  <div class="search-box">
    <span class="iconfont icon-iconfontzhizuobiaozhun22 icon"></span>
    <input
      type="text"
      @input="getKeyWord"
      :value="word"
      @focus="onFocus"
      @keyup="setHistory"
    />
    <span @click="goBack" class="cancel">取消</span>
  </div>
</template>

<style lang="less" scoped>
.search-box {
  position: relative;
  height: 44px;
  line-height: 44px;
  font-size: 16px;
  input {
    height: 32px;
    width: 75vw;
    margin: 6px;
    text-indent: 28px;
    background-color: #fafafa;
    border: 1px solid #eee;
    border-radius: 18px;
  }
  .icon {
    position: absolute;
    left: 20px;
  }
  .cancel {
    display: inline-block;
    width: calc(25vw - 42px);
    text-align: center;
  }
}
</style>
