<script setup lang="ts">
defineOptions({
  name: "ProfileBackground"
});
const { picUrl = "" } = defineProps<{
  picUrl: string;
}>();
</script>

<template>
  <div class="profile-bg">
    <img :src="picUrl" alt="" v-if="picUrl != ''" />
    <img src="@/assets/img/default/bgImg2.jpg" alt="" v-else />
  </div>
</template>

<style lang="less" scoped>
.profile-bg img {
  width: 100%;
}
</style>
