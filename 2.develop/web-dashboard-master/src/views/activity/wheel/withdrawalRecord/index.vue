<template>
  <a-card style=" margin-bottom: 1%;">
    <a-row type="flex" style="margin-bottom: -20px;">
      <!-- First Column -->
      <a-col :flex="auto" style="margin-left: 20px;">
        <a-form-item label="时间">
          <a-range-picker 
            v-model:value="activity_time"
            :placeholder="['开始日期', '结束日期']">
            <!-- options here -->
          </a-range-picker>
        </a-form-item>
      </a-col>

      <a-col :flex="auto" style="margin-left: 20px;">
        <a-form-item label="提现人ID">
          <a-input v-model:value="withdrawerID" placeholder="请输入提现人ID" />
        </a-form-item>
      </a-col>

      <a-col :flex="auto" style="margin-left: 20px;">
        <a-form-item label="提现人昵称">
          <a-input v-model:value="withdrawPosition" placeholder="请输入提现人昵称" />
        </a-form-item>
      </a-col>

      <!-- Second Column -->
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
      <a-table-column title="排序" dataIndex="sorting" key="sorting" align="center" />
      <a-table-column title="提现人ID" dataIndex="withdrawerID" key="withdrawerID" align="center" />
      <a-table-column title="昵称" dataIndex="nickname" key="nickname" align="center" />
      <a-table-column title="提现挡位" dataIndex="withdrawPosition" key="withdrawPosition" align="center" />
      <a-table-column title="提现类型" dataIndex="withdrawType" key="withdrawType" align="center" />
      <a-table-column title="提现金额" dataIndex="withdrawAmount" key="withdrawAmount" align="center" />
      <a-table-column title="提现时间" dataIndex="withdrawTime" key="withdrawTime" align="center" />
    </a-table>

    <div style="display: flex; align-items: center; justify-content: flex-end; margin-top: 16px;">
      <span style="margin-right: 8px;">共 {{ totalItems }}条</span>
      <a-pagination
        v-model:current="currentPage.value"
        :total="totalItems"
        :page-size="pageSize.value"
        show-size-changer
        :page-size-options="['5', '10', '15', '50', '100']"
        :simple="false"
        size="small"
        @change="handlePageChange"
        @show-size-change="handleSizeChange"
      />
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons-vue'

// Reactive variables
const currentPage = ref(1)
const pageSize = ref(15)
const totalItems = 100
const activity_time = ref('')

const withdrawerID = ref('')
const withdrawPosition = ref('')
const withdrawType = ref('')

// Table data
const dataSource = ref([
  {
    key: '1',
    sorting: '1',
    withdrawerID: '300001',
    nickname: '张张',
    withdrawPosition: '1000元挡位',
    withdrawType: '提现',
    withdrawAmount: '1000元',
    withdrawTime: '2024.05.25 10:00:00',
  },
  {
    key: '2',
    sorting: '2',
    withdrawerID: '300002',
    nickname: '丽丽',
    withdrawPosition: '1000元挡位',
    withdrawType: '提现',
    withdrawAmount: '1000元',
    withdrawTime: '2024.05.25 10:00:00',
  },
  {
    key: '3',
    sorting: '3',
    withdrawerID: '300003',
    nickname: '徐徐',
    withdrawPosition: '1000元挡位',
    withdrawType: '提现',
    withdrawAmount: '1000元',
    withdrawTime: '2024.05.25 10:00:00',
  },
])

// Computed paginated data
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return dataSource.value.slice(start, end)
})

// Methods
const onSearch = () => {
  console.log('Search clicked with:', withdrawerID.value, withdrawPosition.value)
}

const onReset = () => {
  withdrawerID.value = ''
  withdrawPosition.value = ''
  withdrawType.value = ''
  activity_time.value = ''
}

const handlePageChange = (page: number) => {
  currentPage.value = page
}

const handleSizeChange = (current: number, size: number) => {
  pageSize.value = size
  currentPage.value = 1 // Reset to the first page when page size changes
}
</script>

<style scoped>
.expanded-row-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-left: 40px;
}

.row {
  display: contents;
}

.cell {
  padding: 8px;
  white-space: pre-line;
}
</style>
