<template>
  <a-modal
    title="添加奖励"
    v-model:visible="isModalVisible"
    maskClosable="false"
    keyboard="false"
    :footer="null"
    @update:visible="updateVisible"
  >

    <!-- Conditionally render the CustomSpin component if '钻石奖励' is selected -->
    <a-form-item  label="奖励钻石">
      <CustomSpin v-model:nValue="diamondCount" style="width: 100%;" />
      <div>
        <span style="text-align: center; font-size: 10px; color: grey;">设置当前主播使用银行卡提现时的手续费</span>
      </div>
    </a-form-item>

    <!-- Conditionally render the CustomSpin component if '钻石奖励' is selected -->
    <a-form-item label="奖励余额">
      <CustomSpin v-model:nValue="balanceCount" style="width: 100%;" />
      <div>
        <span style="text-align: center; font-size: 10px; color: grey;">设置当前主播使用虚拟币提现时的手续费</span>
      </div>
    </a-form-item>

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
    'a-radio-group': Radio.Group,
    'a-radio': Radio,
    'a-button': Button,
    'a-table': Table,
    'a-table-column': Table.Column,
    CustomSpin,
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
