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
        <a-form-item label="中奖人ID">
          <a-input v-model:value="winnerID" placeholder="请输入中奖人ID" />
        </a-form-item>
      </a-col>

      <a-col :flex="auto" style="margin-left: 20px;">
        <a-form-item label="中奖人昵称">
          <a-input v-model:value="winPosition" placeholder="请输入中奖人昵称" />
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
      <a-table-column title="中奖人ID" dataIndex="winnerID" key="winnerID" align="center" />
      <a-table-column title="昵称" dataIndex="nickname" key="nickname" align="center" />
      <a-table-column title="中奖挡位" dataIndex="winPosition" key="winPosition" align="center" />
      <a-table-column title="中奖类型" dataIndex="winType" key="winType" align="center" />
      <a-table-column title="中奖金额" dataIndex="winAmount" key="winAmount" align="center" />
      <a-table-column title="中奖时间" dataIndex="winTime" key="winTime" align="center" />
    </a-table>

    <div style="display: flex; align-items: center; justify-content: flex-end; margin-top: 16px;">
      <span style="margin-right: 8px;">共 {{ totalItems }}条</span>
      <a-pagination
        v-model:current="currentPage"
        :total="totalItems"
        :page-size="pageSize"
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

// Reactive state variables
const currentPage = ref(1)
const pageSize = ref(15)
const totalItems = 100
const activity_time = ref('')

const winnerID = ref('')
const winPosition = ref('')
const winType = ref('')

// Table data
const dataSource = ref([
  {
    key: '1',
    sorting: '1',
    winnerID: '300001',
    nickname: '张张',
    winPosition: '1000元挡位',
    winType: '抽中现金',
    winAmount: '0.01元红包',
    winTime: '2024.05.25 10:00:00',
  },
  {
    key: '2',
    sorting: '2',
    winnerID: '300002',
    nickname: '丽丽',
    winPosition: '1000元挡位',
    winType: '抽中金币',
    winAmount: '0.01个金币',
    winTime: '2024.05.25 10:00:00',
  },
  {
    key: '3',
    sorting: '3',
    winnerID: '300003',
    nickname: '徐徐',
    winPosition: '1000元挡位',
    winType: '抽中幸运值',
    winAmount: '0.01个幸运值',
    winTime: '2024.05.25 10:00:00',
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
  console.log('Search clicked with:', winnerID.value, winPosition.value)
  // Implement search logic here
}

const onReset = () => {
  winnerID.value = ''
  winPosition.value = ''
  winType.value = ''
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

