<template>
  <a-card>
    <transition name="fade-slide" mode="out-in">
      <div v-if="!showAddStrategy">
        <a-row :gutter="16" type="flex" justify="end">
          <a-col :flex="1" v-for="(field, index) in inputFields" :key="index">
            <a-form-item :label="field.label">
              <component
                :is="field.type"
                v-model:value="field.model.value"
                v-bind="field.props"
              />
            </a-form-item>
          </a-col>

          <a-row>
            <a-col :flex="auto" style="margin-left: 20px;">
              <a-form-item>
                <a-button type="primary" block @click="onSearch">
                  <SearchOutlined /> 查询
                </a-button>
              </a-form-item>
            </a-col>

            <a-col :flex="auto" style="margin-left: 20px;">
              <a-form-item>
                <a-button block @click="onReset">
                  <ReloadOutlined /> 重置
                </a-button>
              </a-form-item>
            </a-col>
          </a-row>

          <a-col :flex="auto" style="margin-left: 20px;">
            <a-form-item>
              <a-button type="primary" block @click="onAddStrategy" style="background-color: darkgreen;">
                添加提现策略
              </a-button>
            </a-form-item>
          </a-col>

          <a-col :flex="auto">
            <a-form-item>
              <a-button type="primary" block @click="exportCSV">导出CSV</a-button>
            </a-form-item>
          </a-col>
        </a-row>

        <a-table :data-source="paginatedData" :pagination="false" :scroll="{ x: 'max-content' }">
          <template v-for="column in tableColumns" :key="column.key">
            <a-table-column v-bind="column" />
          </template>

          <template #bodyCell="{ column, text }">
            <span v-if="column.dataIndex === 'strategyUser'">
              <span
                style="text-decoration: underline; color: #1890ff; cursor: pointer;"
                @click="handleOperation(text)"
              >
                {{ text }}
              </span>
            </span>
            <span v-else-if="column.dataIndex === 'operation'">
              <span
                style="text-decoration: underline; color: green; cursor: pointer;"
                @click="handleOperation(text)"
              >
                {{ text }}
              </span>
            </span>
            <span v-else-if="column.dataIndex === 'status'">
              <a-tag :color="text === '启用' ? 'blue' : 'red'" >{{ text }}</a-tag>
            </span>
            <span v-else>{{ text }}</span>
          </template>
        </a-table>

        <div 
          style="display: flex; 
          align-items: center; 
          justify-content: flex-end; 
          margin-top: 16px;" >

          <span style="margin-right: 8px;">共 {{ totalItems }}条</span>
          <a-pagination
            v-model:current="currentPage"
            :total="totalItems"
            :page-size="pageSize"
            show-size-changer
            :page-size-options="['5', '10', '20', '50', '100']"
            size="small"
            @change="handlePageChange"
            @show-size-change="handleSizeChange"
          />
        </div>
      </div>

      <div v-else>
        <AddStrategy @back="onBackToMainPage" />
      </div>
    </transition>
  </a-card>
</template>


<script setup lang="jsx">
import AddStrategy from './add.vue';
import { ref, computed } from 'vue';

const showAddStrategy = ref(false);
const currentPage = ref(1);
const pageSize = ref(5);
const totalItems = ref(100);

const dataSource = ref([
{
  key: '1',
  strategyID: '1',
  strategyName: '贵族用户提现',
  minAmount: '100',
  maxAmount: '10000',
  freePerDay: '6',
  limitPerDay: '9',
  feeRatio: '10%',
  blockchain: '否',
  automatic: '0-0',
  strategyUser: '查看',
  updateTime: '2012-12-12  12:21:21',
  status: '启用',
  operationAccount: '管理员 - 张三',
  operation: '编辑',
},
{
  key: '2',
  strategyID: '2',
  strategyName: '贵族用户提现',
  minAmount: '100',
  maxAmount: '10000',
  freePerDay: '6',
  limitPerDay: '9',
  feeRatio: '10%',
  blockchain: '是',
  automatic: '0-0',
  strategyUser: '查看',
  updateTime: '2012-12-12  12:21:21',
  status: '关闭',
  operationAccount: '管理员 - 张三',
  operation: '编辑',
},
{
  key: '3',
  strategyID: '3',
  strategyName: '贵族用户提现',
  minAmount: '100',
  maxAmount: '10000',
  freePerDay: '6',
  limitPerDay: '9',
  feeRatio: '10%',
  blockchain: '否',
  automatic: '0-0',
  strategyUser: '查看',
  updateTime: '2012-12-12  12:21:21',
  status: '启用',
  operationAccount: '管理员 - 张三',
  operation: '编辑',
},
{
  key: '4',
  strategyID: '4',
  strategyName: '贵族用户提现',
  minAmount: '100',
  maxAmount: '10000',
  freePerDay: '6',
  limitPerDay: '9',
  feeRatio: '10%',
  blockchain: '是',
  automatic: '0-0',
  strategyUser: '查看',
  updateTime: '2012-12-12  12:21:21',
  status: '关闭',
  operationAccount: '管理员 - 张三',
  operation: '编辑',
},
{
  key: '5',
  strategyID: '5',
  strategyName: '贵族用户提现',
  minAmount: '100',
  maxAmount: '10000',
  freePerDay: '6',
  limitPerDay: '9',
  feeRatio: '10%',
  blockchain: '否',
  automatic: '0-0',
  strategyUser: '查看',
  updateTime: '2012-12-12  12:21:21',
  status: '启用',
  operationAccount: '管理员 - 张三',
  operation: '编辑',
},
]);

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return dataSource.value.slice(start, start + pageSize.value);
});

const strategyID = ref('');
const strategyName = ref('');
const withdrawOption = ref('blockchain');
const statusOption = ref('all');
const dateRange = ref(null);

const inputFields = [
  { label: '策略ID', type: 'a-input', model: strategyID, props: { placeholder: '请输入策略ID' } },
  { label: '策略名称', type: 'a-input', model: strategyName, props: { placeholder: '请输入策略名称' } },
  {
    label: '提现',
    type: 'a-select',
    model: withdrawOption,
    props: {
      options: [
        { label: '区块链提现', value: 'blockchain' },
        { label: '是', value: 'yes' },
        { label: '否', value: 'no' },
      ],
    },
  },
  {
    label: '状态',
    type: 'a-select',
    model: statusOption,
    props: {
      options: [
        { label: '全部状态', value: 'all' },
        { label: '启用', value: 'enabled' },
        { label: '关闭', value: 'disabled' },
      ],
    },
  },
  {
    label: '时间',
    type: 'a-range-picker',
    model: dateRange,
    props: { placeholder: ['开始日期', '结束日期'] },
  },
];


const tableColumns = [
  { title: '策略ID', dataIndex: 'strategyID', key: 'strategyID', align: 'center' },
  { title: '策略名称', dataIndex: 'strategyName', key: 'strategyName', align: 'center' },
  { title: '最低提现金额', dataIndex: 'minAmount', key: 'minAmount', align: 'center' },
  { title: '最高提现金额', dataIndex: 'maxAmount', key: 'maxAmount', align: 'center' },
  { title: '每日免费提现次数', dataIndex: 'freePerDay', key: 'freePerDay', align: 'center' },
  { title: '每日限制提现次数', dataIndex: 'limitPerDay', key: 'limitPerDay', align: 'center' },
  { title: '手续费比例', dataIndex: 'feeRatio', key: 'feeRatio', align: 'center' },
  { title: '区块链提现', dataIndex: 'blockchain', key: 'blockchain', align: 'center' },
  { title: '自动打款', dataIndex: 'automatic', key: 'automatic', align: 'center' },
  { title: '策略用户', dataIndex: 'strategyUser', key: 'strategyUser', align: 'center' },
  { title: '更新时间', dataIndex: 'updateTime', key: 'updateTime', align: 'center' },
  { title: '状态', dataIndex: 'status', key: 'status', align: 'center' },
  { title: '操作账号', dataIndex: 'operationAccount', key: 'operationAccount', align: 'center' },
  { title: '操作', dataIndex: 'operation', key: 'operation', align: 'center', fixed: 'right'},
];

const onSearch = () => {};

const onReset = () => {
  strategyID.value = '';
  strategyName.value = '';
  withdrawOption.value = 'blockchain';
  statusOption.value = 'all';
  dateRange.value = null;
  currentPage.value = 1;
  pageSize.value = 5;
};


const exportCSV = () => {};
const handlePageChange = (page) => (currentPage.value = page);
const handleSizeChange = (current, size) => {
  pageSize.value = size;
  currentPage.value = 1;
};
const handleOperation = (operation) => {};
const onAddStrategy = () => (showAddStrategy.value = true);
const onBackToMainPage = () => (showAddStrategy.value = false);
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

/* Add transition effects */
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.fade-slide-enter, .fade-slide-leave-to /* .fade-slide-leave-active in <2.1.8 */ {
  opacity: 0;
  transform: translateX(10px);
}
</style>
