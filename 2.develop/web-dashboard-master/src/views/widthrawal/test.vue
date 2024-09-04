<template>
  <a-form-item label="用户ID">
    <a-input-group compact>
      <span style="display: inline-block; width: 200px; padding: 4px; border: 1px solid #d9d9d9; border-right: 0;">
        {{ form.user_id || '用户ID未提供' }}
      </span>
      <a-button type="default" @click="handleQuery">查询</a-button>
    </a-input-group>
  </a-form-item>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const form = ref({
  user_id: '123456', // Example user ID
});

function handleQuery() {
  console.log('Querying for user ID:', form.value.user_id);
}
</script>

<style scoped>
/* Add styles to ensure the span looks similar to an input */
span {
  height: 32px; /* Adjust height to match the input height */
  line-height: 32px; /* Center text vertically */
  background-color: #fafafa; /* Match the input background */
}
</style>
