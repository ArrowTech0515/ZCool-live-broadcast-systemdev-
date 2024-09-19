<template>
  <a-card style=" margin-bottom: 1%;">
    <a-row :gutter="16" type="flex">

      <!-- First Column -->
      <a-col :flex="1">
        <a-form-item label="商户ID">
          <a-select v-model:value="merchantId" placeholder="请选择商户ID">
            <!-- options here -->
          </a-select>
        </a-form-item>

        <a-form-item label="游戏ID">
          <a-input v-model:value="gameId" placeholder="请输入游戏ID" />
        </a-form-item>
      </a-col>

      <a-col :flex="1">
        <a-form-item label="游戏名">
          <a-input v-model:value="gameName" placeholder="请输入游戏名" />
        </a-form-item>

        <a-form-item label="状态">
          <a-select v-model:value="status" placeholder="请选择状态">
            <!-- options here -->
          </a-select>
        </a-form-item>
      </a-col>

      <a-col :flex="1">
        <a-form-item label="游戏平台">
          <a-select v-model:value="platform" placeholder="请选择游戏平台">
            <!-- options here -->
          </a-select>
        </a-form-item>
      </a-col>

      <!-- Separator -->
      <a-col :flex="auto">
        <a-divider type="vertical" :style="{ height: '80%', margin: 'auto 0' }" />
      </a-col>

      <!-- Second Column -->
      <a-col :span="2">
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
      <!-- Table columns -->
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

</template>

<script lang="jsx" setup>
import { ref, computed } from 'vue'

const currentPage = ref(1)
const pageSize = ref(5)
const totalItems = ref(100)

const merchantId = ref(null)
const gameId = ref('')
const platform = ref(null)
const gameName = ref('')
const status = ref(null)

const dataSource = ref([
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
    gameId: '23fj8',
    gameType: '冒险',
    gameName: '21点',
    platform: '天空冒险',
    isLandscape: '横屏',
    isBarLandscape: false,
    isVisible: true,
    isSecondaryPage: false,
    maintenanceStatus: false,
    order: 3,
    maintenanceTime: '-',
  },
  {
    key: '4',
    gameId: '89ks2',
    gameType: '射击',
    gameName: '21点',
    platform: '战斗平台',
    isLandscape: '竖屏',
    isBarLandscape: true,
    isVisible: false,
    isSecondaryPage: true,
    maintenanceStatus: true,
    order: 2,
    maintenanceTime: '2024-08-25 12:00',
  },
  {
    key: '5',
    gameId: '34hs7',
    gameType: '益智',
    gameName: '21点',
    platform: '益智平台',
    isLandscape: '横屏',
    isBarLandscape: false,
    isVisible: true,
    isSecondaryPage: true,
    maintenanceStatus: false,
    order: 4,
    maintenanceTime: '-',
  },
  {
    key: '6',
    gameId: '56gf3',
    gameType: '赛车',
    gameName: '21点',
    platform: '竞速平台',
    isLandscape: '横屏',
    isBarLandscape: true,
    isVisible: true,
    isSecondaryPage: true,
    maintenanceStatus: true,
    order: 5,
    maintenanceTime: '-',
  },
])

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return dataSource.value.slice(start, end)
})

const onSearch = () => {
  // Implement search logic here
}

const onReset = () => {
  merchantId.value = null
  gameId.value = ''
  platform.value = null
  gameName.value = ''
  status.value = null
}

const handlePageChange = (page) => {
  currentPage.value = page
}

const handleSizeChange = (current, size) => {
  pageSize.value = size
  currentPage.value = 1 // Reset to the first page when the page size changes
}
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
