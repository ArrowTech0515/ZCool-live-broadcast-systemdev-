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
import useAddorEditRule from '../hooks/useAddorEditRule'

const emit = defineEmits(['emit_merge', 'emit_migrate'])

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
    key: 1,
    application_name: '站酷直播',
    application_id: '37428374',
    __merchant: '无忧传媒有限公司',
    create_time: '2012-12-12 12:21:21',
    status: 3, // 1:已合并, 2:运行中, 3:已停止
    status2: 1, // 1:未合并, 2:已合并
    oper_info: { name: '管理员-张三' },
  },
  {
    key: 2,
    application_name: 'K播',
    application_id: '37428374',
    __merchant: '东川有限公司',
    create_time: '2012-12-12 12:21:21',
    status: 2, // 1:已合并, 2:运行中, 3:已停止
    status2: 2, // 1:未合并, 2:已合并
    oper_info: { name: '管理员-张三' },
  },
  {
    key: 3,
    application_name: '西湾直播',
    application_id: '37428374',
    __merchant: '北南有限公司',
    create_time: '2012-12-12 12:21:21',
    status: 4, // 1:已合并, 2:运行中, 3:已停止
    status2: 1, // 1:未合并, 2:已合并
    oper_info: { name: '管理员-张三' },
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

const columns = [
  {
    title: '应用名称',
    dataIndex: 'application_name',
    align: 'center',
  },
  {
    title: '应用ID',
    dataIndex: 'application_id',
    align: 'center',
  },
  {
    title: '所属商户',
    dataIndex: '__merchant',
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
    align: 'center',
  },
  {
    title: '状态',
    dataIndex: 'status',
    align: 'center',
    customRender: ({ record }) =>
      <a-tag color={record.status === 4 ? 'red' : (record.status === 3 ? 'orange' : 'blue')}>
        {ENUM.application_status[record.status]}
      </a-tag>
  },
  {
    title: '',
    dataIndex: 'status2',
    align: 'center',
    customRender: ({ record }) =>
      <a-tag color={record.status2 === 1 ? 'red' : 'blue'}>
        {record.status2 === 1 ? '未合并' : '已合并'}
      </a-tag>
  },
  {
    title: '操作账号',
    dataIndex: 'oper_info',
    align: 'center',
    customRender: ({ record }) => <div>{ record.oper_info.name }</div>
  },
  {
    title: '操作',
    fixed: 'right',
    dataIndex: 'action',
    align: 'center',
    customRender: ({ record }) =>
      <div>
        <span 
          style="text-decoration: underline;color: blue; margin-right: 12px; cursor: pointer;" 
          onClick={() => emit('emit_migrate', record)}>
          迁移</span>
        <span v-if={record.status === 3 && record.status2 === 1}
          style="text-decoration: underline;color: green; margin-right: 12px; cursor: pointer;" 
          onClick={() => emit('emit_merge', record)}>
          合并</span>         
        <span v-if={record.status === 4}
          style="text-decoration: underline;color: #1890ff; margin-right: 12px; cursor: pointer;" 
          onClick={() => onActivate(record)}>
          启用</span>     
        <span v-else
          style="text-decoration: underline;color: #1890ff; margin-right: 12px; cursor: pointer;" 
          onClick={() => onDeactivate(record)}>
          停用</span>
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
  setMerchantStatusReq(item.merch_id, { status: item.status === 1 ? 2 : 1 }).then(() => {
    loading.value = false
    item.status = item.status === 1 ? 2 : 1
  }).catch(() => {
    loading.value = false
  })
}

async function editItem(item = {}) {
  const merch_id = item.id || item.merch_id || null // 兼容 id 和 merch_id
  const formValue = ref({
    merch_id,
    merch_name: item.merch_name,
  })

  const isCreate = !merch_id
  const fApi = ref(null)
  const addoreditRule = useAddorEditRule(false, false, fApi)
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
    title: '添加应用',
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
async function onActivate(item = {}) {

  createDialog({
    title: '启用提示',
    width: 500,
    component:
      <div>
        <div style="text-align: center; font-weight:bold;">是否启用当前应用？</div>
        <div style="text-align: center; font-size: 12px;">启用后当前应用可正常使用</div>
      </div>
    ,
    onConfirm() {
      setStatus(item)
      // if (isCreate) {
      //   pagination.page = 1
      //   pagination.total = 0
      //   props.resetSearch()
      // } else {
      //   refresh()
      // }
    },
  })
}
async function onDeactivate(item = {}) {

createDialog({
  title: '停用提示',
  width: 500,
  component:
    <div>
      <div style="text-align: center; font-weight:bold;">是否停用当前应用？</div>
      <div style="text-align: center; font-size: 12px;">停用后当前应用不可使用</div>
    </div>
  ,
  onConfirm() {
    setStatus(item)
    // if (isCreate) {
    //   pagination.page = 1
    //   pagination.total = 0
    //   props.resetSearch()
    // } else {
    //   refresh()
    // }
  },
})
}

defineExpose({
  editItem,
})
</script>
