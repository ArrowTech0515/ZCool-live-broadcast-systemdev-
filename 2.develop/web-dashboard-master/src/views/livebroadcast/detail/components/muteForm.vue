<template>
  <a-form :model="formData" style="layout: vertical;">
    <a-form-item label="禁言用户">
      <span>{{ formData.username }}</span>
    </a-form-item>

    <a-form-item label="发言内容">
      <span>{{ formData.content }}</span>
    </a-form-item>

    <a-form-item label="禁言时长">
      <a-radio-group v-model:value="formData.muteDuration">
        <a-radio value="7天">禁言7天</a-radio>
        <a-radio value="永久禁言">永久禁言</a-radio>
        <a-radio value="自定义禁言时间">自定义禁言时间</a-radio>
      </a-radio-group>
      <a-date-picker v-if="formData.muteDuration === '自定义禁言时间'" v-model:value="formData.customMuteTime" placeholder="选择时间" />
      <a-typography-text type="secondary" style="font-size: 10px; color: gray; display: block; margin-top: 8px;">
        在禁言期间，用户不可发言，其他功能正常使用
      </a-typography-text>
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
