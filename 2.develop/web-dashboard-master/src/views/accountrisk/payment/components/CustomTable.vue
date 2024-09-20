<template>
    <div class="scroll-container"> <!-- Wrapper for horizontal scroll -->
      <a-table
        rowKey="id"
        :pagination="false"
        :dataSource="paginatedData"
        :columns="columns"
        :loading="loading"
        :scroll="{ x: 'max-content' }"
      />
    </div>

    <div style="display: flex; align-items: center; justify-content: flex-end; margin-top: 16px;">
      <span style="margin-right: 8px;">共 {{ pagination.total }}条</span>
      <a-pagination
        v-model:current="pagination.page"
        :total="pagination.total"
        :page-size="pagination.limit"
        show-size-changer
        :page-size-options="['5', '10', '20', '50', '100']"
        :simple="false"
        size="small"
        @change="handlePageChange"
        @show-size-change="handleSizeChange"
      />
    </div>
</template>

<script setup lang="jsx">
import { getMerchantListReq, merchantAddOrEditReq, setMerchantStatusReq } from '@/api/merchant'
import useAddLabelRule from '../hooks/useAddLabelRule'

const props = defineProps({
  searchParams: {
    type: Object,
    default: () => ({}),
  },
  resetSearch: {
    type: Function,
    default: () => { },
  },
})

const pagination = reactive({
  page: 1,
  limit: 5,
  total: 100,
})

const paginatedData = computed(() => {
  const start = (pagination.page - 1) * pagination.limit
  const end = start + pagination.limit
  return dataSource.value.slice(start, end)
})

const handlePageChange = (page) =>  {
  pagination.page = page
}

const handleSizeChange = (current, size) => {
  pagination.limit = size
  pagination.page = 1 // Reset to the first page when page size changes
}

const dataSource = ref([
  {
    id: '1',
    user_name: '商户1',
    last_pay_time: '2023-09-10 12:00:00', // New Field: Last Payment Time
    amount: 5000, // New Field: Amount
    check_status: '已完成', // completed
    payment_create_time: '2023-09-09 14:00:00', // New Field: Payment Create Time
    payment_method: 'Alipay', // Payment Method remains
  },
  {
    id: '2',
    user_name: '商户2',
    last_pay_time: '2023-09-12 08:30:00',
    amount: 3000,
    check_status: '待处理', // pending
    payment_create_time: '2023-09-11 10:00:00',
    payment_method: 'WeChat Pay',
  },
  {
    id: '3',
    user_name: '商户3',
    last_pay_time: '2023-09-08 17:45:00',
    amount: 10000,
    check_status: '已拒绝', // rejected
    payment_create_time: '2023-09-07 15:20:00',
    payment_method: 'Credit Card',
  },
  {
    id: '4',
    user_name: '商户3',
    last_pay_time: '2023-09-08 17:45:00',
    amount: 10000,
    check_status: '待处理',
    payment_create_time: '2023-09-07 15:20:00',
    payment_method: 'Credit Card',
  },
  {
    id: '5',
    user_name: '商户2',
    last_pay_time: '2023-09-08 17:45:00',
    amount: 10000,
    check_status: '待处理',
    payment_create_time: '2023-09-07 15:20:00',
    payment_method: 'WeChat Pay',
  },
])

const { loading, refresh } = useRequest(() => getMerchantListReq({
  ...props.searchParams,
  page: pagination.page,
  limit: pagination.limit,
}), {
  refreshDeps: true,
  onSuccess(data) {
    dataSource.value = data.items
    pagination.total = data.total_data
  },
})

const { createDialog } = useDialog()
const centeredStyle = { textAlign: 'center'}

// Function to check if a payment method is used by multiple entries
// For temperary for frontend side
const isPaymentMethodDuplicate = (method) => {
  const methods = dataSource.value.map((item) => item.payment_method)
  const count = methods.filter((m) => m === method).length
  return count > 1
}

const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: '用户名',
    dataIndex: 'user_name',
    align: 'center',
  },
  {
    title: '支付方式',
    dataIndex: 'payment_method',
    align: 'center',
    customRender: ({ record }) => {
      const isDuplicate = isPaymentMethodDuplicate(record.payment_method)
      return (
        <span style={isDuplicate ? 'color: red; font-weight: bold;' : ''}>
          {record.payment_method} {isDuplicate ? '(重复)' : ''}
        </span>
      )
    },
  },
  {
    title: '支付创建时间',
    dataIndex: 'payment_create_time',
    align: 'center',
  },
  {
    title: '上次支付时间',
    dataIndex: 'last_pay_time',
    align: 'center',
  },
  {
    title: '支付金额',
    dataIndex: 'amount',
    align: 'center',
    customRender: ({ record }) => 
      <span>{`${record.amount} 元`}</span>
  },
  {
    title: '审核状态',
    dataIndex: 'check_status',
    align: 'center',
    customRender: ({ record }) =>
      <a-tag color={record.check_status === '待处理' ? 'orange' : record.check_status === '已完成' ? 'green' : 'red'}>
        {record.check_status}
      </a-tag>
  },
  // {
  //   title: '操作',
  //   fixed: 'right',
  //   width: 170,
  //   dataIndex: 'action',
  //   align: 'center',
  //   customRender: ({ record }) =>
  //     <div>
  //       <span 
  //         style="text-decoration: underline;color: green; margin-right: 12px; cursor: pointer;" 
  //         onClick={() => onAddLabel(record)}>
  //         编辑</span>
  //       <a-popconfirm title='您确定要删除吗？' onConfirm={() => onDelete(record)}>
  //         <span 
  //         style="text-decoration: underline;color: red; margin-right: 12px; cursor: pointer;" 
  //         >删除</span>
  //       </a-popconfirm>
  //     </div>
  // }
]

// 商户启用/停用
function setStatus(item) {
  loading.value = true
  setMerchantStatusReq(item.merch_id, { latest_time: item.latest_time === 1 ? 2 : 1 }).then(() => {
    loading.value = false
    item.latest_time = item.latest_time === 1 ? 2 : 1
  }).catch(() => {
    loading.value = false
  })
}

async function onDelete(item = {}) {
    // loading.value = true
  // delMessageReq({
  //   message_ids: item.msg_id,
  // }).then(() => {
  //   loading.value = false
  //   pagination.page = 1
  //   pagination.total = 0
  //   props.resetSearch()
  // }).catch(() => {
  //   loading.value = false
  // })
}

async function onAddLabel(item = {}) {
  const merch_id = item.id || null // 兼容 id 和 merch_id

  const isCreate = !merch_id

  const formValue = ref({
    user_name: item.user_name,
    param1: !isCreate ? item.latest_time.param1 : false,
    param2: !isCreate ? item.latest_time.param2 : false,
    param3: !isCreate ? item.latest_time.param3 : false,
  })

  const fApi = ref(null)
  const addoreditRule = useAddLabelRule(false, false, fApi)
  const formModalProps = {
    request: data => merchantAddOrEditReq(isCreate ? null : merch_id, data),
    getData(data) {
      return {
        ...data,
        // 如果是修改商户，body 里 merch_id 传 null，merch_id 放到 url path中。反之，创建用户，merch_id 放到 body 中
        merch_id: isCreate ? data.merch_id : undefined,
      }
    },
    // option: {
    //   global: {
    //     '*': {
    //       wrap: {
    //         labelCol: { span: 6 },
    //       },
    //     },
    //   },
    // },
    rule: addoreditRule,
  }

  createDialog({
    title: isCreate ? '新增风控标签' : '编辑风控标签',
    width: 500,
    component:
      <ModalForm
        v-fApi:value={fApi.value}
        v-model={formValue.value}
        {...formModalProps}
      />
    ,
    onConfirm() {
      if (isCreate) {
        pagination.page = 1
        pagination.total = 0
        props.resetSearch()
      } else {
        refresh()
      }
    },
  })
}

defineExpose({
  onAddLabel,
})
</script>
