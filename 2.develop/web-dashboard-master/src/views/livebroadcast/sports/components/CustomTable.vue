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
import useAnchorRule from '../hooks/useAnchorRule'
import { getPathFromUrlArray } from '@/utils/index'
import { message } from 'ant-design-vue';

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

const dataSource = ref([
  {
    live_status: 2, //直播中
    start_time: '2022-12-12 12:21',
    event_title: '09:21 欧洲杯 国际米兰 VS 皇家马德里',
    home_team: '国际米兰',
    away_team: '皇家马德里',
    score: '',
    live_method: '动画直播',
    live_address: 'https://www.baishan.com/',
    sale_status: 2, //上架中
    action: { edit: true, status: 2}//'下架' }
  },
  {
    live_status: 3,//未开始
    start_time: '2022-12-12 12:21',
    event_title: '02:12 欧洲杯 国际米兰 VS 皇家马德里',
    home_team: '国际米兰',
    away_team: '皇家马德里',
    score: '',
    live_method: '',
    live_address: '',
    sale_status: 2,//上架中
    action: { edit: true, status: 2}//'下架' }
  },
  {
    live_status: 4, //已结束
    start_time: '2022-12-12 12:21',
    event_title: '09:21 欧洲杯 国际米兰 VS 皇家马德里',
    home_team: '国际米兰',
    away_team: '皇家马德里',
    score: '3-5',
    live_method: '视频直播',
    live_address: 'https://www.baishan.com/',
    sale_status: 3, //已下架
    action: { edit: true, status:1 }// '上架' }
  }
])


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

const columns = [
  {
    title: '直播状态',
    dataIndex: 'live_status',
    align: 'center',
    customRender: ({ record }) =>
    <div>
      <a-tag v-if="record.live_status === 2" color={'green'}>
        {ENUM.live_broadcast_status[record.live_status]}
      </a-tag>
      <a-tag v-if="record.live_status === 3" color={'blue'}>
        {ENUM.live_broadcast_status[record.live_status]}
      </a-tag>
      <a-tag v-if="record.live_status === 4" color={'red'}>
        {ENUM.live_broadcast_status[record.live_status]}
      </a-tag>
    </div>
  },
  {
    title: '开赛时间',
    dataIndex: 'start_time',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.start_time}</div>
  },
  {
    title: '赛事标题',
    dataIndex: 'event_title',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.event_title}</div>
  },
  {
    title: '主队',
    dataIndex: 'home_team',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.home_team}</div>
  },
  {
    title: '客队',
    dataIndex: 'away_team',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.away_team}</div>
  },
  {
    title: '比分',
    dataIndex: 'score',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.score}</div>
  },
  {
    title: '直播方式',
    dataIndex: 'live_method',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.live_method}</div>
  },
  {
    title: '直播地址',
    dataIndex: 'live_address',
    align: 'center',
    customRender: ({ record }) => <a href={record.live_address} target="_blank" style={centeredStyle}>{record.live_address}</a>
  },
  {
    title: '展示状态',
    dataIndex: 'sale_status',
    align: 'center',
    customRender: ({ record }) =>
      <a-tag color={record.sale_status === 2 ? 'green' : 'red'}>
        {ENUM.sale_status[record.sale_status]}
      </a-tag>
  },
  {
    title: '操作',
    fixed: 'right',
    width: 120,
    align: 'center',
    dataIndex: 'action',
    customRender: ({ record }) => (
      <div style={centeredStyle}>
        <span 
              style="text-decoration: underline;color: green; margin-right: 12px; cursor: pointer;" 
              onClick={() => emit('emit_editData', record)}>
              编辑</span>
        <span v-if="record.action.status===2"
              style="text-decoration: underline;color: red; cursor: pointer;" 
              onClick={() => onSaleStatus('下架', record)}>
              下架</span>
        <span v-else
              style="text-decoration: underline;color: blue; cursor: pointer;" 
              onClick={() => onSaleStatus('', record)}>
              上架</span>
      </div>
    )
  }
]

// 上架
function onSaleStatus(option) {

  if(option === '上架') {
    createDialog({
      title: '上架',
      width: 400,
      component:
      <div style="padding: 20px; text-align: center;">
              是否上架当前赛事直播？
            </div>,
      onConfirm(status) {
        this.$emit('confirm')
          
          message.success({
            content: `上架成功`,
            duration: 2, // Duration in seconds
          })
      },
      onReject() {
        // Logic to handle reject action
        this.$emit('reject')
      },
    })
  }
  else {
    createDialog({
      title: '下架',
      width: 400,
      component:
        <div style="padding: 20px; text-align: center;">
          是否下架当前赛事主播？
        </div>,
      onConfirm(status) {

        this.$emit('confirm')
        
        message.success({
          content: `下架成功`,
          duration: 2, // Duration in seconds
        })
      },
      onReject() {
        // Logic to handle reject action
        this.$emit('reject')
      },
    })
  }
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
  editItem,
})
</script>
