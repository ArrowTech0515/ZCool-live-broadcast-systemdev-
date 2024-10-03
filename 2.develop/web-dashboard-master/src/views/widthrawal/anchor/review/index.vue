<template>
  <a-card>
    <template #title>
      <div style="display: flex; align-items: center;">
        <a-button
          type="link"
          style="font-size: 18px; margin-right: 8px;"
          @click="handleBack"
        >
          <span style="font-size: 20px; font-weight: bold; margin-left: 8px;">&lt;</span>
        </a-button>
        <div style="flex-grow: 1; text-align: center;">
          <span style="font-size: 20px; font-weight: bold;">提现审核</span>
        </div>
      </div>
    </template>

    <div>
      <firstLineData @emit_details="onDetails" style="margin-bottom: 20px;"></firstLineData>
      <secondLineData @emit_details="onDetails" style="margin-bottom: 20px;"></secondLineData>
      <thirdLineData @emit_details="onDetails" style="margin-bottom: 20px;"></thirdLineData>
      <fourthLineData @emit_details="onDetails" style="margin-bottom: 20px;"></fourthLineData>

      <a-row type="flex" justify="space-between" align="middle">
        <!-- Left-aligned Text Label -->
        <a-col :span="12">
          <span 
            :style="{ fontWeight: 'bold', color: ENUM.withdrawal_colors[withdrawStatus], fontSize: '14px' }"
          >
            提现状态: {{ ENUM.withdrawal_status[withdrawStatus] }}
          </span>
        </a-col>
        <!-- Right-aligned Buttons -->
        <a-col v-if="paymentInfo !== 4" :span="12" style="text-align: right;">
          <a-button v-if="!isLocked" style="width: 100px; color: #1890ff; margin-right: 8px;" @click="onLock">锁定</a-button>
          <a-button v-else style="width: 100px; color: #1890ff; margin-right: 8px;" disabled>已锁定</a-button>
          <a-button v-if="!isRejected" style="width: 100px; color: red; margin-right: 8px;" @click="onReject">拒绝</a-button>
          <a-button v-else style="width: 100px; color: red; margin-right: 8px;" disabled>已拒绝</a-button>
          <a-button style="width: 100px;" @click="onReview">审核打款</a-button>
        </a-col>
      </a-row>
      <!-- Row with the Textarea -->
      <a-row v-if="paymentInfo === 4" style="margin-top: 10px;">
        <a-col :span="24">
          <a-form-item label="拒绝理由">
            <a-textarea
              v-model="remarks"
              placeholder="理由理由理由理由理由理由理由理由"
              :auto-size="{ minRows: 3, maxRows: 5 }"
              style="width: 100%;"
              disabled
            />
          </a-form-item>
        </a-col>
      </a-row>
    </div>
  </a-card>

  <ReviewDialog 
    :isModalVisible="isReviewModalVisible"
    @update:is-modal-visible="val => isReviewModalVisible = val" 
  />

  <RejectDialog 
    :isModalVisible="isRejectModalVisible"
    @update:is-modal-visible="val => isRejectModalVisible = val"
    @emit_success="onRejected" 
  />

  <LockDialog 
    :isModalVisible="isLockModalVisible"
    sTitle="锁定提示"
    sText1="是否锁定当前体现订单"
    sText2="锁定后需要管理员/部门负责人/锁定人方可解锁操作"
    @update:is-modal-visible="val => isLockModalVisible = val"
    @emit_success="onLocked" 
  />

  <a-modal
    v-model:open="isModalVisible1"
    :title="null"
    @cancel="handleCancel"
    :footer="null"
  >
    <div style="margin-top: 30px;" v-if="isModalVisible1 === 1">
      <div v-for="device in loginDevices" :key="device.device">
        <div style="border: 1px solid #d9d9d9; padding: 8px; margin-bottom: 8px; border-radius: 4px;">
          登录设备: {{ device.device }}  |  登录账号：{{ device.account }}  |  登录昵称：{{ device.name }}
        </div>
      </div>
    </div>
    <div style="margin-top: 30px;" v-else-if="isModalVisible1 === 2">
      <div v-for="IP in loginIPs" :key="IP.IP">
        <div style="border: 1px solid #d9d9d9; padding: 8px; margin-bottom: 8px; border-radius: 4px;">
          登录IP: {{ IP.IP }}  |  {{ IP.time }}
        </div>
      </div>
    </div>
    <div style="margin-top: 30px;" v-else-if="isModalVisible1 === 3">
      <div v-for="w in withdrawals" :key="w.Withdrawal">
        <div style="border: 1px solid #d9d9d9; padding: 8px; margin-bottom: 8px; border-radius: 4px;">
          提现金额: {{ w.Withdrawal }}  |  {{ w.time }}
        </div>
      </div>
    </div>
  </a-modal>
</template>

<script setup lang="jsx">
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import firstLineData from './firstLineData.vue';
import secondLineData from './secondLineData.vue';
import thirdLineData from './thirdLineData.vue';
import fourthLineData from './fourthLineData.vue';
import ReviewDialog from '@/components/Form/ReviewDialog.vue';
import LockDialog from '@/components/Form/LockDialog.vue';
import RejectDialog from '@/components/Form/RejectDialog.vue';

const props = defineProps({
  basicData: {
    type: Object,
    required: true,
  },
  currentWithdraw: {
    type: Object,
    required: true,
  },
  historyWithdraw: {
    type: Object,
    required: true,
  },
  paymentInfo: {
    type: Object,
    required: true,
  },
  withdrawStatus: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['confirm', 'back']);

const isLockModalVisible = ref(false);
const isRejectModalVisible = ref(false);
const isReviewModalVisible = ref(false);
const isModalVisible1 = ref(0); // 0:hide, 1:device, 2:IP

const isLocked = ref(false);
const isRejected = ref(false);

const remarks = ref('');
const loginDevices = ref([
  { device: 'iPhone 13', account: 'dnmds', name: '的痕迹' },
  { device: 'iPhone 15', account: 'dnmds', name: '的痕迹' },
  { device: 'iPhone 19', account: 'dnmds', name: '的痕迹' },
  { device: 'iPhone 8', account: 'dnmds', name: '的痕迹' },
])
const loginIPs = ref([
  { IP: '124.321.123.123', time: '2022-12-12 21:21:21' },
  { IP: '132.143.65.223', time: '2022-12-12 21:21:21' },
  { IP: '132.143.65.224', time: '2022-12-12 21:21:21' },
  { IP: '132.143.65.225', time: '2022-12-12 21:21:21' },
])
const withdrawals = ref([
  { Withdrawal: '124.321.123.123', time: '2022-12-12 21:21:21' },
  { Withdrawal: '132.143.65.223', time: '2022-12-12 21:21:21' },
  { Withdrawal: '132.143.65.224', time: '2022-12-12 21:21:21' },
  { Withdrawal: '132.143.65.225', time: '2022-12-12 21:21:21' },
])

function onDetails(type) {
  if(type === 'Device')
    isModalVisible1.value = 1 // Open the modal
  else if(type === 'IP')
    isModalVisible1.value = 2 // Open the modal
  else
    isModalVisible1.value = 3
}

function handleCancel() {
  isModalVisible1.value = 0; // Close the modal
}

function onConfirm() {
  // Logic to handle confirm action
  emit('confirm');
}

function handleBack() {
  // Handle the back action here
  // For example, navigate to the previous page:
  emit('back'); // Emit the back event to the parent component
}

function onReview() {
  console.log('onReview : ' + isReviewModalVisible.value);
  isReviewModalVisible.value = true;
}

function onReject() {
  console.log('onReject : ' + isRejectModalVisible.value);
  isRejectModalVisible.value = true;
}

function onLock() {
  isLockModalVisible.value = true;
}

function onLocked() {
  message.success({
    content: `锁定成功`,
    duration: 1, // Duration in seconds
  });
  // Show unLock button
  isLocked.value = true;
}

function onRejected() {
  message.success({
    content: `解锁成功`,
    duration: 1, // Duration in seconds
  });
  // Show unLock button
  isRejected.value = true;
}
</script>

<style scoped>
</style>
