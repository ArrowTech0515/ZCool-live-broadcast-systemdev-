<template>
  <transition name="fade-slide" mode="out-in">
    <div v-if="!showEditPage && !showDataPage">
      <a-card style=" margin-bottom: 1%;">
        <a-row type="flex" style="align-items: center; margin-bottom: -20px;">
          
          <a-col  style="margin-left: 20px;">
            <a-form-item label="活动名称">
              <a-input v-model:value="activityName" placeholder="请输入活动名称" />
            </a-form-item>
          </a-col>  
          
          <a-col  style="margin-left: 20px;">
            <a-form-item label="金额">
              <a-input-number v-model:value="activityAmount" placeholder="请输入金额" />
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
        </a-row>
      </a-card>

        <!-- Table and Pagination... -->
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
          <!-- Custom "操作" Column -->
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

        <!-- Pagination Controls -->
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

      <!-- Data Page and Edit Page transitions -->
      <div v-else-if="showDataPage">
        <dataPage  @back="onBackToMainPage1" @confirm="handleConfirm" @reject="handleReject" />
      </div>

      <div v-else>
        <editPage :formData="selectedActivity" @back="onBackToMainPage2" @confirm="handleConfirm" @reject="handleReject" />
      </div>
  </transition>
</template>


<script setup lang="ts">
import { ref, computed } from 'vue'
import editPage from './editPage.vue'
import dataPage from './dataPage.vue'

defineProps({
  formData: {
      type: Object,
      default: () => ({
        activityName: '',
        activityType: '',
        activityTime: [null, null],
      }),
    },
})

const isPermanent = ref(false)

// States for inputs
const activity_id = ref('') // Initialize as an empty string
const activity_status = ref('all') // Initialize the activity status to 'all'
const activity_time = ref(null)

// States for pagination and data
const currentPage = ref(1)
const pageSize = ref(5)
const totalItems = ref(100)

// Operation handling for "数据" and "编辑"
const showEditPage = ref(false)
const showDataPage = ref(false)

const selectedActivity = ref(null) // Ref to store the selected activity

// Data source for the table
const dataSource = ref([
  {
    key: '1',
    activityName: '赠送贵族活动',
    activityCover: '登录任务',
    activityTime: '2012-12-12  12:21——2012-12-12  12:21',
    activityStatus: ENUM.activity_status[2],//'活动中',
    operationAccount: '管理员-张三',
    creationTime: '2012-12-12  12:21:21',
    operate: '数据 编辑',
  },
  {
    key: '2',
    activityName: '赠送贵族活动',
    activityCover: '登录任务',
    activityTime: '2012-12-12  12:21——2012-12-12  12:21',
    activityStatus: ENUM.activity_status[3],
    operationAccount: '管理员-张三',
    creationTime: '2012-12-12  12:21:21',
    operate: '数据 编辑',
  },
])

// Computed value to return paginated data
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return dataSource.value.slice(start, end)
})

// Search and Reset methods
const onSearch = () => {
  console.log('Search clicked with Activity ID:', activity_id.value)
}

const onReset = () => {
  console.log('Reset clicked')
  activity_id.value = '' // Reset the activity_id input
  activity_status.value = 'all' // Reset the activity_status select
  activity_time.value = null
}

const parseActivityTime = (timeStr: string) => {
  const times = timeStr.split('——') // Split the time range string by '——'
  if (times.length === 2) {
    const start = new Date(times[0].trim()) // Convert to Date object
    const end = new Date(times[1].trim()) // Convert to Date object
    if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
      return [start, end] // Return array of Date objects
    }
  }
  return [null, null] // Return null if parsing fails
}

// Pagination methods
const handlePageChange = (page: number) => {
  currentPage.value = page
}

const handleSizeChange = (current: number, size: number) => {
  pageSize.value = size
  currentPage.value = 1 // Reset to the first page when page size changes
}

const handleOperation = (operation: string, record: any) => {
  if (operation === '编辑') {
    selectedActivity.value = record // Set the selected record data
    console.log("activityName : " + selectedActivity.value.activityName)

    // Parse activityTime and store it in selectedActivity for a-range-picker
    const parsedTime = parseActivityTime(record.activityTime)

    console.log("parsedTime : " + parsedTime)

    if (parsedTime) {
      selectedActivity.value.activityTime = parsedTime // Set the parsed date range
      console.log("selectedActivity.value.activityTime : " + selectedActivity.value.activityTime)
    } else {
      console.error('Invalid activityTime format:', record.activityTime)
    }

    showEditPage.value = true

  } else if (operation === '数据') {
    showDataPage.value = true
  }
}

// Handlers for going back from data or edit pages
const onBackToMainPage1 = () => {
  showDataPage.value = false
}

const onBackToMainPage2 = () => {
  showEditPage.value = false
}
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
