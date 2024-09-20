<template>
  <a-modal
    :title="operationType === '新增' ? '转盘新增' : '转盘编辑'"
    :visible="isModalVisible"
    maskClosable="false"
    keyboard="false"
    :footer="null"
    @update:visible="updateVisible"
  >
    <a-form-item label="转盘名称" :label-col="{ span: 6 }">
      <a-input v-model:value="formData.name" style="margin-bottom: 10px;" placeholder="请输入转盘名称"/>
    </a-form-item>
    <a-form-item label="提现金额" :label-col="{ span: 6 }">
      <a-input v-model:value="formData.withdrawal" style="margin-bottom: 10px;" placeholder="请输入提现金额"/>
    </a-form-item>
    <a-form-item label="活动有效期" :label-col="{ span: 6 }">
      <a-input v-model:value="formData.validityPeriod" style="margin-bottom: 10px;" placeholder="请输入活动有效期"/>
    </a-form-item>
    <a-form-item label="推广人数" :label-col="{ span: 6 }">
      <a-input v-model:value="formData.nPromoters" style="margin-bottom: 10px;" placeholder="请输入推广人数"/>
    </a-form-item>
    <a-form-item label="下级充值人数" :label-col="{ span: 6 }">
      <a-input v-model:value="formData.nSubordinate" style="margin-bottom: 10px;" placeholder="请输入下级充值人数"/>
    </a-form-item>
    <a-form-item label="下级充值总金额" :label-col="{ span: 6 }">
      <a-input v-model:value="formData.totalSubordinate" style="margin-bottom: 10px;" placeholder="请输入下级充值总金额"/>
    </a-form-item>
    <a-form-item label="设备数限制" :label-col="{ span: 6 }">
      <a-input v-model:value="formData.nDevicelimit" style="margin-bottom: 10px;" placeholder="请输入设备数限制"/>
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
      withdrawal: '',
      validityPeriod: '',
      nPromoters: '',
      nSubordinate: '',
      totalSubordinate: '',
      nDevicelimit: '',
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
