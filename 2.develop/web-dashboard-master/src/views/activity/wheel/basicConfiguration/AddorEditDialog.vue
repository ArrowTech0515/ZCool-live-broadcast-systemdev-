<template>
  <a-modal
    title="转盘新增"
    v-model:visible="isModalVisible"
    maskClosable="false"
    keyboard="false"
    :footer="null"
    @update:visible="updateVisible"
  >
    <a-form-item label="转盘名称" :label-col="{ span: 6 }">
      <a-input style="margin-bottom: 10px; "></a-input>
    </a-form-item>
    <a-form-item label="提现金额" :label-col="{ span: 6 }">
      <a-input style="margin-bottom: 10px; "></a-input>
    </a-form-item>
    <a-form-item label="活动有效期" :label-col="{ span: 6 }">
      <a-input style="margin-bottom: 10px; "></a-input>
    </a-form-item>
    <a-form-item label="推广人数" :label-col="{ span: 6 }">
      <a-input style="margin-bottom: 10px; "></a-input>
    </a-form-item>
    <a-form-item label="下级充值人数" :label-col="{ span: 6 }">
      <a-input style="margin-bottom: 10px; "></a-input>
    </a-form-item>
    <a-form-item label="下级充值总金额" :label-col="{ span: 6 }">
      <a-input style="margin-bottom: 10px; "></a-input>
    </a-form-item>
    <a-form-item label="设备数限制" :label-col="{ span: 6 }">
      <a-input style="margin-bottom: 10px; "></a-input>
    </a-form-item>
   
    <!-- Custom Footer -->
    <div class="custom-footer">
      <a-button style="width: 120px; margin-right: 30px;" @click="handleCancel">取消</a-button>
      <a-button style="width: 120px;" type="primary" @click="handleSave">保存</a-button>
    </div>
  </a-modal>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  components: {

  },
  props: {
    isModalVisible: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['update:isModalVisible'],

  setup(props, { emit }) {
    const updateVisible = (visible) => {
      if (typeof visible === 'boolean') {
        emit('update:isModalVisible', visible);
      } else {
        console.error('Invalid value for isModalVisible:', visible);
      }
    }

    const handleSave = () => {
      console.log('OK Clicked', rewardType.value);
      updateVisible(false);
    }

    const handleCancel = () => {
      console.log('Cancel Clicked');
      updateVisible(false);
    }

    return {
      updateVisible,
      handleSave,
      handleCancel,
    }
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
