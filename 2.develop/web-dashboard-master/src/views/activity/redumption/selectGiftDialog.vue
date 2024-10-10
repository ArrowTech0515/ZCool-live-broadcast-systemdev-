<template>
  <a-modal
    title="选择兑换选项"
    :open="isModalVisible"
    :maskClosable="false"
    :keyboard="false"
    :footer="null"
    @update:open="updateVisible"
  >
    <a-form-item style="margin: 5%;">
      <a-table :dataSource="giftOptions" :pagination="false" bordered>
        <a-table-column title="账户余额" dataIndex="accountBalance" key="accountBalance" align="center" />
        <a-table-column title="兑换钻石" dataIndex="redemption" key="redemption" align="center" />
        <a-table-column title="状态" key="status" align="center">
          <template #default="{ record }">
            <a-checkbox :checked="selectedGifts.includes(record.key)" @change="onGiftSelect(record.key)" />
          </template>
        </a-table-column>
      </a-table>
      <span style="color: gray;">已选择 {{ selectedGifts.length }} 个礼物</span>
    </a-form-item>

    <div class="custom-footer">
      <a-button style="width: 120px; margin-right: 30px;" @click="handleCancel">取消</a-button>
      <a-button style="width: 120px;" type="primary" @click="handleOk">确定</a-button>
    </div>
  </a-modal>
</template>

<script setup lang="jsx">
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  isModalVisible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:isModalVisible']);

const updateVisible = (visible) => {
  if (typeof visible === 'boolean') {
    emit('update:isModalVisible', visible);
  } else {
    console.error('Invalid value for isModalVisible:', visible);
  }
};

const giftOptions = ref([
  { accountBalance: '10', redemption: 100, key: '1' },
  { accountBalance: '20', redemption: 200, key: '2' },
  { accountBalance: '30', redemption: 300, key: '3' },
  { accountBalance: '40', redemption: 400, key: '4' },
  { accountBalance: '50', redemption: 500, key: '5' },
]);

const selectedGifts = ref([]);

const handleOk = () => {
  console.log('OK Clicked');
  updateVisible(false);
};

const handleCancel = () => {
  console.log('Cancel Clicked');
  updateVisible(false);
};

const onGiftSelect = (key) => {
  if (selectedGifts.value.includes(key)) {
    selectedGifts.value = selectedGifts.value.filter(k => k !== key);
  } else {
    selectedGifts.value.push(key);
  }
};
</script>

<style scoped>
.ant-modal-header {
  text-align: center;
}

.ant-modal-title {
  font-weight: bold;
  color: #FFD700; /* Yellow color */
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
