<template>
  <a-table
    rowKey="anchor_id"
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
import { getAnchorListReq, anchorAddOrEditReq, setAnchorBlackReq } from '@/api/anchor'
import MerchCell from '@/components/Business/MerchCell.jsx'
import { getPathFromUrlArray } from '@/utils/index'
import { message } from 'ant-design-vue'
import useFirstDepositRule from '../hooks/useFirstDepositRule'

const emit = defineEmits(['emit_editData'])

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

const router = useRouter()
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

const { loading, refresh } = useRequest(() => getAnchorListReq({
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

const { customRender } = MerchCell(loading)

const centeredStyle = { textAlign: 'center' }

const dataSource = ref([
  {
    orderNumber: '789456',
    userId: 'j12345',
    nickname: '大聖',
    userAccount: 'user01',
    rechargeType: '手動入款',
    register_time: '2024-10-13 12:23:00',
    creationTime: '2024-10-14 12:23:00',
  },
  {
    orderNumber: '789457',
    userId: 'k33223',
    nickname: '胖虎',
    userAccount: 'user02',
    rechargeType: '轉帳匯款',
    register_time: '2024-05-22 12:23:00',
    creationTime: '2024-05-22 17:37:00',
  },
  {
    orderNumber: '789458',
    userId: 'polo323',
    nickname: '福德正神',
    userAccount: 'user03',
    rechargeType: '轉帳匯款',
    register_time: '2024-05-22 13:45:12',
    creationTime: '2024-05-22 18:32:12',
  },
  {
    orderNumber: '789443',
    userId: 'greenflower',
    nickname: '翠花',
    userAccount: 'user04',
    rechargeType: '轉帳匯款',
    register_time: '2024-04-09 12:23:00',
    creationTime: '2024-04-09 14:43:12',
  },
  {
    orderNumber: '789412',
    userId: 'greenflower',
    nickname: '翠花',
    userAccount: 'user04',
    rechargeType: '轉帳匯款',
    register_time: '2024-03-13 12:23:00',
    creationTime: '2024-03-13 13:23:00',
  },
]);

const columns = [
  {
    title: '首存订单单号',
    dataIndex: 'orderNumber',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.orderNumber}</div>,
  },
  {
    title: '用户ID',
    dataIndex: 'userId',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.userId}</div>,
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.nickname}</div>,
  },
  {
    title: '用户账号',
    dataIndex: 'userAccount',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.userAccount}</div>,
  },
  {
    title: '充值類型',
    dataIndex: 'rechargeType',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.rechargeType}</div>,
  },
  {
    title: '註冊時間',
    dataIndex: 'register_time',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.register_time}</div>,
  },
  {
    title: '創建時間',
    dataIndex: 'creationTime',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.creationTime}</div>,
  },
]


async function exportList() {
  const formValue = ref({
    first_deposit_order_number: null,
    application_id: null,
  })

  const fApi = ref(null)
  const firstDepositRule = useFirstDepositRule(false, true, fApi)

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
    rule: firstDepositRule,
  })

  console.log("first_deposit_order_number: " + formValue.first_deposit_order_number)

  createDialog({
    title: '導出列表',
    width: 600,
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

// 添加主播，不可编辑
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
  })

  const fApi = ref(null)
  const anchorRule = useAnchorRule(false, true, fApi)
  const formModalProps = reactive({
    request: data => anchorAddOrEditReq(null, data),
    getData(data) {
      const { avatar_url, ...rest } = data
      return {
        ...rest,
        avatar_url: getPathFromUrlArray(avatar_url),
      }
    },
    rule: anchorRule,
  })

  createDialog({
    title: '添加主播',
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

defineExpose({
  editItem, exportList
})
</script>
