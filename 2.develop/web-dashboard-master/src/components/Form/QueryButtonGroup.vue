<template>
  <section class="flex mb24 mr20" style="margin-left: auto;">
    <SearchButton @click="props.submitForm"/>
    <ResetButton @click="props.resetForm"/>
  </section>
</template>

<script setup>

const props = defineProps({
  submitForm: {
    type: Function,
    default: () => { },
  },
  resetForm: {
    type: Function,
    default: () => { },
  },
})
</script>

<style scoped>

</style>