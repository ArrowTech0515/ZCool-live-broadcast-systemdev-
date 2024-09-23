<template>
  <a-modal
    title="拒绝提现"
    v-model:open="isModalVisible"
    maskClosable="false"
    keyboard="false"
    :footer="null"
    @update:visible="updateVisible"
  >

    <!-- Conditionally render the CustomSpin component if '钻石奖励' is selected -->
    <a-form-item  label="拒绝提现理由" style="margin-top: 15px;">
        <a-textarea
          v-model:value="value1"
          placeholder="请填写拒绝提现理由"
          :auto-size="{ minRows: 3, maxRows: 5 }"
        />
        <span style="font-size: 12px; color: grey; margin-bottom: 15px;">
        当前拒绝提现理由将通过消息中心通知主播
        </span>
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
