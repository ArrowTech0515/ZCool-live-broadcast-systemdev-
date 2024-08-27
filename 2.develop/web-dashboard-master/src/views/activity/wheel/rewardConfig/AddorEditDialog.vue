<template>
  <a-modal
    :title="operationType === '新增' ? '奖励新增' : '奖励编辑'"
    v-model:visible="isModalVisible"
    maskClosable="false"
    keyboard="false"
    :footer="null"
    @update:visible="updateVisible"
  >
    <a-form-item label="奖励名称" :label-col="{ span: 6 }">
      <a-input v-model:value="formData.name" style="margin-bottom: 10px; " />
    </a-form-item>
    <a-form-item label="数量" :label-col="{ span: 6 }">
      <a-input v-model:value="formData.quantity" style="margin-bottom: 10px; " />
    </a-form-item>

    <!-- Custom Footer -->
    <div class="custom-footer">
      <a-button style="width: 120px; margin-right: 30px;" @click="handleCancel">取消</a-button>
      <a-button style="width: 120px;" type="primary" @click="handleSave">保存</a-button>
    </div>
  </a-modal>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
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
  },

  emits: ['update:isModalVisible', 'save'],

  setup(props, { emit }) {
    const updateVisible = (visible) => {
      emit('update:isModalVisible', visible);
    };

    const handleSave = () => {
      emit('save', props.formData);
      updateVisible(false);
    };

    const handleCancel = () => {
      updateVisible(false);
    };

    return {
      handleSave,
      handleCancel,
    };
  },
});
</script>

<style scoped>
.ant-modal-header {
  text-align: center;
}

.ant-modal-title {
  font-weight: bold;
  color: #FFD700; /* Yellow color */
}

.ant-radio-group {
  display: flex;
  justify-content: space-around;
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
