<template>
  <a-card>
    <template #title>
      <div class="header-title">
        <a-button type="link" @click="handleBack" class="back-button">
          <span class="back-arrow">&lt;</span>
        </a-button>
        <div class="title-text">{{ formData.isCreate ? '添加策略' : '策略编辑' }} </div>
      </div>
    </template>

    <div class="center-container">
      <a-col layout="vertical" class="form-container">

        <div class="form-row">
          <div class="form-label">策略名称</div>
          <a-input 
            v-model:value="formData.strategyName"
            placeholder="请输入策略名称" 
            class="form-input"
          />
        </div>

        <div v-for="(item, index) in spinFields" :key="index" class="form-row">
          <div class="form-label">{{ item.label }}</div>
          <div class="form-input-container">
            <CustomSpin 
              v-if="item.label === '手续费比例'"
              :nValue="formData[item.field]"
              :b-show-unit="true"
              class="custom-spin"
            />
            <CustomSpin
              v-else
              v-model:nValue="formData[item.field]"
              class="custom-spin"
            />
            <div class="help-text">{{ item.helpText }}</div>
          </div>
        </div>

        <div class="form-row">
          <div class="form-label">区块链提现</div>
          <div class="form-input-container">
            <a-switch v-model:checked="formData.strategyBlockchain" checked-children="是" un-checked-children="否" />
            <span class="blockchain-rate" @click="handleBlockchainRate">区块链汇率</span>
            <div class="help-text">设置允许区块链提现时，用户端增加虚拟币提现类型</div>
          </div>
        </div>

        <div class="form-row">
          <div class="form-label">策略用户</div>
          <div class="form-input-container strategy-users">
            <a-space style="flex-grow: 1;">
              <a-checkbox 
                v-model:checked="formData.userAll" 
                @change="handleUserType"
              >全部用户</a-checkbox>
              
              <a-checkbox 
                v-model:checked="formData.userNoble" 
                @change="handleUserType"
              >贵族用户</a-checkbox>
              
              <a-checkbox 
                v-model:checked="formData.userRecharge" 
                @change="handleUserType"
              >充值用户</a-checkbox>
              
              <a-checkbox 
                v-model:checked="formData.userCustom" 
                @change="handleUserType"
              >自定义用户</a-checkbox>
            </a-space>
            <a-button type="default" class="user-input" >选择用户</a-button>
          </div>
        </div>

        <div class="form-row">
          <div class="form-label">自动打款机制</div>
          <div style="width: 75%;">
            <div style="display: flex; justify-content: space-between;">
              <CustomSpin v-model:nValue="formData.strategyAutomatic.value1" style="flex: 1; margin-right: 10px;"></CustomSpin>
              <CustomSpin v-model:nValue="formData.strategyAutomatic.value2" style="flex: 1;"></CustomSpin>
            </div>
            <div style="color: darkgray; font-size: 12px; text-align: left; margin-top: 5px;">
              每日免费次数用完时，继续提现将按照当前比例扣除对应的手续费
            </div>
          </div>
        </div>

        <div class="form-row">
          <div class="form-label">策略状态</div>
          <div class="form-input-container">
            <a-switch v-model:checked="formData.strategyStatus" checked-children="启用" un-checked-children="关闭" />
          </div>
        </div>

        <!-- Center Aligned Save Button -->
        <a-form-item class="save-button-container">
          <a-button type="primary" class="save-button" @click="handleSave">保存</a-button>
        </a-form-item>
      </a-col>
    </div>
  </a-card>
</template>

<script setup lang="jsx">
import { ref, defineProps, defineEmits } from 'vue';
import CustomSpin from '@/components/Form/Custom/CustomSpin.vue';

// Define Props and Emits
const props = defineProps({
  formData: Object,
});

const emit = defineEmits(['back']);

// Data for spin fields
const spinFields = [
  { label: '最低提现金额', field: 'minAmount', helpText: '低于当前提现金额时，用户无法发起提现' },
  { label: '最高提现金额', field: 'maxAmount', helpText: '高于当前提现金额时，用户无法发起提现' },
  { label: '每日免费提现次数', field: 'freePerDay', helpText: '设置次数内用户可免费提现，不收取手续费' },
  { label: '每日限制提现次数', field: 'limitPerDay', helpText: '用户每日最大提现次数，超过则无法提现（＜免费提现次数时，超额的免费次数不可用）' },
  { label: '手续费比例', field: 'feeRatio', helpText: '每日免费次数用完时，继续提现将按照当前比例扣除对应的手续费' },
];

const handleBack = () => {
  emit('back');
};

const handleSave = () => {
  emit('back');
};

const handleBlockchainRate = () => {
  console.log('Viewing blockchain rate');
};

const handleUserType = (value) => {
  console.log('User type selected:', value);
};
</script>

<style scoped>
.header-title {
  display: flex;
  align-items: center;
  white-space: nowrap;
}
.back-button {
  font-size: 18px;
  margin-right: 8px;
}
.back-arrow {
  font-size: 20px;
  font-weight: bold;
  margin-left: 8px;
}
.title-text {
  flex-grow: 1;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}

.center-container {
  display: flex;
  justify-content: center;
}
.form-container {
  width: 100%;
  max-width: 600px;
  white-space: nowrap;
}
.form-row {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
}
.form-label {
  flex: 1;
  text-align: right;
  padding-right: 10px;
  margin-right: 15px;
}
.form-input{
  text-align: center;
  width: 75%;
}

.user-input {
  text-align: center;
  width: 100%;
}
.form-input-container {
  width: 75%;
}
.custom-spin {
  text-align: right;
  width: 100%;
}
.radio-group {
  text-align: left;
}
.blockchain-rate {
  text-decoration: underline;
  color: #1890ff;
  cursor: pointer;
  text-align: right;
  margin-left: 20px;
}
.help-text {
  color: darkgray;
  font-size: 12px;
  text-align: left;
  margin-top: 5px;
}
.strategy-users {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.save-button-container {
  text-align: center;
  margin: 30px;
  white-space: nowrap;
}
.save-button {
  width: 200px;
}
</style>
