<template>
  <a-table
    rowKey="anchor_id"
    :pagination="false"
    :scroll="{ x: 1200, y: 800 }"
    :dataSource="data"
    :columns="columns"
    :expandable="expandable"
  />

  <a-pagination
    class="mt15"
    hideOnSinglePage
    v-model:current="pagination.page"
    v-model:pageSize="pagination.limit"
    size="small"
    :total="pagination.total"
  />
</template>

<script setup lang="jsx">
import { ref, reactive } from 'vue';
// import { useRequest } from 'vue-request';
import { getAnchorListReq, anchorAddOrEditReq, setAnchorBlackReq } from '@/api/anchor';
import blockUserRule from '@/rules/blockUserRule';
import MerchCell from '@/components/Business/MerchCell.jsx';
import useAnchorRule from '../hooks/useOrderRule';
import useAnchorRule2 from '../hooks/useOrderRule2';
import { getPathFromUrlArray } from '@/utils/index';

// Define props
const props = defineProps({
  searchParams: {
    type: Object,
    default: () => ({}),
  },
  resetSearch: {
    type: Function,
    default: () => {},
  },
});

// Initialize pagination and data state
const pagination = reactive({
  page: 1,
  limit: 10,
  total: 0,
});

const data = ref([
  {
    anchor_id: 1,
    user_id : 1,
    date1: 123456,
    date2: 123456,
    nickname: 'App A',
    room_id: '123',
    subData: [
      { key: 1, orderId: '1001', product: 'Laptop', price: '$1200' },
      { key: 2, orderId: '1002', product: 'Phone', price: '$800' },
    ],
  },
  {
    anchor_id: 2,
    user_id : 2,
    date1: '123456',
    date2: '123456',
    nickname: 'App B',
    room_id: '456',
    subData: [
      { key: 3, orderId: '1003', product: 'Tablet', price: '$600' },
      { key: 4, orderId: '1004', product: 'Headphones', price: '$200' },
    ],
  },
]);

// Define columns
const columns = [
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
];

// Define sub-columns for the expandable table
const subColumns = [
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
];

// Use request hook to fetch data
// const { loading, refresh } = useRequest(() =>
//   getAnchorListReq({
//     ...props.searchParams,
//     page: pagination.page,
//     limit: pagination.limit,
//   }),
//   {
//     refreshDeps: true,
//     onSuccess(data) {
//       data.value = data.items;
//       pagination.total = data.total_data;
//     },
//   }
// );

// Expandable row rendering
const expandable = {
  expandedRowRender: (record) => {
    return record.subData ? (
      <a-table
        columns={subColumns}
        dataSource={record.subData}
        pagination={false}
      />
    ) : null;
  },
};

// Dialog for blocking users
const { createDialog } = useDialog();


// Dialog for editing items
async function editItem() {
  const formValue = ref({
    avatar_url: '',
    nickname: '',
    phone: '',
    email: '',
    guild_id: '',
    ps_ratio: '',
    hourly_rate: '',
    hourly_rate_ulimit: '',
    password: '',
    merch_id: [],
  });

  const fApi = ref(null);
  const anchorRule = useAnchorRule(false, true, fApi);
  const formModalProps = reactive({
    request: (data) => anchorAddOrEditReq(null, data),
    getData(data) {
      const { avatar_url, ...rest } = data;
      return {
        ...rest,
        avatar_url: getPathFromUrlArray(avatar_url),
      };
    },
    rule: anchorRule,
  });

  createDialog({
    title: '导出CSV',
    width: 500,
    component: (
      <ModalForm v-model={formValue.value} v-model:fApi={fApi.value} {...formModalProps} />
    ),
    onConfirm() {
      pagination.page = 1;
      pagination.total = 0;
      props.resetSearch();
    },
  });
}

// Dialog for editing items using a different rule set
async function editItem2() {
  const formValue = ref({
    avatar_url: '',
    nickname: '',
    phone: '',
    email: '',
    guild_id: '',
    ps_ratio: '',
    hourly_rate: '',
    hourly_rate_ulimit: '',
    password: '',
    merch_id: [],
  });

  const fApi = ref(null);
  const anchorRule = useAnchorRule2(false, true, fApi);
  const formModalProps = reactive({
    request: (data) => anchorAddOrEditReq(null, data),
    getData(data) {
      const { avatar_url, ...rest } = data;
      return {
        ...rest,
        avatar_url: getPathFromUrlArray(avatar_url),
      };
    },
    rule: anchorRule,
  });

  createDialog({
    title: '提现设置',
    width: 500,
    component: (
      <ModalForm v-model={formValue.value} v-model:fApi={fApi.value} {...formModalProps} />
    ),
    onConfirm() {
      pagination.page = 1;
      pagination.total = 0;
      props.resetSearch();
    },
  });
}

defineExpose({
  editItem,
  editItem2,
});
</script>
