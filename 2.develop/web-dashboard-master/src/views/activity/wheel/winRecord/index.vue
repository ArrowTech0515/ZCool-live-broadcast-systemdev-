<template>
  <a-card style="background-color: white;">
    <a-row :gutter="16"  type="flex" >

      <!-- First Column -->
      <a-col :flex="auto">
        <a-form-item label="时间">
          <a-range-picker :placeholder="['开始日期', '结束日期']">
            <!-- options here -->
          </a-range-picker>
        </a-form-item>
      </a-col>

      <a-col :flex="1">
        <a-form-item label="中奖人ID">
          <a-input v-model="gameId" placeholder="" />
        </a-form-item>
      </a-col>

      <a-col :flex="1">
        <a-form-item label="中奖人昵称">
          <a-input v-model="winPosition" placeholder="" />
        </a-form-item>
      </a-col>
      
      <!-- Separator -->
      <a-col>
        <a-divider type="vertical" :style="{ height: '80%', margin: 'auto 0' }" />
      </a-col>

      <!-- Second Column -->
      <a-col  :span="3">
        <a-form-item>
          <a-button type="primary" block @click="onSearch">
            <SearchOutlined /> 查询</a-button>
        </a-form-item>
      </a-col>

      <a-col :span="3">
        <a-form-item>
          <a-button block @click="onReset">
            <ReloadOutlined /> 重置</a-button>
        </a-form-item>
      </a-col>
    </a-row>

    <!-- Your existing layout and table setup -->
    <a-table :data-source="paginatedData" :pagination="false">
      <a-table-column title="排序" dataIndex="sorting" key="sorting" align="center" />
      <a-table-column title="中奖人ID" dataIndex="gameId" key="gameId" align="center" />
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

  </a-card>
</template>

<script>

export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 15,
      totalItems: 100,

      merchantId: '',
      gameId: '',
      winType: '',
      winPosition: '',
      status: '',

      dataSource: [
        {
          key: '1',
          sorting: '1',
          gameId: '300001',
          nickname: '张张',
          winPosition: '1000元挡位',
          winType: '抽中现金',
          winAmount: '0.01元红包',
          winTime: '2024.05.25 10:00:00',
        },
        {
          key: '2',
          sorting: '2',
          gameId: '300002',
          nickname: '丽丽',
          winPosition: '1000元挡位',
          winType: '抽中金币',
          winAmount: '0.01个金币',
          winTime: '2024.05.25 10:00:00',
        },
        {
          key: '3',
          sorting: '3',
          gameId: '300003',
          nickname: '徐徐',
          winPosition: '1000元挡位',
          winType: '抽中幸运值',
          winAmount: '0.01个幸运值',
          winTime: '2024.05.25 10:00:00',
        },
        
        // Add more data objects here
      ],
    };
  },
  
  computed: {
    paginatedData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.dataSource.slice(start, end);
    },
  },
  methods: {
    onSearch() {
      // Implement search logic
    },
    onReset() {
      this.merchantId = '';
      this.gameId = '';
      this.winType = '';
      this.winPosition = '';
      this.status = '';
      // Implement reset logic
    },
    handlePageChange(page) {
      this.currentPage = page;
    },
    handleSizeChange(current, size) {
      this.pageSize = size;
      this.currentPage = 1; // Reset to the first page when page size changes
    },
  },
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
