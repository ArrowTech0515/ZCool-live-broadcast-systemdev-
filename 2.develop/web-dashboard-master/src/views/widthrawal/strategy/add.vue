<template>
  <a-card>
    <template #title>
      <div style="display: flex; justify-content: center; align-items: center;">
        <a-button
          type="link"
          style="font-size: 18px; margin-right: 8px;"
          @click="handleBack"
        >
          <span style="font-size: 20px; font-weight: bold; margin-left: 8px;">&lt;</span>
        </a-button>
        <span style="font-size: 20px; text-align: center; font-weight: bold; margin-left: 8px;">添加策略</span>
      </div>
    </template>

    <div style="display: flex; justify-content: center;">
      <a-col :layout="'vertical'" style="width: 80%; max-width: 600px;">

        <!-- Form Items Here -->
        <a-form-item label="策略名称" style="text-align: center;">
          <a-input placeholder="请输入策略名称" style="text-align: center;" />
        </a-form-item>

        <a-form-item label="最低提现金额" style="text-align: center;" justify="end">
          <custom-spin v-model:nValue="parentValue"></custom-spin>
        </a-form-item>

        <a-form-item label="最高提现金额" style="text-align: center;">
          <custom-spin v-model:nValue="parentValue"></custom-spin>
        </a-form-item>

        <a-form-item label="每日免费提现次数" style="text-align: center;">
          <custom-spin v-model:nValue="parentValue"></custom-spin>
        </a-form-item>

        <a-form-item label="每日限制提现次数" style="text-align: center;">
          <custom-spin v-model:nValue="parentValue"></custom-spin>
        </a-form-item>

        <a-form-item label="手续费比例" style="text-align: center;">
          <custom-spin v-model:nValue="parentValue"></custom-spin>
        </a-form-item>

        <a-form-item label="区块链提现" style="text-align: justify;">
          <a-row :gutter="16" type="flex" justify="center">
            <a-radio-group v-model="radioValue">
              <a-radio value="radio1">是</a-radio>
              <a-radio value="radio2">否</a-radio>
            </a-radio-group>

            <span style="text-align: end; text-decoration: underline; color: blue; margin-right: 8px; cursor: pointer;" @click="handleOperation(text)">
              区块链汇率
            </span>
          </a-row>
        </a-form-item>

        <a-form-item label="策略用户" style="text-align: center;">
          <Space direction="horizontal" size="large" style="margin-left: 20px;">
            <Checkbox value="All" @change="handleAllusers">全部用户</Checkbox>
            <Checkbox value="Noble" @change="handleNobleusers">贵族用户</Checkbox>
            <Checkbox value="Recharge" @change="handleRechargeusers">充值用户</Checkbox>
            <Checkbox value="Custom" @change="handleCustomusers">自定义用户</Checkbox>
         </Space>
        </a-form-item>

        <a-form-item label="自动打款机制" style="text-align: center;">
          <a-row justify="center">
            <custom-spin v-model:nValue="parentValue"></custom-spin>
            <custom-spin v-model:nValue="parentValue"></custom-spin>
          </a-row>
        </a-form-item>

        <a-form-item label="策略状态" style="text-align: center;">
          <a-switch checked-children="启用" un-checked-children="关闭" />
        </a-form-item>

        <!-- Center Aligned Save Button -->
        <a-form-item style="text-align: center;">
          <a-button type="primary" style="width: 200px;">保存</a-button>
        </a-form-item>

      </a-col>
    </div>

  </a-card>
</template>

<script>
import CustomSpin from './customSpin.vue';

export default {
  components: {
    CustomSpin,
  },

  data() {
    return {
      parentValue: '0', // Example initial value
    };
  },

  methods: {
    handleBack() {
      // Handle the back action here
      // For example, navigate to the previous page:
      this.$emit('back'); // Emit the back event to the parent component
    },
  },
};
</script>
