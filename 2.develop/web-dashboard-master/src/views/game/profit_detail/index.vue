<template>
  <a-card style="margin-bottom: 1%;">
    <div style="margin-bottom: 20px; font-weight: bold; font-size: 16px;">查询表格</div>

    <a-row :gutter="32" type="flex" style="margin-bottom: -20px;">
      <!-- First Column -->
      <a-col :flex="1">
        <a-form-item label="商户" :label-col="{span: 6}">
          <a-select title="商户" v-model:value="merchant_id" placeholder="请选择商户">
            <!-- options here -->
          </a-select>
        </a-form-item>
        <a-form-item label="账号类型" :label-col="{span: 6}">
          <a-select v-model:value="account_type" placeholder="请选择账号类型">
            <!-- options here -->
          </a-select>
        </a-form-item>
      </a-col>

      <a-col :flex="1">
        <a-form-item label="渠道" :label-col="{span: 6}">
          <a-select v-model:value="channel" placeholder="请选择渠道">
            <!-- options here -->
          </a-select>
        </a-form-item>
        <a-form-item label="游戏平台" :label-col="{span: 6}">
          <a-select v-model:value="game_platform" placeholder="请选择游戏平台">
            <!-- options here -->
          </a-select>
        </a-form-item>
      </a-col>

      <a-col :flex="1">
        <a-form-item label="系统" :label-col="{span: 6}" :wrapper-col="{span: 16}">
          <a-select v-model:value="system" placeholder="请选择系统">
            <!-- options here -->
          </a-select>
        </a-form-item>
        <a-form-item label="时间" :label-col="{span: 6}">
          <a-range-picker v-model:value="time" :placeholder="['开始日期', '结束日期']">
            <!-- options here -->
          </a-range-picker>
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
  </a-card>

  <!-- Your existing layout and table setup -->
  <a-table :data-source="paginatedData" :pagination="false">
    <a-table-column title="ID" dataIndex="id" key="id" align="center" />
    <a-table-column title="游戏平台" dataIndex="game_platform" key="game_platform" align="center" />
    <a-table-column title="游戏名称" dataIndex="game_name" key="game_name" align="center" />
    <a-table-column title="投注额" dataIndex="bet_amount" key="bet_amount" align="center" />
    <a-table-column title="注单-赢" dataIndex="bet_win" key="bet_win" align="center" />
    <a-table-column title="赢率" dataIndex="win_rate" key="win_rate" align="center" />
    <a-table-column title="注单—平局" dataIndex="bet_draw" key="bet_draw" align="center" />
    <a-table-column title="注单-亏" dataIndex="bet_loss" key="bet_loss" align="center" />
    <a-table-column title="投注人数" dataIndex="num_bettors" key="num_bettors" align="center" />
    <a-table-column title="新增投注人数" dataIndex="new_bettors" key="new_bettors" align="center" />
    <a-table-column title="投注额" dataIndex="bet_amount2" key="bet_amount2" align="center" />
    <a-table-column title="有效投注" dataIndex="effective_bet" key="effective_bet" align="center" />
    <a-table-column title="费率" dataIndex="rate" key="rate" align="center" />
  </a-table>

  <div style="display: flex; align-items: center; justify-content: flex-end; margin-top: 16px;">
    <span style="margin-right: 8px;">共 {{ totalItems }} 条</span>
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

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons-vue';

const currentPage = ref(1);
const pageSize = ref(5);
const totalItems = ref(100);

const merchant_id = ref(null);
const account_type = ref(null);
const channel = ref(null);
const game_platform = ref(null);
const system = ref(null);
const time = ref([]);

const dataSource = ref([
  {
    key: '1',
    id: '12es2',
    game_platform: '棋牌',
    game_name: '投注',
    bet_amount: '123',
    bet_win: '22',
    win_rate: '90',
    bet_draw: '22',
    bet_loss: '1',
    num_bettors: '10',
    new_bettors: '1',
    bet_amount2: '70',
    effective_bet: '22',
    rate: '30',
  },
  {
    key: '1',
    id: '12es2',
    game_platform: '棋牌',
    game_name: '投注',
    bet_amount: '123',
    bet_win: '22',
    win_rate: '90',
    bet_draw: '22',
    bet_loss: '1',
    num_bettors: '10',
    new_bettors: '1',
    bet_amount2: '70',
    effective_bet: '22',
    rate: '30',
  },
  {
    key: '1',
    id: '12es2',
    game_platform: '棋牌',
    game_name: '投注',
    bet_amount: '123',
    bet_win: '22',
    win_rate: '90',
    bet_draw: '22',
    bet_loss: '1',
    num_bettors: '10',
    new_bettors: '1',
    bet_amount2: '70',
    effective_bet: '22',
    rate: '30',
  },
  {
    key: '1',
    id: '12es2',
    game_platform: '棋牌',
    game_name: '投注',
    bet_amount: '123',
    bet_win: '22',
    win_rate: '90',
    bet_draw: '22',
    bet_loss: '1',
    num_bettors: '10',
    new_bettors: '1',
    bet_amount2: '70',
    effective_bet: '22',
    rate: '30',
  },
  {
    key: '1',
    id: '12es2',
    game_platform: '棋牌',
    game_name: '投注',
    bet_amount: '123',
    bet_win: '22',
    win_rate: '90',
    bet_draw: '22',
    bet_loss: '1',
    num_bettors: '10',
    new_bettors: '1',
    bet_amount2: '70',
    effective_bet: '22',
    rate: '30',
  },
  {
    key: '1',
    id: '12es2',
    game_platform: '棋牌',
    game_name: '投注',
    bet_amount: '123',
    bet_win: '22',
    win_rate: '90',
    bet_draw: '22',
    bet_loss: '1',
    num_bettors: '10',
    new_bettors: '1',
    bet_amount2: '70',
    effective_bet: '22',
    rate: '30',
  },
  // Add more data objects here
]);

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return dataSource.value.slice(start, end);
});

const onSearch = () => {
  // Implement search logic here
};

const onReset = () => {
  merchant_id.value = null;
  account_type.value = null;
  channel.value = null;
  game_platform.value = null;
  system.value = null;
  time.value = [];
};

const handlePageChange = (page: number) => {
  currentPage.value = page;
};

const handleSizeChange = (current: number, size: number) => {
  pageSize.value = size;
  currentPage.value = 1; // Reset to the first page when page size changes
};
</script>

<style scoped>
.expanded-row-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-left: 40px;  /* Add margin to the whole sub-row */
}

.row {
  display: contents;
}

.cell {
  padding: 8px;
  white-space: pre-line; /* Ensure text wraps in each cell */
}
</style>
