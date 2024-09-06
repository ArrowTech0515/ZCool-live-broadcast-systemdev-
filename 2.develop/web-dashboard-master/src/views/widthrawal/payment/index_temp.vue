<template>
  <a-card style="background-color: white;">
  <!-- Inline Layout with Texts, Select, and Buttons -->
    <a-row align="middle" style="margin-bottom: 16px;">
      <!-- Centered Text elements and Select -->
      <a-col style="flex: auto; display: flex; justify-content: space-around; align-items: center;">
        <a-col style="text-align: center;">
          <span>成功金额: 514469</span>
        </a-col>
        <a-col style="text-align: center;">
          <span>失败金额: 1947</span>
        </a-col>
        <a-col style="text-align: center;">
          <span>拒绝金额: 68317</span>
        </a-col>
        <a-col style="text-align: center;">
          <span>待审核金额: 0</span>
        </a-col>
        <a-col >
          <span>数据刷新: </span>
          <a-select defaultValue="30s" style="width: 120px;">
            <a-select-option value="30s">30s</a-select-option>
            <a-select-option value="1m">1m</a-select-option>
            <a-select-option value="5m">5m</a-select-option>
          </a-select>
        </a-col>
      </a-col>

      <!-- Buttons on the right -->
      <a-col style="flex: auto; text-align: right;">
        <a-button :flex="1" type="primary" style="margin-right: 8px;">导出失败数据</a-button>
        <a-button :flex="1" type="primary" style="margin-right: 8px;">导出付款方式</a-button>
        <a-button :flex="1">免验证设置</a-button>
      </a-col>
    </a-row>
    <!-- Your existing layout and table setup -->
    <a-table 
    :columns="columns" 
    :data-source="paginatedData"
    :expandable="{ expandedRowRender }"
    :pagination="false">
      <!-- Scoped Slot for Custom Column Rendering -->
    
      <template #bodyCell="{ column, text }" >
        <!-- Render Multiline Text for '游戏ID' Column with Color Styling -->
        <span v-if="column.dataIndex === 'gameId'">
          <div v-for="(line, index) in text.split('\n')" :key="index">
            <!-- Check for colon and split the text into label and value -->
            <span>{{ line.split(':')[0] }}:</span>
            <span :style="{ color: 'blue' }">{{ line.split(':')[1] }}</span>
          </div>
        </span>

        <!-- Render '状态' Column with Color Styling -->
        <span v-else-if="column.dataIndex === 'status'">
          <span :style="text === '已通过' ? 'color: blue;' : text === '失败' ? 'color: red;' : ''">
            {{ text }}
          </span>
        </span>
        <span v-else-if="column.dataIndex === 'transfer'">
          <span :style="text === '已通过' ? 'color: blue;' : text === '失败' ? 'color: red;' : ''">
            {{ text }}
          </span>
        </span>
        <!-- Default Rendering for Other Columns -->
        <span v-else>{{ text }}</span>
      </template>

      <!-- Expanded Row Render Template -->
      <template #expandedRowRender="{ record }">
        <div class="expanded-row-content">
          <div class="row">
            <div class="cell">支付渠道: {{ record.expandedData.channel }}</div>
            <div class="cell">实名: {{ record.expandedData.realName }}</div>
            <div class="cell">账号/卡号: {{ record.expandedData.accountNumber }}</div>
          </div>
          <div class="row">
            <div class="cell">手续费: {{ record.expandedData.fee }}</div>
            <div class="cell">实际到账金额: {{ record.expandedData.actualArrival }}</div>
            <div class="cell">转账订单号: {{ record.expandedData.transferOrder }}</div>
          </div>
          <div class="row">
            <div class="cell">拒绝理由: {{ record.expandedData.refuseReason }}</div>
            <div class="cell">请求银行信息: {{ record.expandedData.bankInfo }}</div>
            <div class="cell">用户显示结果: {{ record.expandedData.userDisplayResult }}</div>
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

  </a-card>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      totalItems: 100, // total number of data items
      columns: [
        { title: '订单号', dataIndex: 'orderNumber', align: 'center' },
        { title: '发起时间', dataIndex: 'startTime', align: 'center' },
        { title: '到账时间', dataIndex: 'arrivalTime', align: 'center' },
        { title: '游戏ID', dataIndex: 'gameId', align: 'center' },
        { title: '用户昵称', dataIndex: 'userName', align: 'center' },
        { title: '提现金额', dataIndex: 'withdrawAmount', align: 'center' },
        { title: '实际到账', dataIndex: 'actualArrival', align: 'center' },
        { title: '通道', dataIndex: 'channel', align: 'center' },
        { title: '状态', dataIndex: 'status', align: 'center' },
        { title: '转账', dataIndex: 'transfer', align: 'center' },
        { title: '操作类型', dataIndex: 'operationType', align: 'center' },
      ],
      data: [
        {
          key: 1,
          orderNumber: 'CA88982520842',
          startTime: '07-10 17:08:40',
          arrivalTime: '07-10 17:52:40',
          gameId: 'APP: 3515409\n游戏: 7878797',
          userName: '比特币_09',
          withdrawAmount: 505,
          actualArrival: 501,
          channel: '银行卡-中国银行',
          status: '已通过',
          transfer: '失败',
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
          gameId: 'APP: 3515409\n游戏: 7878797',
          userName: '比特币_09',
          withdrawAmount: 505,
          actualArrival: 501,
          channel: '银行卡-中国银行',
          status: '已通过',
          transfer: '失败',
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
          key: 3,
          orderNumber: 'CA88982520842',
          startTime: '07-10 17:08:40',
          arrivalTime: '07-10 17:52:40',
          gameId: 'APP: 3515409\n游戏: 7878797',
          userName: '比特币_09',
          withdrawAmount: 505,
          actualArrival: 501,
          channel: '银行卡-中国银行',
          status: '已通过',
          transfer: '失败',
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
          key: 4,
          orderNumber: 'CA88982520842',
          startTime: '07-10 17:08:40',
          arrivalTime: '07-10 17:52:40',
          gameId: 'APP: 3515409\n游戏: 7878797',
          userName: '比特币_09',
          withdrawAmount: 505,
          actualArrival: 501,
          channel: '银行卡-中国银行',
          status: '已通过',
          transfer: '失败',
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
          key: 5,
          orderNumber: 'CA88982520842',
          startTime: '07-10 17:08:40',
          arrivalTime: '07-10 17:52:40',
          gameId: 'APP: 3515409\n游戏: 7878797',
          userName: '比特币_09',
          withdrawAmount: 505,
          actualArrival: 501,
          channel: '银行卡-中国银行',
          status: '已通过',
          transfer: '失败',
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
          key: 6,
          orderNumber: 'CA88982520851',
          startTime: '07-10 17:06:40',
          arrivalTime: '07-10 17:32:40',
          gameId: 'APP: 3515409\n游戏: 7878797',
          userName: '比特币_09',
          withdrawAmount: 600,
          actualArrival: 600,
          channel: '银行卡-中国银行',
          status: '已通过',
          transfer: '失败',
          operationType: 'API/秒付转账',
          expandedData: {
            channel: '银行卡-中国银行',
            realName: '李四',
            accountNumber: '6172898736510092',
            fee: 5,
            actualArrival: 600,
            transferOrder: '-',
            refuseReason: '-',
            bankInfo: '支付信息核实失败',
            userDisplayResult: '-',
          },
        },
      ],
    };
  },
  computed: {
    paginatedData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.data.slice(start, end);
    },
  },
  methods: {
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
