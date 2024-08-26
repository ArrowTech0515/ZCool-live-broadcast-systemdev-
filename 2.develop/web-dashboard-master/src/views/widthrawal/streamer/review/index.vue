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
          <span style="font-weight: bold; color: #1890ff; font-size: 14px;">提现状态: 提现中</span>
        </a-col>
        
        <!-- Right-aligned Buttons -->
        <a-col :span="12" style="text-align: right;">
          <a-button  style="width: 100px; color: #1890ff; margin-right: 8px;" @click="onLock">锁定</a-button>
          <a-button  style="width: 100px;color: red; margin-right: 8px;" @click="onReject">拒绝</a-button>
          <a-button  style="width: 100px;" @click="onReview">审核打款</a-button>
        </a-col>
      </a-row>

    </div>
  </a-card>

  <reviewDialog 
        :isModalVisible="isModalVisible3"
      @update:is-modal-visible="val => isModalVisible3 = val" />

  <rejectDialog 
        :isModalVisible="isModalVisible2"
      @update:is-modal-visible="val => isModalVisible2 = val" />

  <lockDialog 
        :isModalVisible="isModalVisible"
      @update:is-modal-visible="val => isModalVisible = val" />
</template>
  
<script>
import firstLineData from './firstLineData.vue';
import secondLineData from './secondLineData.vue';
import thirdLineData from './thirdLineData.vue';
import fourthLineData from './fourthLineData.vue';
import reviewDialog from './reviewDialog.vue';
import rejectDialog from './rejectDialog.vue';
import lockDialog from './lockDialog.vue';

export default {
  components: {
    firstLineData,
    secondLineData,
    thirdLineData,
    fourthLineData,
    reviewDialog,
    rejectDialog,
    lockDialog
  },

  name: 'WithdrawDetails',

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
      isModalVisible : false,
      isModalVisible2 : false,
      isModalVisible3 : false,
    }
  },
  methods: {
    onConfirm() {
      // Logic to handle confirm action
      this.$emit('confirm');
    },
    onReject() {
      // Logic to handle reject action
      //this.$emit('reject');
    },
    handleBack() {
      // Handle the back action here
      // For example, navigate to the previous page:
      this.$emit('back'); // Emit the back event to the parent component
    },
    onReview() {
      console.log("onReview : " + this.isModalVisible3.value)
      this.isModalVisible3  = true
    },
    onReject() {
      console.log("onReject : " + this.isModalVisible2.value)
      this.isModalVisible2  = true
    },
    onLock() {
      this.isModalVisible  = true

    }
  },
}
</script>

<style scoped>
</style>
  