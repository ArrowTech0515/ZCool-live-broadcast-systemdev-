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
        <a-divider type="vertical" :style="{ background: 'black', height: '100%' }" />
      </a-col>

      <!-- First Column -->
      <a-col :span="8" class="button-column">
        <!-- Rows inside First Column -->
        <a-row style="margin-bottom: 5px;">
          <a-col :span="20" style="white-space: nowrap;">
            <span style="font-weight: bold;">打款银行:</span> {{ withdrawalBank }}
          </a-col>
        </a-row>

        <a-row style="margin-bottom: 5px;">
          <a-col :span="20" style="white-space: nowrap;">
            <span style="font-weight: bold;">打款金额:</span> {{ transferAmount }}
          </a-col>
        </a-row>

        <a-row style="margin-bottom: 5px;">
          <a-col :span="20" style="white-space: nowrap;">
            <span style="font-weight: bold;">操作账号:</span> {{ operationAccount }}
          </a-col>
        </a-row>
      </a-col>

      <!-- Second Column -->
      <a-col :span="8" class="button-column" :style="{marginLeft :'30px', marginRight :'60px' }">
        <!-- Rows inside Second Column -->
        <a-row style="margin-bottom: 5px;">
          <a-col :span="18" style="white-space: nowrap;">
            <span style="font-weight: bold;">银行卡号:</span> {{ bankCardNumber }}
          </a-col>
        </a-row>

        <a-row style="margin-bottom: 5px;">
          <a-col :span="18" style="white-space: nowrap;">
            <span style="font-weight: bold;">操作时间:</span> {{ operationTime }}
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
      withdrawalBank: '', // Bank where the money is withdrawn
      transferAmount: '', // Amount of money transferred
      operationAccount: '', // Account from which the operation is made
      bankCardNumber: '', // Bank card number
      operationTime: '', // Time of the operation
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
