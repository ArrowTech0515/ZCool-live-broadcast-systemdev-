<template>
  <a-card>
    <div style="display: flex; align-items: center; white-space: nowrap; margin-bottom: 2%;">
      <div style="flex-grow: 1; text-align: center;">
        <span style="font-size: 20px; font-weight: bold;">人工存款</span>
      </div>
    </div>

    <!-- First row with dynamically generated options for 银商名称 -->
    <a-row :gutter="16" align="middle" style="margin-bottom: 16px;">
      <a-col :span="2" style="text-align: right;">
        银商名称：
      </a-col>
      <a-col :span="2">
        <a-select v-model:value="form.selected_banker_name">
          <a-select-option 
            v-for="(banker, index) in form.banker_name" 
            :key="index" 
            :value="banker.value">
            {{ banker.label }}
          </a-select-option>
        </a-select>
      </a-col>
      <a-col :span="2" style="text-align: right;">
        银行卡：
      </a-col>
      <a-col :span="3">
        <a-select v-model:value="form.bank_cards">
          <a-select-option 
            v-for="(card, index) in form.bank_cards" 
            :key="index" 
            :value="card.value">
            {{ card.label }}
          </a-select-option>
        </a-select>
      </a-col>
    </a-row>

    <!-- Second row with 账号 and button -->
    <a-row :gutter="16" align="middle" style="margin-bottom: 16px;">
      <a-col :span="2" style="text-align: right;">
        账号：
      </a-col>
      <a-col :span="8">
        <a-input v-model:value="form.account" :placeholder="form.placeholders.account" style="text-align: center;" />
      </a-col>
      <a-col style="width: 100px;">
        <a-button type="primary" @click="handleQuery"><SearchOutlined/>查询</a-button>
      </a-col>
    </a-row>

    <!-- Third row with 用户ID and button -->
    <a-row :gutter="16" align="middle" style="margin-bottom: 16px;">
      <a-col :span="2" style="text-align: right;">
        用户ID：
      </a-col>
      <a-col :span="8">
        <a-input v-model:value="form.user_id" :placeholder="form.placeholders.user_id" style="text-align: center;" />
      </a-col>
      <a-col :span="4">
        <a-button type="primary" @click="handleVerify"><CheckCircleFilled/>验证</a-button>
      </a-col>
    </a-row>

    <!-- Fourth row with second 账号 and 姓名 in one row -->
    <a-row :gutter="16" align="middle" style="margin-bottom: 16px;">
      <a-col :span="2" style="text-align: right;">
        账号：
      </a-col>
      <a-col :span="8">
        <a-input v-model:value="form.secondary_account" :placeholder="form.placeholders.secondary_account" style="text-align: center;" />
      </a-col>
      <a-col :span="2" style="text-align: right;">
        姓名:
      </a-col>
      <a-col :span="8">
        <a-input v-model:value="form.name" :placeholder="form.placeholders.name" style="text-align: center;" />
      </a-col>
    </a-row>

    <!-- Fifth row with 余额 and 体系 in one row -->
    <a-row :gutter="16" align="middle" style="margin-bottom: 16px;">
      <a-col :span="2" style="text-align: right;">
        余额：
      </a-col>
      <a-col :span="8">
        <a-input v-model:value="form.balance" :placeholder="form.placeholders.balance" style="text-align: center;" />
      </a-col>
      <a-col :span="2" style="text-align: right;">
        层级:
      </a-col>
      <a-col :span="8">
        <a-input v-model:value="form.system" :placeholder="form.placeholders.system" style="text-align: center;" />
      </a-col>
    </a-row>

    <!-- Sixth row with 存款金额 and 存款豁免 -->
    <a-row :gutter="16" align="middle" style="margin-bottom: 16px;">
      <a-col :span="2" style="text-align: right;">
        存款金额：
      </a-col>
      <a-col :span="8">
        <a-input v-model:value="form.auditAmount" :placeholder="form.placeholders.auditAmount" style="text-align: center;" />
      </a-col>

      <a-col>
        <a-radio-group v-model:value="form.auditType" style="margin-left: 20px;">
          <a-radio v-for="(type, index) in form.auditTypes" :key="index" :value="type.value">
            {{ type.label }}
          </a-radio>
        </a-radio-group>
      </a-col>

      <a-col :span="2" style="text-align: right;">
        倍数：
      </a-col>
      <a-col :span="8">
        <a-input v-model:value="form.multiplier" :placeholder="form.placeholders.multiplier" style="text-align: center;" />
      </a-col>
    </a-row>

    <!-- Seventh row with 存款豁免 -->
    <a-row :gutter="16" align="middle" style="margin-bottom: 16px;">
      <a-col :span="2" style="text-align: right;">
        存款豁免：
      </a-col>
      <a-col :span="8">
        <a-input v-model:value="form.exemptionAmount" :placeholder="form.placeholders.exemptionAmount" style="text-align: center;"/>
      </a-col>
      <a-col>
        <a-radio-group v-model:value="form.exemptionType" style="margin-left: 20px;">
          <a-radio v-for="(type, index) in form.exemptionTypes" :key="index" :value="type.value">
            {{ type.label }}
          </a-radio>
        </a-radio-group>
      </a-col>
      <a-col :span="2" style="text-align: right;">
        倍数：
      </a-col>
      <a-col :span="8">
        <a-input v-model:value="form.multiplierExemption" :placeholder="form.placeholders.multiplierExemption" style="text-align: center;" />
      </a-col>
    </a-row>

    <!-- Radio buttons for 类型 -->
    <a-row :gutter="16" align="middle" style="margin-bottom: 16px;">
      <a-col :span="2" style="text-align: right;">
        类型：
      </a-col>
      <a-col :span="18">
        <a-radio-group v-model:value="form.type">
          <a-radio v-for="(type, index) in form.types" :key="index" :value="type.value">
            {{ type.label }}
          </a-radio>
        </a-radio-group>
      </a-col>
    </a-row>

    <!-- Second-to-last row with input for 备注 -->
    <a-row :gutter="16" align="middle" style="margin-bottom: 16px;">
      <a-col :span="2" style="text-align: right;">
        备注：
      </a-col>
      <a-col :span="8">
        <a-input v-model:value="form.remark" :placeholder="form.placeholders.remark" style="text-align: center;" />
      </a-col>
    </a-row>

    <!-- Last row with 二级密码 input -->
    <a-row :gutter="16" align="middle" style="margin-bottom: 20px;">
      <a-col :span="2" style="text-align: right;">
        二级密码：
      </a-col>
      <a-col :span="8">
        <a-input v-model:value="form.secondaryPassword" :placeholder="form.placeholders.secondaryPassword" type="password" style="text-align: center;" />
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
import { reactive } from 'vue'

// Initialize the form and data dynamically
const form = reactive({
   // Set the current selected values for the selects
  selected_banker_name: null,
  selected_bank_card: null,

  banker_name: [
    { value: 'merchant01', label: '银商01' },
    { value: 'merchant02', label: '银商02' }
  ],
  bank_cards: [
    { value: 'key1', label: '中国银行 张三 3581' },
    { value: 'key2', label: '工商银行 李四 2451' }
  ],
  account: '',
  secondary_account: '',
  user_id: '',
  name: '',
  balance: '',
  system: '',
  auditAmount: '',
  auditType: null,
  multiplier: '',
  exemptionAmount: '',
  exemptionType: null,
  multiplierExemption: '',
  type: null,
  remark: '',
  secondaryPassword: '',
  
  // Placeholder text for all inputs
  placeholders: {
    account: '请输入账号',
    user_id: '请输入用户ID',
    secondary_account: '自动识别',
    name: '自动识别',
    balance: '自动识别',
    system: '自动识别',
    auditAmount: '金额',
    multiplier: '倍数',
    exemptionAmount: '金额',
    multiplierExemption: '倍数',
    remark: '请输入备注',
    secondaryPassword: '请输入二级密码'
  },

  // Radio types for 存款稽核 and 存款豁免
  auditTypes: [
    { value: 'audit', label: '稽核' },
    { value: 'no_audit', label: '不稽核' }
  ],
  exemptionTypes: [
    { value: 'exemption', label: '稽核' },
    { value: 'no_exemption', label: '不稽核' }
  ],

  // Types for 类型 radio group
  types: [
    { value: 'manual', label: '人工' },
    { value: 'automatic', label: '自动' }
  ]
})
// Automatically select the first item in the select options
onMounted(() => {
  form.selected_banker_name = form.banker_name[0]?.value || null
  form.selected_bank_card = form.bank_cards[0]?.value || null
})

const handleSubmit = () => {
  console.log('Submitting Form:', form)
}

const handleCancel = () => {
  console.log('Form reset or cancel action')
}

const handleQuery = () => {
  console.log('Query account:', form.account)
}

const handleVerify = () => {
  console.log('Verify UserID:', form.user_id)
}
</script>
