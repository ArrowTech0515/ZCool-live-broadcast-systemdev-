<template>
  <a-card style="background-color: white;">
    <a-row :gutter="16">
      <!-- First Column -->
      <a-col :span="12">
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="商户ID">
              <a-select v-model="merchantId" placeholder="全部">
                <!-- options here -->
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="游戏ID">
              <a-input v-model="gameId" placeholder="请输入游戏ID" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="游戏名">
              <a-input v-model="gameName" placeholder="游戏名" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="状态">
              <a-select v-model="status" placeholder="全部">
                <!-- options here -->
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-col>

      <a-col :span="7">
        <a-form-item label="游戏平台">
          <a-select v-model="platform" placeholder="全部">
            <!-- options here -->
          </a-select>
        </a-form-item>
      </a-col>
      
      <!-- Separator -->
      <a-col>
        <a-divider type="vertical" :style="{ height: '96px', margin: 'auto 0' }" />
      </a-col>

      <!-- Second Column -->
      <a-col :span="4">
        <a-col>
          <a-form-item>
            <a-button type="primary" block @click="onSearch">
              <SearchOutlined /> 查询</a-button>
          </a-form-item>
        </a-col>
        <a-col>
          <a-form-item>
            <a-button block @click="onReset">
              <ReloadOutlined /> 重置</a-button>
          </a-form-item>
        </a-col>
      </a-col>
    </a-row>

    <!-- Your existing layout and table setup -->
    <a-table :data-source="paginatedData" :pagination="false">
      <a-table-column title="游戏ID" dataIndex="gameId" key="gameId" align="center" />
      <a-table-column title="游戏类型" dataIndex="gameType" key="gameType" align="center" />
      <a-table-column title="游戏名" dataIndex="gameName" key="gameName" align="center" />
      <a-table-column title="游戏平台" dataIndex="platform" key="platform" align="center" />
      <a-table-column title="是否球横屏" dataIndex="isLandscape" key="isLandscape" align="center" />
      <a-table-column title="是否条横屏" dataIndex="isBarLandscape" key="isBarLandscape" align="center">
        <template #default="{ text }">
          <a-switch :checked="text" />
        </template>
      </a-table-column>
      <a-table-column title="是否显示" dataIndex="isVisible" key="isVisible" align="center">
        <template #default="{ text }">
          <a-switch :checked="text" />
        </template>
      </a-table-column>
      <a-table-column title="是否只显示在二级页" dataIndex="isSecondaryPage" key="isSecondaryPage" align="center">
        <template #default="{ text }">
          <a-switch :checked="text" />
        </template>
      </a-table-column>
      <a-table-column title="单游戏维护状态" dataIndex="maintenanceStatus" key="maintenanceStatus" align="center">
        <template #default="{ text }">
          <a-switch :checked="text" />
        </template>
      </a-table-column>
      <a-table-column title="排序" dataIndex="order" key="order" align="center" />
      <a-table-column title="平台维护时间" dataIndex="maintenanceTime" key="maintenanceTime" align="center" />
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
      gameName: '',
      status: '',

      dataSource: [
        {
          key: '1',
          gameId: '12es2',
          gameType: '棋牌',
          gameName: '21点',
          platform: '龙城棋牌',
          isLandscape: '横屏',
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
          gameName: '21点',
          platform: '龙城棋牌',
          isLandscape: '横屏',
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
          gameName: '21点',
          platform: '龙城棋牌',
          isLandscape: '横屏',
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
          gameName: '21点',
          platform: '龙城棋牌',
          isLandscape: '横屏',
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
          gameName: '21点',
          platform: '龙城棋牌',
          isLandscape: '横屏',
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
          gameName: '21点',
          platform: '龙城棋牌',
          isLandscape: '横屏',
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
      this.gameName = '';
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
