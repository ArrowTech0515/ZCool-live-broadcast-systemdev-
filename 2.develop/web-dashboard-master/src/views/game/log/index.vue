<template>
  <a-card style="margin-bottom: 1%;">
    <div style="margin-bottom: 20px; font-weight: bold; font-size: 16px;">查询表格</div>

    <a-col type="flex">
      <a-row :gutter="32" type="flex">
        <!-- First Column -->
        <a-col :flex="1">
          <a-form-item label="商户" :label-col="{span: 6}">
            <a-select v-model:value="merchantId" placeholder="请选择商户" />
          </a-form-item>
          <a-form-item label="游戏名" :label-col="{span: 6}">
            <a-input v-model:value="number_id" placeholder="请输入游戏名" />
          </a-form-item>
        </a-col>

        <a-col :flex="1">
          <a-form-item label="渠道" :label-col="{span: 6}">
            <a-select v-model:value="channel" placeholder="请选择渠道" />
          </a-form-item>
          <a-form-item label="单号" :label-col="{span: 6}">
            <a-input v-model:value="orderId" placeholder="请输入单号" />
          </a-form-item>
        </a-col>

        <a-col :flex="1">
          <a-form-item label="游戏平台" :label-col="{span: 6}" :wrapper-col="{span: 17}">
            <a-select v-model:value="order_number" placeholder="请选择游戏平台" />
          </a-form-item>
          <a-form-item label="时间" :label-col="{span: 6}">
            <a-range-picker v-model:value="dateRange" :placeholder="['开始日期', '结束日期']" />
          </a-form-item>
        </a-col>

        <!-- Separator -->
        <!-- <a-col>
          <a-divider type="vertical" :style="{ height: '80%', margin: 'auto 0' }" />
        </a-col> -->

        <!-- Second Column -->
        <a-col :flex="auto">
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
    </a-col>

      <!-- Statistics -->
      <a-flex gap="large" align="start" horizontal style="margin-bottom: -40px;">
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
    </a-card>

    <!-- Table Setup -->
    <a-table :data-source="paginatedData" :pagination="false">
      <a-table-column title="编号ID" dataIndex="number_id" key="number_id" align="center" />
      <a-table-column title="游戏ID" dataIndex="game_id" key="game_id" align="center" />
      <a-table-column title="游戏平台" dataIndex="game_platform" key="game_platform" align="center" />
      <a-table-column title="单号" dataIndex="order_number" key="order_number" align="center" />
      <a-table-column title="游戏名" dataIndex="game_name" key="game_name" align="center" />
      <a-table-column title="操作时间" dataIndex="operate_time" key="operate_time" align="center" />
      <a-table-column title="下注总金额" dataIndex="total_bet_amount" key="total_bet_amount" align="center" />
      <a-table-column title="中奖金额" dataIndex="win_amount" key="win_amount" align="center" />
      <a-table-column title="有效下注" dataIndex="valid_bets" key="valid_bets" align="center" />
      <a-table-column title="小费" dataIndex="tips" key="tips" align="center" />
      <a-table-column title="取消下注" dataIndex="cancel_bet" key="cancel_bet" align="center" />
      <a-table-column title="下注房间ID" dataIndex="bet_room_id" key="bet_room_id" align="center" />
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
</template>

<script lang="jsx" setup>
import { ref, computed } from 'vue'
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons-vue'

const merchantId = ref(null)
const number_id = ref('')
const channel = ref(null)
const orderId = ref('')
const order_number = ref(null)
const dateRange = ref([])

const currentPage = ref(1)
const pageSize = ref(5)
const totalItems = ref(100)

const dataSource = ref([
  {
    key: 1,
    number_id: '447',
    game_id: '7206054',
    game_platform: 'FC发财电子',
    order_number: '7-2705-2',
    game_name: '',
    operate_time: '2023-10-04 17:23',
    total_bet_amount: -2,
    win_amount: 0,
    valid_bets: 2,
    tips: 0,
    cancel_bet: '',
    bet_room_id: 'iui090',
  },
  {
    key: 2,
    number_id: '447',
    game_id: '7206054',
    game_platform: 'FC发财电子',
    order_number: '7-2705-1',
    game_name: '',
    operate_time: '2023-10-04 17:23',
    total_bet_amount: -2,
    win_amount: 24,
    valid_bets: 2,
    tips: 0,
    cancel_bet: '',
    bet_room_id: 'diufj12',
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
  number_id.value = ''
  channel.value = null
  orderId.value = ''
  order_number.value = null
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
