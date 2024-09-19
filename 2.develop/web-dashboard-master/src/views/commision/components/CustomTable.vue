<template>
  <a-table
    rowKey="id"
    :pagination="false"
    :dataSource="paginatedData"
    :columns="columns"
    :loading="loading"
  />

  <div style="display: flex; align-items: center; justify-content: flex-end; margin-top: 16px;">
    <span style="margin-right: 8px;">共 {{ pagination.total }} 条</span>
    <a-pagination
      v-model:current="pagination.page"
      :total="pagination.total"
      :page-size="pagination.limit"
      show-size-changer
      :page-size-options="['5', '10', '20', '50', '100']"
      :simple="false"
      size="small"
      @change="handlePageChange"
      @show-size-change="handleSizeChange"
    />
  </div>

  <a-modal
    v-model:visible="isModalVisible"
    title="查看数据"
    :width="700"
    @cancel="handleCancel"
    :footer="null"
  >
    <div style="display: flex; justify-content: space-between; margin: 32px;">
      <span>钻石奖励: {{ selectedRecord?.diamondReward }}</span>
      <span>余额奖励: {{ selectedRecord?.balanceReward }}</span>
    </div>
    
    <a-table
      :dataSource="selectedRecord?.inviteDetails"
      :columns="modalColumns"
      rowKey="id"
      :pagination="false"
      style="margin-top: 16px;"
    />
  </a-modal>
</template>

<script setup lang="jsx">

import { ref, reactive, computed } from 'vue';
import { message } from 'ant-design-vue';

const isModalVisible = ref(false);
const selectedRecord = ref(null);

// Pagination settings
const pagination = reactive({
  page: 1,
  limit: 5,
  total: 100,
});

// Paginate data source
const paginatedData = computed(() => {
  const start = (pagination.page - 1) * pagination.limit;
  const end = start + pagination.limit;
  return dataSource.value.slice(start, end);
});

// Handle pagination change
const handlePageChange = (page) =>  {
  pagination.page = page;
};

const handleSizeChange = (current, size) => {
  pagination.limit = size;
  pagination.page = 1;
};

// Data for main table including invite details
const dataSource = ref([
  {
    id: '1',
    userNickname: '哈哈哈哈',
    userId: 324423,
    inviteCount: 3435,
    diamondReward: 3424324,
    balanceReward: 4354,
    actions: '查看数据',
    inviteDetails: [
      { id: '1', inviteUser: '大石街道卡死', userId: 3432423, registerTime: '2022-12-12 12:21:21' },
      { id: '2', inviteUser: '大师大师大', userId: 434234, registerTime: '2022-12-12 12:21:21' },
      { id: '1', inviteUser: '大石街道卡死', userId: 3432423, registerTime: '2022-12-12 12:21:21' },
      { id: '2', inviteUser: '大师大师大', userId: 434234, registerTime: '2022-12-12 12:21:21' },
      { id: '1', inviteUser: '大石街道卡死', userId: 3432423, registerTime: '2022-12-12 12:21:21' },
      { id: '2', inviteUser: '大师大师大', userId: 434234, registerTime: '2022-12-12 12:21:21' },
    ]
  },
  {
    id: '2',
    userNickname: '哒哒哒',
    userId: 43242,
    inviteCount: 432,
    diamondReward: 3424324,
    balanceReward: 5453,
    actions: '查看数据',
    inviteDetails: [
      { id: '1', inviteUser: '大师大师大', userId: 434234, registerTime: '2022-12-12 12:21:21' },
      { id: '2', inviteUser: '大石街道卡死', userId: 3432423, registerTime: '2022-12-12 12:21:21' },
    ]
  },
]);

// Columns for main table
const columns = [
  {
    title: '用户昵称',
    dataIndex: 'userNickname',
    align: 'center',
  },
  {
    title: '用户ID',
    dataIndex: 'userId',
    align: 'center',
  },
  {
    title: '邀请用户注册数',
    dataIndex: 'inviteCount',
    align: 'center',
  },
  {
    title: '钻石奖励',
    dataIndex: 'diamondReward',
    align: 'center',
  },
  {
    title: '余额奖励',
    dataIndex: 'balanceReward',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'actions',
    align: 'center',
    customRender: ({ record }) => (
      <a style="text-decoration: underline; color: #1890ff; cursor: pointer;" onClick={() => viewData(record)}>
        {record.actions}
      </a>
    ),
  },
];

// Modal table columns for invite details
const modalColumns = [
  {
    title: '邀请用户',
    dataIndex: 'inviteUser',
    align: 'center',
  },
  {
    title: '用户ID',
    dataIndex: 'userId',
    align: 'center',
  },
  {
    title: '注册时间',
    dataIndex: 'registerTime',
    align: 'center',
  },
];

// Function to show the modal dialog
const viewData = (record) => {
  selectedRecord.value = record;
  isModalVisible.value = true;
};

// Close the modal
const handleCancel = () => {
  isModalVisible.value = false;
};

</script>

<style scoped>
</style>
