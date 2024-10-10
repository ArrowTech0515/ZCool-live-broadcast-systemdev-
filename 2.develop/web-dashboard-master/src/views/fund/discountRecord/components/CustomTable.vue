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
    nickname: '大圣',
    userAccount: 'user01',
    activityName: '充值返利',
    activityId: '001',
    status: '待审核',
    bonusAmountOrRate: '10%',
    washMultiple: 1,
    creator: '系统',
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
    activityName: '连续签到',
    activityId: '002',
    status: '审核通过',
    bonusAmountOrRate: 50,
    washMultiple: 2,
    creator: '系统',
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
    activityName: '首存礼包',
    activityId: '003',
    status: '已完成',
    bonusAmountOrRate: 100,
    washMultiple: 1,
    creator: '系统',
    reviewer: 'admin02',
    applicationTime: '2024-08-24 12:20:48',
    rewardTime: '2024-08-24 13:20:33',
    remark: '奖励已发放',
  },
  {
    orderNumber: '789443',
    userId: 'greenflower',
    nickname: '翠花',
    userAccount: 'user04',
    activityName: '每日任务',
    activityId: '004',
    status: '已派奖',
    bonusAmountOrRate: 30,
    washMultiple: 1.5,
    creator: '系统',
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
    activityName: '新手礼包',
    activityId: '005',
    status: '审核不通过',
    bonusAmountOrRate: 20,
    washMultiple: 1,
    creator: 'operator01',
    reviewer: 'admin01',
    applicationTime: '2024-08-22 12:20:48',
    rewardTime: '',
    remark: '不符合条件',
  },
]);

const columns = [
  {
    title: '编号ID',
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
    title: '活动名称',
    dataIndex: 'activityName',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.activityName}</div>,
  },
  {
    title: '活动ID',
    dataIndex: 'activityId',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.activityId}</div>,
  },
  {
    title: '状态',
    dataIndex: 'status',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.status}</div>,
  },
  {
    title: '优惠金额/比例',
    dataIndex: 'bonusAmountOrRate',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.bonusAmountOrRate}</div>,
  },
  {
    title: '洗码倍数',
    dataIndex: 'washMultiple',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.washMultiple}</div>,
  },
  {
    title: '创建人',
    dataIndex: 'creator',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.creator}</div>,
  },
  {
    title: '审核人',
    dataIndex: 'reviewer',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.reviewer}</div>,
  },
  {
    title: '申请时间',
    dataIndex: 'applicationTime',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.applicationTime}</div>,
  },
  {
    title: '派奖时间',
    dataIndex: 'rewardTime',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.rewardTime}</div>,
  },
  {
    title: '备注',
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
    title: '导出列表',
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
    title: '新增优惠',
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
