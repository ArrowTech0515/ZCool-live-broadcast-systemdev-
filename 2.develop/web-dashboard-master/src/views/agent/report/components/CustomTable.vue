<template>
  <div class="scroll-container"> <!-- Wrapper for horizontal scroll -->
    <a-table
      rowKey="anchor_id"
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
import ENUMS from '@/enums/common'
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

const dataSource = ref([
  {
    anchor_id: '1',
    agent_mode: '一般代理模式',
    agent_id: 'A12345',
    agent_user: '代理1',
    agent_level: 1,
    invoice_code: 'INV123',
    creation_date: '2024-01-01',
    total_bet_lottery: 50000,
    total_bet_sports: 30000,
    total_bet_electronic: 20000,
    total_bet_sum: 100000,
    total_winnings_lottery: 25000,
    total_winnings_sports: 15000,
    total_winnings_electronic: 10000,
    total_winnings_sum: 50000,
    activity_bonus: 5000,
    team_rebate: 3000,
    team_profit: 2000,
    activity_bonus_total: 1000,
    active_users: 200,
    registered_users: 150,
    first_recharge: 20,
    secondary_recharge: 30,
    recharge_users: 50,
    withdrawal_users: 5,
    team_rebate_points: 20000,
    agent_bonus: 3000,
    team_rebate_total: 8000,
  },
  {
    anchor_id: '2',
    agent_mode: '平行代理模式',
    agent_id: 'B67890',
    agent_user: '代理2',
    agent_level: 2,
    invoice_code: 'INV456',
    creation_date: '2024-02-01',
    total_bet_lottery: 70000,
    total_bet_sports: 40000,
    total_bet_electronic: 30000,
    total_bet_sum: 140000,
    total_winnings_lottery: 35000,
    total_winnings_sports: 20000,
    total_winnings_electronic: 15000,
    total_winnings_sum: 70000,
    activity_bonus: 6000,
    team_rebate: 4000,
    team_profit: 2500,
    activity_bonus_total: 1200,
    active_users: 250,
    registered_users: 180,
    first_recharge: 25,
    secondary_recharge: 35,
    recharge_users: 55,
    withdrawal_users: 5,
    team_rebate_points: 25000,
    agent_bonus: 3500,
    team_rebate_total: 9000,
  },
  {
    anchor_id: '3',
    agent_mode: '全民代理模式',
    agent_id: 'C24680',
    agent_user: '代理3',
    agent_level: 3,
    invoice_code: 'INV789',
    creation_date: '2024-03-01',
    total_bet_lottery: 80000,
    total_bet_sports: 50000,
    total_bet_electronic: 40000,
    total_bet_sum: 170000,
    total_winnings_lottery: 40000,
    total_winnings_sports: 25000,
    total_winnings_electronic: 20000,
    total_winnings_sum: 85000,
    activity_bonus: 7000,
    team_rebate: 5000,
    team_profit: 3000,
    activity_bonus_total: 1500,
    active_users: 300,
    registered_users: 200,
    first_recharge: 30,
    secondary_recharge: 40,
    recharge_users: 60,
    withdrawal_users: 6,
    team_rebate_points: 30000,
    agent_bonus: 4000,
    team_rebate_total: 10000,
  }
])

const centeredStyle = { textAlign: 'center' }

const columns = [
  { title: '代理模式', dataIndex: 'agent_mode', align: 'center', customRender: ({ record }) => <div style={centeredStyle}>{record.agent_mode}</div> },
  { title: '代理ID', dataIndex: 'agent_id', align: 'center', customRender: ({ record }) => <div style={centeredStyle}>{record.agent_id}</div> },
  { title: '代理用户名', dataIndex: 'agent_user', align: 'center', customRender: ({ record }) => <div style={centeredStyle}>{record.agent_user}</div> },
  { title: '代理层级', dataIndex: 'agent_level', align: 'center', customRender: ({ record }) => <div style={centeredStyle}>{record.agent_level}</div> },
  { title: '邀请码', dataIndex: 'invoice_code', align: 'center', customRender: ({ record }) => <div style={centeredStyle}>{record.invoice_code}</div> },
  { title: '创建日期', dataIndex: 'creation_date', align: 'center', customRender: ({ record }) => <div style={centeredStyle}>{record.creation_date}</div> },
  { title: '投注总额(彩票)', dataIndex: 'total_bet_lottery', align: 'center', customRender: ({ record }) => <div style={centeredStyle}>{record.total_bet_lottery}</div> },
  { title: '投注总额(体育)', dataIndex: 'total_bet_sports', align: 'center', customRender: ({ record }) => <div style={centeredStyle}>{record.total_bet_sports}</div> },
  { title: '投注总额(电子)', dataIndex: 'total_bet_electronic', align: 'center', customRender: ({ record }) => <div style={centeredStyle}>{record.total_bet_electronic}</div> },
  { title: '投注总额(合计)', dataIndex: 'total_bet_sum', align: 'center', customRender: ({ record }) => <div style={centeredStyle}>{record.total_bet_sum}</div> },
  { title: '彩票中奖总额', dataIndex: 'total_winnings_lottery', align: 'center', customRender: ({ record }) => <div style={centeredStyle}>{record.total_winnings_lottery}</div> },
  { title: '体育中奖总额', dataIndex: 'total_winnings_sports', align: 'center', customRender: ({ record }) => <div style={centeredStyle}>{record.total_winnings_sports}</div> },
  { title: '电子中奖总额', dataIndex: 'total_winnings_electronic', align: 'center', customRender: ({ record }) => <div style={centeredStyle}>{record.total_winnings_electronic}</div> },
  { title: '中奖金额合计', dataIndex: 'total_winnings_sum', align: 'center', customRender: ({ record }) => <div style={centeredStyle}>{record.total_winnings_sum}</div> },
  { title: '活动奖金', dataIndex: 'activity_bonus', align: 'center', customRender: ({ record }) => <div style={centeredStyle}>{record.activity_bonus}</div> },
  { title: '团队返点', dataIndex: 'team_rebate', align: 'center', customRender: ({ record }) => <div style={centeredStyle}>{record.team_rebate}</div> },
  { title: '团队盈利', dataIndex: 'team_profit', align: 'center', customRender: ({ record }) => <div style={centeredStyle}>{record.team_profit}</div> },
  { title: '活动优惠', dataIndex: 'activity_bonus_total', align: 'center', customRender: ({ record }) => <div style={centeredStyle}>{record.activity_bonus_total}</div> },
  { title: '投注人数', dataIndex: 'active_users', align: 'center', customRender: ({ record }) => <div style={centeredStyle}>{record.active_users}</div> },
  { title: '注册人数', dataIndex: 'registered_users', align: 'center', customRender: ({ record }) => <div style={centeredStyle}>{record.registered_users}</div> },
  { title: '首充人数', dataIndex: 'first_recharge', align: 'center', customRender: ({ record }) => <div style={centeredStyle}>{record.first_recharge}</div> },
  { title: '下级人数', dataIndex: 'secondary_recharge', align: 'center', customRender: ({ record }) => <div style={centeredStyle}>{record.secondary_recharge}</div> },
  { title: '充值人数', dataIndex: 'recharge_users', align: 'center', customRender: ({ record }) => <div style={centeredStyle}>{record.recharge_users}</div> },
  { title: '提现人数', dataIndex: 'withdrawal_users', align: 'center', customRender: ({ record }) => <div style={centeredStyle}>{record.withdrawal_users}</div> },
  { title: '团队返点总', dataIndex: 'team_rebate_points', align: 'center', customRender: ({ record }) => <div style={centeredStyle}>{record.team_rebate_points}</div> },
  { title: '代理返点', dataIndex: 'agent_bonus', align: 'center', customRender: ({ record }) => <div style={centeredStyle}>{record.agent_bonus}</div> },
  { title: '团队返点总额', dataIndex: 'team_rebate_total', align: 'center', customRender: ({ record }) => <div style={centeredStyle}>{record.team_rebate_total}</div> }
]


async function exportCSV() {
  const formValue = ref({
    agent_mode: null,
    agent_id: null,
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

  // console.log("user_id: " + formValue.user_id)

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
