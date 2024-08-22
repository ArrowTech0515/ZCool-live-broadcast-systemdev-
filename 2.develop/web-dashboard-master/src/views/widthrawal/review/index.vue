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
      <a-row>
        <a-col :span="24">
          <a-card title="基础数据" bordered="false" style="margin-bottom: 16px;">
            <p>主播昵称: {{ basicData.nickname }}</p>
            <p>登录设备号: {{ basicData.deviceId }} <a href="#">详情</a></p>
            <p>注册时间: {{ basicData.registrationTime }}</p>
            <p>房间号: {{ basicData.roomId }} <a href="#">复制</a></p>
            <p>登录IP: {{ basicData.loginIP }} <a href="#">详情</a></p>
            <p>最近登录时间: {{ basicData.lastLoginTime }}</p>
          </a-card>
        </a-col>
      </a-row>
      
      <a-row>
        <a-col :span="24">
          <a-card title="本次提现" bordered="false" style="margin-bottom: 16px;">
            <p>提现虚拟币: {{ currentWithdraw.currency }}</p>
            <p>提现金额: {{ currentWithdraw.amount }} (USDT)</p>
            <p>提现地址: {{ currentWithdraw.address }} <a href="#">复制</a></p>
            <p>提现订单号: {{ currentWithdraw.orderId }}</p>
            <p>手续费: {{ currentWithdraw.fee }}</p>
            <p>虚拟币网络: {{ currentWithdraw.network }} <a href="#">复制</a></p>
            <p>预计到账金额: {{ currentWithdraw.expectedAmount }} (USDT)</p>
            <p>申请时间: {{ currentWithdraw.applicationTime }}</p>
          </a-card>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="24">
          <a-card title="历史提现" bordered="false" style="margin-bottom: 16px;">
            <p>提现次数: {{ historyWithdraw.count }} <a href="#">查看</a></p>
            <p>总提现虚拟币: {{ historyWithdraw.totalAmount }} (USDT)</p>
            <p>总提现金额: {{ historyWithdraw.totalInRMB }} (人民币)</p>
          </a-card>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="24">
          <a-card title="打款信息" bordered="false">
            <p>提现虚拟币: {{ paymentInfo.currency }}</p>
            <p>提现地址: {{ paymentInfo.address }}</p>
            <p>虚拟币网络: {{ paymentInfo.network }}</p>
          </a-card>
        </a-col>
      </a-row>

      <div style="margin-top: 16px; text-align: center">
        <p>提现状态: {{ withdrawStatus }}</p>
        <a-button type="primary" @click="onConfirm">确定</a-button>
        <a-button type="danger" style="margin-left: 16px" @click="onReject">拒绝</a-button>
      </div>
    </div>
    </a-card>
</template>
  
<script>
export default {
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
  