<template>
  <transition name="fade-slide" mode="out-in">
    <div v-if="!showReviewPage">
      <a-card style="margin-bottom: 1%">
        <a-row :gutter="16" type="flex" justify="end"  style="margin-bottom: -20px;">
          <a-col :flex="1">
            <a-form-item label="提现订单号">
              <a-input v-model:value="searchParams.orderID" placeholder="请输入提现订单号" />
            </a-form-item>
          </a-col>
          <a-col :flex="1">
            <a-form-item label="主播昵称">
              <a-input v-model:value="searchParams.nickName" placeholder="请输入主播昵称" />
            </a-form-item>
          </a-col>
          <a-col :flex="1">
            <a-form-item label="房间号">
              <a-input v-model:value="searchParams.roomID" placeholder="请输入房间号" />
            </a-form-item>
          </a-col>
          <a-col :flex="1">
            <a-form-item label="状态" >
              <a-select v-model:value="searchParams.status" placeholder="请选择状态">
                <a-select-option value="0">{{ENUM.withdrawal_status[0]}}</a-select-option>
                <a-select-option value="1">{{ENUM.withdrawal_status[1]}}</a-select-option>
                <a-select-option value="2">{{ENUM.withdrawal_status[2]}}</a-select-option>
                <a-select-option value="3">{{ENUM.withdrawal_status[3]}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col>
            <a-form-item label="时间">
              <a-range-picker v-model:value="searchParams.dateRange" :placeholder="['开始日期', '结束日期']" />
            </a-form-item>
          </a-col>

          <QueryButtonGroup    
            :reset-form="onReset" 
            :submit-form="onSearch"/>

          <a-col :flex="auto">
            <a-form-item>
              <a-button type="primary" block @click="onSettings">提现设置</a-button>
            </a-form-item>
          </a-col>
          <a-col :flex="auto">
            <a-form-item>
              <a-button type="primary" block @click="exportCSV">导出CSV</a-button>
            </a-form-item>
          </a-col>
          
        </a-row>
      </a-card>

      <a-table
        :data-source="paginatedData"
        :pagination="false"
        :scroll="{ x: 'max-content' }"
      >
        <a-table-column title="提现订单号" dataIndex="wOrderID" key="wOrderID" align="center" />
        <a-table-column title="主播昵称" dataIndex="nickName" key="nickName" align="center" />
        <a-table-column title="房间号" dataIndex="roomID" key="roomID" align="center" />
        <a-table-column title="所属工会" dataIndex="union" key="union" align="center" />
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

      <div style="display: flex; align-items: center; justify-content: flex-end; margin-top: 16px;">
        <span style="margin-right: 8px;">共 {{ totalItems }} 条</span>
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
  <SettingsDialog :isModalVisible="isModalVisible" @update:isModalVisible="val => (isModalVisible = val)" />

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
import SettingsDialog from './withdrawalSettingsDialog.vue'

const showReviewPage = ref(false)
const isModalVisible = ref(false)
const isLockModalVisible = ref(false)
const isModalVisible2 = ref(false)
const withdrawStatus = ref(0)
const paymentInfo = ref(1)

const currentPage = ref(1)
const pageSize = ref(5)
const totalItems = ref(100)

const searchParams = ref({
  orderID: '',
  nickName: '',
  roomID: '',
  status: '0',
  dateRange: null,
})

const dataSource = ref([
  {
    key: '1',
    wOrderID: '230721092345500001',
    nickName: '桃之夭夭',
    roomID: '32423',
    union: '蒂萨传媒',
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
    wStatus: 1,
    account: '',
    operate: [1, 2], // Now using an array to reflect multiple operations (审核 and 锁定)
  },
  {
    key: '2',
    wOrderID: '230721092345500002',
    nickName: '小红',
    roomID: '10001',
    union: '红星传媒',
    wInfo: {
      currency: 'USTD',
      fee: '5%',
      amount: '5000',
    },
    rInfo: {
      bank: '工商银行',
      bankCard: '1234567890',
      name: '李四',
    },
    time: {
      applyTime: '2022-01-01 10:00:00',
      operationTime: '2022-01-02 10:00:00',
    },
    wStatus: 2,
    account: '管理员 - 李四',
    operate: 3,
  },
  {
    key: '3',
    wOrderID: '230721092345500003',
    nickName: '小蓝',
    roomID: '10002',
    union: '蓝天传媒',
    wInfo: {
      currency: '美元',
      fee: '2%',
      amount: '2000',
    },
    rInfo: {
      bank: '中国银行',
      bankCard: '9876543210',
      name: '王五',
    },
    time: {
      applyTime: '2023-05-05 15:30:00',
      operationTime: '',
    },
    wStatus: 3,
    account: '管理员 - 王五',
    operate: 4,
  },
  {
    key: '4',
    wOrderID: '230721092345500004',
    nickName: '小黄',
    roomID: '10003',
    union: '黄河传媒',
    wInfo: {
      currency: '人民币',
      fee: '1%',
      amount: '10000',
    },
    rInfo: {
      bank: '农业银行',
      bankCard: '5678901234',
      name: '赵六',
    },
    time: {
      applyTime: '2024-06-01 18:00:00',
      operationTime: '2024-06-02 18:00:00',
    },
    wStatus: 2, // Updated to "已锁定"
    account: '管理员 - 赵六',
    operate: 5, // Reflecting "已锁定" status
  },
  {
    key: '5',
    wOrderID: '230721092345500005',
    nickName: '小紫',
    roomID: '10004',
    union: '紫光传媒',
    wInfo: {
      currency: '欧元',
      fee: '3%',
      amount: '3000',
    },
    rInfo: {
      bank: '交通银行',
      bankCard: '1122334455',
      name: '陈七',
    },
    time: {
      applyTime: '2025-07-07 20:00:00',
      operationTime: '',
    },
    wStatus: 1,
    account: '',
    operate: 1,
  },
])

const operationColors = {
  1: 'green',
  2: '#1890ff',
  3: 'green',
  4: 'red',
  5: '#1890ff',
}

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return dataSource.value.slice(start, end)
})

const onSearch = () => console.log("Search initiated with", searchParams.value)

const onReset = () => {
  searchParams.value.orderID = ''
  searchParams.value.nickName = ''
  searchParams.value.roomID = ''
  searchParams.value.status = '0'
  searchParams.value.dateRange = null
}
const onSettings = () => (isModalVisible.value = true)
const exportCSV = () => (isModalVisible2.value = true)
const handlePageChange = (page) => (currentPage.value = page)
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

const onBackToMainPage = () => (showReviewPage.value = false)
const handleConfirm = () => console.log('Confirmed')
const handleReject = () => console.log('Rejected')

const copyText = (text) => {
  navigator.clipboard
    .writeText(text)
    .then(() => message.success({ content: '已成功复制到剪贴板。', duration: 1 }))
    .catch(() => message.error({ content: '复制到剪贴板失败，请重试。', duration: 1 }))
}

const onLocked = () => {
  message.success({
    content: `锁定成功`,
    duration: 1, // Duration in seconds
  })
  // Show unLock button
}
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
