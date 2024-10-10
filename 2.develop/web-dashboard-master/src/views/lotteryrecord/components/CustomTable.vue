<template>
  <a-table
    rowKey="anchor_id"
    :pagination="false"
    :dataSource="paginatedData"
    :columns="columns"
    :loading="loading"
    :scroll="{ x: 'max-content' }"
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
import useExportCSVRule from '../hooks/useExportCSVRule'

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
    anchor_id: 1,
    game_serial_number: 'TZ202102281852368654916731',
    issue_number: '20210228081133',
    userId_Nickname: {
      id: '4916731', nickname: '手机用户8234'
    },
    game: '一分快三',
    order_status: 2,//'未开奖',
    time: '2021-02-28 18:52:36',
    amount_of_bet: 101.00,
    amount_of_winning: 0.00,
    balance_before_account_change: 1762.20,
    betting_options: '总和_单',
    number_of_bets: 1,
    results: '暂无法获得',
    anchor: '1629286',
    anchor_dividend: 0.4, //%,
  },
  {
    anchor_id: 2,
    game_serial_number: 'TZ202102281852368654910000',
    issue_number: '20210228081133',
    userId_Nickname: {
      id: '6911192', nickname: '龙'
    },
    game: '一分快三',
    order_status: 2,//'未开奖',
    time: '2021-02-28 18:52:36',
    amount_of_bet: 104.00,
    amount_of_winning: 0.00,
    balance_before_account_change: 2888.50,
    betting_options: '总和_小',
    number_of_bets: 1,
    results: '暂无法获得',
    anchor: '723418',
    anchor_dividend: 0.4, //%,
  },
])

const centeredStyle = { textAlign: 'center' }

const columns = [
  {
    title: '游戏流水号',
    dataIndex: 'game_serial_number',
    align: 'center',  // This aligns the content centrally
    customRender: ({ record }) => <div style={centeredStyle}>{record.game_serial_number}</div>,
  },
  {
    title: '期号',
    dataIndex: 'issue_number',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.issue_number}</div>,
  },
  {
    title: `用户ID / 昵称`,
    dataIndex: 'userId_Nickname',
    align: 'center',
    customRender: ({ record }) => 
      <div style={centeredStyle} >
        <div>{record.userId_Nickname.id}</div>
        <div>{record.userId_Nickname.nickname}</div>
      </div>,
  },
  {
    title: '游戏',
    dataIndex: 'game',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.game}</div>,
  },
  {
    title: '注单状态',
    dataIndex: 'order_status',
    align: 'center',
    customRender: ({ record }) => 
      <div style={centeredStyle} >
        <a-tag color={record.order_status === 2 ? 'blue' : 'red'}>{ENUM.order_status[record.order_status]}</a-tag>
      </div>,
  },
  {
    title: '时间',
    dataIndex: 'time',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.time}</div>,
  },
  {
    title: '投注金额',
    dataIndex: 'amount_of_bet',
    align: 'center',
    customRender: ({ record }) => 
      <div style={centeredStyle}>{Number(record.amount_of_bet).toLocaleString()}</div>,
  },
  {
    title: '中奖金额',
    dataIndex: 'amount_of_winning',
    align: 'center',
    customRender: ({ record }) =>
      <div style={centeredStyle}>{Number(record.amount_of_winning).toLocaleString()}</div>
  },
  {
    title: '账变前余额',
    dataIndex: 'balance_before_account_change',
    align: 'center',
    customRender: ({ record }) => 
      <div style={centeredStyle}>{Number(record.balance_before_account_change).toLocaleString()}</div>,
  },
  {
    title: '投注选项',
    dataIndex: 'betting_options',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.betting_options}</div>,
  },
  {
    title: '投注数',
    dataIndex: 'number_of_bets',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.number_of_bets}</div>,
  },
  {
    title: '开奖结果',
    dataIndex: 'results',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.results}</div>,
  },
  {
    title: '主播',
    dataIndex: 'anchor',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.anchor}</div>,
  },
  {
    title: '主播分红',
    dataIndex: 'anchor_dividend',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.anchor_dividend}%</div>,
  }
]


async function exportCSV() {
  const formValue = ref({
    user_id: null,
    application_id: null,
  })

  const fApi = ref(null)
  const exportCSVRule = useExportCSVRule(false, true, fApi)

  console.log("导出CSV : fApi = " + fApi.value)
  
  const formModalProps = reactive({
    request: data => anchorAddOrEditReq(null, data),
    getData(data) {
      const { avatar_url, ...rest } = data
      return {
        ...rest,
        avatar_url: getPathFromUrlArray(avatar_url),
      }
    },
    rule: exportCSVRule,
  })

  console.log("user_id: " + formValue.user_id)

  createDialog({
    title: '导出CSV',
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

defineExpose({
  exportCSV
})
</script>
