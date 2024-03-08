<script setup>
defineOptions({
  name: "App",
})
</script>

<template>
  <RouterView v-slot="{ Component }">
    <Transition>
      <Component :is="Component" />
    </Transition>
  </RouterView>
</template>

<style lang="less"></style>
