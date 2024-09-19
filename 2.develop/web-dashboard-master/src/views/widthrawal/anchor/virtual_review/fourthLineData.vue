<template>
  <a-card bordered class="custom-card" :style="{background: 'gray'}">
    <a-row :gutter="16" type="flex" justify="space-between">
      <!-- Vertical Text -->    
      <a-col :style="{ marginLeft:'5%', display: 'flex', justifyContent: 'center', alignItems: 'center' }">
        <span class="label" :style="{ writingMode: 'vertical-rl', textAlign: 'center', fontSize: '16px', fontWeight: 'bold' }">
          打 款 信 息</span>
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
            <span style="font-weight: bold;">提现虚拟币:</span> {{ withdrawalCurrency }}
          </a-col>
        </a-row>

        <a-row style="margin-bottom: 5px;">
          <a-col :span="20" style="white-space: nowrap;">
            <span style="font-weight: bold;">提现地址:</span> {{ withdrawalAddress }}
          </a-col>
        </a-row>
      </a-col>

      <!-- Second Column -->
      <a-col :span="8" class="button-column" :style="{marginLeft :'30px', marginRight :'60px' }">
        <!-- Rows inside Second Column -->
        <a-row style="margin-bottom: 5px;">
          <a-col :span="18" style="white-space: nowrap;">
            <span style="font-weight: bold;">虚拟币网络:</span> {{ cryptoNetwork }}
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
export default {
  data() {
    return {
      withdrawalCurrency: '', // The virtual currency used for the withdrawal
      withdrawalAddress: '', // The address where the withdrawal will be sent
      cryptoNetwork: '', // The cryptocurrency network used
    };
  },
  methods: {
    copyText(text) {
      navigator.clipboard.writeText(text).then(() => {
        this.$message.success('已成功复制到剪贴板。');
      }).catch(() => {
        this.$message.error('复制到剪贴板失败，请重试。');
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
