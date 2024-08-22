<template>
  <a-card>
    <template #title>
      <div style="display: flex; justify-content: center; align-items: center;">
        <a-button
          type="link"
          style="font-size: 18px; margin-right: 8px;"
          @click="handleBack"
        >
          <span style="font-size: 20px; font-weight: bold; margin-left: 8px;">&lt;</span>
        </a-button>
        <span style="font-size: 20px; text-align: center; font-weight: bold; margin-left: 8px;">添加策略</span>
      </div>
    </template>

    <div>
      <firstLineData></firstLineData>
    </div>
  </a-card>
</template>
  
<script>
import firstLineData from './firstLineData.vue';

export default {
  components: {
    firstLineData,
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
  methods: {
    onConfirm() {
      // Logic to handle confirm action
      this.$emit('confirm');
    },
    onReject() {
      // Logic to handle reject action
      this.$emit('reject');
    },
    handleBack() {
      // Handle the back action here
      // For example, navigate to the previous page:
      this.$emit('back'); // Emit the back event to the parent component
    },
  },
}
</script>

<style scoped>
</style>
  