<template>
  <a-modal
    title="审核打款"
    v-model:open="isModalVisible"
    maskClosable="false"
    keyboard="false"
    :footer="null"
    @update:open="updateVisible"
  >

  <span style="font-size: 14px; font-weight: bold; color: red; margin-bottom: 15px;">
    请确认已转账至主播提供的收款账户后再进行确认操作，以免主播投诉
  </span>
    <!-- Conditionally render the CustomSpin component if '钻石奖励' is selected -->
    <a-form-item  label="打款银行" style="margin-top: 15px;">
      <a-input placeholder="请输入银行名称"></a-input>
    </a-form-item>
    <a-form-item  label="支行信息">
      <a-input placeholder="请输入支行信息"></a-input>
    </a-form-item>
    <a-form-item  label="银行卡号">
      <a-input placeholder="请输入银行卡号"></a-input>
    </a-form-item>
    <a-form-item  label="银行姓名">
      <a-input placeholder="请输入打款银行卡绑定姓名"></a-input>
    </a-form-item>
    <a-form-item  label="打款金额">
      <a-input placeholder="请输入打款金额"></a-input>
    </a-form-item>

    <div>
      <span style="font-size: 12px; color: grey; margin-bottom: 15px;">
        根据主播提现时选择的收款货币类型展示打款的货币单位（示例：主播提现选择的收款货币为“印尼盾”，则当前显示打款金额货币单位为：印尼盾）
        </span>
    </div>
        <!-- Custom Footer -->
    <div class="custom-footer">
      <a-button style="width: 120px; margin-right: 30px;" @click="handleCancel">取消</a-button>
      <a-button style="width: 120px;" type="primary" @click="handleOk">确定</a-button>
    </div>
  </a-modal>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { Modal, Radio, Button, Table } from 'ant-design-vue';
import CustomSpin from '@/components/Form/Custom/CustomSpin.vue';

export default defineComponent({
  components: {
    'a-modal': Modal,
    'a-button': Button,
  },
  props: {
    isModalVisible: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['update:isModalVisible'],

  setup(props, { emit }) {
    const updateVisible = (visible) => {
      if (typeof visible === 'boolean') {
        emit('update:isModalVisible', visible);
      } else {
        console.error('Invalid value for isModalVisible:', visible);
      }
    }
    
    const rewardType = ref('diamond');
    const diamondCount = ref(0);
    const balanceCount = ref(0);
    const mountOptions = ref([
      { name: '绚丽机车', key: '1' },
      { name: '跑车', key: '2' },
      { name: '飞机', key: '3' },
      { name: '神兽麒麟', key: '4' },
    ]);
    const giftOptions = ref([
      { name: '鲜花', value: 1, key: '1' },
      { name: '灯牌', value: 1, key: '2' },
      { name: '爱心', value: 1, key: '3' },
      { name: '城堡', value: 10000, key: '4' },
      { name: '蓝色妖姬', value: 666, key: '5' },
    ]);

    const selectedMount = ref(null);
    const selectedGifts = ref([]);

    const handleOk = () => {
      console.log('OK Clicked', rewardType.value);
      updateVisible(false);
    };

    const handleCancel = () => {
      console.log('Cancel Clicked');
      updateVisible(false);
    };

    const onMountSelect = (key) => {
      selectedMount.value = key;
    };

    const onGiftSelect = (key) => {
      if (selectedGifts.value.includes(key)) {
        selectedGifts.value = selectedGifts.value.filter(k => k !== key);
      } else {
        selectedGifts.value.push(key);
      }
    };

    return {
      updateVisible,
      rewardType,
      diamondCount,
      balanceCount,
      mountOptions,
      giftOptions,
      selectedMount,
      selectedGifts,
      handleOk,
      handleCancel,
      onMountSelect,
      onGiftSelect,
    };
  },
});
</script>

<style scoped>
.ant-modal-header {
  text-align: center;
}

.ant-modal-title {
  font-weight: bold;
  color: #FFD700; /* Yellow color */
}

.ant-radio-group {
  display: flex;
  justify-content: space-around;
}

.custom-footer {
  display: flex;
  justify-content: center;
  margin-top: 24px;
}

.custom-footer .ant-btn {
  margin: 0 8px;
}
</style>
