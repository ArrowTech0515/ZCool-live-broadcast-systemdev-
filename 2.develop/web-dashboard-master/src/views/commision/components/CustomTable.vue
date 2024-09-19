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
</template>

<script setup lang="jsx">

import { message } from 'ant-design-vue'

const pagination = reactive({
  page: 1,
  limit: 5,
  total: 100,
})

const paginatedData = computed(() => {
  const start = (pagination.page - 1) * pagination.limit
  const end = start + pagination.limit
  return dataSource.value.slice(start, end)
})

const handlePageChange = (page) =>  {
  pagination.page = page
}

const handleSizeChange = (current, size) => {
  pagination.limit = size
  pagination.page = 1
}

const dataSource = ref([
  {
    id: '1',
    userNickname: '哈哈哈哈',
    userId: 324423,
    inviteCount: 3435,
    diamondReward: 3424324,
    balanceReward: 4354,
    actions: '查看数据',
  },
  {
    id: '2',
    userNickname: '哒哒哒',
    userId: 43242,
    inviteCount: 432,
    diamondReward: 3424324,
    balanceReward: 5453,
    actions: '查看数据',
  },
]);

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

const viewData = (record) => {
  message.info(`查看数据 for 用户昵称: ${record.userNickname}`)
}

</script>

<style scoped>

</style>
