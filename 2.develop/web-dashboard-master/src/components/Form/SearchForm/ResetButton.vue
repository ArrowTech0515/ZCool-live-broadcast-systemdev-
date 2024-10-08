<template>
  <a-button
    class="ml20"
    @click="emit('click')"
    type="default"
  ><ReloadOutlined/>重置</a-button>
</template>

<script setup>

const emit = defineEmits(['click'])

</script>

<style scoped>

</style>