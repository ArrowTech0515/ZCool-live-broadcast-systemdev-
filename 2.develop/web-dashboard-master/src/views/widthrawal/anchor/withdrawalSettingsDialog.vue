<template>
  <a-modal
    title="提现设置"
    :open="isModalVisible"
    :maskClosable="false"
    :keyboard="false"
    :footer="null"
    @update:open="updateVisible"
  >
    <!-- Conditionally render the CustomSpin component if '钻石奖励' is selected -->
    <a-form-item label="银行卡手续费">
      <CustomSpin v-model:nValue="bank_card_fee" :bShowUnit="true" style="width: 100%;" />
      <div>
        <span style="text-align: center; font-size: 10px; color: grey;">设置当前主播使用银行卡提现时的手续费</span>
      </div>
    </a-form-item>

    <!-- Conditionally render the CustomSpin component if '钻石奖励' is selected -->
    <a-form-item label="虚拟币手续费">
      <CustomSpin v-model:nValue="virtual_currency_fee" :bShowUnit="true" style="width: 100%;" />
      <div>
        <span style="text-align: center; font-size: 10px; color: grey;">设置当前主播使用虚拟币提现时的手续费</span>
      </div>
    </a-form-item>

    <!-- Custom Footer -->
    <div class="custom-footer">
      <a-button style="width: 120px; margin-right: 30px;" @click="handleCancel">取消</a-button>
      <a-button style="width: 120px;" type="primary" @click="handleOk">确定</a-button>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';
import CustomSpin from '@/components/Form/Custom/CustomSpin.vue';

// Props
const props = defineProps({
  isModalVisible: {
    type: Boolean,
    default: false,
  },
});

// Emits
const emit = defineEmits(['update:isModalVisible']);

// State Variables
const rewardType = ref('diamond');
const bank_card_fee = ref(0);
const virtual_currency_fee = ref(0);

// Methods
const updateVisible = (visible: boolean) => {
  if (typeof visible === 'boolean') {
    emit('update:isModalVisible', visible);
  } else {
    console.error('Invalid value for isModalVisible:', visible);
  }
};

const handleOk = () => {
  console.log('OK Clicked', rewardType.value);
  updateVisible(false);
};

const handleCancel = () => {
  console.log('Cancel Clicked');
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
