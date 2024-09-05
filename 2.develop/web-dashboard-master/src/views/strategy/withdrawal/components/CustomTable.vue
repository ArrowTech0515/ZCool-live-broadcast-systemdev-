<template>
  <a-table
    rowKey="strategy_id"
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
//import { getStrategyListReq } from '@/api/strategy'
import { getAnchorListReq } from '@/api/anchor'
import { message } from 'ant-design-vue'
import useStrategyRule from '../hooks/useStrategyRule'
import ModalForm from '@/components/Form/ModalForm/ModalForm.vue';

const emit = defineEmits(['emit_editData', 'emit_apply', 'emit_delete'])

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

const centeredStyle = { textAlign: 'center' }

const dataSource = ref([
  {
    strategy_id: '100104',
    strategy_name: '高级会员提现策略',
    min_withdrawal_amount: '1000',
    max_withdrawal_amount: '50000',
    free_withdrawals_per_day: '3',
    max_withdrawals_per_day: '10',
    fee_rate: '0.5',
    withdrawal_rate: '4.8',
    created_time: '2024-08-28 11:30:11',
    strategy_status: '启用',
  },
  {
    strategy_id: '100103',
    strategy_name: '普通会员提现策略',
    min_withdrawal_amount: '500',
    max_withdrawal_amount: '20000',
    free_withdrawals_per_day: '1',
    max_withdrawals_per_day: '3',
    fee_rate: '1',
    withdrawal_rate: '4.9',
    created_time: '2024-08-27 11:30:11',
    strategy_status: '启用',
  },
  {
    strategy_id: '100102',
    strategy_name: 'VIP提现策略',
    min_withdrawal_amount: '2000',
    max_withdrawal_amount: '100000',
    free_withdrawals_per_day: '5',
    max_withdrawals_per_day: '15',
    fee_rate: '0',
    withdrawal_rate: '4.7',
    created_time: '2024-08-24 11:30:11',
    strategy_status: '启用',
  },
  {
    strategy_id: '100101',
    strategy_name: '新用户提现策略',
    min_withdrawal_amount: '300',
    max_withdrawal_amount: '5000',
    free_withdrawals_per_day: '2',
    max_withdrawals_per_day: '5',
    fee_rate: '5',
    withdrawal_rate: '5.0',
    created_time: '2024-08-23 11:30:11',
    strategy_status: '停用',
  },
  {
    strategy_id: '100101',
    strategy_name: '默认提现策略',
    min_withdrawal_amount: '300',
    max_withdrawal_amount: '5000',
    free_withdrawals_per_day: '2',
    max_withdrawals_per_day: '5',
    fee_rate: '5',
    withdrawal_rate: '5.0',
    created_time: '2024-08-22 11:30:11',
    strategy_status: '启用',
  }
])

const columns = [
  {
    title: '策略ID',
    dataIndex: 'strategy_id',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.strategy_id}</div>
  },
  {
    title: '策略名称',
    dataIndex: 'strategy_name',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.strategy_name}</div>
  },
  {
    title: '最低提现金额',
    dataIndex: 'min_withdrawal_amount',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.min_withdrawal_amount}</div>
  },
  {
    title: '最高提现金额',
    dataIndex: 'max_withdrawal_amount',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.max_withdrawal_amount}</div>
  },
  {
    title: '每日免费提现次数',
    dataIndex: 'free_withdrawals_per_day',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.free_withdrawals_per_day}</div>
  },
  {
    title: '每日限制提现次数',
    dataIndex: 'max_withdrawals_per_day',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.max_withdrawals_per_day}</div>
  },
  {
    title: '手续费比例%',
    dataIndex: 'fee_rate',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.fee_rate}</div>
  },
  {
    title: '提现汇率',
    dataIndex: 'withdrawal_rate',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.withdrawal_rate}</div>
  },
  {
    title: '创建时间',
    dataIndex: 'created_time',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.created_time}</div>
  },
  {
    title: '策略状态',
    dataIndex: 'strategy_status',
    align: 'center',
    customRender: ({ record }) => (
      <div style={centeredStyle}>
        {record.strategy_status}
        <a-switch checked={record.strategy_status === '启用'} style="margin:10px 10px;" />
      </div>
    )
  },
  {
    title: '操作',
    dataIndex: 'action',
    align: 'center',
    customRender: ({ record }) => (
      <div style={centeredStyle}>
        <span
          style="text-decoration: underline;color: green; margin-right: 12px; cursor: pointer;"
          onClick={() => on_Add_Edit(record)}
        >
          编辑
        </span>
        <span
          style="text-decoration: underline;color: blue; margin-right: 12px; cursor: pointer;"
          onClick={() => onApply(record)}
        >
          应用
        </span>
        <span
          style="text-decoration: underline;color: red; margin-right: 12px; cursor: pointer;"
          onClick={() => onDelete(record)}
        >
          删除
        </span>
      </div>
    )
  }
]


// 添加
async function on_Add_Edit(record) {
  const isCreate = !record // true: Add, false: Edit
  const formValue = ref({
    strategy_name: isCreate ? '' : record.strategy_name,
    min_withdrawal_amount: isCreate ? '' : record.min_withdrawal_amount,
    max_withdrawal_amount: isCreate ? '' : record.max_withdrawal_amount,
    free_withdrawals_per_day: isCreate ? '' : record.free_withdrawals_per_day,
    max_withdrawals_per_day: isCreate ? '' : record.max_withdrawals_per_day,
    fee_rate: isCreate ? '' : record.fee_rate,
    withdrawal_rate: isCreate ? '' : record.withdrawal_rate,
    created_time: isCreate ? '' : record.created_time,
    strategy_status: record?.strategy_status === '启用',
  })

  const fApi = ref(null)

  //const useStrategyRule = useStrategyRule(formValue)

  console.log("created_time : " + formValue.value.created_time)

  const formModalProps = reactive({
    rule: useStrategyRule(formValue, fApi),
  })

  createDialog({
    title: isCreate ? '新增' : '编辑',
    width: 700,
    component:
      <ModalForm
        v-model={formValue.value}
        v-model:fApi={fApi.value}
        {...formModalProps}
      >
        <div v-if="!isCreate" >
          <a-form-item class="ml30" label="策略ID">
            <span>{ record?.strategy_id }</span>
          </a-form-item>
        </div>
      </ModalForm>
    ,
    async onConfirm() {
      // try {
      //   // Call the API to save the data
      //   await anchorAddOrEditReq(isCreate ? null : record.strategy_id, formValue.value)
      //   message.success(isCreate ? '新增策略成功' : '编辑策略成功')
      //   refresh() // Refresh the table after saving the data
      // } catch (error) {
      //   message.error('保存失败，请重试')
      // }
    },
  })
}

async function onApply(record) {

  const isCreate = !record // true: Add, false: Edit
  console.log("on_Add_Edit : " + record?.strategy_name)
  console.log("isCreate : " + isCreate)

  const formValue = ref({

  })

  const fApi = ref(null)
  // const anchorRule = useAnchorRule(false, true, fApi)
  const formModalProps = reactive({
    // request: data => anchorAddOrEditReq(null, data),
    // getData(data) {
    //   const { avatar_url, ...rest } = data
    //   return {
    //     ...rest,
    //     avatar_url: getPathFromUrlArray(avatar_url),
    //   }
    // },
    rule:// anchorRule,
    [
      {
        type: 'select',
        field: 'group_name',
        title: '分组名称',
        value: [],
        props: {
          mode: 'multiple',  // Enable multi-select
          options: [
            { label: '高价值会员', value: '高价值会员' },
            { label: 'VIP会员', value: 'VIP会员' },
          ],
          placeholder: '请选择会员分组',
        },
      },
    ]
  })

  createDialog({
    title: '应用',
    width: 500,
    component:
      <ModalForm
        v-model={formValue.value}
        v-model:fApi={fApi.value}
        {...formModalProps}
      >
      <div v-if="!isCreate" >
        <a-form-item class="ml20">
          <span>选择需应用的会员分组:下拉,多选,选项为系统中 已创建得会员分组。</span>
        </a-form-item>
      </div>
      </ModalForm>
    ,
    onConfirm() {
      pagination.page = 1
      pagination.total = 0
      props.resetSearch()
    },
  })
}

async function onDelete(record) {
}
defineExpose({
  on_Add_Edit,
})
</script>
