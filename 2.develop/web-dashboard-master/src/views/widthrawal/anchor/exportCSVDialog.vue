<template>
  <a-modal
    title="导出CSV"
    :open="isModalVisible"
    :maskClosable="false"
    :keyboard="false"
    :footer="null"
    style="align-items: center"
    @update:open="updateVisible"
  >
    <a-form-item label="导出对象">
      <a-row>
        <a-radio-group v-model:value="rewardType" style="align-items: center;">
          <a-radio value="diamond">全部</a-radio>
          <a-radio value="balance">自定义主播</a-radio>
        </a-radio-group>
        <a-select v-if="rewardType === 'balance'" placeholder="请选择主播" style="text-align: center; width:150px;"></a-select>
      </a-row>
    </a-form-item>
    <a-form-item label="提现类型">
      <a-row>
        <a-radio-group v-model:value="withdrawalType" style="align-items: center;">
          <a-radio value="doing">提现中</a-radio>
          <a-radio value="failed">提现失败</a-radio>
          <a-radio value="success">提现成功</a-radio>
        </a-radio-group>
      </a-row>
    </a-form-item>
    <a-form-item label="导出时间">
      <a-row>
        <a-radio-group v-model:value="exportTime" style="align-items: center;">
          <a-radio value="all">全部时间</a-radio>
          <a-radio value="custom">自定义时间</a-radio>
        </a-radio-group>
      </a-row>
        <a-range-picker
          v-if="exportTime === 'custom'"
          :placeholder="['开始日期', '结束日期']"
          style="margin-top: 20px;"
        />
    </a-form-item>

    <!-- Custom Footer -->
    <div class="custom-footer">
      <a-button style="width: 120px; margin-right: 30px;" @click="handleCancel">取消</a-button>
      <a-button style="width: 120px;" type="primary" @click="handleOk">确定</a-button>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';

// Define props
const props = defineProps({
  isModalVisible: {
    type: Boolean,
    default: false,
  },
});

// Define emits
const emit = defineEmits(['update:isModalVisible']);

// Modal visibility control function
const updateVisible = (visible: boolean) => {
  if (typeof visible === 'boolean') {
    emit('update:isModalVisible', visible);
  } else {
    console.error('Invalid value for isModalVisible:', visible);
  }
};

// Define reactive variables
const rewardType = ref('diamond');
const withdrawalType = ref('doing');
const exportTime = ref('all');
const selectedMount = ref(null);
const selectedGifts = ref([]);

// Handle the Ok button click
const handleOk = () => {
  console.log('OK Clicked', rewardType.value, withdrawalType.value, exportTime.value);
  updateVisible(false);
};

// Handle the Cancel button click
const handleCancel = () => {
  console.log('Cancel Clicked');
  updateVisible(false);
};

// Function for handling mount selection
const onMountSelect = (key: string) => {
  selectedMount.value = key;
};

// Function for handling gift selection
const onGiftSelect = (key: string) => {
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
