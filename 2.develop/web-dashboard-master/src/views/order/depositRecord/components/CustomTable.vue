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
import useAnchorRule from '../hooks/useOrderRule'
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
    created_time: '2023-07-05 16:59:18',
    order_number: '202307052009007',
    merchant_name: '银商01',
    bank_name: '东南银行',
    bank_card_number: '2051****4976',
    user_id: '400023497',
    amount: '2,000.00',
    order_status: '成功',
    payee: '王一',
    action: { edit: true }
  },
  {
    created_time: '2023-07-04 16:59:18',
    order_number: '202307052009007',
    merchant_name: '银商02',
    bank_name: '美丽银行',
    bank_card_number: '4008****2634',
    user_id: '400025791',
    amount: '20,000.00',
    order_status: '成功',
    payee: '马二',
    action: { edit: true }
  }
]);

const columns = [
  {
    title: '创建时间',
    dataIndex: 'created_time',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.created_time}</div>
  },
  {
    title: '订单号',
    dataIndex: 'order_number',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.order_number}</div>
  },
  {
    title: '银商名称',
    dataIndex: 'merchant_name',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.merchant_name}</div>
  },
  {
    title: '银行名称',
    dataIndex: 'bank_name',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.bank_name}</div>
  },
  {
    title: '银行卡号',
    dataIndex: 'bank_card_number',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.bank_card_number}</div>
  },
  {
    title: '用户ID',
    dataIndex: 'user_id',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.user_id}</div>
  },
  {
    title: '金额',
    dataIndex: 'amount',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.amount}</div>
  },
  {
    title: '订单状态',
    dataIndex: 'order_status',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.order_status}</div>
  },
  {
    title: '出款人',
    dataIndex: 'payee',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.payee}</div>
  },
  {
    title: '操作',
    dataIndex: 'action',
    align: 'center',
    customRender: ({ record }) => (
      <div style={centeredStyle}>
        <span 
          style="text-decoration: underline;color: blue; margin-right: 12px; cursor: pointer;" 
          onClick={() => emit('emit_editData', record)}>
          编辑</span>
      </div>
    )
  }
];

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
