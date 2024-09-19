<template>
  <a-card style=" margin-bottom: 1%;">
    <template #title>
      <div style="display: flex; align-items: center; white-space: nowrap;">
        <a-button
          type="link"
          style="font-size: 18px; margin-right: 8px;"
          @click="handleBack"
        >
          <span style="font-size: 20px; font-weight: bold; margin-left: 8px;">&lt;</span>
        </a-button>
        <div style="flex-grow: 1; text-align: center;">
          <span style="font-size: 20px; font-weight: bold;">充值活动数据</span>
        </div>
      </div>
    </template>

    <a-row style="margin-bottom: -20px;">
      <!-- First Column -->
      <a-row :flex="auto">
        <a-col style="margin-left: 20px;">
          <a-form-item label="用户ID">
            <a-input v-model:value="user_id" placeholder="请输入用户ID" />
          </a-form-item>
        </a-col>
        <a-col style="margin-left: 20px;">
          <a-form-item label="用户昵称">
            <a-input v-model:value="nick_name" placeholder="请输入用户昵称" />
          </a-form-item>
        </a-col>

        <a-col style="margin-left: 20px;">
          <a-form-item label="时间">
            <a-range-picker :placeholder="['开始时间', '结束时间']">
            <!-- options here -->
            </a-range-picker>
          </a-form-item>
        </a-col>
      </a-row>
      <a-col :flex="auto" style="margin-left: 20px;">
        <a-form-item>
          <a-button type="primary" block @click="onSearch">
            <SearchOutlined /> 查询
          </a-button>
        </a-form-item>
      </a-col>

      <a-col :flex="auto" style="margin-left: 20px;">
        <a-form-item>
          <a-button block @click="onReset">
            <ReloadOutlined /> 重置
          </a-button>
        </a-form-item>
      </a-col>
    </a-row>
  </a-card>

  <!-- Your existing layout and table setup -->
  <a-table :data-source="paginatedData" :pagination="false">
    <a-table-column title="用户ID" dataIndex="activityName" key="activityName" align="center" />
    <a-table-column title="用户昵称" dataIndex="activityCover" key="activityCover" align="center"/>
    <a-table-column title="充值金额" dataIndex="activityTime" key="activityTime" align="center" />
    <a-table-column title="赠送金额" dataIndex="activityStatus" key="activityStatus" align="center" />
    <a-table-column title="赠送时间" dataIndex="operationAccount" key="operationAccount" align="center">
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
</template>

<script lang="jsx" setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['back'])  // Define the 'back' event

// State variables
const currentPage = ref(1)
const pageSize = ref(5)
const totalItems = ref(100)

const user_id = ref('') // Initialize as an empty string
const nick_name = ref('') // Initialize the activity status to 'all'
const time = ref('') // Initialize the activity status to 'all'

// Data source array
const dataSource = ref([
  {
    key: '1',
    activityName: '232312',
    activityCover: '大大',
    activityTime: '4324234',
    activityStatus: '4324234',
    operationAccount: '2012-12-12 12:21',
  },
  {
    key: '2',
    activityName: '232312',
    activityCover: '发生发顺丰',
    activityTime: '4324234',
    activityStatus: '4324234',
    operationAccount: '2012-12-12 12:21',
  },
  {
    key: '3',
    activityName: '232312',
    activityCover: '大大',
    activityTime: '43242',
    activityStatus: '43242',
    operationAccount: '2012-12-12 12:21',
  },
])

// Computed property for pagination
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return dataSource.value.slice(start, end)
})

// Methods
const onSearch = () => {
  // Implement search logic
}

const onReset = () => {
  console.log('Reset clicked')
  user_id.value = '' // Reset the user_id input
  nick_name.value = '' // Reset the nickName input
  time.value = ''
  // Implement reset logic
}

const handlePageChange = (page) => {
  currentPage.value = page
}

const handleSizeChange = (current, size) => {
  pageSize.value = size
  currentPage.value = 1 // Reset to the first page when page size changes
}

const handleOperation = (operation) => {
  // Add logic for handling the operation (e.g., audit, lock)
  if (operation === '提现明细') {
    showReviewPage.value = true // Switch to the add strategy view
  }
}

const handleBack = () => {
  // Handle the back action here
  // For example, navigate to the previous page:
  emit('back') // Emit the back event to the parent component
}
</script>


<style scoped>

</style>
