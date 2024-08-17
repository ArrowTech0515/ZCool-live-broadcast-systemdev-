<template>
  <a-card style="background-color: white;">
    <a-row :gutter="16"  type="flex" >
      <!-- First Column -->

      <a-col :flex="1">

          <a-form-item label="商户">
            <a-select title="商户" v-model="merchantId" placeholder="全部">
              <!-- options here -->
            </a-select>
          </a-form-item>
    
          <a-form-item label="账号类型">
            <a-select v-model="merchantId" placeholder="全部">
              <!-- options here -->
            </a-select>
          </a-form-item>
    
      </a-col>

      <a-col :flex="1">

          <a-form-item label="渠道">
            <a-select v-model="merchantId" placeholder="全部">
              <!-- options here -->
            </a-select>
          </a-form-item>

          <a-form-item label="游戏平台">
            <a-select v-model="status" placeholder="全部">
              <!-- options here -->
            </a-select>
          </a-form-item>

      </a-col>

      <a-col :flex="auto">

          <a-form-item label="系统">
            <a-select v-model="merchantId" placeholder="全部">
              <!-- options here -->
            </a-select>
          </a-form-item>

          <a-form-item label="时间">
            <a-range-picker :placeholder="['开始日期', '结束日期']">
              <!-- options here -->
            </a-range-picker>
          </a-form-item>

      </a-col>
      
      <!-- Separator -->
      <a-col>
        <a-divider type="vertical" :style="{ height: '96px', margin: 'auto 0' }" />
      </a-col>

      <!-- Second Column -->
      <a-col :span="4">

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
      <a-table-column title="ID" dataIndex="gameId" key="gameId" align="center" />
      <a-table-column title="游戏平台" dataIndex="gameType" key="gameType" align="center" />
      <a-table-column title="游戏名称" dataIndex="nBetting" key="nBetting" align="center" />
      <a-table-column title="投注额" dataIndex="platform" key="platform" align="center" />
      <a-table-column title="注单-赢" dataIndex="isLandscape" key="isLandscape" align="center" />
      <a-table-column title="胜率" dataIndex="isBarLandscape" key="isBarLandscape" align="center">
        <!-- <template #default="{ text }">
          <a-switch :checked="text" />
        </template> -->
      </a-table-column>
      <a-table-column title="注单—平局" dataIndex="isVisible" key="isVisible" align="center">
        <!-- <template #default="{ text }">
          <a-switch :checked="text" />
        </template> -->
      </a-table-column>
      <a-table-column title="注单-亏" dataIndex="isSecondaryPage" key="isSecondaryPage" align="center">
        <!-- <template #default="{ text }">
          <a-switch :checked="text" />
        </template> -->
      </a-table-column>
      <a-table-column title="投注人数" dataIndex="maintenanceStatus" key="maintenanceStatus" align="center">
        <!-- <template #default="{ text }">
          <a-switch :checked="text" />
        </template> -->
      </a-table-column>
      <a-table-column title="新增投注人数" dataIndex="gameType" key="gameType" align="center" />
      <a-table-column title="投注额" dataIndex="nBetting" key="nBetting" align="center" />
      <a-table-column title="有效投注" dataIndex="platform" key="platform" align="center" />
      <a-table-column title="费率" dataIndex="isLandscape" key="isLandscape" align="center" />

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

      merchantId: '',
      gameId: '',
      platform: '',
      nBetting: '',
      status: '',

      dataSource: [
        {
          key: '1',
          gameId: '12es2',
          gameType: '棋牌',
          nBetting: '21',
          platform: '123',
          isLandscape: '22',
          isBarLandscape: true,
          isVisible: true,
          isSecondaryPage: false,
          maintenanceStatus: true,
          order: 1,
          maintenanceTime: '-',
        },
        {
          key: '2',
          gameId: '12es2',
          gameType: '棋牌',
          nBetting: '2',
          platform: '22',
          isLandscape: '33',
          isBarLandscape: true,
          isVisible: true,
          isSecondaryPage: true,
          maintenanceStatus: true,
          order: 1,
          maintenanceTime: '-',
        },
        {
          key: '3',
          gameId: '12es2',
          gameType: '棋牌',
          nBetting: '2',
          platform: '123',
          isLandscape: '11',
          isBarLandscape: false,
          isVisible: true,
          isSecondaryPage: true,
          maintenanceStatus: true,
          order: 1,
          maintenanceTime: '-',
        },
        {
          key: '4',
          gameId: '12es2',
          gameType: '棋牌',
          nBetting: '233',
          platform: '111',
          isLandscape: '11',
          isBarLandscape: true,
          isVisible: false,
          isSecondaryPage: true,
          maintenanceStatus: true,
          order: 1,
          maintenanceTime: '-',
        },
        {
          key: '5',
          gameId: '12es2',
          gameType: '棋牌',
          nBetting: '21111',
          platform: '111',
          isLandscape: '11',
          isBarLandscape: true,
          isVisible: true,
          isSecondaryPage: true,
          maintenanceStatus: true,
          order: 1,
          maintenanceTime: '-',
        },
        {
          key: '6',
          gameId: '12es2',
          gameType: '棋牌',
          nBetting: '200',
          platform: '111',
          isLandscape: '11',
          isBarLandscape: true,
          isVisible: true,
          isSecondaryPage: true,
          maintenanceStatus: false,
          order: 1,
          maintenanceTime: '-',
        },
        {
          key: '7',
          gameId: '12es2',
          gameType: '棋牌',
          nBetting: '200',
          platform: '111',
          isLandscape: '11',
          isBarLandscape: true,
          isVisible: true,
          isSecondaryPage: true,
          maintenanceStatus: false,
          order: 1,
          maintenanceTime: '-',
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
