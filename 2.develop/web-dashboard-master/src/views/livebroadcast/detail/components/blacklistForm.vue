<template>
  <a-form :model="formData" style="layout: vertical;">
    <a-form-item label="禁言用户">
      <span>{{ formData.username }}</span>
    </a-form-item>

    <a-form-item label="发言内容">
      <span>{{ formData.content }}</span>
    </a-form-item>

    <a-form-item label="拉黑类型">
      <a-checkbox value="account">{{ENUM.block_type[1]}}</a-checkbox>
      <a-checkbox value="device">{{ENUM.block_type[2]}}</a-checkbox>
      <a-checkbox value="IP">{{ENUM.block_type[3]}}</a-checkbox>
   </a-form-item>

    <a-form-item label="拉黑时效">
      <a-radio-group v-model:value="formData.muteDuration">
        <a-radio value="7days">{{ENUM.ageing_type[1]}}</a-radio>
        <a-radio value="permanent">{{ENUM.ageing_type[2]}}</a-radio>
        <a-radio value="customize">{{ENUM.ageing_type[3]}}</a-radio>
      </a-radio-group>
      <a-date-picker v-if="formData.muteDuration === 'customize'" v-model:value="formData.customMuteTime" placeholder="选择时间" />
    </a-form-item>

    <a-form-item label="理由">
      <a-textarea v-model:value="formData.reason" placeholder="请输入禁言理由" />
    </a-form-item>
  </a-form>
</template>

<script lang="jsx" setup>
const props = defineProps({
  formData: {
    type: Object,
    required: true
  }
});
</script>
