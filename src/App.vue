<script setup lang="ts">
defineOptions({
  name: "App"
});
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition>
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<style>
@import url("@/assets/css/base.css");
@import url("//at.alicdn.com/t/font_2360697_u9r0tdqa3l.css");
</style>
