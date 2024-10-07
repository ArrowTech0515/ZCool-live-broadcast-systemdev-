<template>
  <a-card style="margin-bottom: 1%;">
    <div style="margin-bottom: 20px; font-weight: bold; font-size: 16px;">查询表格</div>

    <a-row :gutter="32" type="flex" style="margin-bottom: -20px;">
      <!-- First Column -->
      <a-col :flex="1">
        <a-form-item label="商户" :label-col="{span: 6}">
          <a-select v-model:value="merchant_id" placeholder="请选择商户">
            <!-- options here -->
          </a-select>
        </a-form-item>
        <a-form-item label="用户ID" :label-col="{span: 6}">
          <a-input v-model:value="user_id" placeholder="请输入用户ID" />
        </a-form-item>
      </a-col>

      <a-col :flex="1">
        <a-form-item label="用户昵称" :label-col="{span: 6}">
          <a-input v-model:value="user_nickname" placeholder="请输入用户昵称" />
        </a-form-item>
      </a-col>

      <a-col :flex="1">
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
    <a-table-column title="用户ID" dataIndex="user_id" key="user_id" align="center" />
    <a-table-column title="用户昵称" dataIndex="user_nickname" key="user_nickname" align="center" />
    <a-table-column title="商户" dataIndex="merchant" key="merchant" align="center" />
    <a-table-column title="投注" dataIndex="betting" key="betting" align="center" />
    <a-table-column title="派奖" dataIndex="pay_prize" key="pay_prize" align="center" />
    <a-table-column title="盈亏" dataIndex="profit_loss" key="profit_loss" align="center" />
    <a-table-column title="流水" dataIndex="running_water" key="running_water" align="center" />
    <a-table-column title="返水" dataIndex="rebate" key="rebate" align="center" />
    <a-table-column title="兑换" dataIndex="convert" key="convert" align="center" />
    <a-table-column title="红利" dataIndex="bonus" key="bonus" align="center" />
    <a-table-column title="充值次数" dataIndex="recharge_amount" key="recharge_amount" align="center" />
    <a-table-column title="累计充值金额" dataIndex="cumulative_recharge_amount" key="cumulative_recharge_amount" align="center" />
    <a-table-column title="提现次数" dataIndex="withdrawal_amount" key="withdrawal_amount" align="center" />
    <a-table-column title="累计提现次数" dataIndex="cumulative_withdrawal_amount" key="cumulative_withdrawal_amount" align="center" />
  </a-table>

  <div style="display: flex; align-items: center; justify-content: flex-end; margin-top: 16px;">
    <span style="margin-right: 8px;">共 {{ totalItems }} 条</span>
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
import { ref, computed } from 'vue';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons-vue';

const currentPage = ref(1);
const pageSize = ref(5);
const totalItems = ref(100);

const merchant_id = ref(null);
const user_nickname = ref('');
const user_id = ref('');
const time = ref([]);

const dataSource = ref([
{
  key: 1,
  user_id: '122',
  user_nickname: '5050061',
  merchant: '21',
  betting: 123,
  pay_prize: 29.6,
  profit_loss: -0.4,
  running_water: 2,
  rebate: 200,
  convert: 1,
  bonus: 0,
  recharge_amount: 1,
  cumulative_recharge_amount: 1,
  withdrawal_amount: 1,
  cumulative_withdrawal_amount: 1,
},
{
  key: 2,
  user_id: '133322',
  user_nickname: '5061',
  merchant: '21',
  betting: 0,
  pay_prize: 0,
  profit_loss: -0.4,
  running_water: 2,
  rebate: 200,
  convert: 1,
  bonus: 100,
  recharge_amount: 1,
  cumulative_recharge_amount: 1,
  withdrawal_amount: 1,
  cumulative_withdrawal_amount: 1,
},
  // Add more data objects here
]);

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return dataSource.value.slice(start, end);
});

const onSearch = () => {
  console.log('Search triggered with:', { merchant_id, user_nickname, user_id, time });
};

const onReset = () => {
  merchant_id.value = null;
  user_nickname.value = '';
  user_id.value = '';
  time.value = [];
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
