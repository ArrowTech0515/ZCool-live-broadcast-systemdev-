<template>
  <a-modal
    title="添加奖励"
    :open="isModalVisible"
    :maskClosable="false"
    :keyboard="false"
    :footer="null"
    @update:open="updateVisible"
  >
    <!-- Conditionally render the CustomSpin component if '钻石奖励' is selected -->
    <a-form-item label="奖励钻石">
      <CustomSpin v-model:nValue="diamondCount" style="width: 100%;" />
      <div>
        <span style="text-align: center; font-size: 10px; color: grey;">设置当前主播使用银行卡提现时的手续费</span>
      </div>
    </a-form-item>

    <!-- Conditionally render the CustomSpin component if '钻石奖励' is selected -->
    <a-form-item label="奖励余额">
      <CustomSpin v-model:nValue="balanceCount" style="width: 100%;" />
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
const diamondCount = ref(0);
const balanceCount = ref(0);
const mountOptions = ref([
  { name: '绚丽机车', key: '1' },
  { name: '跑车', key: '2' },
  { name: '飞机', key: '3' },
  { name: '神兽麒麟', key: '4' },
]);
const giftOptions = ref([
  { name: '鲜花', value: 1, key: '1' },
  { name: '灯牌', value: 1, key: '2' },
  { name: '爱心', value: 1, key: '3' },
  { name: '城堡', value: 10000, key: '4' },
  { name: '蓝色妖姬', value: 666, key: '5' },
]);

const selectedMount = ref(null);
const selectedGifts = ref([]);

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

const onMountSelect = (key: string) => {
  selectedMount.value = key;
};

const onGiftSelect = (key: string) => {
  if (selectedGifts.value.includes(key)) {
    selectedGifts.value = selectedGifts.value.filter((k) => k !== key);
  } else {
    selectedGifts.value.push(key);
  }
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
