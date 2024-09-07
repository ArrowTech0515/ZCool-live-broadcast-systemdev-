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
import useExportListRule from '../hooks/useExportListRule'
import useAddRule from '../hooks/useAddRule'

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
    orderNumber: '2931',
    userId: '783876664',
    nickname: '大聖',
    phone: '861366999999',
    dateTime: '2024-12-12 13:33:32',
    gamePlatform: '東方彩票',
    gameName: '快三',
    type: '收入',
    detailedType: '開獎',
    amount: 4900,
    balance: 10730,
  },
  {
    orderNumber: '2930',
    userId: '783876664',
    nickname: '大聖',
    phone: '861366999999',
    dateTime: '2024-12-12 13:32:11',
    gamePlatform: '東方彩票',
    gameName: '快三',
    type: '支出',
    detailedType: '押注',
    amount: -2500,
    balance: 5830,
  },
  {
    orderNumber: '2929',
    userId: '783876664',
    nickname: '大聖',
    phone: '861366999999',
    dateTime: '2024-12-12 13:31:10',
    gamePlatform: '東方彩票',
    gameName: '快三',
    type: '收入',
    detailedType: '開獎',
    amount: 4900,
    balance: 8330,
  },
  {
    orderNumber: '2928',
    userId: '72026054',
    nickname: '翠花',
    phone: '8613225558843',
    dateTime: '2024-12-10 11:31:10',
    gamePlatform: '發財電子',
    gameName: '一觸即發',
    type: '支出',
    detailedType: '遊戲輸',
    amount: -1,
    balance: 91.8,
  },
  {
    orderNumber: '2927',
    userId: '72026054',
    nickname: '翠花',
    phone: '8613225558843',
    dateTime: '2024-12-10 11:31:10',
    gamePlatform: '發財電子',
    gameName: '一觸即發',
    type: '支出',
    detailedType: '遊戲輸',
    amount: -1,
    balance: 92.8,
  },
]);

const columns = [
  {
    title: '編號ID',
    dataIndex: 'orderNumber',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.orderNumber}</div>,
  },
  {
    title: '遊戲ID',
    dataIndex: 'userId',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.userId}</div>,
  },
  {
    title: '暱稱',
    dataIndex: 'nickname',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.nickname}</div>,
  },
  {
    title: '手機',
    dataIndex: 'phone',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.phone}</div>,
  },
  {
    title: '時間',
    dataIndex: 'dateTime',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.dateTime}</div>,
  },
  {
    title: '遊戲平台',
    dataIndex: 'gamePlatform',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.gamePlatform}</div>,
  },
  {
    title: '遊戲名稱',
    dataIndex: 'gameName',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.gameName}</div>,
  },
  {
    title: '類別',
    dataIndex: 'type',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.type}</div>,
  },
  {
    title: '具體類型',
    dataIndex: 'detailedType',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.detailedType}</div>,
  },
  {
    title: '金額',
    dataIndex: 'amount',
    align: 'center',
    customRender: ({ record }) => 
    <div>
      <div v-if="record.amount >= 0" style={centeredStyle}>{record.amount}</div>
      <div v-else style="text-align:center; color:red;">{record.amount}</div>
    </div>,
  },
  {
    title: '餘額',
    dataIndex: 'balance',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.balance}</div>,
  },
]

async function exportList() {
  const formValue = ref({
    user_id: null,
    application_id: null,
  })

  const fApi = ref(null)
  const exportListRule = useExportListRule(false, true, fApi)

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
    rule: exportListRule,
  })

  console.log("user_id: " + formValue.user_id)

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
async function emitAdd() {
  const formValue = ref({
    avatar_url: '',
    nickname: '',
  })

  const fApi = ref(null)
  const addRule = useAddRule(false, true, fApi)
  const formModalProps = reactive({
    request: data => anchorAddOrEditReq(null, data),
    getData(data) {
      const { avatar_url, ...rest } = data
      return {
        ...rest,
        avatar_url: getPathFromUrlArray(avatar_url),
      }
    },
    rule: addRule,
  })

  createDialog({
    title: '新增優惠',
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
  exportList, emitAdd
})
</script>
