<template>
  <a-table
    rowKey="anchor_id"
    :pagination="false"
    :scroll="{ x: 1200, y: 800 }"
    :dataSource="dataSource"
    :columns="columns"
    :expandable="{
      expandedRowRender: subRowComponent,
      rowExpandable: record => record.anchor_id !== undefined
    }"
  />
  <a-pagination
    class="mt15"
    hideOnSinglePage
    v-model:current="pagination.page"
    v-model:pageSize="pagination.limit"
    size="small"
    :total="pagination.total"
  />
</template>

<script setup lang="jsx">
import { getAnchorListReq, anchorAddOrEditReq, setAnchorBlackReq } from '@/api/anchor'
import ENUMS from '@/enums/common'
import blockUserRule from '@/rules/blockUserRule'
import MerchCell from '@/components/Business/MerchCell.jsx'
import useAnchorRule from '../hooks/useOrderRule'
import useAnchorRule2 from '../hooks/useOrderRule2'
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
  limit: 10,
  total: 0,
})

const dataSource = ref([
  { anchor_id: 1, source_name: 'Merchant A', nickname: 'App A', room_id: '123' },
  { anchor_id: 2, source_name: 'Merchant B', nickname: 'App B', room_id: '456' },
])

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

const columns = [
  customRender,
  {
    title: '所属商户',
    dataIndex: 'source_name',
  },
  {
    title: '所属应用',
    dataIndex: 'nickname',
  },
  {
    title: '订单号',
    dataIndex: 'nickname',
  },
  {
    title: '用户昵称',
    dataIndex: 'room_id',
  },
  {
    title: '用户ID',
    dataIndex: 'phone',
  },
  {
    title: '赠送主播',
    dataIndex: 'email',
  },
  {
    title: '房间号',
    dataIndex: 'email',
  },
  {
    title: '主播ID',
    dataIndex: 'sr_weight',
  },
  {
    title: '所属工会',
    dataIndex: 'fr_weight',
  },
  {
    title: '消费类型',
    dataIndex: 'sr_weight',
  },
  {
    title: '消费钻石',
    dataIndex: 'fr_weight',
  },
  {
    title: '时间',
    dataIndex: 'rr_weight',
    props: {
      format: 'YYYY-MM-DD',
      valueFormat: 'X',
    },
  }
]

// Sub-row component that will be rendered in the expanded row
const subRowComponent = (record) => {
  return (
    <div>
      {/* Insert your sub-components or content here */}
      <p>Anchor ID: {record.anchor_id}</p>
      <p>More details about this anchor...</p>
    </div>
  );
}

// 拉黑
function blockUser(userItem) {
  const formValue = ref({
    anchor_id: userItem.anchor_id,
    block_type: '',
    ageing_type: '',
    end_time: '',
    reason: '',
  })

  const formModalProps = {
    request: setAnchorBlackReq,
    getData(data) {
      const { anchor_id, ...params } = data
      return {
        ...params,
        anchor_ids: [anchor_id],
      }
    },

    rule: [
      {
        type: 'input',
        field: 'anchor_id',
        value: userItem.anchor_id,
        hidden: true,
      },
      ...blockUserRule,
    ],
  }

  createDialog({
    title: '拉黑',
    width: 500,
    component:
      <ModalForm
        v-model={formValue.value}
        {...formModalProps}
      />,
    onConfirm(status) {
      if (status) {
        const current = dataSource.value.find(item => item.anchor_id === userItem.anchor_id)
        if (current) {
          current.acct_status = 2
        }
      }
    },
  })

  createDialog({
    title: '导出CSV',
    width: 500,
    component:
      <ModalForm
        v-model={formValue.value}
        {...formModalProps}
      />,
    onConfirm(status) {
      if (status) {
        const current = dataSource.value.find(item => item.anchor_id === userItem.anchor_id)
        if (current) {
          current.acct_status = 2
        }
      }
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


// 添加主播，不可编辑
async function editItem2() {
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
  const anchorRule = useAnchorRule2(false, true, fApi)
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
    title: '提现设置',
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
  editItem2,
})
</script>
