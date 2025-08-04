<script setup lang="ts">
import Mainbar from "@/components/content/MainBar/Mainbar.vue";
defineOptions({
  name: "App"
});
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <transition name="scale-slide">
      <keep-alive>
        <component :is="Component" :key="route.path" />
      </keep-alive>
    </transition>
  </router-view>
  <Mainbar />
</template>

<style>
@import url("@/assets/css/base.css");
@import url("//at.alicdn.com/t/font_2360697_u9r0tdqa3l.css");
.scale-slide-enter-active,
.scale-slide-leave-active {
  position: absolute;
  transition: all 0.3s ease;
}

.scale-slide-enter-from {
  left: -100%;
}

.scale-slide-enter-to {
  left: 0%;
}

.scale-slide-leave-from {
  transform: scale(1);
}

.scale-slide-leave-to {
  transform: scale(0.8);
  opacity: 0;
}
</style>
