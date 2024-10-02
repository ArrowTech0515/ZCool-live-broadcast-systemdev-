<template>
  <a-card bordered class="custom-card" :style="{background: 'gray'}">
    <a-row :gutter="16" type="flex" justify="space-between">
      <!-- Vertical Text -->  
      <a-col :style="{ marginLeft:'5%', display: 'flex', justifyContent: 'center', alignItems: 'center' }">
        <span class="label" :style="{ writingMode: 'vertical-rl', textAlign: 'center', fontSize: '16px', fontWeight: 'bold' }">
          本 次 提 现</span>
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
            <span style="font-weight: bold;">收款货币:</span> {{ currency }}
          </a-col>
        </a-row>

        <a-row style="margin-bottom: 5px;">
          <a-col :span="20" style="white-space: nowrap;">
            <span style="font-weight: bold;">提现金额:</span> {{ withdrawalAmount }}
          </a-col>
        </a-row>

        <a-row style="margin-bottom: 5px;">
          <a-col :span="20" style="white-space: nowrap;">
            <span style="font-weight: bold;">预计到账金额:</span> {{ estimatedArrivalAmount }} ({{ currency }})
          </a-col>
        </a-row>

        <a-row style="margin-bottom: 5px;">
          <a-col :span="18" style="white-space: nowrap;">
            <span style="font-weight: bold;">提现银行:</span> {{ withdrawalBank }}
          </a-col>
          <a-col :span="6" style="text-align: right;">
            <span 
            style="font-size: 12px; text-decoration: underline; color: blue; cursor: pointer;"
                @click="copyText(withdrawalBank)">
                复制</span>
          </a-col>
        </a-row>

        <a-row style="margin-bottom: 5px;">
          <a-col :span="18" style="white-space: nowrap;">
            <span style="font-weight: bold;">收款姓名:</span> {{ recipientName }}
          </a-col>
          <a-col :span="6" style="text-align: right;">
            <span 
            style="font-size: 12px; text-decoration: underline; color: blue; cursor: pointer;"
                @click="copyText(recipientName)">
                复制</span>
          </a-col>
        </a-row>

        <a-row style="margin-bottom: 5px;">
          <a-col :span="24" style="white-space: nowrap;">
            <span style="font-weight: bold;">申请时间:</span> {{ applicationTime }}
          </a-col>
        </a-row>
      </a-col>

      <!-- Second Column -->
      <a-col :span="8" class="button-column" :style="{marginLeft :'30px', marginRight :'60px' }">
        <!-- Rows inside Second Column -->
        <a-row style="margin-bottom: 5px;">
          <a-col :span="18" style="white-space: nowrap;">
            <span style="font-weight: bold;">手续费:</span> {{ fees }}
          </a-col>
        </a-row>

        <a-row style="margin-bottom: 5px;">
          <a-col :span="18" style="white-space: nowrap;">
            <span style="font-weight: bold;">今日汇率:</span> {{ exchangeRate }} (人民币: {{ currency }})
          </a-col>
        </a-row>

        <a-row style="margin-bottom: 5px;">
          <a-col :span="18" style="white-space: nowrap;">
            <span style="font-weight: bold;">账户余额:</span> {{ accountBalance }} (人民币)
          </a-col>
        </a-row>

        <a-row style="margin-bottom: 5px;">
          <a-col :span="18" style="white-space: nowrap;">
            <span style="font-weight: bold;">银行卡号:</span> {{ bankCardNumber }}
          </a-col>
          <a-col :span="6" style="text-align: right;">
            <span 
            style="font-size: 12px; text-decoration: underline; color: blue; cursor: pointer;"
                @click="copyText(bankCardNumber)">
                复制</span>
          </a-col>
        </a-row>

        <a-row style="margin-bottom: 5px;">
          <a-col :span="18" style="white-space: nowrap;">
            <span style="font-weight: bold;">提现订单号:</span> {{ withdrawalOrderNumber }}
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
      currency: '印尼盾',
      withdrawalAmount: '1000',
      estimatedArrivalAmount: '1000000',
      withdrawalBank: '印尼国家发展银行',
      recipientName: '张三',
      applicationTime: '2022-12-12 12:21:21',

      fees: '24',
      exchangeRate: '1:1000',
      accountBalance: '1000',
      bankCardNumber: '23122324324324324324',
      withdrawalOrderNumber: '42384242348234'
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
