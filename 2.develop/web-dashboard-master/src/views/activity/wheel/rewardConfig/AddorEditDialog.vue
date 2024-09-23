<template>
  <a-modal
    :title="operationType === '新增' ? '奖励新增' : '奖励编辑'"
    :open="isModalVisible"
    :maskClosable="false"
    :keyboard="false"
    :footer="null"
    @update:open="updateVisible"
  >
    <a-form-item label="奖励名称" :label-col="{ span: 6 }">
      <a-input v-model:value="formData.name" style="margin-bottom: 10px;" placeholder="请输入奖励名称"/>
    </a-form-item>
    <a-form-item label="数量" :label-col="{ span: 6 }">
      <a-input v-model:value="formData.quantity" style="margin-bottom: 10px;" placeholder="请输入数量"/>
    </a-form-item>

    <div class="custom-footer">
      <a-button style="width: 120px; margin-right: 30px;" @click="handleCancel">取消</a-button>
      <a-button style="width: 120px;" type="primary" @click="handleSave">保存</a-button>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  isModalVisible: {
    type: Boolean,
    default: false,
  },
  formData: {
    type: Object,
    default: () => ({
      name: '',
      quantity: '',
    }),
  },
  operationType: {
    type: String,
    default: '新增',
  },
});

const emit = defineEmits(['update:isModalVisible', 'save']);

const updateVisible = (visible: boolean) => {
  emit('update:isModalVisible', visible);
};

const handleSave = () => {
  emit('save', props.formData);
  updateVisible(false);
};

const handleCancel = () => {
  updateVisible(false);
};
</script>

<style scoped>
.ant-modal-header {
  text-align: center;
}

.ant-modal-title {
  font-weight: bold;
  color: #FFD700; /* Yellow color */
}

.custom-footer {
  display: flex;
  justify-content: center;
  margin-top: 24px;
}

.custom-footer .ant-btn {
  margin: 0 8px;
}
</style>
