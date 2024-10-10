<template>
  <a-modal
    title="导出代付方式"
    :open="isModalVisible"
    :maskClosable="false"
    :keyboard="false"
    :footer="null"
    @update:open="updateVisible"
  >
    <a-form-item style="margin: 5%;">
      <a-table :dataSource="tableData" :pagination="false" bordered>
        <a-table-column title="编号" dataIndex="number" key="number" align="center" />
        <a-table-column title="代付方式" dataIndex="payment_method" key="payment_method" align="center" />
      </a-table>
    </a-form-item>

    <div class="custom-footer">
      <a-button style="width: 120px; margin-right: 30px;" @click="handleCancel">取消</a-button>
      <a-button style="width: 120px;" type="primary" @click="handleOk">确定</a-button>
    </div>
  </a-modal>
</template>

<script setup lang="jsx">

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
    console.error('Invalid payment_method for isModalVisible:', visible);
  }
};

const tableData = ref([
  { number: 3612, payment_method: '波币代付', key: 1 },
  { number: 3910, payment_method: '合泰代付', key: 2 },
  { number: 4706, payment_method: '容易付09', key: 3 },
  { number: 4568, payment_method: '秒付代付', key: 4 },
  { number: 3797, payment_method: '八达通代付', key: 5 },
  { number: 4294, payment_method: '永信代付', key: 6 },
  { number: 4597, payment_method: '容易付05', key: 7 },
  { number: 6108, payment_method: '容易付01', key: 8 },
  { number: 7486, payment_method: '艾希代付', key: 9 },
]);

const handleOk = () => {
  updateVisible(false);
};

const handleCancel = () => {
  console.log('Cancel Clicked');
  updateVisible(false);
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
