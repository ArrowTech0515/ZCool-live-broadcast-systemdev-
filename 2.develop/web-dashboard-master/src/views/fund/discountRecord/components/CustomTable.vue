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
    orderNumber: '789456',
    userId: 'j12345',
    nickname: '大聖',
    userAccount: 'user01',
    activityName: '充值返利',
    activityId: '001',
    status: '待審核',
    bonusAmountOrRate: '10%',
    washMultiple: 1,
    creator: '系統',
    reviewer: 'admin01',
    applicationTime: '2024-08-28 12:10:12',
    rewardTime: '',
    remark: '',
  },
  {
    orderNumber: '789457',
    userId: 'k33223',
    nickname: '胖虎',
    userAccount: 'user02',
    activityName: '連續簽到',
    activityId: '002',
    status: '審核通過',
    bonusAmountOrRate: 50,
    washMultiple: 2,
    creator: '系統',
    reviewer: 'admin02',
    applicationTime: '2024-08-25 12:10:44',
    rewardTime: '',
    remark: '',
  },
  {
    orderNumber: '789458',
    userId: 'polo323',
    nickname: '福德正神',
    userAccount: 'user03',
    activityName: '首存禮包',
    activityId: '003',
    status: '已完成',
    bonusAmountOrRate: 100,
    washMultiple: 1,
    creator: '系統',
    reviewer: 'admin02',
    applicationTime: '2024-08-24 12:20:48',
    rewardTime: '2024-08-24 13:20:33',
    remark: '獎勵已發放',
  },
  {
    orderNumber: '789443',
    userId: 'greenflower',
    nickname: '翠花',
    userAccount: 'user04',
    activityName: '每日任務',
    activityId: '004',
    status: '已派獎',
    bonusAmountOrRate: 30,
    washMultiple: 1.5,
    creator: '系統',
    reviewer: 'admin01',
    applicationTime: '2024-08-23 12:20:48',
    rewardTime: '2024-08-23 13:20:33',
    remark: '',
  },
  {
    orderNumber: '789412',
    userId: 'greenflower',
    nickname: '翠花',
    userAccount: 'user04',
    activityName: '新手禮包',
    activityId: '005',
    status: '審核不通過',
    bonusAmountOrRate: 20,
    washMultiple: 1,
    creator: 'operator01',
    reviewer: 'admin01',
    applicationTime: '2024-08-22 12:20:48',
    rewardTime: '',
    remark: '不符合條件',
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
    title: '用戶ID',
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
    title: '用戶帳號',
    dataIndex: 'userAccount',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.userAccount}</div>,
  },
  {
    title: '活動名稱',
    dataIndex: 'activityName',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.activityName}</div>,
  },
  {
    title: '活動ID',
    dataIndex: 'activityId',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.activityId}</div>,
  },
  {
    title: '狀態',
    dataIndex: 'status',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.status}</div>,
  },
  {
    title: '優惠金額/比例',
    dataIndex: 'bonusAmountOrRate',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.bonusAmountOrRate}</div>,
  },
  {
    title: '洗碼倍數',
    dataIndex: 'washMultiple',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.washMultiple}</div>,
  },
  {
    title: '創建人',
    dataIndex: 'creator',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.creator}</div>,
  },
  {
    title: '審核人',
    dataIndex: 'reviewer',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.reviewer}</div>,
  },
  {
    title: '申請時間',
    dataIndex: 'applicationTime',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.applicationTime}</div>,
  },
  {
    title: '派獎時間',
    dataIndex: 'rewardTime',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.rewardTime}</div>,
  },
  {
    title: '備註',
    dataIndex: 'remark',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.remark}</div>,
  },
];


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

const option = {
  global: {
    '*': {
      wrap: {
        labelCol: { span: 6 },
      },
    },
  },
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
    option: option,
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
