<template>
  <a-card style="background-color: white;">
    <a-row :gutter="16"  type="flex" >
      <!-- First Column -->

      <a-col :flex="1">

          <a-form-item label="商户">
            <a-select v-model="merchantId" placeholder="全部">
              <!-- options here -->
            </a-select>
          </a-form-item>
    
          <a-form-item label="用户ID">
            <a-input v-model="gameId" placeholder="请输入用户ID" />
          </a-form-item>
    
      </a-col>

      <a-col :flex="1">
          <a-form-item label="用户昵称">
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
        <a-divider type="vertical" :style="{ height: '96px', margin: 'auto 0' }" />
      </a-col>

      <!-- Second Column -->
      <a-col :flex="1">

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
      <a-table-column title="用户ID" dataIndex="gameId" key="gameId" align="center" />
      <a-table-column title="用户昵称" dataIndex="gameType" key="gameType" align="center" />
      <a-table-column title="商户" dataIndex="nBetting" key="nBetting" align="center" />
      <a-table-column title="投注" dataIndex="platform" key="platform" align="center" />
      <a-table-column title="派奖" dataIndex="isLandscape" key="isLandscape" align="center" />
      <a-table-column title="盈亏" dataIndex="isBarLandscape" key="isBarLandscape" align="center">
        <!-- <template #default="{ text }">
          <a-switch :checked="text" />
        </template> -->
      </a-table-column>
      <a-table-column title="流水" dataIndex="isVisible" key="isVisible" align="center">
        <!-- <template #default="{ text }">
          <a-switch :checked="text" />
        </template> -->
      </a-table-column>
      <a-table-column title="返水" dataIndex="isSecondaryPage" key="isSecondaryPage" align="center">
        <!-- <template #default="{ text }">
          <a-switch :checked="text" />
        </template> -->
      </a-table-column>
      <a-table-column title="兑换" dataIndex="maintenanceStatus" key="maintenanceStatus" align="center">
        <!-- <template #default="{ text }">
          <a-switch :checked="text" />
        </template> -->
      </a-table-column>
      <a-table-column title="充值次数" dataIndex="gameType" key="gameType" align="center" />
      <a-table-column title="累计充值金额" dataIndex="nBetting" key="nBetting" align="center" />
      <a-table-column title="提现次数" dataIndex="platform" key="platform" align="center" />
      <a-table-column title="累计提现次数" dataIndex="isLandscape" key="isLandscape" align="center" />

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
          gameId: '122',
          gameType: '1',
          nBetting: '21',
          platform: '123',
          isLandscape: '22',
          isBarLandscape: '1',
          isVisible: '2',
          isSecondaryPage: '200',
          maintenanceStatus: 1,
          order: 1,
          maintenanceTime: 1,
        },        {
          key: '1',
          gameId: '122',
          gameType: '1',
          nBetting: '21',
          platform: '123',
          isLandscape: '22',
          isBarLandscape: '1',
          isVisible: '2',
          isSecondaryPage: '200',
          maintenanceStatus: 1,
          order: 1,
          maintenanceTime: 1,
        },        {
          key: '1',
          gameId: '122',
          gameType: '1',
          nBetting: '21',
          platform: '123',
          isLandscape: '22',
          isBarLandscape: '1',
          isVisible: '2',
          isSecondaryPage: '200',
          maintenanceStatus: 1,
          order: 1,
          maintenanceTime: 1,
        },        {
          key: '1',
          gameId: '122',
          gameType: '1',
          nBetting: '21',
          platform: '123',
          isLandscape: '22',
          isBarLandscape: '1',
          isVisible: '2',
          isSecondaryPage: '200',
          maintenanceStatus: 1,
          order: 1,
          maintenanceTime: 1,
        },        {
          key: '1',
          gameId: '122',
          gameType: '1',
          nBetting: '21',
          platform: '123',
          isLandscape: '22',
          isBarLandscape: '1',
          isVisible: '2',
          isSecondaryPage: '200',
          maintenanceStatus: 1,
          order: 1,
          maintenanceTime: 1,
        },        {
          key: '1',
          gameId: '122',
          gameType: '1',
          nBetting: '21',
          platform: '123',
          isLandscape: '22',
          isBarLandscape: '1',
          isVisible: '2',
          isSecondaryPage: '200',
          maintenanceStatus: 1,
          order: 1,
          maintenanceTime: 1,
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
