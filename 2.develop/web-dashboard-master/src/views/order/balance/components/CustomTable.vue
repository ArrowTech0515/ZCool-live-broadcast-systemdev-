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
import ENUMS from '@/enums/common'
import blockUserRule from '@/rules/blockUserRule'
import MerchCell from '@/components/Business/MerchCell.jsx'
import useOrderRule from '../hooks/useOrderRule'
import { getPathFromUrlArray } from '@/utils/index'

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

const dataSource = ref([
{
    anchor_id: '1',
    source_name: '商户1',
    nickname: '应用1',
    room_id: '订单号1',
    phone: '用户昵称1',
    email: '用户ID1',
    sr_weight: '兑换比例1',
    fr_weight: '兑换余额1',
    rr_weight: '2024-09-01 12:00',
  },
  {
    anchor_id: '2',
    source_name: '商户2',
    nickname: '应用2',
    room_id: '订单号2',
    phone: '用户昵称2',
    email: '用户ID2',
    sr_weight: '兑换比例2',
    fr_weight: '兑换余额2',
    rr_weight: '2024-09-02 13:00',
  },
  {
    anchor_id: '3',
    source_name: '商户3',
    nickname: '应用3',
    room_id: '订单号3',
    phone: '用户昵称3',
    email: '用户ID3',
    sr_weight: '兑换比例3',
    fr_weight: '兑换余额3',
    rr_weight: '2024-09-03 14:00',
  }
])

const centeredStyle = { textAlign: 'center' }

const columns = [
  {
    title: '所属商户',
    dataIndex: 'source_name',
    align: 'center',  // This aligns the content centrally
    customRender: ({ record }) => <div style={centeredStyle}>{record.source_name}</div>,
  },
  {
    title: '所属应用',
    dataIndex: 'nickname',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.nickname}</div>,
  },
  {
    title: '订单号',
    dataIndex: 'nickname',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.nickname}</div>,
  },
  {
    title: '用户昵称',
    dataIndex: 'room_id',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.room_id}</div>,
  },
  {
    title: '用户ID',
    dataIndex: 'phone',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.phone}</div>,
  },
  {
    title: '兑换比例',
    dataIndex: 'email',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.email}</div>,
  },
  {
    title: '兑换余额',
    dataIndex: 'sr_weight',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.sr_weight}</div>,
  },
  {
    title: '兑换钻石',
    dataIndex: 'fr_weight',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.fr_weight}</div>,
  },
  {
    title: '时间',
    dataIndex: 'rr_weight',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.rr_weight}</div>,
  }
]


async function exportCSV() {
  const formValue = ref({
    first_deposit_order_number: null,
    application_id: null,
  })

  const fApi = ref(null)
  const orderRule = useOrderRule(false, true, fApi)

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
    rule: orderRule,
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
  const anchorRule = useOrderRule(false, true, fApi)
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
    title: '导出CSV',
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
  editItem, exportCSV
})
</script>
