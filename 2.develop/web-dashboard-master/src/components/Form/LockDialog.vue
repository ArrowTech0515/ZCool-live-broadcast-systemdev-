<template>
  <a-modal
    :title="sTitle"
    v-model:open="isModalVisible"
    :maskClosable="false"
    :keyboard="false"
    :footer="null"
    @update:open="updateVisible"
  >

  <a-col style="text-align: center">
    <span style=" font-weight: bold; margin-bottom: 15px;">
      {{ sText1 }}
    </span>
  </a-col>
  <a-col style="text-align: center">
    <span style=" font-weight: bold; margin-bottom: 15px;">
      {{ sText2 }}
    </span>
  </a-col>
        <!-- Custom Footer -->
    <div class="custom-footer">
      <a-button style="width: 120px; margin-right: 30px;" @click="handleCancel">取消</a-button>
      <a-button style="width: 120px;" type="primary" @click="handleOk">确定</a-button>
    </div>
  </a-modal>
</template>

<script lang="jsx">

export default defineComponent({

  props: {
    isModalVisible: {
      type: Boolean,
      default: false,
    },
    sTitle: {
      type: String,
      default: "",
    },
    sText1: {
      type: String,
      default: "",
    },
    sText2: {
      type: String,
      default: "",
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
