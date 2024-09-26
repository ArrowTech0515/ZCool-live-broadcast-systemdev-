<template>
 <a-card>
  <div style="display: flex; align-items: center; white-space: nowrap; margin-bottom: 2%;">
    <div style="flex-grow: 1; text-align: left;">
      <span style="font-size: 20px; font-weight: bold;">打码设置</span>
    </div>
  </div>

  <!-- Input Rows with help texts -->
  <a-row :gutter="16">
    <a-col :span="2" style="text-align: right;">APPID：</a-col>
    <a-col :span="8">
      <a-form-item help="*正数为充值, 负数为扣款">
        <a-input 
          v-model:value="form.app_id" 
          :placeholder="form.placeholders.app_id" 
          style="text-align: center;" 
        />
      </a-form-item>
    </a-col>
    <a-col style="display: flex; align-items: flex-start;"> <!-- Aligns buttons to the top -->
      <a-button style="margin-left: 10px;" type="primary" @click="handleQuery"><SearchOutlined />查询</a-button>
      <a-button style="margin-left: 16px;" type="default" @click="handleReset"><ReloadOutlined />重置</a-button>
    </a-col>
  </a-row>

  <a-row :gutter="16">
    <a-col :span="2" style="text-align: right;">充值金额：</a-col>
    <a-col :span="8">
      <a-form-item help="*正数为充值, 负数为扣款">
        <a-input v-model:value="form.recharge_amount" :placeholder="form.placeholders.recharge_amount" style="text-align: center;" />
      </a-form-item>
    </a-col>
    <a-col style="display: flex; align-items: flex-start;">
      <a-button style="margin-left: 10px;" type="default" @click="handleVerifierFreeSettings">免验证器设置</a-button>
    </a-col>
  </a-row>

  <a-row :gutter="16">
    <a-col :span="2" style="text-align: right;">赠送金额：</a-col>
    <a-col :span="8">
      <a-form-item help="*正数为充值">
        <a-input v-model:value="form.gift_amount" :placeholder="form.placeholders.gift_amount" style="text-align: center;" />
      </a-form-item>
    </a-col>
  </a-row>

  <a-row :gutter="16">
    <a-col :span="2" style="text-align: right;">打码量：</a-col>
    <a-col :span="8">
      <a-form-item help="*正数为加打码,负数为扣打码">
        <a-input v-model:value="form.coding_amount" :placeholder="form.placeholders.coding_amount" style="text-align: center;" />
      </a-form-item>
    </a-col>
  </a-row>

  <a-row :gutter="16">
    <a-col :span="2" style="text-align: right; align-items: top;">订单说明：</a-col>
    <a-col :span="8">
      <a-form-item help="*请勿输入%等特殊字符">
        <a-input v-model:value="form.order_description" :placeholder="form.placeholders.order_description" style="text-align: center;" />
      </a-form-item>
    </a-col>
  </a-row>

  <!-- Action Buttons -->
  <a-row style="text-align: center; margin-top: 30px;">
    <a-col :span="10">
      <a-button type="primary" @click="handleSubmit">确定</a-button>
      <a-button style="margin-left: 20px;" @click="handleCancel">取消</a-button>
    </a-col>
  </a-row>
</a-card>

</template>

<script setup>
import { RestOutlined } from '@ant-design/icons-vue';
import { reactive } from 'vue'

// Initialize the form and data dynamically
const form = reactive({
   // Set the current selected values for the selects

  app_id: '',
  gift_amount: '',
  recharge_amount: '',
  coding_amount: '',
  order_description: '',
  
  // Placeholder text for all inputs
  placeholders: {
    app_id: '请输入APPID',
    recharge_amount: '请输入充值金额',
    gift_amount: '请输入赠送金额',
    coding_amount: '请输入打码量',
    order_description: '请输入订单说明',
  },

  // Radio types for 存款稽核 and 存款豁免

})
// Automatically select the first item in the select options

const handleSubmit = () => {
  console.log('Submitting Form:', form)
}

const handleCancel = () => {
  console.log('Form reset or cancel action')
}

const handleQuery = () => {
  console.log('Query app_id:', form.app_id)
}

const handleVerifierFreeSettings = () => {
  console.log('Query app_id:', form.app_id)
}

const handleReset = () => {
  console.log('Query app_id:', form.app_id)

  form.app_id = ''
  form.gift_amount = ''
  form.recharge_amount = ''
  form.coding_amount = ''
  form.order_description = ''
}

const handleVerify = () => {
  console.log('Verify UserID:', form.recharge_amount)
}
</script>
