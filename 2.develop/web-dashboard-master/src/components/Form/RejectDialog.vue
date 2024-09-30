<template>
  <a-modal
    title="拒绝提现"
    v-model:open="isModalVisible"
    maskClosable="false"
    keyboard="false"
    :footer="null"
    @update:open="updateVisible"
  >

    <!-- Conditionally render the CustomSpin component if '钻石奖励' is selected -->
    <a-form-item  label="拒绝提现理由" style="margin-top: 15px;">
        <a-textarea
          v-model:value="value1"
          placeholder="请填写拒绝提现理由"
          :auto-size="{ minRows: 3, maxRows: 5 }"
        />
        <span style="font-size: 12px; color: grey; margin-bottom: 15px;">
        当前拒绝提现理由将通过消息中心通知主播
        </span>
        </a-form-item>

        <!-- Custom Footer -->
    <div class="custom-footer">
      <a-button style="width: 120px; margin-right: 30px;" @click="handleCancel">取消</a-button>
      <a-button style="width: 120px;" type="primary" @click="handleOk">确定</a-button>
    </div>
  </a-modal>
</template>

<script>

export default defineComponent({
  props: {
    isModalVisible: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['update:isModalVisible', 'emit_success', 'emit_cancel'],

  setup(props, { emit }) {
    const updateVisible = (visible) => {
      if (typeof visible === 'boolean') {
        emit('update:isModalVisible', visible)
      } else {
        console.error('Invalid value for isModalVisible:', visible)
      }
    }

    const handleOk = () => {
      emit('emit_success')
      updateVisible(false)
    }

    const handleCancel = () => {
      console.log('Cancel Clicked')
      emit('emit_cancel')
      updateVisible(false)
    }

    return {
      updateVisible,
      handleOk,
      handleCancel,
    }
  },
})
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
