<template>
  <a-card style=" margin-bottom: 1%;">
    <a-col :gutter="16" type="flex">
      <a-row :gutter="16" type="flex">
        <!-- First Column -->
        <a-col :flex="1">
          <a-form-item label="商户">
            <a-select title="商户" v-model:value="merchant_id" placeholder="请选择商户">
              <!-- options here -->
            </a-select>
          </a-form-item>

          <a-form-item label="状态">
            <a-select v-model:value="status" placeholder="请选择状态">
              <!-- options here -->
            </a-select>
          </a-form-item>

          <a-form-item label="用户昵称">
            <a-input v-model:value="user_nickname" placeholder="请输入用户昵称" />
          </a-form-item>

          <a-form-item label="订单号">
            <a-input v-model:value="order_number" placeholder="请输入订单号" />
          </a-form-item>
        </a-col>

        <a-col :flex="1">
          <a-form-item label="渠道">
            <a-select v-model:value="channel" placeholder="请选择渠道">
              <!-- options here -->
            </a-select>
          </a-form-item>

          <a-form-item label="是否内部账户">
            <a-select v-model:value="is_internal_account" placeholder="请选择">
              <!-- options here -->
            </a-select>
          </a-form-item>

          <a-form-item label="游戏ID">
            <a-input v-model:value="game_id" placeholder="请输入游戏ID" />
          </a-form-item>
        </a-col>

        <a-col :flex="1">
          <a-form-item label="游戏平台">
            <a-select v-model:value="game_status" placeholder="请选择游戏平台">
              <!-- options here -->
            </a-select>
          </a-form-item>

          <a-form-item label="用户ID">
            <a-input v-model:value="user_id" placeholder="请输入用户ID" />
          </a-form-item>

          <a-form-item label="游戏名">
            <a-input v-model:value="game_name" placeholder="请输入游戏名" />
          </a-form-item>
        </a-col>

        <!-- Separator -->
        <a-col :style="{ display: 'flex', alignItems: 'center', marginTop: '-1.5%' }">
          <a-divider type="vertical" :style="{ height: '35%' }" />
        </a-col>

        <!-- Second Column -->
        <a-col :span="2" :style="{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }">
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

      <a-flex gap="large" align="start" horizontal>
        <a-form-item>
          <template #label>
            <span style="font-weight: bold; font-size: 13px;">总盈亏</span>
          </template>
          <span style="font-weight: bold; font-size: 14px;">-0.4</span>
        </a-form-item>
      </a-flex>
    </a-col>
  </a-card>

  <!-- Your existing layout and table setup -->
  <a-table :data-source="paginatedData" :pagination="false">
    <a-table-column title="ID" dataIndex="id" key="id" align="center" />
    <a-table-column title="游戏ID" dataIndex="game_id" key="game_id" align="center" />
    <a-table-column title="游戏名称" dataIndex="game_name" key="game_name" align="center" />
    <a-table-column title="订单号" dataIndex="order_number" key="order_number" align="center" />
    <a-table-column title="用户ID" dataIndex="user_id" key="user_id" align="center" />
    <a-table-column title="用户昵称" dataIndex="user_nickname" key="user_nickname" align="center" />
    <a-table-column title="房间号" dataIndex="room_number" key="room_number" align="center" />
    <a-table-column title="下注金额" dataIndex="bet_amount" key="bet_amount" align="center" />
    <a-table-column title="派彩金额" dataIndex="payout_amount" key="payout_amount" align="center" />
    <a-table-column title="创建时间" dataIndex="create_time" key="create_time" align="center" />
    <a-table-column title="结束时间" dataIndex="end_time" key="end_time" align="center" />
    <a-table-column title="状态" dataIndex="status" key="status" align="center" />
    <a-table-column title="金额" dataIndex="amount1" key="amount1" align="center" />
    <a-table-column title="余额" dataIndex="amount2" key="amount2" align="center" />
    <a-table-column title="盈亏" dataIndex="profit_loss" key="profit_loss" align="center" />
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

<script lang="jsx" setup>
import { ref, computed } from 'vue';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons-vue';

const currentPage = ref(1);
const pageSize = ref(5);
const totalItems = ref(100);

const merchant_id = ref(null);
const channel = ref(null);
const game_platform = ref(null);
const status = ref(null);
const is_internal_account = ref(null);
const user_id = ref('');
const user_nickname = ref('');
const game_id = ref('');
const game_name = ref('');
const order_number = ref('');

const dataSource = ref([
  {
    key: '1',
    id: '12es2',
    game_id: '棋牌',
    game_name: '21',
    order_number: '123',
    user_id: '22',
    user_nickname: 'aaa',
    room_number: '11',
    bet_amount: '33',
    payout_amount: '300',
    create_time: '2024-08-10 17:06:40',
    end_time: '2024-08-10 20:06:40',
    status: '123',
    amount1: '22',
    amount2: '123',
    profit_loss: '22',
  },
  {
    key: '1',
    id: '12es2',
    game_id: '棋牌',
    game_name: '21',
    order_number: '123',
    user_id: '22',
    user_nickname: 'aaa',
    room_number: '11',
    bet_amount: '33',
    payout_amount: '300',
    create_time: '2024-08-10 17:06:40',
    end_time: '2024-08-10 20:06:40',
    status: '123',
    amount1: '22',
    amount2: '123',
    profit_loss: '22',
  },
  {
    key: '1',
    id: '12es2',
    game_id: '棋牌',
    game_name: '21',
    order_number: '123',
    user_id: '22',
    user_nickname: 'aaa',
    room_number: '11',
    bet_amount: '33',
    payout_amount: '300',
    create_time: '2024-08-10 17:06:40',
    end_time: '2024-08-10 20:06:40',
    status: '123',
    amount1: '22',
    amount2: '123',
    profit_loss: '22',
  },
  {
    key: '1',
    id: '12es2',
    game_id: '棋牌',
    game_name: '21',
    order_number: '123',
    user_id: '22',
    user_nickname: 'aaa',
    room_number: '11',
    bet_amount: '33',
    payout_amount: '300',
    create_time: '2024-08-10 17:06:40',
    end_time: '2024-08-10 20:06:40',
    status: '123',
    amount1: '22',
    amount2: '123',
    profit_loss: '22',
  },
  {
    key: '1',
    id: '12es2',
    game_id: '棋牌',
    game_name: '21',
    order_number: '123',
    user_id: '22',
    user_nickname: 'aaa',
    room_number: '11',
    bet_amount: '33',
    payout_amount: '300',
    create_time: '2024-08-10 17:06:40',
    end_time: '2024-08-10 20:06:40',
    status: '123',
    amount1: '22',
    amount2: '123',
    profit_loss: '22',
  },
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
  merchant_id.value = null
  channel.value = null
  game_platform.value = null
  status.value = null
  is_internal_account.value = null
  user_id.value = '';
  user_nickname.value = '';
  game_id.value = '';
  game_name.value = '';
  order_number.value = '';
};

const handlePageChange = (page) => {
  currentPage.value = page;
};

const handleSizeChange = (current, size) => {
  pageSize.value = size;
  currentPage.value = 1; // Reset to the first page when page size changes
};
</script>

<style scoped>
.expanded-row-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-left: 40px; /* Add margin to the whole sub-row */
}

.row {
  display: contents;
}

.cell {
  padding: 8px;
  white-space: pre-line; /* Ensure text wraps in each cell */
}
</style>
