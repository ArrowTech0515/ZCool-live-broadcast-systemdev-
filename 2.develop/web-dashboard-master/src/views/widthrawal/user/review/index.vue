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
      <firstLineData style="margin-bottom: 20px;"></firstLineData>
      <secondLineData style="margin-bottom: 20px;"></secondLineData>
      <thirdLineData style="margin-bottom: 20px;"></thirdLineData>
      <fourthLineData style="margin-bottom: 20px;"></fourthLineData>

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
          <a-button v-if="! isLocked" style="width: 100px; color: #1890ff; margin-right: 8px;" @click="onLock">锁定</a-button>
          <a-button v-else style="width: 100px; color: #1890ff; margin-right: 8px;" disabled>已锁定</a-button>
          <a-button v-if="! isRejected" style="width: 100px; color: red; margin-right: 8px;" @click="onReject">拒绝</a-button>
          <a-button v-else style="width: 100px; color: red; margin-right: 8px;" @click="onReject" disabled>已拒绝</a-button>
          <a-button  style="width: 100px;" @click="onReview">审核打款</a-button>
        </a-col>
      </a-row>
      <!-- Row with the Textarea -->
      <a-row v-if="paymentInfo === 4" style="margin-top: 10px;">
        <a-col :span="24">
          <a-form-item label="拒绝理由">
            <a-textarea
              v-model:value="remarks"
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
      @update:is-modal-visible="val => isReviewModalVisible = val" />

  <RejectDialog 
        :isModalVisible="isRejectModalVisible"
      @update:is-modal-visible="val => isRejectModalVisible = val"
      @emit_success="onRejected" />

  <LockDialog 
    :isModalVisible="isLockModalVisible"
    sTitle="锁定提示"
    sText1="是否锁定当前体现订单"
    sText2="锁定后需要管理员/部门负责人/锁定人方可解锁操作"
    @update:is-modal-visible="val => isLockModalVisible = val"
    @emit_success="onLocked" />
</template>
  
<script>
import firstLineData from './firstLineData.vue'
import secondLineData from './secondLineData.vue'
import thirdLineData from './thirdLineData.vue'
import fourthLineData from './fourthLineData.vue'
import ReviewDialog from '@/components/Form/ReviewDialog.vue'
import LockDialog from '@/components/Form/LockDialog.vue'
import RejectDialog from '@/components/Form/RejectDialog.vue'

export default {
  components: {
    firstLineData,
    secondLineData,
    thirdLineData,
    fourthLineData,
    ReviewDialog,
    RejectDialog,
    LockDialog
  },

  props: {
    basicData: {
      type: Object,
      required: true
    },
    currentWithdraw: {
      type: Object,
      required: true
    },
    historyWithdraw: {
      type: Object,
      required: true
    },
    paymentInfo: {
      type: Object,
      required: true
    },
    withdrawStatus: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isLockModalVisible : false,
      isRejectModalVisible : false,
      isReviewModalVisible : false,

      isLocked : false,
      isRejected : false,
    }
  },
  methods: {
    onConfirm() {
      // Logic to handle confirm action
      this.$emit('confirm')
    },
    handleBack() {
      // Handle the back action here
      // For example, navigate to the previous page:
      this.$emit('back') // Emit the back event to the parent component
    },
    onReview() {
      console.log("onReview : " + this.isReviewModalVisible.value)
      this.isReviewModalVisible  = true
    },
    onReject() {
      console.log("onReject : " + this.isRejectModalVisible.value)
      this.isRejectModalVisible  = true
    },
    onLock() {
      this.isLockModalVisible  = true

    },
    onLocked() {
      message.success({
        content: `锁定成功`,
        duration: 1, // Duration in seconds
      })
      // Show unLock button
      this.isLocked = true
    },
    onRejected() {
      message.success({
        content: `解锁成功`,
        duration: 1, // Duration in seconds
      })
      // Show unLock button
      this.isRejected = true
    }
  },
}
</script>

<style scoped>
</style>
  