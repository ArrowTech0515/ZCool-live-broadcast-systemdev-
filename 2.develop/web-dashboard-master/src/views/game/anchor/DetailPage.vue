<template>
  <a-card style="margin-bottom: 1%;">
    
    <template #title>
      <div class="card-header">
        <a-button
          type="link"
          class="back-button"
          @click="$emit('back')"
        >
          <span class="back-icon">&lt;</span>
        </a-button>
        <div class="card-title">
          <span>收益详情</span>
        </div>
      </div>
    </template>

    <a-row :gutter="32" type="flex" style="margin-bottom: -20px;">
      <!-- First Column -->
      <a-col :flex="1">
        <a-form-item label="时间" :label-col="{span: 2}">
          <a-range-picker v-model:value="time" :placeholder="['开始日期', '结束日期']" />
        </a-form-item>
      </a-col>
    </a-row>
  </a-card>

  <!-- Your existing layout and table setup -->
  <a-table :data-source="paginatedData" :pagination="false">
    <a-table-column title="用户ID" dataIndex="userID" key="userID" align="center" />
    <a-table-column title="用户昵称" dataIndex="nickName" key="nickName" align="center" />
    <a-table-column title="总投注/总票数" dataIndex="totalBets_Tickets" key="totalBets_Tickets" align="center" />
    <a-table-column title="总投注人数" dataIndex="totalBettors" key="totalBettors" align="center" />
    <a-table-column title="一分快三" dataIndex="omThree" key="omThree" align="center" />
    <a-table-column title="一分快车" dataIndex="omExpress" key="omExpress" align="center" />
    <a-table-column title="一分时时彩" dataIndex="omLottery" key="omLottery" align="center" />
    <a-table-column title="百人牛牛" dataIndex="men100" key="men100" align="center" />
    <a-table-column title="鱼虾蟹" dataIndex="crab" key="crab" align="center" />

    <template #bodyCell="{ column, text }">
      <!-- Render Multiline Text for '游戏ID' Column with Color Styling -->
      <span v-if="Array.isArray(text)">
        <div v-for="(line, index) in text" :key="index">
          <span :style="{ color: index === 2 ? 'red' : 'inherit' }">{{ line }}</span>
        </div>
      </span>

      <!-- Default Rendering for Other Columns -->
      <span v-else>{{ text }}</span>
    </template>
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

const currentPage = ref(1);
const pageSize = ref(5);
const totalItems = ref(100);

const merchantId = ref(null);
const game_name = ref('');
const platform = ref('');
const anchor_id = ref('');
const channel = ref(null);
const time = ref('');

const dataSource = [
  {
    key: '1',
    userID: '1521671',
    nickName: '美好的一天',
    totalBets_Tickets: ['540', '9.75(票)'],  // Use array instead of string with \n
    totalBettors: '4',
    omThree: ['515.00', '(2人)', '105.40', '9.45(票)'],  // Use array for multi-line content
    omExpress: ['515.00', '(2人)', '105.40', '9.45(票)'],
    omLottery: ['515.00', '(2人)', '105.40', '9.45(票)'],
    men100: ['515.00', '(2人)', '105.40', '9.45(票)'],
    crab: ['515.00', '(2人)', '-0.5', '9.45(票)'],
  },
  {
    key: '2',
    userID: '1521680',
    nickName: '快展_企鹅',
    totalBets_Tickets: ['540', '9.75(票)'],
    totalBettors: '4',
    omThree: ['515.00', '(2人)', '105.40', '9.45(票)'],
    omExpress: ['515.00', '(2人)', '105.40', '9.45(票)'],
    omLottery: ['515.00', '(2人)', '105.40', '9.45(票)'],
    men100: ['515.00', '(2人)', '0', '9.45(票)'],
    crab: ['515.00', '(2人)', '105.40', '9.45(票)'],
  },
];

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return dataSource.slice(start, end);
});

const onSearch = () => {
  // Implement search logic
};

const onReset = () => {
  merchantId.value = null;
  game_name.value = '';
  platform.value = '';
  anchor_id.value = '';
  channel.value = null;
  time.value = '';
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

.card-header {
  display: flex;
  align-items: center;
  white-space: nowrap;
}

.back-button {
  font-size: 18px;
  margin-right: 8px;
}

.back-icon {
  font-size: 20px;
  font-weight: bold;
  margin-left: 8px;
}

.card-title {
  flex-grow: 1;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}

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
