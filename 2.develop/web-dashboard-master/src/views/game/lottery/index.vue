<template>
  <a-card style="background-color: white;">
    <a-row :gutter="16"  type="flex" >
      <!-- First Column -->

      <a-col :flex="2">

          <a-form-item label="游戏名">
            <a-select v-model="merchantId" placeholder="全部">
              <!-- options here -->
            </a-select>
          </a-form-item>
    
          <a-form-item label="开奖状态">
            <a-select v-model="merchantId" placeholder="全部">
              <!-- options here -->
            </a-select>
          </a-form-item>
    
      </a-col>

      <a-col :flex="1">
          <a-form-item label="期数">
            <a-input v-model="gameId" placeholder="请输入用户昵称" />
          </a-form-item>
      </a-col>

      <a-col :flex="auto">

          <a-form-item label="时间">
            <a-range-picker :placeholder="['开始日期', '结束日期']">
              <!-- options here -->
            </a-range-picker>
          </a-form-item>

      </a-col>
      
      <!-- Separator -->
      <a-col>
        <a-divider type="vertical" :style="{ height: '80%', margin: 'auto 0' }" />
      </a-col>

      <!-- Second Column -->
      <a-col  :flex="1">

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

    <!-- Your existing layout and table setup -->
    <a-table :data-source="paginatedData" :pagination="false">
      <a-table-column title="游戏名" dataIndex="gameId" key="gameId" align="center" />
      <a-table-column title="开奖期数" dataIndex="gameType" key="gameType" align="center" />
      <a-table-column title="开奖时间" dataIndex="nBetting" key="nBetting" align="center" />
      <a-table-column title="开奖结果" dataIndex="platform" key="platform" align="center" />
      <a-table-column title="结果详情" dataIndex="isLandscape" key="isLandscape" align="center" />
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

  </a-card>
</template>

<script>

export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      totalItems: 100,
      dataSource: [
        {
          key: '1',
          gameId: '鱼虾蟹',
          gameType: '20211004061203',
          nBetting: '2023-10-04 20:02',
          platform: '未开奖',
          isLandscape: '无',
        },
        {
          key: '5',
          gameId: '鱼虾蟹',
          gameType: '20211004061203',
          nBetting: '2023-10-04 20:02',
          platform: '未开奖',
          isLandscape: '无',
        },
        {
          key: '4',
          gameId: '一分快三',
          gameType: '20211004061203',
          nBetting: '2023-10-04 20:02',
          platform: '未开奖',
          isLandscape: '无',
        },
        {
          key: '2',
          gameId: '鱼虾蟹',
          gameType: '20211004061203',
          nBetting: '2023-10-04 20:02',
          platform: '未开奖',
          isLandscape: '无',
        },
        {
          key: '3',
          gameId: '鱼虾蟹',
          gameType: '20211004061203',
          nBetting: '2023-10-04 20:02',
          platform: '未开奖',
          isLandscape: '无',
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
      this.platform = '';
      this.nBetting = '';
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
