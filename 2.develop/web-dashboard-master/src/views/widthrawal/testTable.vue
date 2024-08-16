<template>
  <a-table :columns="columns" :dataSource="data" :expandable="expandable">
    <template #expandedRowRender="record">
      <a-table
        :columns="subColumns"
        :dataSource="record.subData"
        :pagination="false"
      />
    </template>
  </a-table>
</template>

<script>
export default {
  data() {
    return {
      columns : [
      {
        title: '订单号',
        dataIndex: 'user_id',
      },
      {
        title: '发起时间',
        dataIndex: 'date1',
        props: {
          format: 'YYYY-MM-DD',
          valueFormat: 'X',
        },
      },
      {
        title: '到账时间',
        dataIndex: 'date2',
        props: {
          format: 'YYYY-MM-DD',
          valueFormat: 'X',
        },
      },
      {
        title: '游戏ID',
        dataIndex: 'room_id',
      },
      {
        title: '用户昵称',
        dataIndex: 'phone',
      },
      {
        title: '赠送主播',
        dataIndex: 'email',
      },
      {
        title: '提现金额',
        dataIndex: 'email',
      },
      {
        title: '实际到账',
        dataIndex: 'sr_weight',
      },
      {
        title: '通道',
        dataIndex: 'fr_weight',
      },
      {
        title: '状态',
        dataIndex: 'sr_weight',
      },
      {
        title: '一周',
        dataIndex: 'fr_weight',
      },
      {
        title: '操作类型',
        dataIndex: 'fr_weight',
      },
    ],
      subColumns: [
        {
          title: '支付渠道: 银行—中国银行',
          dataIndex: 'orderId',
          key: 'orderId',
        },
        {
          title: '实名: 张三',
          dataIndex: 'product',
          key: 'product',
        },
        {
          title: '账号/卡号: 0',
          dataIndex: 'price',
          key: 'price',
        },
      ],
      data: [
        {
          key: 1,
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          subData: [
            { key: 1, orderId: '1001', product: 'Laptop', price: '$1200' },
            { key: 2, orderId: '1002', product: 'Phone', price: '$800' },
          ],
        },
        {
          key: 2,
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
          subData: [
            { key: 3, orderId: '1003', product: 'Tablet', price: '$600' },
            { key: 4, orderId: '1004', product: 'Headphones', price: '$200' },
          ],
        },
      ],
      expandable: {
        expandedRowRender: (record) => {
          return record.subData ? this.renderSubRow(record) : null;
        },
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
