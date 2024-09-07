<template>
  <a-card style="background-color: white;">
    <a-col :gutter="16" type="flex">
      <a-row :gutter="16" type="flex">
        <!-- First Column -->
        <a-col :flex="1">
          <a-form-item label="商户">
            <a-select v-model:value="merchantId" placeholder="全部" />
          </a-form-item>
          <a-form-item label="游戏名">
            <a-input v-model:value="gameId" placeholder="请输入游戏名" />
          </a-form-item>
        </a-col>

        <a-col :flex="1">
          <a-form-item label="渠道">
            <a-select v-model:value="channel" placeholder="全部" />
          </a-form-item>
          <a-form-item label="单号">
            <a-input v-model:value="orderId" placeholder="请输入单号" />
          </a-form-item>
        </a-col>

        <a-col :flex="auto">
          <a-form-item label="游戏平台">
            <a-select v-model:value="platform" placeholder="全部" />
          </a-form-item>
          <a-form-item label="时间">
            <a-range-picker v-model:value="dateRange" :placeholder="['开始日期', '结束日期']" />
          </a-form-item>
        </a-col>

        <!-- Separator -->
        <a-col>
          <a-divider type="vertical" :style="{ height: '80%', margin: 'auto 0' }" />
        </a-col>

        <!-- Second Column -->
        <a-col :span="3">
          <a-form-item>
            <a-button type="primary" block @click="onSearch">
              <SearchOutlined /> 查询
            </a-button>
          </a-form-item>

          <a-form-item>
            <a-button block @click="onReset">
              <ReloadOutlined /> 重置
            </a-button>
          </a-form-item>
        </a-col>
      </a-row>

      <!-- Statistics -->
      <a-flex gap="large" align="start" horizontal>
        <a-form-item>
          <template #label><span style="font-weight: bold; font-size: 13px;">下注金额</span></template>
          <span style="font-weight: bold; font-size: 14px;">0</span>
        </a-form-item>
        <a-form-item>
          <template #label><span style="font-weight: bold; font-size: 13px;">中奖金额</span></template>
          <span style="font-weight: bold; font-size: 14px;">0</span>
        </a-form-item>
        <a-form-item>
          <template #label><span style="font-weight: bold; font-size: 13px;">有效下注金额</span></template>
          <span style="font-weight: bold; font-size: 14px;">0</span>
        </a-form-item>
        <a-form-item>
          <template #label><span style="font-weight: bold; font-size: 13px;">盈亏</span></template>
          <span style="font-weight: bold; font-size: 14px;">0</span>
        </a-form-item>
      </a-flex>
    </a-col>

    <!-- Table Setup -->
    <a-table :data-source="paginatedData" :pagination="false">
      <a-table-column title="编号ID" dataIndex="gameId" key="gameId" align="center" />
      <a-table-column title="游戏ID" dataIndex="gameType" key="gameType" align="center" />
      <a-table-column title="游戏平台" dataIndex="nBetting" key="nBetting" align="center" />
      <a-table-column title="单号" dataIndex="platform" key="platform" align="center" />
      <a-table-column title="游戏名" dataIndex="isLandscape" key="isLandscape" align="center" />
      <a-table-column title="操作时间" dataIndex="isBarLandscape" key="isBarLandscape" align="center" />
      <a-table-column title="下注总金额" dataIndex="isVisible" key="isVisible" align="center" />
      <a-table-column title="中奖金额" dataIndex="isSecondaryPage" key="isSecondaryPage" align="center" />
      <a-table-column title="取消下注" dataIndex="maintenanceStatus" key="maintenanceStatus" align="center" />
      <a-table-column title="下注房间ID" dataIndex="__ID" key="__ID" align="center" />
    </a-table>

    <div style="display: flex; align-items: center; justify-content: flex-end; margin-top: 16px;">
      <span style="margin-right: 8px;">共 {{ totalItems }}条</span>
      <a-pagination
        v-model:current="currentPage"
        :total="totalItems"
        :page-size="pageSize"
        show-size-changer
        :page-size-options="['5', '10', '20', '50', '100']"
        size="small"
        @change="handlePageChange"
        @show-size-change="handleSizeChange"
      />
    </div>
  </a-card>
</template>

<script lang="jsx" setup>
import { ref, computed } from 'vue'
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons-vue'

const merchantId = ref(null)
const gameId = ref('')
const channel = ref(null)
const orderId = ref('')
const platform = ref(null)
const dateRange = ref([])

const currentPage = ref(1)
const pageSize = ref(5)
const totalItems = ref(100)

const dataSource = ref([
{
          key: '1',
          gameId: '447',
          gameType: '7206054',
          nBetting: 'FC发财电子',
          platform: '7-2705-2',
          isLandscape: '鱼虾蟹',
          isBarLandscape: '2023-10-04 17:23',
          isVisible: '-2',
          isSecondaryPage: '0',
          maintenanceStatus: '2',
          order: '0',
          maintenanceTime: '否',
          __ID: 'iui090',
        },
        {
          key: '2',
          gameId: '447',
          gameType: '7206054',
          nBetting: 'FC发财电子',
          platform: '7-2705-2',
          isLandscape: '鱼虾蟹',
          isBarLandscape: '2023-10-04 17:23',
          isVisible: '-2',
          isSecondaryPage: '0',
          maintenanceStatus: '2',
          order: '0',
          maintenanceTime: '否',
          __ID: 'iui090',
        },
        {
          key: '3',
          gameId: '447',
          gameType: '7206054',
          nBetting: 'FC发财电子',
          platform: '7-2705-2',
          isLandscape: '鱼虾蟹',
          isBarLandscape: '2023-10-04 17:23',
          isVisible: '-2',
          isSecondaryPage: '0',
          maintenanceStatus: '2',
          order: '0',
          maintenanceTime: '否',
          __ID: 'iui090',
        },
        {
          key: '4',
          gameId: '447',
          gameType: '7206054',
          nBetting: 'FC发财电子',
          platform: '7-2705-2',
          isLandscape: '鱼虾蟹',
          isBarLandscape: '2023-10-04 17:23',
          isVisible: '-2',
          isSecondaryPage: '0',
          maintenanceStatus: '2',
          order: '0',
          maintenanceTime: '否',
          __ID: 'iui090',
        },
        {
          key: '5',
          gameId: '447',
          gameType: '7206054',
          nBetting: 'FC发财电子',
          platform: '7-2705-2',
          isLandscape: '鱼虾蟹',
          isBarLandscape: '2023-10-04 17:23',
          isVisible: '-2',
          isSecondaryPage: '0',
          maintenanceStatus: '2',
          order: '0',
          maintenanceTime: '否',
          __ID: 'iui090',
        },
  // Add more data here
])

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return dataSource.value.slice(start, end)
})

const onSearch = () => {
  // Implement search logic here
}

const onReset = () => {
  merchantId.value = null
  gameId.value = ''
  channel.value = null
  orderId.value = ''
  platform.value = null
  dateRange.value = []
}

const handlePageChange = (page) => {
  currentPage.value = page
}

const handleSizeChange = (current, size) => {
  pageSize.value = size
  currentPage.value = 1 // Reset to the first page when the page size changes
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
