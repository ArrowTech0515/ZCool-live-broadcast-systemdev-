<template>
  <a-table
    :dataSource="dataSource"
    :columns="columns"
    :rowKey="record => record.key"
    :bordered="true"
    size="middle"
  >
    <template #withdrawStatus="{ text }">
      <span :class="getWithdrawStatusClass(text)">
        {{ text }}
      </span>
    </template>
    <template #action="{ record }">
      <div>
        <a :style="{ color: 'green' }" @click="onApprove(record)">审核</a>
        <span> | </span>
        <a :style="{ color: 'blue' }" @click="onBind(record)">绑定</a>
      </div>
    </template>
  </a-table>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        {
          title: '提取订单号',
          dataIndex: 'orderNumber',
          key: 'orderNumber',
          align: 'center',
        },
        {
          title: '主播昵称',
          dataIndex: 'nickname',
          key: 'nickname',
          align: 'center',
        },
        {
          title: '房间号',
          dataIndex: 'roomNumber',
          key: 'roomNumber',
          align: 'center',
        },
        {
          title: '所属工会',
          dataIndex: 'union',
          key: 'union',
          align: 'center',
        },
        {
          title: '提取信息',
          dataIndex: 'withdrawInfo',
          key: 'withdrawInfo',
          align: 'center',
        },
        {
          title: '收款信息',
          dataIndex: 'receiverInfo',
          key: 'receiverInfo',
          align: 'center',
        },
        {
          title: '时间',
          dataIndex: 'time',
          key: 'time',
          align: 'center',
        },
        {
          title: '提取状态',
          dataIndex: 'withdrawStatus',
          key: 'withdrawStatus',
          align: 'center',
          scopedSlots: { customRender: 'withdrawStatus' },
        },
        {
          title: '操作账号',
          dataIndex: 'operatorAccount',
          key: 'operatorAccount',
          align: 'center',
        },
        {
          title: '操作',
          dataIndex: 'action',
          key: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' },
        },
      ],
      dataSource: [
        {
          key: '1',
          orderNumber: '230721092345500001',
          nickname: '桃之夭夭',
          roomNumber: '32423',
          union: '菩萨传媒',
          withdrawInfo: '收款货币：印尼盾\n手续费：10%\n提取金额：1000',
          receiverInfo: '提取银行：中国建设银行\n银行卡号：3423423432\n姓名：张三',
          time: '申请时间：2012-12-12 12:21:21\n操作时间：2012-12-12 12:21:21',
          withdrawStatus: '提取中',
          operatorAccount: '管理员 · 张三',
          action: '审核, 绑定',
        },
        {
          key: '2',
          orderNumber: '230721092345500002',
          nickname: '桃之夭夭',
          roomNumber: '32423',
          union: '菩萨传媒',
          withdrawInfo: '收款货币：USDT\n手续费：10%\n提取金额：1000',
          receiverInfo: '提取金额：1000\n虚拟币网络：XXXX\n虚拟地址：XXXXX',
          time: '申请时间：2012-12-12 12:21:21\n操作时间：2012-12-12 12:21:21',
          withdrawStatus: '提取成功',
          operatorAccount: '管理员 · 张三',
          action: '审核, 绑定',
        },
        {
          key: '3',
          orderNumber: '230721092345500003',
          nickname: '桃之夭夭',
          roomNumber: '32423',
          union: '菩萨传媒',
          withdrawInfo: '收款货币：印尼盾\n手续费：10%\n提取金额：1000',
          receiverInfo: '提取银行：中国建设银行\n银行卡号：3423423432\n姓名：张三',
          time: '申请时间：2012-12-12 12:21:21\n操作时间：2012-12-12 12:21:21',
          withdrawStatus: '提取失败',
          operatorAccount: '管理员 · 张三',
          action: '审核, 绑定',
        },
        // Add more rows as necessary
      ],
    };
  },
  methods: {
    getWithdrawStatusClass(status) {
      switch (status) {
        case '提取成功':
          return 'success-text';
        case '提取失败':
          return 'fail-text';
        case '提取中':
          return 'in-progress-text';
        default:
          return '';
      }
    },
    onApprove(record) {
      console.log('Approve clicked for', record);
    },
    onBind(record) {
      console.log('Bind clicked for', record);
    },
  },
};
</script>

<style scoped>
.success-text {
  color: green;
}

.fail-text {
  color: red;
}

.in-progress-text {
  color: blue;
}

a-table {
  font-size: 14px; /* Adjust font size */
}

a-popover span {
  cursor: pointer;
}

a-table .ant-table-cell {
  white-space: pre-wrap;
}

a-table .ant-table-cell {
  padding: 16px; /* Adjust padding as needed */
}
</style>
