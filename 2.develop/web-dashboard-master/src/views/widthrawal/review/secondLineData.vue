<template>
  <a-card bordered class="custom-card" :style="{background: 'rgb(242,242,242)'}">
    <a-row :gutter="16" type="flex" justify="space-between">
      <!-- Vertical Text -->
      <a-col :style="{ width: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }">
        <span class="label" :style="{ writingMode: 'vertical-rl', textAlign: 'center', fontSize: '16px', fontWeight: 'bold' }">本次提现</span>
      </a-col>
      
      <!-- Separator -->
      <a-col :style="{ marginRight:'30px', width: '1px', display: 'flex', justifyContent: 'center', alignItems: 'center' }">
        <a-divider type="vertical" :style="{ background: 'black', height: '100%' }" />
      </a-col>
    
      <!-- First Column -->
      <a-col  :span="10"  class="button-column">
        <!-- Rows inside First Column -->
        <a-row style="margin-bottom: 5px;">
          <a-col :span="20" style="white-space: nowrap;">
            收款货币: {{ currency }}
          </a-col>
        </a-row>

        <a-row style="margin-bottom: 5px;">
          <a-col :span="20" style="white-space: nowrap;">
            提现金额: {{ withdrawalAmount }}
          </a-col>
        </a-row>

        <a-row style="margin-bottom: 5px;">
          <a-col :span="20" style="white-space: nowrap;">
            预计到账金额: {{ estimatedArrivalAmount }} ({{ currency }})
          </a-col>
        </a-row>

        <a-row style="margin-bottom: 5px;">
          <a-col :span="18" style="white-space: nowrap;">
            提现银行: {{ withdrawalBank }}
          </a-col>
          <a-col :span="6" style="text-align: right;">
            <span 
            style="font-size: 12px; text-decoration: underline; color: #1890ff; cursor: pointer; "
                @click="copyText(withdrawalBank)">
                复制</span>
          </a-col>
        </a-row>

        <a-row style="margin-bottom: 5px;">
          <a-col :span="18" style="white-space: nowrap;">
            收款姓名: {{ recipientName }}
          </a-col>
          <a-col :span="6" style="text-align: right;">
            <span 
            style="font-size: 12px; text-decoration: underline; color: #1890ff; cursor: pointer; "
                @click="copyText(recipientName)">
                复制</span>
          </a-col>
        </a-row>

        <a-row style="margin-bottom: 5px;">
          <a-col :span="24" style="white-space: nowrap;">
            申请时间: {{ applicationTime }}
          </a-col>
        </a-row>
      </a-col>

      <!-- Second Column -->
      <a-col  :span="10"  class="button-column" :style="{marginLeft :'30px', marginRight :'60px' }">
        <!-- Rows inside Second Column -->
        <a-row style="margin-bottom: 5px;">
          <a-col :span="18" style="white-space: nowrap;">
            手续费: {{ fees }}
          </a-col>
        </a-row>

        <a-row style="margin-bottom: 5px;">
          <a-col :span="18" style="white-space: nowrap;">
            今日汇率: {{ exchangeRate }} (人民币: {{ currency }})
          </a-col>
        </a-row>

        <a-row style="margin-bottom: 5px;">
          <a-col :span="18" style="white-space: nowrap;">
            账户余额: {{ accountBalance }} (人民币)
          </a-col>
        </a-row>

        <a-row style="margin-bottom: 5px;">
          <a-col :span="18" style="white-space: nowrap;">
            银行卡号: {{ bankCardNumber }}
          </a-col>
          <a-col :span="6" style="text-align: right;">
            <span 
            style="font-size: 12px; text-decoration: underline; color: #1890ff; cursor: pointer; "
                @click="copyText(bankCardNumber)">
                复制</span>
          </a-col>
        </a-row>

        <a-row style="margin-bottom: 5px;">
          <a-col :span="18" style="white-space: nowrap;">
            提现订单号: {{ withdrawalOrderNumber }}
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
      currency: '印尼盾',
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

  