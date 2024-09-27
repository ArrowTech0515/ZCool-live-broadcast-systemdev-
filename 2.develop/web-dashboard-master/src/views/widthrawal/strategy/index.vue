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
              <a-button type="primary" block @click="handleEdit">
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

          <template #bodyCell="{ column, text, record }">
            <span v-if="column.dataIndex === 'feeRatio'">
              {{ text }}%
            </span>
            <span v-else-if="column.dataIndex === 'strategyBlockchain'">
              {{ text === true ? '是' : '否'}}
            </span>
            <span v-else-if="column.dataIndex === 'strategyAutomatic'">
              {{ text.value1 }}-{{ text.value2 }}
            </span>
            <span v-else-if="column.dataIndex === 'strategyUser'">
              <span
                style="text-decoration: underline; color: #1890ff; cursor: pointer;"
                @click="handleOperation(text, record)"
              >
                {{ text }}
              </span>
            </span>
            <span v-else-if="column.dataIndex === 'operation'">
              <span
                style="text-decoration: underline; color: green; cursor: pointer;"
                @click="handleEdit(record)"
              >
                {{ text }}
              </span>
            </span>
            <span v-else-if="column.dataIndex === 'strategyStatus'">
              <a-tag :color="text === true ? 'blue' : 'red'" >
                {{ text === true ? '启用' : '关闭'}}
              </a-tag>
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
        <AddorEditPage 
          @back="onBackToMainPage"
          :formData="recordData" />
      </div>
    </transition>
  </a-card>
</template>

<script setup lang="jsx">

import AddorEditPage from './AddorEdit.vue';
import { ref, computed } from 'vue';

const showAddStrategy = ref(false);
const currentPage = ref(1);
const pageSize = ref(5);
const totalItems = ref(100);

const recordData = ref({}); // Store selected record data

const dataSource = ref([
  {
    key: '1',
    strategyID: '1',
    strategyName: '贵族用户提现',
    minAmount: '100',
    maxAmount: '10000',
    freePerDay: '6',
    limitPerDay: '9',
    feeRatio: 10,
    strategyBlockchain: false,//'否',
    strategyAutomatic: {
      value1: 0, value2: 12,
    },
    strategyUser: '查看',
    updateTime: '2012-12-12  12:21:21',
    strategyStatus: true,//'启用',
    operationAccount: '管理员 - 张三',
    operation: '编辑',
  },
  {
    key: '2',
    strategyID: '2',
    strategyName: '贵族用户提现',
    minAmount: '10',
    maxAmount: '10000',
    freePerDay: '6',
    limitPerDay: '9',
    feeRatio: 10,
    strategyBlockchain: true,//'是',
    strategyAutomatic: {
      value1: 10, value2: 12,
    },
    strategyUser: '查看',
    updateTime: '2012-12-12  12:21:21',
    strategyStatus: false,//'关闭',
    operationAccount: '管理员 - 张三',
    operation: '编辑',
  },{
    key: '3',
    strategyID: '3',
    strategyName: '贵族用户提现',
    minAmount: '100',
    maxAmount: '100',
    freePerDay: '6',
    limitPerDay: '9',
    feeRatio: 10,
    strategyBlockchain: false,//'否',
    strategyAutomatic: {
      value1: 0, value2: 12,
    },
    strategyUser: '查看',
    updateTime: '2012-12-12  12:21:21',
    strategyStatus: true,//'启用',
    operationAccount: '管理员 - 张三',
    operation: '编辑',
  },
  {
    key: '4',
    strategyID: '4',
    strategyName: '贵族用户提现',
    minAmount: '1',
    maxAmount: '10000',
    freePerDay: '6',
    limitPerDay: '9',
    feeRatio: 10,
    strategyBlockchain: true,//'是',
    strategyAutomatic: {
      value1: 1, value2: 11,
    },
    strategyUser: '查看',
    updateTime: '2012-12-12  12:21:21',
    strategyStatus: false,//'关闭',
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
const withdrawOption = ref('all');
const strategyStatus = ref('all');
const dateRange = ref(null);

const inputFields = [
  { label: '策略ID', type: 'a-input', model: strategyID, props: { placeholder: '请输入策略ID' } },
  { label: '策略名称', type: 'a-input', model: strategyName, props: { placeholder: '请输入策略名称' } },
  {
    label: '区块链提现',
    type: 'a-select',
    model: withdrawOption,
    props: {
      options: [
        { label: '全部', value: 'all' },
        { label: '是', value: 'yes' },
        { label: '否', value: 'no' },
      ],
    },
  },
  {
    label: '状态',
    type: 'a-select',
    model: strategyStatus,
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
  { title: '区块链提现', dataIndex: 'strategyBlockchain', key: 'strategyBlockchain', align: 'center' },
  { title: '自动打款', dataIndex: 'strategyAutomatic', key: 'strategyAutomatic', align: 'center' },
  { title: '策略用户', dataIndex: 'strategyUser', key: 'strategyUser', align: 'center' },
  { title: '更新时间', dataIndex: 'updateTime', key: 'updateTime', align: 'center' },
  { title: '状态', dataIndex: 'strategyStatus', key: 'strategyStatus', align: 'center' },
  { title: '操作账号', dataIndex: 'operationAccount', key: 'operationAccount', align: 'center' },
  { title: '操作', dataIndex: 'operation', key: 'operation', align: 'center', fixed: 'right' },
];

const onSearch = () => {};

const onReset = () => {
  strategyID.value = '';
  strategyName.value = '';
  withdrawOption.value = 'all';
  strategyStatus.value = 'all';
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

const handleOperation = (operation, record) => {
  console.log(`${operation} operation executed for record:`, record);
};

const handleEdit = (record = {}) => {
  const isCreate =! record
  if(isCreate)
  {
    record.strategyName = ''
    record.minAmount= 0
    record.maxAmount= 0
    record.freePerDay= 0
    record.limitPerDay= 0
    record.feeRatio= 0
    record.strategyBlockchain= false//'no'
    record.strategyStatus= false
    record.autoPaymentStart= 0
    record.autoPaymentEnd= 0
    record.strategyAutomatic = { value1: 0, value2: 0 } // Ensure this is properly initialized
    record.userAll = true
    record.userNoble = false
    record.userRecharge = false
    record.userCustom = false
  } 
  else {
    // Ensure strategyAutomatic exists even for editing records
    record.strategyAutomatic = record.strategyAutomatic || { value1: 0, value2: 0 };
    record.userAll = record.userAll || true;
    record.userNoble = record.userNoble || false;
    record.userRecharge = record.userRecharge || false;
    record.userCustom = record.userCustom || false;
  }
  recordData.value = { isCreate, ...record }; // Set selected record data to recordData
  showAddStrategy.value = true;
};

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
