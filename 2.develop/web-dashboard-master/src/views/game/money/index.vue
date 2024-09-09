<template>
  <a-card style="background-color: white; margin-bottom: 1%;">
    <a-row :gutter="16" type="flex">
      <!-- First Column -->
      <a-col :flex="auto">
        <a-form-item label="商户">
          <a-select v-model:value="merchant_id" placeholder="请选择商户">
            <!-- options here -->
          </a-select>
        </a-form-item>
        <a-form-item label="游戏平台">
          <a-select v-model:value="game_platform" placeholder="请选择游戏平台">
            <!-- options here -->
          </a-select>
        </a-form-item>
        <a-form-item label="时间">
          <a-range-picker v-model:value="time" :placeholder="['开始日期', '结束日期']" />
        </a-form-item>
      </a-col>

      <a-col :flex="1">
        <a-form-item label="类别">
          <a-select v-model:value="category" placeholder="请选择类别">
            <!-- options here -->
          </a-select>
        </a-form-item>
        <a-form-item label="游戏名">
          <a-input v-model:value="game_name" placeholder="请输入游戏名" />
        </a-form-item>
      </a-col>

      <a-col :flex="1">
        <a-form-item label="具体类型">
          <a-select v-model:value="specific_type" placeholder="请选择具体类型">
            <!-- options here -->
          </a-select>
        </a-form-item>
        <a-form-item label="游戏ID">
          <a-input v-model:value="game_id" placeholder="请输入游戏ID" />
        </a-form-item>
      </a-col>

      <!-- Separator -->
      <a-col :style="{ display: 'flex', alignItems: 'center', marginTop: '-1.5%' }">
        <a-divider type="vertical" :style="{ height: '35%' }" />
      </a-col>

      <!-- Second Column -->
      <a-col :span="2" :style="{ display: 'flex', flexDirection: 'column', justifyContent: 'center'}">
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

  <!-- Table Setup -->
  <a-table :data-source="paginatedData" :pagination="false">
    <a-table-column title="编号ID" dataIndex="number_id" key="number_id" align="center" />
    <a-table-column title="游戏ID" dataIndex="game_id" key="game_id" align="center" />
    <a-table-column title="昵称" dataIndex="nick_name" key="nick_name" align="center" />
    <a-table-column title="手机" dataIndex="mobile" key="mobile" align="center" />
    <a-table-column title="时间" dataIndex="time" key="time" align="center" />
    <a-table-column title="游戏平台" dataIndex="game_platform" key="game_platform" align="center" />
    <a-table-column title="游戏名" dataIndex="game_name" key="game_name" align="center" />
    <a-table-column title="类别" dataIndex="category" key="category" align="center" />
    <a-table-column title="具体类型" dataIndex="specific_type" key="specific_type" align="center" />
    <a-table-column title="金额" dataIndex="amount1" key="amount1" align="center" />
    <a-table-column title="金额" dataIndex="amount2" key="amount2" align="center" />
  </a-table>

  <!-- Pagination -->
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
const game_platform = ref(null);
const category = ref(null);
const specific_type = ref(null);
const game_name = ref('');
const game_id = ref('');
const time = ref([]);

// Mock data
const dataSource = ref([
  {
    key: '1',
    number_id: '3980',
    game_id: '783876664',
    nick_name: 'ob_test',
    mobile: '86136999999969',
    time: '2023-10-04 17:23',
    game_platform: '东方彩票',
    game_name: '快三',
    category: '收入',
    specific_type: '开奖',
    amount1: '4900',
    amount2: '10730',
  },
  {
    key: '1',
    number_id: '3980',
    game_id: '783876664',
    nick_name: 'ob_test',
    mobile: '86136999999969',
    time: '2023-10-04 17:23',
    game_platform: '东方彩票',
    game_name: '快三',
    category: '收入',
    specific_type: '开奖',
    amount1: '4900',
    amount2: '10730',
  },
  {
    key: '1',
    number_id: '3980',
    game_id: '783876664',
    nick_name: 'ob_test',
    mobile: '86136999999969',
    time: '2023-10-04 17:23',
    game_platform: '东方彩票',
    game_name: '快三',
    category: '收入',
    specific_type: '开奖',
    amount1: '4900',
    amount2: '10730',
  },
  {
    key: '1',
    number_id: '3980',
    game_id: '783876664',
    nick_name: 'ob_test',
    mobile: '86136999999969',
    time: '2023-10-04 17:23',
    game_platform: '东方彩票',
    game_name: '快三',
    category: '收入',
    specific_type: '开奖',
    amount1: '4900',
    amount2: '10730',
  },
  {
    key: '1',
    number_id: '3980',
    game_id: '783876664',
    nick_name: 'ob_test',
    mobile: '86136999999969',
    time: '2023-10-04 17:23',
    game_platform: '东方彩票',
    game_name: '快三',
    category: '收入',
    specific_type: '开奖',
    amount1: '4900',
    amount2: '10730',
  },
  // Add more data objects here
]);

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return dataSource.value.slice(start, end);
});

const onSearch = () => {
  console.log('Search triggered with:', {
    merchant_id: merchant_id.value,
    game_platform: game_platform.value,
    category: category.value,
    specific_type: specific_type.value,
    game_name: game_name.value,
    game_id: game_id.value,
    time: time.value,
  });
};

const onReset = () => {
  merchant_id.value = null;
  game_platform.value = null;
  category.value = null;
  specific_type.value = null;
  game_name.value = '';
  game_id.value = '';
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
