<template>
  <transition name="fade-slide" mode="out-in">
    <div v-if="!showReviewPage">
      <a-card style="margin-bottom: 1%">
        <a-row :gutter="16" type="flex" justify="end"  style="margin-bottom: -20px;">
          <!-- First Column -->

          <a-col :flex="auto">
            <a-form-item label="提现订单号">
              <a-input v-model:value="formData.withdrawOrderID" placeholder="请输入提现订单号" />
            </a-form-item>
          </a-col>

          <a-col :flex="1">
            <a-form-item label="工会名称">
              <a-input v-model:value="formData.unionName" placeholder="请输入工会名称" />
            </a-form-item>
          </a-col>

          <a-col :flex="1">
            <a-form-item label="工会ID">
              <a-input v-model:value="formData.unionID" placeholder="请输入工会ID" />
            </a-form-item>
          </a-col>

          <a-col :flex="1">
            <a-form-item label="商户名称">
              <a-input v-model:value="formData.merchantName" placeholder="请输入商户名称" />
            </a-form-item>
          </a-col>

          <a-col :span="4">
            <a-form-item label="状态">
              <a-select v-model:value="formData.status" placeholder="请选择状态">
                <a-select-option value="0">全部状态</a-select-option>
                <a-select-option value="1">提现中</a-select-option>
                <a-select-option value="2">提现成功</a-select-option>
                <a-select-option value="3">提现失败</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :flex="auto">
            <a-form-item label="时间">
              <a-range-picker v-model:value="formData.dateRange" :placeholder="['开始日期', '结束日期']" />
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
              <a-button type="primary" block @click="exportCSV">导出CSV</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-card>

        <a-table :data-source="paginatedData" :pagination="false" :scroll="{ x: 'max-content' }">
          <a-table-column title="提现订单号" dataIndex="withdrawOrderID" key="withdrawOrderID" align="center" />
          <a-table-column title="商户名称" dataIndex="merchantName" key="merchantName" align="center" />
          <a-table-column title="工会名称" dataIndex="unionName" key="unionName" align="center" />
          <a-table-column title="工会ID" dataIndex="unionID" key="unionID" align="center" />

          <a-table-column title="提现信息" dataIndex="withdrawInfo" key="withdrawInfo" align="center">
            <template #default="{ record }">
              <div style="text-align: left;">
                <div>手续费：{{ record.withdrawInfo.fee }}</div>
                <div>提现金额：{{ record.withdrawInfo.amount }}</div>
              </div>
            </template>
          </a-table-column>

          <a-table-column title="银行信息" dataIndex="bankInfo" key="bankInfo" align="center">
            <template #default="{ record }">
              <div style="text-align: left;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span>提现银行：{{ record.bankInfo.bank }}</span>
                  <a-button style="font-size: 9px;" type="link" size="small" @click="copyText(record.bankInfo.bank)">复制</a-button>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span>银行卡号：{{ record.bankInfo.account }}</span>
                  <a-button style="font-size: 9px;" type="link" size="small" @click="copyText(record.bankInfo.account)">复制</a-button>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span>支行信息：{{ record.bankInfo.branch }}</span>
                  <a-button style="font-size: 9px;" type="link" size="small" @click="copyText(record.bankInfo.branch)">复制</a-button>
                </div>
              </div>
            </template>
          </a-table-column>

          <a-table-column title="时间" dataIndex="time" key="time" align="center">
            <template #default="{ record }">
              <div style="text-align: left;">
                <div>申请时间：{{ record.time.applyTime }}</div>
                <div>操作时间：{{ record.time.operateTime }}</div>
              </div>
            </template>
          </a-table-column>

          <a-table-column title="提现状态" dataIndex="wStatus" key="wStatus" align="center">
            <template #default="{ text }">
              <a-tag :color="statusColors[text]">{{ ENUM.withdrawal_status[text] }}</a-tag>
            </template>
          </a-table-column>

          <a-table-column title="操作账号" dataIndex="account" key="account" align="center" />
          <a-table-column title="操作" dataIndex="operate" key="operate" align="center" fixed="right" width="150">
            <template #default="{ record }">
              <span v-if="Array.isArray(record.operate)">
                <span v-for="(operation, index) in record.operate" :key="index">
                  <a :style="{ textDecoration: 'underline', cursor: 'pointer', color: operationColors[operation] }"
                    @click="handleOperation(record, operation)">
                    {{ ENUM.withdrawal_operate_type[operation] }}
                  </a>
                  <span v-if="index < record.operate.length - 1" style="margin-right: 10px;"></span> <!-- Separator between multiple operations -->
                </span>
              </span>
              <span v-else>
                <a :style="{ textDecoration: 'underline', cursor: 'pointer', color: operationColors[record.operate] }"
                  @click="handleOperation(record, record.operate)">
                  {{ ENUM.withdrawal_operate_type[record.operate] }}
                </a>
              </span>
            </template>
          </a-table-column> />
        
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
        <review-page
          :basicData="basicData"
          :currentWithdraw="currentWithdraw"
          :historyWithdraw="historyWithdraw"
          :paymentInfo="paymentInfo"
          :withdrawStatus="withdrawStatus"
          @back="onBackToMainPage"
          @confirm="handleConfirm"
          @reject="handleReject" />
      </div>
    </transition>
  <ExportCSVDialog :isModalVisible="isModalVisible2" @update:isModalVisible="val => (isModalVisible2 = val)" />

</template>

<script setup lang="jsx">
import { message } from 'ant-design-vue';
import reviewPage from './review/index.vue';
import ExportCSVDialog from './exportCSVDialog.vue'

const isModalVisible2 = ref(false)
const withdrawStatus = ref(0)
const showReviewPage = ref(false);

const currentPage = ref(1);
const pageSize = ref(5);
const totalItems = ref(100);

// Bind state variables
const formData = ref({
  withdrawOrderID: '',
  unionName: '',
  unionID: '',
  merchantName: '',
  status: '0',
  dateRange: null,
});


// DataSource with new structure
const dataSource = ref([
  {
    key: '1',
    withdrawOrderID: '23072109234511',
    merchantName: '商户2',
    unionName: 'XXX工会',
    unionID: '32423',
    withdrawInfo: {
      fee: '10%',
      amount: '1000',
    },
    bankInfo: {
      bank: '中国建设银行',
      account: '3423423432',
      branch: '云南建设银行',
    },
    time: {
      applyTime: '2012-12-12 12:21:21',
      operateTime: '',
    },
    wStatus: 1, // 1 represents '提现中'
    account: '',
    operate: [1, 2],  // Represents operations '审核' and '锁定'
  },
  {
    key: '2',
    withdrawOrderID: '23072109234512',
    merchantName: '商户1',
    unionName: '工会A',
    unionID: '67890',
    withdrawInfo: {
      fee: '5%',
      amount: '2000',
    },
    bankInfo: {
      bank: '中国银行',
      account: '1234567890',
      branch: '北京分行',
    },
    time: {
      applyTime: '2012-12-12 13:21:21',
      operateTime: '2012-12-12 15:00:00',
    },
    wStatus: 2, // 2 represents '提现成功'
    account: '管理员 - 李四',
    operate: [3],  // Represents operation '提现明细'
  },
  {
    key: '3',
    withdrawOrderID: '23072109234513',
    merchantName: '商户3',
    unionName: '工会B',
    unionID: '98765',
    withdrawInfo: {
      fee: '2%',
      amount: '500',
    },
    bankInfo: {
      bank: '交通银行',
      account: '0987654321',
      branch: '上海分行',
    },
    time: {
      applyTime: '2012-12-13 14:21:21',
      operateTime: '2012-12-14 10:30:00',
    },
    wStatus: 3, // 3 represents '提现失败'
    account: '管理员 - 王五',
    operate: [4],  // Represents operation '已拒绝'
  },
  {
    key: '4',
    withdrawOrderID: '23072109234514',
    merchantName: '商户4',
    unionName: '工会C',
    unionID: '54321',
    withdrawInfo: {
      fee: '3%',
      amount: '1500',
    },
    bankInfo: {
      bank: '农业银行',
      account: '8765432109',
      branch: '广州分行',
    },
    time: {
      applyTime: '2012-12-15 10:21:21',
      operateTime: '2012-12-15 12:30:00',
    },
    wStatus: 1, // 1 represents '提现中'
    account: '管理员 - 赵六',
    operate: [5],  // Represents operation '已锁定'
  },
  {
    key: '5',
    withdrawOrderID: '23072109234515',
    merchantName: '商户5',
    unionName: '工会D',
    unionID: '12345',
    withdrawInfo: {
      fee: '4%',
      amount: '3000',
    },
    bankInfo: {
      bank: '招商银行',
      account: '1357924680',
      branch: '深圳分行',
    },
    time: {
      applyTime: '2012-12-16 09:30:00',
      operateTime: '2012-12-17 11:45:00',
    },
    wStatus: 2, // 2 represents '提现成功'
    account: '管理员 - 陈七',
    operate: [3],  // Represents operation '提现明细'
  },
]);


// Pagination logic
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return dataSource.value.slice(start, end);
});

const statusColors = {
  1: 'blue',
  2: 'green',
  3: 'red',
};

const operationColors = {
  1: 'green',     // Green for 审核
  2: '#1890ff',   // Blue for 锁定
  3: 'green',     // Green for 提现明细
  4: 'red',       // Red for 已拒绝
  5: '#1890ff',   // Blue for 已锁定
}

const onReset = () => {
  formData.value.withdrawOrderID = ''
  formData.value.unionName = ''
  formData.value.unionID = ''
  formData.value.merchantName = ''
  formData.value.status = '0'
  formData.value.dateRange = ''
}

// Functions
const onSearch = () => {
  // Add search logic
};

const exportCSV = () => (isModalVisible2.value = true)


// Helper functions
const copyText = (text) => {
  navigator.clipboard.writeText(text)
    .then(() => message.success({ content: '已成功复制到剪贴板。', duration: 1 }))
    .catch(() => message.error({ content: '复制到剪贴板失败，请重试。', duration: 1 }))
}

const handlePageChange = (page) => {
  currentPage.value = page;
};

const handleSizeChange = (current, size) => {
  pageSize.value = size;
  currentPage.value = 1;
};

const handleOperation = (record, operation) => {
  withdrawStatus.value = record.wStatus

  // if (operation === 3) 
    showReviewPage.value = true
}

const onBackToMainPage = () => {
  showReviewPage.value = false;
};

</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.fade-slide-enter,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
</style>
