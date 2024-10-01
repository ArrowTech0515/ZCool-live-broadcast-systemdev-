<template>
  <transition name="fade-slide" mode="out-in">
    <div v-if="!showReviewPage">
      <a-card style="margin-bottom: 1%">
        <a-row :gutter="16" type="flex" justify="end"  style="margin-bottom: -20px;">
          <!-- First Column -->
          <a-col :flex="auto">
            <a-form-item label="提现订单号">
              <a-input v-model:value="searchParams.orderID" placeholder="请输入提现订单号" />
            </a-form-item>
          </a-col>

          <a-col :flex="1">
            <a-form-item label="用户昵称">
              <a-input v-model:value="searchParams.nickName" placeholder="请输入用户昵称" />
            </a-form-item>
          </a-col>

          <a-col :flex="1">
            <a-form-item label="用户ID">
              <a-input v-model:value="searchParams.userID" placeholder="请输入用户ID" />
            </a-form-item>
          </a-col>

          <a-col :flex="1">
            <a-form-item label="商户名称">
              <a-input v-model:value="searchParams.merchName" placeholder="请输入商户名称" />
            </a-form-item>
          </a-col>

          <a-col :flex="1">
            <a-form-item label="应用名称">
              <a-input v-model:value="searchParams.appName" placeholder="请输入应用名称" />
            </a-form-item>
          </a-col>

          <a-col :flex="1">
            <a-form-item label="状态">
              <a-select v-model:value="searchParams.status" default-value="0" placeholder="请选择状态">
                <a-select-option value="0">{{ENUM.withdrawal_status[0]}}</a-select-option>
                <a-select-option value="1">{{ENUM.withdrawal_status[1]}}</a-select-option>
                <a-select-option value="2">{{ENUM.withdrawal_status[2]}}</a-select-option>
                <a-select-option value="3">{{ENUM.withdrawal_status[3]}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :flex="1">
            <a-form-item label="时间">
              <a-range-picker v-model:value="searchParams.dateRange" :placeholder="['开始日期', '结束日期']" />
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

        <!-- Updated table -->
        <a-table :data-source="paginatedData" :pagination="false" :scroll="{ x: 'max-content' }">
          <a-table-column title="提现订单号" dataIndex="wOrderID" key="wOrderID" align="center" />
          <a-table-column title="商户名称" dataIndex="merchName" key="merchName" align="center" />
          <a-table-column title="应用名称" dataIndex="appName" key="appName" align="center" />
          <a-table-column title="用户昵称" dataIndex="userNickname" key="userNickname" align="center" />
          <a-table-column title="用户ID" dataIndex="userID" key="userID" align="center" />

          <a-table-column title="提现信息" dataIndex="wInfo" key="wInfo" align="center">
            <template #default="{ record }">
              <div style="text-align: left;">
                <div>收款货币：{{ record.wInfo.currency }}</div>
                <div>手续费：{{ record.wInfo.fee }}</div>
                <div>提现金额：{{ record.wInfo.amount }}</div>
              </div>
            </template>
          </a-table-column>

          <a-table-column title="收款信息" dataIndex="rInfo" key="rInfo" align="center">
            <template #default="{ record }">
              <div style="text-align: left;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span>提现银行：{{ record.rInfo.bank }}</span>
                  <a-button style="font-size: 9px;" type="link" size="small" @click="copyText(record.rInfo.bank)">复制</a-button>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span>银行卡号：{{ record.rInfo.bankCard }}</span>
                  <a-button style="font-size: 9px;" type="link" size="small" @click="copyText(record.rInfo.bankCard)">复制</a-button>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span>姓名：{{ record.rInfo.name }}</span>
                  <a-button style="font-size: 9px;" type="link" size="small" @click="copyText(record.rInfo.name)">复制</a-button>
                </div>
              </div>
            </template>
          </a-table-column>

          <a-table-column title="时间" dataIndex="time" key="time" align="center">
            <template #default="{ record }">
              <div style="text-align: left;">
                <div>申请时间：{{ record.time.applyTime }}</div>
                <div>操作时间：{{ record.time.operationTime }}</div>
              </div>
            </template>
          </a-table-column>

          <a-table-column title="提现状态" dataIndex="wStatus" key="wStatus" align="center">
            <template #default="{ text }">
              <a-tag :color="ENUM.withdrawal_colors[text]">{{ ENUM.withdrawal_status[text] }}</a-tag>
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
          </a-table-column>
        </a-table>

        <!-- Pagination controls -->
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
          @reject="handleReject"
        />
      </div>
    </transition>
  <ExportCSVDialog :isModalVisible="isModalVisible2" @update:isModalVisible="val => (isModalVisible2 = val)" />

  <LockDialog 
    :isModalVisible="isLockModalVisible"
    sTitle="锁定提示"
    sText1="是否锁定当前体现订单"
    sText2="锁定后需要管理员/部门负责人/锁定人方可解锁操作"
    @update:is-modal-visible="val => isLockModalVisible = val"
    @emit_success="onLocked" />
</template>

<script setup lang="jsx">
import { message } from 'ant-design-vue'
import reviewPage from './review/index.vue'
import ExportCSVDialog from './exportCSVDialog.vue'

// State variables
const isLockModalVisible = ref(false)
const isModalVisible2 = ref(false)
const showReviewPage = ref(false)
const withdrawStatus = ref(0)
const paymentInfo = ref(1)

const currentPage = ref(1)
const pageSize = ref(5)
const totalItems = ref(100)

// Search form data
const searchParams = ref({
  orderID: '',
  nickName: '',
  userID: '',
  merchName: '',
  appName: '',
  status: '0',
  dateRange: null,
})
// Data source with updated structure
const dataSource = ref([
  {
    key: '1',
    wOrderID: '230721092345500001',
    merchName: '商户1',
    appName: '应用1',
    userNickname: '桃之夭夭',
    userID: '32423',
    wInfo: {
      currency: '印尼盾',
      fee: '10%',
      amount: '1000',
    },
    rInfo: {
      bank: '中国建设银行',
      bankCard: '3423423432',
      name: '张三',
    },
    time: {
      applyTime: '2012-12-12 12:21:21',
      operationTime: '',
    },
    wStatus: 1,  // 1 represents '提现中'
    account: '',
    operate: [1, 2],  // Represents operations '审核' and '锁定'
  },
  {
    key: '2',
    wOrderID: '230721092345500002',
    merchName: '商户2',
    appName: '应用2',
    userNickname: '小红',
    userID: '12424',
    wInfo: {
      currency: 'USD',
      fee: '5%',
      amount: '2000',
    },
    rInfo: {
      bank: '工商银行',
      bankCard: '9876543210',
      name: '李四',
    },
    time: {
      applyTime: '2013-01-01 13:13:13',
      operationTime: '2013-01-01 14:14:14',
    },
    wStatus: 2,  // 2 represents '提现成功'
    account: '管理员 - 李四',
    operate: [3],  // Represents operation '提现明细'
  },
  {
    key: '3',
    wOrderID: '230721092345500003',
    merchName: '商户3',
    appName: '应用3',
    userNickname: '小蓝',
    userID: '54231',
    wInfo: {
      currency: '人民币',
      fee: '2%',
      amount: '500',
    },
    rInfo: {
      bank: '农业银行',
      bankCard: '123456789012',
      name: '王五',
    },
    time: {
      applyTime: '2014-04-04 14:14:14',
      operationTime: '',
    },
    wStatus: 3,  // 3 represents '提现失败'
    account: '管理员 - 王五',
    operate: [4],  // Represents operation '已拒绝'
  },
  {
    key: '4',
    wOrderID: '230721092345500004',
    merchName: '商户4',
    appName: '应用4',
    userNickname: '小绿',
    userID: '97856',
    wInfo: {
      currency: '欧元',
      fee: '3%',
      amount: '1500',
    },
    rInfo: {
      bank: '交通银行',
      bankCard: '123443215678',
      name: '赵六',
    },
    time: {
      applyTime: '2015-05-05 15:15:15',
      operationTime: '2015-05-06 16:16:16',
    },
    wStatus: 2,  // 5 represents '已锁定'
    account: '管理员 - 赵六',
    operate: [5],  // Represents operation '已锁定'
  },
  {
    key: '5',
    wOrderID: '230721092345500005',
    merchName: '商户5',
    appName: '应用5',
    userNickname: '小紫',
    userID: '75319',
    wInfo: {
      currency: '英镑',
      fee: '4%',
      amount: '3000',
    },
    rInfo: {
      bank: '招商银行',
      bankCard: '987654321234',
      name: '陈七',
    },
    time: {
      applyTime: '2016-06-06 16:16:16',
      operationTime: '2016-06-07 17:17:17',
    },
    wStatus: 2,  // 2 represents '提现成功'
    account: '管理员 - 陈七',
    operate: [3],  // Represents operation '提现明细'
  },
])


// Computed data for pagination
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return dataSource.value.slice(start, end)
})

const operationColors = {
  1: 'green',     // Green for 审核
  2: '#1890ff',   // Blue for 锁定
  3: 'green',     // Green for 提现明细
  4: 'red',       // Red for 已拒绝
  5: '#1890ff',   // Blue for 已锁定
}

// Helper functions
const copyText = (text) => {
  navigator.clipboard.writeText(text)
    .then(() => message.success({ content: '已成功复制到剪贴板。', duration: 1 }))
    .catch(() => message.error({ content: '复制到剪贴板失败，请重试。', duration: 1 }))
}

const handlePageChange = (page) => {
  currentPage.value = page
}

const handleSizeChange = (current, size) => {
  pageSize.value = size
  currentPage.value = 1
}

const handleOperation = (record, operation) => {
  withdrawStatus.value = record.wStatus
  if (operation === 2)
    isLockModalVisible.value = true
  else 
  {
    console.log("handleOperation : operation = " + ENUM.withdrawal_operate_type[operation])
    paymentInfo.value = operation
    showReviewPage.value = true
  }
}

const onBackToMainPage = () => {
  showReviewPage.value = false
}

const onSearch = () => {
  // Add search logic as needed
  console.log("Searching with parameters:", searchParams.value)
}
const onReset = () => {
  searchParams.value.orderID = ''
  searchParams.value.nickName = ''
  searchParams.value.userID = ''
  searchParams.value.merchName = ''
  searchParams.value.appName = ''
  searchParams.value.status = '0'
  searchParams.value.dateRange = null
}

const exportCSV = () => (isModalVisible2.value = true)

const onLocked = () => {
  message.success({
    content: `锁定成功`,
    duration: 1, // Duration in seconds
  })
  // Show unLock button
}

</script>

<style scoped>

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
.fade-slide-enter, .fade-slide-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
</style>
