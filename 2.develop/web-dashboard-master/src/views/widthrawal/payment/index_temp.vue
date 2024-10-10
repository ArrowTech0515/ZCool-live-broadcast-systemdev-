<template>
  <a-card style="margin-bottom: 1%">
    <!-- Inline Layout with Texts, Select, and Buttons -->
    <a-row align="middle">
      <!-- Centered Text elements and Select -->
      <a-col style="flex: auto; display: flex; justify-content: space-around; align-items: center;">
        <a-col style="text-align: center;">
          <span>成功金额: {{ successAmount }}</span>
        </a-col>
        <a-col style="text-align: center;">
          <span>失败金额: {{ failedAmount }}</span>
        </a-col>
        <a-col style="text-align: center;">
          <span>拒绝金额: {{ rejectedAmount }}</span>
        </a-col>
        <a-col style="text-align: center;">
          <span>待审核金额: {{ pendingAmount }}</span>
        </a-col>
        <a-col>
          <span>数据刷新: </span>
          <a-select v-model:value="refreshInterval" style="width: 120px;">
            <a-select-option value="30s">30s</a-select-option>
            <a-select-option value="1m">1m</a-select-option>
            <a-select-option value="5m">5m</a-select-option>
          </a-select>
        </a-col>
      </a-col>

      <!-- Buttons on the right -->
      <a-col style="flex: auto; text-align: right;">
        <a-button type="primary" style="margin-right: 8px;" @click="exportBigData">导出大数据</a-button>
        <a-button type="primary" style="margin-right: 8px;" @click="exportPaymentMethods">导出代付方式</a-button>
        <a-button @click="setupValidator">免验证器设置</a-button>
      </a-col>
    </a-row>
  </a-card>

  <!-- Main Data Table -->
  <a-table 
    :columns="columns" 
    :data-source="paginatedData"
    :expandable="{ expandedRowRender }"
    :pagination="false">
    
    <!-- Scoped Slot for Custom Column Rendering -->
    <template #bodyCell="{ column, text, record }">
      <!-- Render Multiline Text for '游戏ID' Column using sub-items -->
      <span v-if="column.dataIndex === 'gameId'">
        <span v-if="record.gameData">
          <div>
            <span>APP:</span> <span style="color: #1890ff;">{{ record.gameData.appId }}</span>
          </div>
          <div>
            <span>游戏:</span> <span style="color: #1890ff;">{{ record.gameData.gameId }}</span>
          </div>
        </span>
      </span>

      <a-tag 
        v-else-if="column.dataIndex === 'status'" 
        :color="text === 2 ? 'green' : 'red'">
        {{ ENUM.pass_status[text] }}
      </a-tag>
      
      <span v-else-if="column.dataIndex === 'transfer_status'">
        <span :style="text === 2 ? 'color: green;' : 'color: red;'">
          {{ ENUM.success_status[text] }}
        </span>
      </span>
      
      <!-- Default Rendering for Other Columns -->
      <span v-else>{{ text }}</span>
    </template>

    <!-- Expanded Row Render Template with Left Alignment -->
    <template #expandedRowRender="{ record }">
      <div class="expanded-row-content">
        <div class="row">
          <div class="cell">支付渠道: <span style="text-align: left;">{{ record.expandedData.channel }}</span></div>
          <div class="cell">实名: <span style="text-align: left;">{{ record.expandedData.realName }}</span></div>
          <div class="cell">账号/卡号: <span style="text-align: left;">{{ record.expandedData.accountNumber }}</span></div>
        </div>
        <div class="row">
          <div class="cell">手续费: <span style="text-align: left;">{{ record.expandedData.fee }}</span></div>
          <div class="cell">实际到账金额: <span style="text-align: left;">{{ record.expandedData.actualArrival }}</span></div>
          <div class="cell">转账订单号: <span style="text-align: left;">{{ record.expandedData.transferOrder }}</span></div>
        </div>
        <div class="row">
          <div class="cell">拒绝理由: <span style="text-align: left;">{{ record.expandedData.refuseReason }}</span></div>
          <div class="cell">请求银行信息: <span style="text-align: left;">{{ record.expandedData.bankInfo }}</span></div>
          <div class="cell">用户显示结果: <span style="text-align: left;">{{ record.expandedData.userDisplayResult }}</span></div>
        </div>
      </div>
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
    
  <ExportPaymentMethod 
    :isModalVisible="isModalVisible"
    @update:is-modal-visible="val => isModalVisible = val" 
  />

  <GoogleVerificationDialog
      v-model:open="showVerificationDialog"
      :maxAttempts="3"
      :correctCode="'111'"
      @onSuccess="handleSuccess"
      @onFail="handleFail"
    />
</template>

<script setup lang="jsx">
import ExportPaymentMethod from './ExportPaymentMethod.vue';
import useExportBigRule from './hooks/useExportBigRule';
import GoogleVerificationDialog from './GoogleVerificationDialog.vue'; // Import the Dialog component

// Dialog for blocking users
const { createDialog } = useDialog();

const isModalVisible = ref(false);
const showVerificationDialog = ref(false);

// Success, failed, rejected, and pending amounts
const successAmount = ref(514469)
const failedAmount = ref(1947)
const rejectedAmount = ref(68317)
const pendingAmount = ref(0)

const refreshInterval = ref('30s') // Bind variable for data refresh interval
const currentPage = ref(1)
const pageSize = ref(5)
const totalItems = ref(100)

const columns = [
  { title: '订单号', dataIndex: 'orderNumber', align: 'center' },
  { title: '发起时间', dataIndex: 'startTime', align: 'center' },
  { title: '到账时间', dataIndex: 'arrivalTime', align: 'center' },
  { title: '游戏ID', dataIndex: 'gameId', align: 'center' },
  { title: '用户昵称', dataIndex: 'userName', align: 'center' },
  { title: '提现金额', dataIndex: 'withdrawAmount', align: 'center' },
  { title: '实际到账', dataIndex: 'actualArrival', align: 'center' },
  { title: '通道', dataIndex: 'channel', align: 'center' },
  { title: '状态', dataIndex: 'status', align: 'center' },
  { title: '转账', dataIndex: 'transfer_status', align: 'center' },
  { title: '操作类型', dataIndex: 'operationType', align: 'center' },
];

const data = ref([
  {
    key: 1,
    orderNumber: 'CA88982520842',
    startTime: '07-10 17:08:40',
    arrivalTime: '07-10 17:52:40',
    gameData: {
      appId: '3515409',
      gameId: '7878797',
    },
    userName: '比特币_09',
    withdrawAmount: 505,
    actualArrival: 501,
    channel: '银行卡-中国银行',
    status: 2,//'已通过',
    transfer_status: 3,//'失败',
    operationType: 'API/大额转账支付',
    expandedData: {
      channel: '银行卡-中国银行',
      realName: '张三',
      accountNumber: '6172898736510092',
      fee: 5,
      actualArrival: 501,
      transferOrder: '-',
      refuseReason: '-',
      bankInfo: '支付信息核实失败',
      userDisplayResult: '-',
    },
  },
  {
    key: 2,
    orderNumber: 'CA88982520842',
    startTime: '07-10 17:08:40',
    arrivalTime: '07-10 17:52:40',
    gameData: {
      appId: '3515409',
      gameId: '7878797',
    },
    userName: '比特币_09',
    withdrawAmount: 505,
    actualArrival: 501,
    channel: '银行卡',
    status: 3,//'已通过',
    transfer_status: 2,//'成功',
    operationType: 'API/大额转账支付',
    expandedData: {
      channel: '银行卡-中国银行',
      realName: '张三',
      accountNumber: '6172898736510092',
      fee: 5,
      actualArrival: 501,
      transferOrder: '-',
      refuseReason: '-',
      bankInfo: '支付信息核实失败',
      userDisplayResult: '-',
    },
  },
]);

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return data.value.slice(start, end);
});

// Handlers and bound functions
const handlePageChange = (page) => {
  currentPage.value = page;
};

const handleSizeChange = (current, size) => {
  pageSize.value = size;
  currentPage.value = 1; // Reset to the first page when page size changes
};

const exportPaymentMethods = () => {
  isModalVisible.value = true;
};

async function exportBigData() {
  const formValue = ref({
    // user_id: null,
    // application_id: null,
  })

  const fApi = ref(null)
  const exportListRule = useExportBigRule(fApi)

  console.log("editItem : fApi = " + fApi.value)

  
  const formModalProps = reactive({
    request: data => anchorAddOrEditReq(null, data),
    getData(data) {
      const { avatar_url, ...rest } = data
      return {
        ...rest,
        avatar_url: getPathFromUrlArray(avatar_url),
      }
    },
    rule: exportListRule,
  })

  createDialog({
    title: '导出大数据',
    width: 500,
    component:
      <ModalForm
        v-model={formValue.value}
        v-model:fApi={fApi.value}
        {...formModalProps}
      >
      </ModalForm>
    ,
    onConfirm() {
      pagination.page = 1
      pagination.total = 0
      props.resetSearch()
    },
  })
}
// Handle success and fail events
const handleSuccess = () => {
  console.log('Verification successful!');
  // Add your custom logic for successful verification here
};

const handleFail = () => {
  console.log('Maximum attempts reached or verification failed!');
  // Add your custom logic for failed attempts here
};
const setupValidator = () => {
  console.log('showVerificationDialog : ' + showVerificationDialog.value);
  showVerificationDialog.value = true
};

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
  text-align: left; /* Align text to the left */
}
</style>
