<template>
  <transition name="fade-slide" mode="out-in">
    <div v-if="!showEditPage && !showDataPage">
      <a-card style=" margin-bottom: 1%;">
        <a-row type="flex" style="align-items: center; margin-bottom: -20px;">

            <a-col  style="margin-left: 20px;">
              <a-form-item label="活动名称">
                <a-input v-model:value="activity_id" placeholder="请输入活动名称" />
              </a-form-item>
            </a-col>

            <a-col :flex="auto"  style="margin-left: 20px;">
              <a-form-item label="状态">
                <a-select v-model:value="activity_status" value="all">
                  <a-select-option value="all">{{ ENUM.activity_status[1] }}</a-select-option>
                  <a-select-option value="active">{{ ENUM.activity_status[2] }}</a-select-option>
                  <a-select-option value="enabled">{{ ENUM.activity_status[3] }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>

          <a-col :flex="auto"  style="margin-left: 20px;">
            <a-form-item>
              <a-button type="primary" block @click="onSearch">
                <SearchOutlined /> 查询
              </a-button>
            </a-form-item>
          </a-col>

          <a-col :flex="auto"  style="margin-left: 20px;">
            <a-form-item>
              <a-button block @click="onReset">
                <ReloadOutlined /> 重置
              </a-button>
            </a-form-item>
          </a-col>
          <a-col :flex="auto" style=" margin-left: auto;">
            <a-form-item>
              <a-button type="primary" block @click="onAdd">创建活动</a-button>
            </a-form-item>
          </a-col>
        </a-row>
        </a-card>

        <!-- Your existing layout and table setup -->
        <a-table :data-source="paginatedData" :pagination="false">
          <a-table-column title="活动名称" dataIndex="activityName" key="activityName" align="center" />
          <a-table-column title="活动封面" dataIndex="activityCover" key="activityCover" align="center" />
          <a-table-column title="活动时间" dataIndex="activityTime" key="activityTime" align="center" />
          <a-table-column title="活动状态" dataIndex="activityStatus" key="activityStatus" align="center">
            <template #default="{ record }"> <!-- Access each row's data with `record` -->
              <a-tag v-if="record.activityStatus === ENUM.activity_status[2]" color='green'>{{ record.activityStatus }}</a-tag>
              <a-tag v-else-if="record.activityStatus === ENUM.activity_status[3]" color='red'>{{ record.activityStatus }}</a-tag>
            </template>
          </a-table-column>
          <a-table-column title="操作账号" dataIndex="operationAccount" key="operationAccount" align="center" />
          <a-table-column title="创建时间" dataIndex="creationTime" key="creationTime" align="center" />
          <a-table-column title="操作" key="operate" align="center">
            <template #default="{ record }"> <!-- Access each row's data with `record` -->
              <span
                style="text-decoration: underline; color: #1890ff; margin-right: 8px; cursor: pointer;"
                @click="handleOperation('数据', record)"
              >
                数据
              </span>
              <span
                style="text-decoration: underline; color: green; cursor: pointer;"
                @click="handleOperation('编辑', record)"
              >
                编辑
              </span>
            </template>
          </a-table-column>
        </a-table>

        <div style="display: flex; align-items: center; justify-content: flex-end; margin-top: 16px;">
          <span style="margin-right: 8px;">共 {{totalItems}}条</span>
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
        <dataPage  @back="onBackToMainPage1" @confirm="handleConfirm" @reject="handleReject" />
      </div>

      <div v-else>
        <editPage :formData="selectedActivity" @back="onBackToMainPage2" @confirm="handleConfirm" @reject="handleReject" />
      </div>
    </transition>
</template>

<script lang="jsx" setup>
import { ref, computed } from 'vue';
import editPage from './editPage.vue';
import dataPage from './dataPage.vue';

// States for inputs
const activity_id = ref('') // Initialize as an empty string
const activity_status = ref('all') // Initialize the activity status to 'all'

// States for pagination and data
const currentPage = ref(1)
const pageSize = ref(5)
const totalItems = ref(100)

// Operation handling for "数据" and "编辑"
const showEditPage = ref(false)
const showDataPage = ref(false)

const selectedActivity = ref(null) // Ref to store the selected activity

const dataSource = ref([
  {
    key: '1',
    activityName: '充值活动',
    activityCover: '登录任务',
    activityTime: '2012-12-12 12:21——2012-12-12 12:21',
    activityStatus: '活动中',
    operationAccount: '管理员-张三',
    creationTime: '2012-12-12 12:21:21',
    operate: '数据 编辑',
  },
]);

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return dataSource.value.slice(start, end);
});

const onAdd = () => {
  showEditPage.value = true; // Switch to the add strategy view
};

const onSearch = () => {
  console.log('Search clicked with Activity ID:', activity_id.value);
  // Implement search logic
};

const onReset = () => {
  console.log('Reset2 clicked');
  activity_id.value = ''; // Reset the activity_id input
  activity_status.value = 'all'; // Reset the activity_status select
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
    showEditPage.value = true; // Switch to the edit page view
  } else if (operation === "数据") {
    showDataPage.value = true; // Switch to the data page view
  }
};

const onBackToMainPage1 = () => {
  showDataPage.value = false; // Switch back to the main table view
};

const onBackToMainPage2 = () => {
  showEditPage.value = false; // Switch back to the main table view
};

const handleConfirm = () => {
  // Implement confirm logic
};

const handleReject = () => {
  // Implement reject logic
};
</script>


<style scoped>
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
