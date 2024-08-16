<template>
  <a-card style="background-color: white;">
    <!-- Inline Layout with Texts, Select, and Buttons -->
    <a-row :gutter="16" align="middle" style="margin-bottom: 16px;">
      <!-- Text elements -->
      <a-col>
        <span>成功金额: 514469</span>
      </a-col>
      <a-col>
        <span>失败金额: 1947</span>
      </a-col>
      <a-col>
        <span>拒绝金额: 68317</span>
      </a-col>
      <a-col>
        <span>待审核金额: 0</span>
      </a-col>

      <!-- Select element -->
      <a-col>
        <a-select defaultValue="30s" style="width: 120px">
          <a-select-option value="30s">30s</a-select-option>
          <a-select-option value="1m">1m</a-select-option>
          <a-select-option value="5m">5m</a-select-option>
        </a-select>
      </a-col>

      <!-- Primary buttons -->
      <a-col>
        <a-button type="primary">导出失败数据</a-button>
      </a-col>
      <a-col>
        <a-button type="primary">导出付款方式</a-button>
      </a-col>

      <!-- Default button -->
      <a-col>
        <a-button>免验证设置</a-button>
      </a-col>
    </a-row>

    <!-- The a-table component -->
    <a-table :columns="columns" :dataSource="data" :expandable="expandable">
      <template #expandedRowRender="record">
        <div class="expanded-row-content">
          <div class="row">
            <div class="cell">支付渠道: {{ record.channel }}</div>
            <div class="cell">实名: {{ record.realName }}</div>
            <div class="cell">手续费: {{ record.fee }}</div>
          </div>
          <div class="row">
            <div class="cell">拒绝理由: {{ record.refuseReason }}</div>
            <div class="cell">账号/卡号: {{ record.accountNumber }}</div>
            <div class="cell">转账订单号: {{ record.transferOrder }}</div>
          </div>
          <div class="row">
            <div class="cell">用户显示结果: {{ record.userDisplayResult }}</div>
          </div>
        </div>
      </template>
    </a-table>
  </a-card>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        { title: '订单号', dataIndex: 'orderNumber' },
        { title: '发起时间', dataIndex: 'startTime' },
        { title: '到账时间', dataIndex: 'arrivalTime' },
        { title: '游戏ID', dataIndex: 'gameId' },
        { title: '用户昵称', dataIndex: 'userName' },
        { title: '提现金额', dataIndex: 'withdrawAmount' },
        { title: '实际到账', dataIndex: 'actualArrival' },
        { title: '通道', dataIndex: 'channel' },
        { title: '状态', dataIndex: 'status' },
        { title: '转账', dataIndex: 'transfer' },
        { title: '操作类型', dataIndex: 'operationType' },
      ],
      data: [
        {
          key: 1,
          orderNumber: 'CA88982520842',
          startTime: '07-10 17:08:40',
          arrivalTime: '07-10 17:52:40',
          gameId: '3515409',
          userName: '比特币_09',
          withdrawAmount: 505,
          actualArrival: 501,
          channel: '银行卡',
          status: '已通过',
          transfer: '失败',
          operationType: 'API/大额转账支付',
          realName: '张三',
          fee: 5,
          refuseReason: '支付信息核实失败',
          accountNumber: '6172898736510092',
          transferOrder: '-',
          userDisplayResult: '-',
        },
        {
          key: 2,
          orderNumber: 'CA88982520851',
          startTime: '07-10 17:06:40',
          arrivalTime: '07-10 17:32:40',
          gameId: '3515409',
          userName: '比特币_09',
          withdrawAmount: 600,
          actualArrival: 600,
          channel: '银行卡',
          status: '已通过',
          transfer: '失败',
          operationType: 'API/秒付转账',
          realName: '李四',
          fee: 5,
          refuseReason: '支付信息核实失败',
          accountNumber: '6172898736510092',
          transferOrder: '-',
          userDisplayResult: '-',
        },
      ],
      expandable: {
        expandedRowRender: (record) => this.renderSubRow(record),
        expandIconColumnIndex: 0,
      },
    };
  },
  methods: {
    renderSubRow(record) {
      return this.$scopedSlots.expandedRowRender({ record });
    },
  },
};
</script>

<style scoped>
.expanded-row-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.row {
  display: contents;
}

.cell {
  padding: 8px;
}
</style>
