<template>
  <transition name="fade-slide" mode="out-in">
    <div v-if="!showEditPage && !showDataPage">
      <a-card style="background-color: white; margin-bottom: 1%;">
        <a-row type="flex" style="align-items: center; margin-bottom: -20px;">
          <a-form-item label="活动名称搜索" style="margin-left: 20px;">
            <a-input v-model:value="activity_id" placeholder="请输入活动名称搜索" />
          </a-form-item>

          <a-form-item label="状态" style="margin-left: 20px;">
            <a-select v-model:value="activity_status" default-value="all">
              <a-select-option value="all">{{ ENUM.activity_status[1] }}</a-select-option>
              <a-select-option value="active">{{ ENUM.activity_status[2] }}</a-select-option>
              <a-select-option value="enabled">{{ ENUM.activity_status[3] }}</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item style="margin-left: 20px;">
            <a-button type="primary" block @click="onSearch">
              <SearchOutlined /> 查询
            </a-button>
          </a-form-item>

          <a-form-item style="margin-left: 20px;">
            <a-button block @click="onReset">
              <ReloadOutlined /> 重置
            </a-button>
          </a-form-item>
        </a-row>
      </a-card>
        <a-table :data-source="paginatedData" :pagination="false">
          <a-table-column title="活动名称" dataIndex="activityName" key="activityName" align="center" />
          <a-table-column title="活动时间" dataIndex="activityTime" key="activityTime" align="center" />
          <a-table-column title="活动类型" dataIndex="activityType" key="activityType" align="center" />
          <a-table-column title="活动状态" dataIndex="activityStatus" key="activityStatus" align="center" />
          <a-table-column title="更新时间" dataIndex="creationTime" key="creationTime" align="center" />
          <a-table-column title="操作账号" dataIndex="operationAccount" key="operationAccount" align="center" />
          <a-table-column title="操作" key="operate" align="center">
            <template #default="{ record }">
              <span
                style="text-decoration: underline; color: blue; margin-right: 8px; cursor: pointer;"
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
        <dataPage @back="onBackToMainPage1" @confirm="handleConfirm" @reject="handleReject" />
      </div>
      <div v-else>
        <editPage :formData="selectedActivity" @back="onBackToMainPage2" @confirm="handleConfirm" @reject="handleReject" />
      </div>
    </transition>
</template>

<script lant="ts" setup>
import { ref, computed } from 'vue'
import editPage from './editPage.vue'
import dataPage from './dataPage.vue'

// States for inputs
const activity_id = ref('')
const activity_status = ref('all')

// Component references
const showEditPage = ref(false)
const showDataPage = ref(false)

// Pagination and data states
const currentPage = ref(1)
const pageSize = ref(5)
const totalItems = ref(100)

// Data source array
const dataSource = ref([
  {
    key: '1',
    activityName: '充值活动',
    activityType: '登录任务',
    activityTime: '2012-12-12  12:21——2012-12-12  12:21',
    activityStatus: '活动中',
    operationAccount: '管理员-张三',
    creationTime: '2012-12-12  12:21:21',
    operate: '数据 编辑',
  },
  {
    key: '2',
    activityName: '充值活动',
    activityType: '登录任务',
    activityTime: '2012-12-12  12:21——2012-12-12  12:21',
    activityStatus: '已结束',
    operationAccount: '管理员-张三',
    creationTime: '2012-12-12  12:21:21',
    operate: '数据 编辑',
  },
])

// Computed property for paginated data
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return dataSource.value.slice(start, end)
})

// Methods
const onSearch = () => {
  console.log('Search clicked with Activity ID:', activity_id.value)
}

const onReset = () => {
  activity_id.value = ''
  activity_status.value = 'all'
}

const handlePageChange = (page) => {
  currentPage.value = page
}

const handleSizeChange = (current, size) => {
  pageSize.value = size
  currentPage.value = 1
}

const handleOperation = (operation, record) => {
  if (operation === '编辑') {
    showEditPage.value = true
  } else if (operation === '数据') {
    showDataPage.value = true
  }
}

const onBackToMainPage1 = () => {
  showDataPage.value = false
}

const onBackToMainPage2 = () => {
  showEditPage.value = false
}
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.fade-slide-enter,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
</style>
