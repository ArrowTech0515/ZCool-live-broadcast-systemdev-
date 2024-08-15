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
      columns: [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
      ],
      subColumns: [
        {
          title: 'Order ID',
          dataIndex: 'orderId',
          key: 'orderId',
        },
        {
          title: 'Product',
          dataIndex: 'product',
          key: 'product',
        },
        {
          title: 'Price',
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
