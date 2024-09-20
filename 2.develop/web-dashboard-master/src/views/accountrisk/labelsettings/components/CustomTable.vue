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
import { getMerchantListReq, merchantAddOrEditReq, setMerchantStatusReq } from '@/api/merchant'
import useAddLabelRule from '../hooks/useAddLabelRule'
import useUserTransferRule from '../hooks/useUserTransferRule'

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

const dataSource = ref([
  {
    id: '1',
    label: '测试',
    number_of_people: '56',
    function_config: { param1: true, param2: true, param3: true}, //出款风控审核, 晋级奖励, 俸禄奖励
  },
  {
    id: '2',
    label: '测试',
    number_of_people: '56',
    function_config: { param1: true, param2: false, param3: true}, //出款风控审核, 晋级奖励, 俸禄奖励
  },
  {
    id: '3',
    label: '测试',
    number_of_people: '56',
    function_config: { param1: false, param2: true, param3: false}, //出款风控审核, 晋级奖励, 俸禄奖励
  },
])

const { loading, refresh } = useRequest(() => getMerchantListReq({
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
const centeredStyle = { textAlign: 'center'}

const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: '标签',
    dataIndex: 'label',
    align: 'center',
  },
  {
    title: '该标签当前人数',
    dataIndex: 'number_of_people',
    align: 'center',
  },
  {
    title: '功能配置',
    dataIndex: 'function_config',
    align: 'center',
    customRender: ({ record }) =>
      <div style="display: flex; justify-content: center; align-items: center; text-align:center;">
        <div style="display: flex; align-items: center; font-size:12px; margin-right: 10px;">
          出款风控审核
          <a-switch style="margin-left: 10px;" checked={record.function_config.param1} />
        </div>
        <div style="display: flex; align-items: center; font-size:12px; margin-right: 10px;">
          晋级奖励
          <a-switch style="margin-left: 10px;" checked={record.function_config.param2} />
        </div>
        <div style="display: flex; align-items: center; font-size:12px;">
          俸禄奖励
          <a-switch style="margin-left: 10px;" checked={record.function_config.param3} />
        </div>      
      </div>
  },
  {
    title: '操作',
    fixed: 'right',
    dataIndex: 'action',
    align: 'center',
    customRender: ({ record }) =>
      <div>
        <span 
          style="text-decoration: underline;color: green; margin-right: 12px; cursor: pointer;" 
          onClick={() => onAddLabel(record)}>
          编辑</span>
        <span 
          style="text-decoration: underline;color: #1890ff; margin-right: 12px; cursor: pointer;" 
          onClick={() => onUserTransfer(record)}>
          用户转移</span>
        <a-popconfirm title='您确定要删除吗？' onConfirm={() => onDelete(record)}>
          <span 
          style="text-decoration: underline;color: red; margin-right: 12px; cursor: pointer;" 
          >删除</span>
        </a-popconfirm>
      </div>
  }
]

// 商户启用/停用
function setStatus(item) {
  loading.value = true
  setMerchantStatusReq(item.merch_id, { function_config: item.function_config === 1 ? 2 : 1 }).then(() => {
    loading.value = false
    item.function_config = item.function_config === 1 ? 2 : 1
  }).catch(() => {
    loading.value = false
  })
}

async function onDelete(item = {}) {
    // loading.value = true
  // delMessageReq({
  //   message_ids: item.msg_id,
  // }).then(() => {
  //   loading.value = false
  //   pagination.page = 1
  //   pagination.total = 0
  //   props.resetSearch()
  // }).catch(() => {
  //   loading.value = false
  // })
}

async function onAddLabel(item = {}) {
  const merch_id = item.id || null // 兼容 id 和 merch_id

  const isCreate = !merch_id

  const formValue = ref({
    label: item.label,
    param1: !isCreate ? item.function_config.param1 : false,
    param2: !isCreate ? item.function_config.param2 : false,
    param3: !isCreate ? item.function_config.param3 : false,
  })

  const fApi = ref(null)
  const addoreditRule = useAddLabelRule(false, false, fApi)
  const formModalProps = {
    request: data => merchantAddOrEditReq(isCreate ? null : merch_id, data),
    getData(data) {
      return {
        ...data,
        // 如果是修改商户，body 里 merch_id 传 null，merch_id 放到 url path中。反之，创建用户，merch_id 放到 body 中
        merch_id: isCreate ? data.merch_id : undefined,
      }
    },
    // option: {
    //   global: {
    //     '*': {
    //       wrap: {
    //         labelCol: { span: 6 },
    //       },
    //     },
    //   },
    // },
    rule: addoreditRule,
  }

  createDialog({
    title: isCreate ? '新增风控标签' : '编辑风控标签',
    width: 500,
    component:
      <ModalForm
        v-fApi:value={fApi.value}
        v-model={formValue.value}
        {...formModalProps}
      />
    ,
    onConfirm() {
      if (isCreate) {
        pagination.page = 1
        pagination.total = 0
        props.resetSearch()
      } else {
        refresh()
      }
    },
  })
}


async function onUserTransfer(item = {}) {
  const merch_id = item.id || item.merch_id || null // 兼容 id 和 merch_id
  const formValue = ref({
    merch_id,
    label: item.label,
  })

  const isCreate = !merch_id
  const fApi = ref(null)
  const userTransferRule = useUserTransferRule(false, false, fApi)
  const formModalProps = {
    request: data => merchantAddOrEditReq(isCreate ? null : merch_id, data),
    getData(data) {
      return {
        ...data,
        // 如果是修改商户，body 里 merch_id 传 null，merch_id 放到 url path中。反之，创建用户，merch_id 放到 body 中
        merch_id: isCreate ? data.merch_id : undefined,
      }
    },
    // option: {
    //   global: {
    //     '*': {
    //       wrap: {
    //         labelCol: { span: 6 },
    //       },
    //     },
    //   },
    // },
    rule: userTransferRule,
  }

  createDialog({
    title: '用户转移',
    width: 500,
    component:
      <ModalForm
        v-fApi:value={fApi.value}
        v-model={formValue.value}
        {...formModalProps}
      />
    ,
    onConfirm() {
      if (isCreate) {
        pagination.page = 1
        pagination.total = 0
        props.resetSearch()
      } else {
        refresh()
      }
    },
  })
}

defineExpose({
  onAddLabel,
})
</script>
