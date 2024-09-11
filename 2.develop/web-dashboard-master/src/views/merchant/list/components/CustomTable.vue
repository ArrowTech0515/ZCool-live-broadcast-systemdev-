<template>
  <a-table
    rowKey="id"
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
import { getMerchantListReq, merchantAddOrEditReq, setMerchantStatusReq } from '@/api/merchant'
import useAddorEditRule from '../hooks/useAddorEditRule'

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
    merch_name: '无忧传媒有限公司',
    create_time: '2012-12-12 12:21:21',
    status: 1, // 1:启用中, 2:已停用
    oper_info: { name: '管理员-张三' },
  },
  {
    id: '2',
    merch_name: '东川有限公司',
    create_time: '2012-12-12 12:21:21',
    status: 2, // 1:启用中, 2:已停用
    oper_info: { name: '管理员-李四' },
  },
  {
    id: '3',
    merch_name: '北商有限公司',
    create_time: '2012-12-12 12:21:21',
    status: 1, // 1:启用中, 2:已停用
    oper_info: { name: '管理员-王五' },
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
    title: '商户ID',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: '商户名称',
    dataIndex: 'merch_name',
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
      <a-tag color={record.status === 1 ? 'green' : 'red'}>
        {record.status === 1 ? '启用中' : '已停用'}
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
    width: 120,
    dataIndex: 'action',
    align: 'center',
    customRender: ({ record }) =>
      <div>
        <span 
          style="text-decoration: underline;color: #1890ff; margin-right: 12px; cursor: pointer;" 
          onClick={() => editItem(record)}>
          编辑</span>
        <a-popconfirm title='是否停用当前商户后台账号？' onConfirm={() => setStatus(record)} v-if={record.status === 1}>
          <span 
          style="text-decoration: underline;color: red; margin-right: 12px; cursor: pointer;">
          停用</span>
        </a-popconfirm>

        <a-popconfirm title='是否启用当前商户？' onConfirm={() => setStatus(record)} v-if={record.status === 2}>
          <span 
          style="text-decoration: underline;color: green; margin-right: 12px; cursor: pointer;">
          启用</span>
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
    title: isCreate ? '添加商户' : '编辑商户',
    width: 600,
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
  editItem,
})
</script>
