<template>
  <a-config-provider :locale="zhCN">
    <a-form :model="formData" style="layout: vertical;">
      <a-form-item label="禁言用户">
        <span>{{ formData.username }}</span>
      </a-form-item>

      <a-form-item label="发言内容">
        <span>{{ formData.content }}</span>
      </a-form-item>

      <a-form-item label="禁言时长">
        <a-radio-group v-model:value="formData.muteDuration">
          <a-radio value="7days">{{ENUM.ageing_type[1]}}</a-radio>
          <a-radio value="permanent">{{ENUM.ageing_type[2]}}</a-radio>
          <a-radio value="customize">{{ENUM.ageing_type[3]}}</a-radio>
        </a-radio-group>
        <a-typography-text type="secondary" style="font-size: 10px; color: gray; display: block; margin-top: 8px;">
          在禁言期间，用户不可发言，其他功能正常使用
        </a-typography-text>
      </a-form-item>

      <a-form-item
        v-if="formData.muteDuration === 'customize'"
        label="选择时间"
        :label-col="{ span: 5 }"
      >
        <a-date-picker
          v-model="formData.end_time"
          show-time
          :showTime="{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }"
          :disabled-date="disabledDate"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="X"
          placeholder="选择时间"
        />
      </a-form-item>

      <a-form-item label="理由">
        <a-textarea v-model:value="formData.reason" placeholder="请输入禁言理由" />
      </a-form-item>
    </a-form>
  </a-config-provider>
</template>

<script lang="jsx" setup>

import dayjs from 'dayjs';
import zhCN from 'ant-design-vue/es/locale/zh_CN'; // Import Chinese locale

const props = defineProps({
  formData: {
    type: Object,
    required: true
  }
})
const disabledDate = (current) => {
  return current && current < dayjs().endOf('day')
}
</script>
