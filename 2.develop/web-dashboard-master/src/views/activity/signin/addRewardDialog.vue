<template>
  <a-modal
    title="添加奖励"
    :open="isModalVisible"
    :maskClosable="false"
    :keyboard="false"
    :footer="null"
    @update:open="updateVisible"
  >
    <a-form-item label="奖励类型">
      <a-radio-group v-model:value="rewardType">
        <a-radio value="diamond">钻石奖励</a-radio>
        <a-radio value="balance">余额奖励</a-radio>
        <a-radio value="gift">礼物奖励</a-radio>
        <a-radio value="mount">坐骑奖励</a-radio>
      </a-radio-group>
    </a-form-item>

    <!-- Conditionally render the CustomSpin component if '钻石奖励' is selected -->
    <a-form-item v-if="rewardType === 'diamond'" label="奖励钻石">
      <CustomSpin v-model:nValue="diamondCount" style="width: 100%;" />
      <div>
        <span style="font-size: 10px; color: grey;">请输入奖励的钻石</span>
      </div>
    </a-form-item>

    <!-- Conditionally render the CustomSpin component if '余额奖励' is selected -->
    <a-form-item v-else-if="rewardType === 'balance'" label="奖励余额">
      <CustomSpin v-model:nValue="balanceCount" style="width: 100%;" />
      <div>
        <span style="font-size: 10px; color: grey;">请输入奖励的金额</span>
      </div>
    </a-form-item>

    <!-- Conditionally render the table if '坐骑奖励' is selected -->
    <a-form-item v-else-if="rewardType === 'mount'">
      <a-table :dataSource="mountOptions" :pagination="false" bordered>
        <a-table-column title="选择坐骑" dataIndex="name" key="name" align="center" />
        <a-table-column title="状态" key="status" align="center">
          <template #default="{ record }">
            <a-radio :checked="selectedMount === record.key" @change="onMountSelect(record.key)" />
          </template>
        </a-table-column>
      </a-table>
    </a-form-item>

    <!-- Conditionally render the gift options if '礼物奖励' is selected -->
    <a-form-item v-else>
      <a-input style="text-align: center; margin-bottom: 10px;" placeholder="请输入礼物名称搜索"></a-input>
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

    <!-- Custom Footer -->
    <div class="custom-footer">
      <a-button style="width: 120px; margin-right: 30px;" @click="handleCancel">取消</a-button>
      <a-button style="width: 120px;" type="primary" @click="handleOk">确定</a-button>
    </div>
  </a-modal>
</template>

<script setup lang="jsx">
import CustomSpin from '@/components/Form/Custom/CustomSpin.vue';

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
