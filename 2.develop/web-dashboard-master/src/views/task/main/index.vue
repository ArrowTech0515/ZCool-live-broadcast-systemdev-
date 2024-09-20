<template>
  <transition name="fade-slide" mode="out-in">
    <div v-if="!showEditPage && !showDataPage">
      <a-card style=" margin-bottom: 1%;">
        <a-row :gutter="24" :type="flex" style="margin-left: 2%; margin-bottom: -20px;">
          <!-- First Column -->
          <!-- <a-row :type="flex"> -->
          <a-col :flex="1">
            <a-form-item label="任务ID">
              <a-input v-model:value="task_id" placeholder="请输入任务ID" />
            </a-form-item>
          </a-col>
          
          <a-col :flex="1">
            <a-form-item label="名称搜索">
              <a-input v-model:value="task_name" placeholder="请输入名称搜索" />
            </a-form-item>
          </a-col>

          <a-col :span="5">
            <a-form-item label="任务" >
              <a-select v-model:value="task_type" value="all">
                <a-select-option value="all">全部机制</a-select-option>
                <a-select-option value="active">每日循环任务</a-select-option>
                <a-select-option value="enabled"> 一次性任务</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :span="5">
            <a-form-item label="状态" >
              <a-select v-model:value="status" value="all">
                <a-select-option value="all">全部状态</a-select-option>
                <a-select-option value="active">进行中</a-select-option>
                <a-select-option value="enabled">已结束</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :flex="auto">
            <a-form-item label="时间" >
              <a-range-picker 
                v-model:value="time"
                :placeholder="['开始时间', '结束时间']"
              />
            </a-form-item>
          </a-col>

          <a-col :flex="auto">
              <a-form-item>
                <a-button type="primary" block @click="onSearch"><SearchOutlined/>查询</a-button>
              </a-form-item>
          </a-col>
          <a-col :flex="auto">
              <a-form-item>
                <a-button type="default" block @click="onReset"><ReloadOutlined/>重置</a-button>
              </a-form-item>
          </a-col>
          <!-- </a-row> -->
          <a-row>
            <a-col :flex="auto" style="margin-left: 20px;">
                <a-form-item>
                  <a-button type="primary" block @click="onAdd">添加任务</a-button>
                </a-form-item>
            </a-col>
          </a-row>
        </a-row>
      </a-card>

        <!-- Your existing layout and table setup -->
      <div class="scroll-container"> <!-- Wrapper for horizontal scroll -->
        <a-table 
          :data-source="paginatedData" 
          :pagination="false"
          :scroll="{ x: 'max-content' }"
          >
          <a-table-column title="任务ID" dataIndex="taskID" key="taskID" align="center" />
          <a-table-column title="任务名称" dataIndex="taskName" key="taskName" align="center" />
          <a-table-column title="循环机制" dataIndex="circular" key="circular" align="center"/>
          <a-table-column title="参与用户" dataIndex="participating" key="participating" align="center" />
          <a-table-column title="任务奖励" dataIndex="taskReward" key="taskReward" align="center" />
          <a-table-column title="任务状态" dataIndex="taskStatus" key="taskStatus" align="center" />
          <a-table-column title="任务次数" dataIndex="taskTimes" key="taskTimes" align="center"/>
          <a-table-column title="任务时间" dataIndex="taskTime" key="taskTime" align="center"/>
          <a-table-column title="更新时间" dataIndex="updateTime" key="updateTime" align="center"/>
          <a-table-column title="操作账号" dataIndex="operationAccount" key="operationAccount" align="center"/>
          <a-table-column title="操作" dataIndex="operate" key="operate" align="center"/>

          <template #bodyCell="{ column, text }">
            <span v-if="column.dataIndex === 'operate'">
              <span style="text-decoration: underline;color: #1890ff; margin-right: 8px; cursor: pointer;" @click="handleOperation('数据')">数据</span>
              <span style="text-decoration: underline;color: green; cursor: pointer;" @click="handleOperation('编辑')">编辑</span>
            </span>
            <span v-else-if="column.dataIndex === 'taskStatus'">
              <a-tag v-if="text === '进行中'" color='green'>{{ text }}</a-tag>
              <a-tag v-else-if="text === '已结束'" color='red'>{{ text }}</a-tag>
            </span>
            <!-- Default rendering for other columns -->
            <span v-else>{{ text }}</span>
          </template>
        </a-table>
      </div>

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
    </div>

    <div v-else-if="showDataPage">
      <dataPage
        @back="onBackToMainPage1"
        @confirm="handleConfirm"
        @reject="handleReject" />
    </div>

    <div v-else>
      <editPage
        :operationType="operationType"
        @back="onBackToMainPage2"
        @confirm="handleConfirm"
        @reject="handleReject" />
    </div>
  </transition>
</template>

<script setup lang="jsx">

import { ref, computed } from 'vue';
import editPage from './editPage.vue';
import dataPage from './dataPage.vue';

const showEditPage = ref(false);
const showDataPage = ref(false);
const operationType = ref('');

const currentPage = ref(1);
const pageSize = ref(5);
const totalItems = ref(100);

const task_id = ref('');
const task_name = ref('');
const task_type = ref('all');
const status = ref('all');
const time = ref([]);

const dataSource = ref([
  {
    key: '1',
    taskID: '1',
    taskName: '登录任务',
    circular: '每日循环任务',
    participating: '全部用户',
    taskReward: '10钻石',
    taskStatus: '进行中',
    taskTimes: '1',
    taskTime: '永久有效',
    updateTime: '2012-12-12 12:21:21',
    operationAccount: '管理员-张三',
    operate: '数据 编辑',
  },
  {
    key: '2',
    taskID: '2',
    taskName: '打赏礼物',
    circular: '一次性任务',
    participating: '新用户',
    taskReward: '改名卡',
    taskStatus: '已结束',
    taskTimes: '2',
    taskTime: '2012-12-12 12:21——2012-12-12 12:2',
    updateTime: '2012-12-12 12:21:21',
    operationAccount: '管理员-张三',
    operate: '数据 编辑',
  },
  {
    key: '3',
    taskID: '3',
    taskName: '观看时长',
    circular: '每日循环任务',
    participating: '新用户',
    taskReward: '10钻石',
    taskStatus: '进行中',
    taskTimes: '1',
    taskTime: '永久有效',
    updateTime: '2012-12-12 12:21:21',
    operationAccount: '管理员-张三',
    operate: '数据 编辑',
  },
]);

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return dataSource.value.slice(start, end);
});

// Methods
const onAdd = () => {
  operationType.value = '添加';
  showEditPage.value = true;
};

const onSearch = () => {
  // Implement search logic
};

const onReset = () => {
  task_id.value = ''
  task_name.value = ''
  task_type.value = 'all'
  status.value = 'all'
  time.value = []
  console.log("onReset : " + task_name.value)

  // Implement reset logic
};

const handlePageChange = (page) => {
  currentPage.value = page;
};

const handleSizeChange = (current, size) => {
  pageSize.value = size;
  currentPage.value = 1; // Reset to the first page when page size changes
};

const handleOperation = (operation) => {
  if (operation === "编辑") {
    operationType.value = '编辑';
    showEditPage.value = true;
  } else if (operation === "数据") {
    showDataPage.value = true;
  }
};

const onBackToMainPage1 = () => {
  showDataPage.value = false; // Switch back to the main table view
};

const onBackToMainPage2 = () => {
  showEditPage.value = false; // Switch back to the main table view
};
</script>

<style scoped>

.scroll-container {
  overflow-x: auto; /* Enable horizontal scrolling */
}

.row {
  display: contents;
}

.cell {
  padding: 8px;
  white-space: pre-line; /* Ensure text wraps in each cell */
}

/* Add transition effects */
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.fade-slide-enter, .fade-slide-leave-to /* .fade-slide-leave-active in <2.1.8 */ {
  opacity: 0;
  transform: translateX(10px);
}
</style>
