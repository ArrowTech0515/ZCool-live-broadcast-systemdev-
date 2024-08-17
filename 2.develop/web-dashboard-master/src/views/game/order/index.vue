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
    
          <a-form-item label="状态">
            <a-select v-model="merchantId" placeholder="全部">
              <!-- options here -->
            </a-select>
          </a-form-item>

          <a-form-item label="用户昵称">
            <a-input v-model="gameId" placeholder="请输入用户昵称" />
          </a-form-item>

          <a-form-item label="订单号">
            <a-input v-model="gameId" placeholder="请输入订单号" />
          </a-form-item>

      </a-col>

      <a-col :flex="1">

          <a-form-item label="渠道">
            <a-select v-model="merchantId" placeholder="全部">
              <!-- options here -->
            </a-select>
          </a-form-item>

          <a-form-item label="是否内部账户">
            <a-select v-model="status" placeholder="全部">
              <!-- options here -->
            </a-select>
          </a-form-item>

          <a-form-item label="游戏ID">
            <a-input v-model="gameId" placeholder="请输入游戏ID" />
          </a-form-item>

      </a-col>

      <a-col :flex="1">

          <a-form-item label="游戏平台">
            <a-select v-model="merchantId" placeholder="全部">
              <!-- options here -->
            </a-select>
          </a-form-item>

          <a-form-item label="用户ID">
            <a-input v-model="gameId" placeholder="请输入用户ID" />
          </a-form-item>

          <a-form-item label="游戏名">
            <a-input v-model="gameId" placeholder="请输入游戏名" />
          </a-form-item>

      </a-col>
      
      <!-- Separator -->
      <a-col :style="{ display: 'flex', alignItems: 'center', marginTop: '-1.5%' }">
        <a-divider type="vertical" :style="{ height: '35%' }" />
      </a-col>

      <!-- Second Column -->
      <a-col :span="3" :style="{ display: 'flex', flexDirection: 'column', justifyContent: 'center'}">
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

    <!-- Your existing layout and table setup -->
    <a-table :data-source="paginatedData" :pagination="false">
      <a-table-column title="ID" dataIndex="gameId" key="gameId" align="center" />
      <a-table-column title="游戏ID" dataIndex="gameType" key="gameType" align="center" />
      <a-table-column title="游戏名称" dataIndex="nBetting" key="nBetting" align="center" />
      <a-table-column title="订单号" dataIndex="platform" key="platform" align="center" />
      <a-table-column title="用户ID" dataIndex="isLandscape" key="isLandscape" align="center" />
      <a-table-column title="用户昵称" dataIndex="isBarLandscape" key="isBarLandscape" align="center">
        <!-- <template #default="{ text }">
          <a-switch :checked="text" />
        </template> -->
      </a-table-column>
      <a-table-column title="房间号" dataIndex="isVisible" key="isVisible" align="center">
        <!-- <template #default="{ text }">
          <a-switch :checked="text" />
        </template> -->
      </a-table-column>
      <a-table-column title="下注金额" dataIndex="isSecondaryPage" key="isSecondaryPage" align="center">
        <!-- <template #default="{ text }">
          <a-switch :checked="text" />
        </template> -->
      </a-table-column>
      <a-table-column title="派彩金额" dataIndex="maintenanceStatus" key="maintenanceStatus" align="center">
        <!-- <template #default="{ text }">
          <a-switch :checked="text" />
        </template> -->
      </a-table-column>
      <a-table-column title="创建时间" dataIndex="date1" key="date1" align="center" />
      <a-table-column title="结束时间" dataIndex="date2" key="date2" align="center" />
      <a-table-column title="状态" dataIndex="platform" key="platform" align="center" />
      <a-table-column title="金额" dataIndex="isLandscape" key="isLandscape" align="center" />
      <a-table-column title="余额" dataIndex="platform" key="platform" align="center" />
      <a-table-column title="盈亏" dataIndex="isLandscape" key="isLandscape" align="center" />

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
          date1: '2024-08-10 17:06:40',
          date2: '2024-08-10 20:06:40',
          maintenanceTime: '-',
        },
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
          date1: '2024-08-10 17:06:40',
          date2: '2024-08-10 20:06:40',
          maintenanceTime: '-',
        },
       
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
          date1: '2024-08-10 17:06:40',
          date2: '2024-08-10 20:06:40',
          maintenanceTime: '-',
        },
       
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
          date1: '2024-08-10 17:06:40',
          date2: '2024-08-10 20:06:40',
          maintenanceTime: '-',
        },
       
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
          date1: '2024-08-10 17:06:40',
          date2: '2024-08-10 20:06:40',
          maintenanceTime: '-',
        },
       
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
          date1: '2024-08-10 17:06:40',
          date2: '2024-08-10 20:06:40',
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
