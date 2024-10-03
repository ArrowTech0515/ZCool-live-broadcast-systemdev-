<template>
  <a-card style=" margin-bottom: 1%;">
    <a-row :gutter="16" :type="flex" style=" justify-content: flex-end; align-items: center; margin-bottom: -20px;">
      <a-col :flex="1">
        <a-form-item label="用户账号">
          <a-input v-model:value="user_account" placeholder="请输入用户账号" />
        </a-form-item>
      </a-col>
      
      <a-col :flex="1">
        <a-form-item label="任务名称">
          <a-input v-model:value="task_name" placeholder="请输入任务名称" />
        </a-form-item>
      </a-col>

      <a-col :flex="auto">
        <a-form-item label="日期">
          <a-range-picker 
            v-model:value="time"
            :placeholder="['开始日期', '结束日期']"
          />
        </a-form-item>
      </a-col>

      <QueryButtonGroup    
        :reset-form="onReset" 
        :submit-form="onSearch"/>

    </a-row>
  </a-card>

    <a-table :data-source="paginatedData" :pagination="false">
      <a-table-column title="全选" key="selectAll" align="center">
        <template #default="{ record }">
          <a-checkbox :checked="selectedGifts.includes(record.key)" @change="onGiftSelect(record.key)" />
        </template>
      </a-table-column>
      <a-table-column title="日志标识" dataIndex="task_name" key="task_name" align="center" />
      <a-table-column title="用户标识" dataIndex="userID" key="userID" align="center"/>
      <a-table-column title="用户账号" dataIndex="nickName" key="nickName" align="center" />
      <a-table-column title="任务名称" dataIndex="taskName" key="taskName" align="center" />
      <a-table-column title="奖励游戏币" dataIndex="rewardGameCoins" key="rewardGameCoins" align="center" />
      <a-table-column title="完成时间" dataIndex="completeTime" key="completeTime" align="center"/>
    </a-table>

    <div style="display: flex; align-items: center; justify-content: flex-end; margin-top: 16px;">
      <span style="margin-right: 8px;">共 {{ totalItems }}条</span>
      <a-pagination
        v-model:current="currentPage"
        :total="totalItems"
        :page-size="pageSize"
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
import { ref, computed } from 'vue';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons-vue';

const currentPage = ref(1);
const pageSize = ref(5);
const totalItems = ref(100);
const selectedGifts = ref([]);

const user_account = ref('');
const task_name = ref('');
const time = ref([]);

const dataSource = ref([
  {
    key: '1',
    task_name: '1',
    userID: '100004',
    nickName: '企鹅飞飞',
    taskName: '打码限时',
    rewardGameCoins: '1',
    completeTime: '2024-08-20 18:07:30',
  },
]);

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return dataSource.value.slice(start, end);
});

// Methods
const onGiftSelect = (key) => {
  if (selectedGifts.value.includes(key)) {
    selectedGifts.value = selectedGifts.value.filter(k => k !== key);
  } else {
    selectedGifts.value.push(key);
  }
};

const onSearch = () => {
  // Implement search logic
};

const onReset = () => {
  user_account.value = '';
  task_name.value = '';
  time.value = [];
  // Implement reset logic
};

const handlePageChange = (page) => {
  currentPage.value = page;
};

const handleSizeChange = (current, size) => {
  pageSize.value = size;
  currentPage.value = 1; // Reset to the first page when page size changes
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
