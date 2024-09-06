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
import useComplaintRule from '../hooks/useComplaintRule'
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
    app: '应用名称',
    order_id: 'LW23942994',
    user_nickname: '张斌',
    user_id: '21312',
    expense_type: '赠送礼物',
    gifted_anchor: '桃之夭夭',
    room_number: '342423',
    description: '礼物：XXX (1个)',
    expense_diamonds: '34223',
    expense_time: '2022-03-03 12:22:32',
    refund_complaint: '投诉内容',
    action: '退款'
  },
  {
    app: '哈哈哈直播',
    order_id: 'FJ423424',
    user_nickname: '李四',
    user_id: '434322',
    expense_type: '直播翻译',
    gifted_anchor: '桃之夭夭',
    room_number: '4324234',
    description: '文字翻译 (本场直播)',
    expense_diamonds: '4324',
    expense_time: '2022-03-03 12:22:32',
    refund_complaint: '',
    action: '退款'
  },
  {
    app: '站酷直播',
    order_id: 'GZ4343242',
    user_nickname: '王五',
    user_id: '43242',
    expense_type: '开通贵族',
    gifted_anchor: '',
    room_number: '',
    description: '购买：XX贵族 (1个月)',
    expense_diamonds: '4324',
    expense_time: '2022-03-03 12:22:32',
    refund_complaint: '',
    action: '退款'
  },
  {
    app: '站酷直播',
    order_id: 'GZ4343242',
    user_nickname: '王五',
    user_id: '43242',
    expense_type: '购买坐骑',
    gifted_anchor: '桃之夭夭',
    room_number: '342423',
    description: '购买：XXX坐骑 (3个月)',
    expense_diamonds: '4324',
    expense_time: '2022-03-03 12:22:32',
    refund_complaint: '',
    action: '退款'
  },
  {
    app: '站酷直播',
    order_id: 'GZ4343242',
    user_nickname: '王五',
    user_id: '43242',
    expense_type: '购买靓号',
    gifted_anchor: '',
    room_number: '',
    description: '购买：XXXXX靓号 (1个月)',
    expense_diamonds: '4324',
    expense_time: '2022-03-03 12:22:32',
    refund_complaint: '',
    action: '退款'
  },
  {
    app: '站酷直播',
    order_id: 'GZ4343242',
    user_nickname: '王五',
    user_id: '43242',
    expense_type: '粉丝团',
    gifted_anchor: '',
    room_number: '',
    description: '开通初爱粉',
    expense_diamonds: '4324',
    expense_time: '2022-03-03 12:22:32',
    refund_complaint: '',
    action: '退款'
  },
  {
    app: '站酷直播',
    order_id: 'GZ4343242',
    user_nickname: '王五',
    user_id: '43242',
    expense_type: '粉丝团',
    gifted_anchor: '桃之夭夭',
    room_number: '342423',
    description: '升级超级粉',
    expense_diamonds: '4324',
    expense_time: '2022-03-03 12:22:32',
    refund_complaint: '',
    action: '退款'
  },
  {
    app: '站酷直播',
    order_id: 'GZ4343242',
    user_nickname: '王五',
    user_id: '43242',
    expense_type: '付费弹幕',
    gifted_anchor: '桃之夭夭',
    room_number: '342423',
    description: '购买：付费弹幕',
    expense_diamonds: '4324',
    expense_time: '2022-03-03 12:22:32',
    refund_complaint: '',
    action: '退款'
  },
  {
    app: '站酷直播',
    order_id: 'GZ4343242',
    user_nickname: '王五',
    user_id: '43242',
    expense_type: '游戏消费',
    gifted_anchor: '桃之夭夭',
    room_number: '342423',
    description: '斗地主消费',
    expense_diamonds: '4324',
    expense_time: '2022-03-03 12:22:32',
    refund_complaint: '',
    action: '退款'
  }
])

const columns = [
  {
    title: '所属应用',
    dataIndex: 'app',
    align: 'center'
  },
  {
    title: '订单号',
    dataIndex: 'order_id',
    align: 'center'
  },
  {
    title: '用户昵称',
    dataIndex: 'user_nickname',
    align: 'center'
  },
  {
    title: '用户ID',
    dataIndex: 'user_id',
    align: 'center'
  },
  {
    title: '消费类型',
    dataIndex: 'expense_type',
    align: 'center'
  },
  {
    title: '赠送主播',
    dataIndex: 'gifted_anchor',
    align: 'center'
  },
  {
    title: '房间号',
    dataIndex: 'room_number',
    align: 'center'
  },
  {
    title: '说明',
    dataIndex: 'description',
    align: 'center'
  },
  {
    title: '消费钻石',
    dataIndex: 'expense_diamonds',
    align: 'center'
  },
  {
    title: '消费时间',
    dataIndex: 'expense_time',
    align: 'center'
  },
  {
    title: '退款投诉',
    dataIndex: 'refund_complaint',
    align: 'center',
    customRender: ({ record }) => 
    <div style="color: #1890ff; text-decoration: underline; cursor: pointer;" onClick={() => onComplaintContent(record)}>{record.refund_complaint}</div>,
  },
  {
    title: '操作',
    dataIndex: 'action',
    align: 'center',
    customRender: ({ record }) => 
    <div style="color: #1890ff; text-decoration: underline; cursor: pointer;" onClick={() => onRefund(record)}>{record.action}</div>,
  }
]


async function exportCSV() {
  const formValue = ref({
    user_id: null,
    nick_name: null,
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

async function onComplaintContent(record) {
  console.log("onComplaintContent : ")
  const formValue = ref({
    user_id: record.user_id,
    user_nickname: record.user_nickname,
  })

  const fApi = ref(null)
  const complaintRule = useComplaintRule(record, fApi)

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
    rule: complaintRule,
  })

  console.log("user_id: " + formValue.user_id)

  createDialog({
    title: '投诉内容',
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

async function onRefund() {
  console.log("onRefund : ")
}


defineExpose({
  exportCSV
})

</script>

<style>
.ant-table-cell {
  text-align: center;
}

</style>
