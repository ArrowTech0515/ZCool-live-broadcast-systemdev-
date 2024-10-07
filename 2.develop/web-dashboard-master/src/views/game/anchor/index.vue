<template>
  <transition name="fade-slide" mode="out-in">
    <div v-if="!showEditPage">
      <a-card style="margin-bottom: 1%;">
        <div style="margin-bottom: 20px; font-weight: bold; font-size: 16px;">查询表格</div>

        <a-row :gutter="32" type="flex" style="margin-bottom: -20px;">
          <!-- First Column -->
          <a-col :flex="1">
            <a-form-item label="商户" :label-col="{span: 6}">
              <a-select v-model:value="merchantId" placeholder="请选择商户">
                <!-- options here -->
              </a-select>
            </a-form-item>
            <a-form-item label="游戏名" :label-col="{span: 6}">
              <a-input v-model:value="game_name" placeholder="请输入游戏名" />
            </a-form-item>
          </a-col>

          <a-col :flex="1">
            <a-form-item label="渠道" :label-col="{span: 6}" :wrapper-col="{span: 17}">
              <a-select v-model:value="channel" placeholder="请选择渠道">
                <!-- options here -->
              </a-select>
            </a-form-item>
            <a-form-item label="时间" :label-col="{span: 6}">
              <a-range-picker v-model:value="time" :placeholder="['开始日期', '结束日期']" />
            </a-form-item>
          </a-col>

          <a-col :flex="1">
            <a-form-item label="主播ID" :label-col="{span: 6}">
              <a-input v-model:value="anchor_id" placeholder="请输入主播ID" />
            </a-form-item>
          </a-col>

          <!-- Separator -->
          <!-- <a-col>
            <a-divider type="vertical" :style="{ height: '80%', margin: 'auto 0' }" />
          </a-col> -->

    <!--       
          <QueryButtonGroup    
            :reset-form="onReset" 
            :submit-form="onSearch"/> -->
          <!-- Second Column -->
          <a-col :flex="auto">
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

      <!-- Your existing layout and table setup -->
      <a-table :data-source="paginatedData" :pagination="false">
        <a-table-column title="主播ID" dataIndex="anchorID" key="anchorID" align="center" />
        <a-table-column title="主播昵称" dataIndex="nickName" key="nickName" align="center" />
        <a-table-column title="总投注/总票数" dataIndex="totalBets_Tickets" key="totalBets_Tickets" align="center" />
        <a-table-column title="总投注人数" dataIndex="totalBettors" key="totalBettors" align="center" />
        <a-table-column title="一分快三" dataIndex="omThree" key="omThree" align="center" />
        <a-table-column title="一分快车" dataIndex="omExpress" key="omExpress" align="center" />
        <a-table-column title="一分时时彩" dataIndex="omLottery" key="omLottery" align="center" />
        <a-table-column title="百人牛牛" dataIndex="men100" key="men100" align="center" />
        <a-table-column title="鱼虾蟹" dataIndex="crab" key="crab" align="center" />
        <a-table-column title="操作" dataIndex="operate" key="operate" align="center" />

        <template #bodyCell="{ column, text }">
          <!-- Render Multiline Text for '游戏ID' Column with Color Styling -->
          <span v-if="Array.isArray(text)">
            <div v-for="(line, index) in text" :key="index">
              <span :style="{ color: index === 2 ? 'red' : 'inherit' }">{{ line }}</span>
            </div>
          </span>

          <span v-else-if="column.dataIndex === 'operate'">
            <span style="text-decoration: underline; color: #1890ff; cursor: pointer;" @click="handleOperation(record)">
              {{ text }}
            </span>
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
    </div>
    <div v-else>
      <DetailPage 
        :formData="currentRecord" 
        @back="onBackToMainPage2" />
    </div>
  </transition>

</template>

<script lang="jsx" setup>
import DetailPage from './DetailPage.vue';

const currentPage = ref(1);
const pageSize = ref(5);
const totalItems = ref(100);

const showEditPage = ref(false)
const currentRecord = ref(null)

const merchantId = ref(null);
const game_name = ref('');
const platform = ref('');
const anchor_id = ref('');
const channel = ref(null);
const time = ref('');

const dataSource = [
  {
    key: '1',
    anchorID: '125p198',
    nickName: '瞎想企鹅_nh',
    totalBets_Tickets: ['540', '9.75(票)'],  // Use array instead of string with \n
    totalBettors: '4',
    omThree: ['515.00', '(2人)', '105.40', '9.45(票)'],  // Use array for multi-line content
    omExpress: ['515.00', '(2人)', '105.40', '9.45(票)'],
    omLottery: ['515.00', '(2人)', '105.40', '9.45(票)'],
    men100: ['515.00', '(2人)', '105.40', '9.45(票)'],
    crab: ['515.00', '(2人)', '-0.5', '9.45(票)'],
    operate: '收益详情',
  },
  {
    key: '2',
    anchorID: '125p198',
    nickName: '瞎想企鹅_nh',
    totalBets_Tickets: ['540', '9.75(票)'],
    totalBettors: '4',
    omThree: ['515.00', '(2人)', '105.40', '9.45(票)'],
    omExpress: ['515.00', '(2人)', '105.40', '9.45(票)'],
    omLottery: ['515.00', '(2人)', '105.40', '9.45(票)'],
    men100: ['515.00', '(2人)', '0', '9.45(票)'],
    crab: ['515.00', '(2人)', '105.40', '9.45(票)'],
    operate: '收益详情',
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


const handleOperation = (record) => {
  currentRecord.value = record // Set the selected record data
  showEditPage.value = true
}

// Handlers for going back from data or edit pages
const onBackToMainPage2 = () => {
  showEditPage.value = false
}

</script>

<style scoped>

/* Add transition effects */
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.fade-slide-enter, .fade-slide-leave-to /* .fade-slide-leave-active in <2.1.8 */ {
  opacity: 0;
  transform: translateX(10px);
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
