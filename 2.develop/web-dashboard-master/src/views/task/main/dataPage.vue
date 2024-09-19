<template>
  <a-card style=" margin-bottom: 1%;">
    <template #title>
      <div style="display: flex; align-items: center; white-space: nowrap; ">
        <a-button
          type="link"
          style="font-size: 18px; margin-right: 8px;"
          @click="handleBack"
        >
          <span style="font-size: 20px; font-weight: bold; margin-left: 8px;">&lt;</span>
        </a-button>
        <div style="flex-grow: 1; text-align: center;">
          <span style="font-size: 20px; font-weight: bold;">任务数据</span>
        </div>
      </div>
    </template>

    <a-row :gutter="16" :type="flex" style="justify-content: flex-end; align-items: center; margin-left: 20px; margin-bottom: -20px;" >
      <a-col :flex="1">
        <a-form-item label="任务ID">
          <a-input v-model:value="taskID" placeholder="请输入任务ID" />
        </a-form-item>
      </a-col>
      
      <a-col :flex="1">
        <a-form-item label="用户ID">
          <a-input v-model:value="userID" placeholder="请输入用户ID" />
        </a-form-item>
      </a-col>

      <a-col :flex="1">
        <a-form-item label="用户昵称">
          <a-input v-model:value="nickName" placeholder="请输入用户昵称" />
        </a-form-item>
      </a-col>

      <a-col :flex="auto">
        <a-form-item label="时间">
          <a-range-picker 
            v-model:value="time"
            :placeholder="['开始时间', '结束时间']"
          />
        </a-form-item>
      </a-col>

      <a-row :span="6">
        <a-col style="margin-right: 20px;">
          <a-form-item>
            <a-button type="primary" block @click="onSearch"><SearchOutlined/>查询</a-button>
          </a-form-item>
        </a-col>
        <a-col style="margin-right: 20px;">
          <a-form-item>
            <a-button type="default" block @click="onReset"><ReloadOutlined/>重置</a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-row>
  </a-card>

    <a-table :data-source="paginatedData" :pagination="false">
      <a-table-column title="任务ID" dataIndex="taskID" key="taskID" align="center" />
      <a-table-column title="任务名称" dataIndex="taskName" key="taskName" align="center" />
      <a-table-column title="用户ID" dataIndex="userID" key="userID" align="center"/>
      <a-table-column title="用户昵称" dataIndex="nickName" key="nickName" align="center" />
      <a-table-column title="任务奖励" dataIndex="taskReward" key="taskReward" align="center" />
      <a-table-column title="领取时间" dataIndex="receiptTime" key="receiptTime" align="center"/>
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

const emit = defineEmits(['back'])

const currentPage = ref(1);
const pageSize = ref(5);
const totalItems = ref(100);

const taskID = ref('');
const userID = ref('');
const nickName = ref('');
const time = ref([]);

const dataSource = ref([
  {
    key: '1',
    taskID: '4234324',
    taskName: 'XXX任务',
    userID: '232312',
    nickName: '大大',
    taskReward: '10钻石',
    receiptTime: '2012-12-12 12:21:21',
  },
  {
    key: '2',
    taskID: '4234325',
    taskName: 'XXX任务',
    userID: '232313',
    nickName: '发生发顺丰',
    taskReward: '10钻石',
    receiptTime: '2012-12-12 12:21:21',
  },
  {
    key: '3',
    taskID: '4234326',
    taskName: 'XXX任务',
    userID: '232314',
    nickName: '大大',
    taskReward: '10钻石',
    receiptTime: '2012-12-12 12:21:21',
  },
]);

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return dataSource.value.slice(start, end);
});

// Methods
const onSearch = () => {
  // Implement search logic
};

const onReset = () => {
  taskID.value = '';
  userID.value = '';
  nickName.value = '';
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

const handleBack = () => {
  // Handle the back action here
  // For example, navigate to the previous page:
  emit('back') // Emit the back event to the parent component
}
</script>

<style scoped>
/* Add any custom styles here */
</style>
