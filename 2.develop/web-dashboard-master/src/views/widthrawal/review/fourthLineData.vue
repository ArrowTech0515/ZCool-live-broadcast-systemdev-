<template>
  <a-card bordered class="custom-card" :style="{background: 'rgb(242,242,242)'}">
    <a-row :gutter="16" type="flex" justify="space-between">
      <!-- Vertical Text -->    
      <a-col :style="{ marginLeft:'5%', display: 'flex', justifyContent: 'center', alignItems: 'center' }">
        <span class="label" :style="{ writingMode: 'vertical-rl', textAlign: 'center', fontSize: '16px', fontWeight: 'bold' }">
          打款信息</span>
      </a-col>
      
      <!-- Separator -->
      <a-col >
        <a-divider type="vertical" :style="{ background: 'gray', height: '100%' }" />
      </a-col>


      <!-- First Column -->
      <a-col  :span="8"  class="button-column">
        <!-- Rows inside First Column -->
        <a-row style="margin-bottom: 5px;">
          <a-col :span="20" style="white-space: nowrap;">
            打款银行: {{ currency }}
          </a-col>
        </a-row>

        <a-row style="margin-bottom: 5px;">
          <a-col :span="20" style="white-space: nowrap;">
            银行姓名: {{ withdrawalAmount }}
          </a-col>
        </a-row>

        <a-row style="margin-bottom: 5px;">
          <a-col :span="20" style="white-space: nowrap;">
            操作时间: {{ estimatedArrivalAmount }}
          </a-col>
        </a-row>
      </a-col>

      <!-- Second Column -->
      <a-col  :span="8"  class="button-column" :style="{marginLeft :'30px', marginRight :'60px' }">
        <!-- Rows inside Second Column -->
        <a-row style="margin-bottom: 5px;">
          <a-col :span="18" style="white-space: nowrap;">
            银行卡号: {{ fees }}
          </a-col>
        </a-row>

        <a-row style="margin-bottom: 5px;">
          <a-col :span="18" style="white-space: nowrap;">
            打款金额: {{ exchangeRate }} 
          </a-col>
        </a-row>

        <a-row style="margin-bottom: 5px;">
          <a-col :span="18" style="white-space: nowrap;">
            操作账号: {{ accountBalance }}
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
      withdrawalAmount: '',
      estimatedArrivalAmount: '',
      withdrawalBank: '',

      fees: '',
      exchangeRate: '',
      accountBalance: '',
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

  