<template>
  <a-modal
    title="选择礼物"
    :visible="isModalVisible"
    maskClosable="false"
    keyboard="false"
    :footer="null"
    @update:visible="updateVisible"
  >
    <a-form-item style="margin: 5%;">
      <a-input style="text-align: center; margin-bottom: 20px;" placeholder="请输入礼物名称搜索"></a-input>
      <a-table :dataSource="giftOptions" :pagination="false" bordered>
        <a-table-column title="礼物名称" dataIndex="name" key="name" align="center" />
        <a-table-column title="礼物价值" dataIndex="value" key="value" align="center" />
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
import { Modal, Button, Table } from 'ant-design-vue';

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

const rewardType = ref('diamond');
const diamondCount = ref(0);
const balanceCount = ref(0);

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
