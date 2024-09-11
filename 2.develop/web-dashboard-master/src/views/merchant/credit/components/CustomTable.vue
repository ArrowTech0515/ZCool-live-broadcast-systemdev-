<template>
  <a-table
    rowKey="id"
    :pagination="false"
    :dataSource="paginatedData"
    :columns="columns"
    :loading="loading"
  />

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
import useCreditRule from '../hooks/useCreditRule';

const emit = defineEmits(['emit_credit_details'])

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
    id: 1,
    merch_name: '蒂萨传媒',
    total_credit_amount: 5000,
    total_income: 32423,
    create_time: '2023-01-10 12:22:21',
    cur_diamond_balance: 1000,
    balance_income: 32423,
  },
  {
    id: 2,
    merch_name: '张非传媒',
    total_credit_amount: 5000,
    total_income: 32423,
    create_time: '2023-01-10 12:22:21',
    cur_diamond_balance: 1000,
    balance_income: 32423,
  },
  {
    id: 3,
    merch_name: '蒂萨传媒',
    total_credit_amount: 5000,
    total_income: 32423,
    create_time: '2023-01-10 12:22:21',
    cur_diamond_balance: 1000,
    balance_income: 32423,
  },
  {
    id: 4,
    merch_name: '张非传媒',
    total_credit_amount: 5000,
    total_income: 32423,
    create_time: '2023-01-10 12:22:21',
    cur_diamond_balance: 1000,
    balance_income: 32423,
  },
  {
    id: 5,
    merch_name: '蒂萨传媒',
    total_credit_amount: 5000,
    total_income: 32423,
    create_time: '2023-01-10 12:22:21',
    cur_diamond_balance: 1000,
    balance_income: 32423,
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

const columns = [
  {
    title: '商户名称',
    dataIndex: 'merch_name',
    align: 'center',
  },
  {
    title: '授信总额（钻石）',
    dataIndex: 'total_credit_amount',
    align: 'center',
  },
  {
    title: '商户总收益（钻石）',
    dataIndex: 'total_income',
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
    align: 'center',
  },
  {
    title: '当前钻石余额',
    dataIndex: 'cur_diamond_balance',
    align: 'center',
  },
  {
    title: '结余收益（钻石）',
    dataIndex: 'balance_income',
    align: 'center',
  },
  {
    title: '操作',
    fixed: 'right',
    width: 120,
    dataIndex: 'action',
    align: 'center',
    customRender: ({ record }) =>
      <div>
        <span 
          style="text-decoration: underline;color: #1890ff; margin-right: 12px; cursor: pointer;" 
          onClick={() => emit('emit_credit_details')}>
          授信明细</span>
      </div>
  }
]

// 商户启用/停用
async function onCredit(item = {}) {
  const merch_id = item.id || item.merch_id || null // 兼容 id 和 merch_id
  const formValue = ref({
    merch_id,
    merch_name: item.merch_name,
  })

  const isCreate = !merch_id
  const fApi = ref(null)
  const creditRule = useCreditRule(false, false, fApi)
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
    //       style: {
    //         paddingRight: '50px',
    //       },
    //     },
    //   },
    // },
    rule: creditRule,
  }

  createDialog({
    title: '充值授信',
    width: 600,
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
  onCredit,
})
</script>
