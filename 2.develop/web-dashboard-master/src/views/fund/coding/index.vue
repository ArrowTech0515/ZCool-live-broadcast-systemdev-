<template>
  <a-card style="width: 50%; margin: 0 auto;">
    <div style="display: flex; align-items: center; white-space: nowrap; margin-bottom: 2%;">
      <div style="flex-grow: 1; text-align: center">
        <span style="font-size: 20px; font-weight: bold;">打码设置</span>
      </div>
    </div>

    <!-- Layer Selection -->
    <a-row style="margin-bottom: 16px;">
      <a-col :span="4" style="text-align: right;">分层选择：</a-col>
      <a-col :span="12">
        <a-select v-model:value="selectedLayer" style="width: 100%;" placeholder="请选择分层" @change="handleLayerChange">
          <a-select-option value="layer1">Layer 1 - 标准</a-select-option>
          <a-select-option value="layer2">Layer 2 - VIP 1</a-select-option>
          <a-select-option value="layer3">Layer 3 - VIP 2</a-select-option>
        </a-select>
      </a-col>
    </a-row>

    <!-- Input Rows with help texts -->
    <a-row>
      <a-col :span="4" style="text-align: right; margin-top: 4px;">APPID：</a-col>
      <a-col :span="12" style="margin-bottom: 6px;">
        <a-form-item>
          <a-input 
            v-model:value="form.app_id" 
            :placeholder="form.placeholders.app_id" 
          />
        </a-form-item>
      </a-col>
      <a-col style=" display: flex; align-items: flex-start;">
        <a-button style="margin-left: 18px;" type="primary" @click="handleQuery"><SearchOutlined />查询</a-button>
        <a-button style="margin-left: 16px;" type="default" @click="handleReset"><ReloadOutlined />重置</a-button>
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="4" style="text-align: right;">充值金额：</a-col>
      <a-col :span="12" style="margin-bottom: -16px;">
        <a-form-item help="*正数为充值, 负数为扣款">
          <a-input-number 
            v-model:value="form.recharge_amount" 
            :placeholder="form.placeholders.recharge_amount" 
            style="text-align: center;" 
            @input="updateCodingAmount" />
        </a-form-item>
      </a-col>
      <a-col style="display: flex; align-items: flex-start;">
        <a-button style="margin-left: 18px;" type="default" @click="handleVerifierFreeSettings">免验证器设置</a-button>
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="4" style="text-align: right;">赠送金额：</a-col>
      <a-col :span="12" style="margin-bottom: -16px;">
        <a-form-item help="*正数为充值">
          <a-input-number :min="0" v-model:value="form.gift_amount" :placeholder="form.placeholders.gift_amount" style="text-align: center;" />
        </a-form-item>
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="4" style="text-align: right;">打码量：</a-col>
      <a-col :span="12" style="margin-bottom: -16px;">
        <a-form-item help="*正数为加打码,负数为扣打码">
          <a-input-number v-model:value="form.coding_amount" :placeholder="form.placeholders.coding_amount" style="text-align: center;" />
        </a-form-item>
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="4" style="text-align: right; align-items: top;">订单说明：</a-col>
      <a-col :span="12" style="margin-bottom: -16px;">
        <a-form-item 
          :help="orderDescriptionError" 
          validateStatus="error" 
          v-if="orderDescriptionError"
        >
          <a-input 
            v-model:value="form.order_description" 
            :placeholder="form.placeholders.order_description" 
            @input="validateOrderDescription" 
          />
        </a-form-item>
        <a-form-item 
          help="*请勿输入%等特殊字符" 
          v-else
        >
          <a-input 
            v-model:value="form.order_description" 
            :placeholder="form.placeholders.order_description" 
            @input="validateOrderDescription" 
          />
        </a-form-item>
      </a-col>
    </a-row>


    <!-- Action Buttons -->
    <a-row style="text-align: center; align-items: center; justify-content: center; margin-top: 16px;">
      <a-col>
        <a-button type="primary" @click="handleSubmit">确定</a-button>
        <a-button style="margin-left: 20px;" @click="handleCancel">取消</a-button>
      </a-col>
    </a-row>

    <span style="cursor: help; position: absolute; bottom: 20px; right: 20px;" @click="handleHelp">❓</span>

    <a-modal
      v-model:visible="isHelpVisible"
      title="洗码量的合理设置"
      :footer="null"
      width="60%"
    >
      <HelpContent />
    </a-modal>
  </a-card>
</template>

<script setup lang="jsx">

import HelpContent from './HelpContent.vue';
import { reactive, ref } from 'vue';

const form = reactive({
  app_id: '',
  gift_amount: '',
  recharge_amount: '1000',
  coding_amount: '',
  order_description: '',
  placeholders: {
    app_id: '请输入APPID',
    recharge_amount: '请输入充值金额',
    gift_amount: '请输入赠送金额',
    coding_amount: '默认为额度为充值金额',
    order_description: '请输入订单说明',
  },
});

const isHelpVisible = ref(false);
const selectedLayer = ref(null);
const orderDescriptionError = ref(null);

const handleSubmit = () => {
  if (!validateOrderDescription()) {
    console.log('Validation failed for order description');
    return;
  }
  console.log('Submitting Form:', form);
};

const validateOrderDescription = () => {
  const invalidChars = /[!@#$%^&*(),.?":{}|<>~`[\]\\;'+=-]/;
  if (invalidChars.test(form.order_description)) {
    orderDescriptionError.value = '*请勿输入%等特殊字符';
    return false;
  }
  orderDescriptionError.value = null;
  return true;
};

const handleCancel = () => {
  console.log('Form reset or cancel action');
};

const handleHelp = () => {
  isHelpVisible.value = true; // Show the help modal
};

const handleQuery = () => {
  console.log('Query app_id:', form.app_id);
};

const handleVerifierFreeSettings = () => {
  console.log('免验证器设置 action triggered');
  form.coding_amount = form.recharge_amount * 0.5; // Example logic: Reduce coding amount to 50% of recharge amount
};

const handleReset = () => {
  console.log('Reset action triggered');

  form.app_id = '';
  form.gift_amount = '';
  form.recharge_amount = '';
  form.coding_amount = '';
  form.order_description = '';
  selectedLayer.value = null;
  orderDescriptionError.value = null;
};

const handleLayerChange = (value) => {
  selectedLayer.value = value;
  updateCodingAmount(); // Recalculate coding amount based on layer change
};

const updateCodingAmount = () => {
  if (form.recharge_amount && selectedLayer.value) {
    const rechargeAmount = parseFloat(form.recharge_amount);
    if (selectedLayer.value === 'layer1') {
      form.coding_amount = rechargeAmount * 1.5; // Example: 1.5x for layer 1
    } else if (selectedLayer.value === 'layer2') {
      form.coding_amount = rechargeAmount * 1.2; // Example: 1.2x for layer 2
    } else if (selectedLayer.value === 'layer3') {
      form.coding_amount = rechargeAmount; // Example: 1x for layer 3
    }
  } else {
    form.coding_amount = form.recharge_amount || ''; // Default to recharge amount if no layer selected
  }
};

</script>
