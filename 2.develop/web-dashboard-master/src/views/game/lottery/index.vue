<template>
  <a-card style=" margin-bottom: 1%;">
    <a-row :gutter="16"  type="flex" >
      <!-- First Column -->

      <a-col :flex="1">
          <a-form-item label="游戏名">
            <a-select v-model:value="game_name" placeholder="请选择游戏名">
              <!-- options here -->
            </a-select>
          </a-form-item>
          <a-form-item label="开奖状态">
            <a-select v-model:value="prize_draw_status" placeholder="请选择开奖状态">
              <!-- options here -->
            </a-select>
          </a-form-item>
      </a-col>

      <a-col :flex="1">
          <a-form-item label="期数">
            <a-input v-model:value="issue" placeholder="请输入用户昵称" />
          </a-form-item>
      </a-col>

      <a-col :flex="auto">
          <a-form-item label="时间">
            <a-range-picker v-model:value="time" :placeholder="['开始日期', '结束日期']">
              <!-- options here -->
            </a-range-picker>
          </a-form-item>
      </a-col>
      
      <!-- Separator -->
      <a-col>
        <a-divider type="vertical" :style="{ height: '80%', margin: 'auto 0' }" />
      </a-col>

      <!-- Second Column -->
      <a-col :flex="auto">
          <a-form-item>
            <a-button type="primary" block @click="onSearch">
              <SearchOutlined /> 查询</a-button>
          </a-form-item>
          <a-form-item>
            <a-button block @click="onReset">
              <ReloadOutlined /> 重置</a-button>
          </a-form-item>
      </a-col>
    </a-row>
  </a-card>

    <!-- Your existing layout and table setup -->
    <a-table :data-source="paginatedData" :pagination="false">
      <a-table-column title="游戏名" dataIndex="game_name" key="game_name" align="center" />
      <a-table-column title="开奖期数" dataIndex="num_draws" key="num_draws" align="center" />
      <a-table-column title="开奖时间" dataIndex="prize_draw_time" key="prize_draw_time" align="center" />
      <a-table-column title="开奖结果" dataIndex="lottery_result" key="lottery_result" align="center" />
      <a-table-column title="结果详情" dataIndex="result_detail" key="result_detail" align="center" />
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
import { ref, computed } from 'vue';

const currentPage = ref(1);
const pageSize = ref(5);
const totalItems = ref(100);

const game_name = ref(null);
const prize_draw_status = ref(null);
const issue = ref('');
const time = ref('');

const dataSource = [
  {
    key: '1',
    game_name: '鱼虾蟹',
    num_draws: '20211004061203',
    prize_draw_time: '2023-10-04 20:02',
    lottery_result: '未开奖',
    result_detail: '无',
  },
  {
    key: '5',
    game_name: '鱼虾蟹',
    num_draws: '20211004061203',
    prize_draw_time: '2023-10-04 20:02',
    lottery_result: '未开奖',
    result_detail: '无',
  },
  {
    key: '4',
    game_name: '一分快三',
    num_draws: '20211004061203',
    prize_draw_time: '2023-10-04 20:02',
    lottery_result: '未开奖',
    result_detail: '无',
  },
  {
    key: '2',
    game_name: '鱼虾蟹',
    num_draws: '20211004061203',
    prize_draw_time: '2023-10-04 20:02',
    lottery_result: '未开奖',
    result_detail: '无',
  },
  {
    key: '3',
    game_name: '鱼虾蟹',
    num_draws: '20211004061203',
    prize_draw_time: '2023-10-04 20:02',
    lottery_result: '未开奖',
    result_detail: '无',
  },
  // Add more data objects here
]

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return dataSource.slice(start, end);
});

const onSearch = () => {
  // Implement search logic
};

const onReset = () => {
  game_name.value = null;
  issue.value = '';
  prize_draw_status.value = null;
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
