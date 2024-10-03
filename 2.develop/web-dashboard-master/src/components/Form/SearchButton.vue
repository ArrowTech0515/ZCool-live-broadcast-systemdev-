<template>
  <a-button
    class="ml20"
    @click="emit('click')"
    type="primary"
  ><SearchOutlined/>查询</a-button>
</template>

<script setup>

const emit = defineEmits(['click'])

</script>

<style scoped>

</style>