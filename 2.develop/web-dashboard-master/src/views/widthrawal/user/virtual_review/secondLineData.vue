<template>
  <a-card bordered class="custom-card" :style="{background: 'rgb(242,242,242)'}">
    <a-row :gutter="16" type="flex" justify="space-between">
      <!-- Vertical Text -->  
      <a-col :style="{ marginLeft:'5%', display: 'flex', justifyContent: 'center', alignItems: 'center' }">
        <span class="label" :style="{ writingMode: 'vertical-rl', textAlign: 'center', fontSize: '16px', fontWeight: 'bold' }">
          本 次 提 现</span>
      </a-col>
      
      <!-- Separator -->
      <a-col>
        <a-divider type="vertical" :style="{ background: 'gray', height: '100%' }" />
      </a-col>

      <!-- First Column -->
      <a-col :span="8" class="button-column">
        <!-- Rows inside First Column -->
        <a-row style="margin-bottom: 5px;">
          <a-col :span="20" style="white-space: nowrap;">
            <span style="font-weight: bold;">提现虚拟币:</span> USDT-HJDSH32
          </a-col>
        </a-row>

        <a-row style="margin-bottom: 5px;">
          <a-col :span="20" style="white-space: nowrap;">
            <span style="font-weight: bold;">提现金额:</span> 1000 (USDT)
          </a-col>
        </a-row>

        <a-row style="margin-bottom: 5px;">
          <a-col :span="18" style="white-space: nowrap;">
            <span style="font-weight: bold;">提现地址:</span> XXXX地址
          </a-col>
          <a-col :span="6" style="text-align: right;">
            <span 
            style="font-size: 12px; text-decoration: underline; color: #1890ff; cursor: pointer;"
                @click="copyText('XXXX地址')">
                复制</span>
          </a-col>
        </a-row>

        <a-row style="margin-bottom: 5px;">
          <a-col :span="24" style="white-space: nowrap;">
            <span style="font-weight: bold;">提现订单号:</span> 42384242348234
          </a-col>
        </a-row>
      </a-col>

      <!-- Second Column -->
      <a-col :span="8" class="button-column" :style="{marginLeft :'30px', marginRight :'60px' }">
        <!-- Rows inside Second Column -->
        <a-row style="margin-bottom: 5px;">
          <a-col :span="18" style="white-space: nowrap;">
            <span style="font-weight: bold;">手续费:</span> 24
          </a-col>
        </a-row>

        <a-row style="margin-bottom: 5px;">
          <a-col :span="18" style="white-space: nowrap;">
            <span style="font-weight: bold;">虚拟币网络:</span> XXXXXXXXXX网络
          </a-col>
          <a-col :span="6" style="text-align: right;">
            <span 
            style="font-size: 12px; text-decoration: underline; color: #1890ff; cursor: pointer;"
                @click="copyText('XXXXXXXXXX网络')">
                复制</span>
          </a-col>
        </a-row>

        <a-row style="margin-bottom: 5px;">
          <a-col :span="18" style="white-space: nowrap;">
            <span style="font-weight: bold;">预计到账金额:</span> 1000000 (USDT)
          </a-col>
        </a-row>

        <a-row style="margin-bottom: 5px;">
          <a-col :span="24" style="white-space: nowrap;">
            <span style="font-weight: bold;">申请时间:</span> 2022-12-12 12:21:21
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
import { message } from 'ant-design-vue';

export default {
  data() {
    return {
      currency: 'USDT-HJDSH32',
      withdrawalAmount: '1000 (USDT)',
      withdrawalAddress: 'XXXX地址',
      withdrawalOrderNumber: '42384242348234',
      fees: '24',
      network: 'XXXXXXXXXX网络',
      estimatedArrivalAmount: '1000000 (USDT)',
      applicationTime: '2022-12-12 12:21:21',
    };
  },
  methods: {
    copyText(text) {
      navigator.clipboard.writeText(text).then(() => {
        message.success({
          content: `已成功复制到剪贴板。`,
          duration: 1, // Duration in seconds
        });
      }).catch(() => {
        message.error({
          content: '复制到剪贴板失败，请重试。',
          duration: 1, // Duration in seconds
        });
      });
    },
  }
};
</script>

<style scoped>
.custom-card {
  background: rgb(242, 242, 242);
}

.label {
  font-size: 16px;
  font-weight: bold;
  writing-mode: vertical-rl;
  text-align: center;
}
</style>
