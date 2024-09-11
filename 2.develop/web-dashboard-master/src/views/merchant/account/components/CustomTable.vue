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
import { getMerchantAccountListReq, merchantAccountAddOrEditReq, setMerchantAccountStatusReq } from '@/api/merchant'

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
    acc_name: 'admin',
    create_time: '2012-12-12 12:21:21',
    acc_status: 1, // 1:启用中, 2:已停用
    oper_info: { name: '管理员-张三' },
  },
  {
    id: '2',
    merch_name: '东川有限公司',
    acc_name: 'lisi32',
    create_time: '2012-12-12 12:21:21',
    acc_status: 2, // 1:启用中, 2:已停用
    oper_info: { name: '管理员-李四' },
  },
  {
    id: '3',
    merch_name: '北商有限公司',
    acc_name: 'zhangsan12',
    create_time: '2012-12-12 12:21:21',
    acc_status: 1, // 1:启用中, 2:已停用
    oper_info: { name: '管理员-王五' },
  },
])

const { loading, refresh } = useRequest(() => getMerchantAccountListReq({
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
    title: '商户名称',
    dataIndex: 'merch_name',
    align: 'center',
  },
  {
    title: '登录账号',
    dataIndex: 'acc_name',
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
    align: 'center',
  },
  {
    title: '状态',
    dataIndex: 'acc_status',
    align: 'center',
    customRender: ({ record }) =>
      <a-tag color={record.acc_status === 1 ? 'green' : 'red'}>
        {record.acc_status === 1 ? '启用中' : '已停用'}
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
        <span v-if={record.acc_status === 2}
          style="text-decoration: underline;color: green; margin-right: 12px; cursor: pointer;" 
          onClick={() => onActivate(record)}>
          启用</span>
        <span v-else-if={record.acc_status === 1}
          style="text-decoration: underline;color: red; margin-right: 12px; cursor: pointer;" 
          onClick={() => onDeactivate(record)}>
          停用</span>
      </div>
  }
]

function setStatus(item) {
  loading.value = true
  setMerchantAccountStatusReq(item.merch_id, item.acc_id, { acc_status: item.acc_status === 1 ? 2 : 1 }).then(() => {
    loading.value = false
    item.acc_status = item.acc_status === 1 ? 2 : 1
  }).catch(() => {
    loading.value = false
  })
}

// 推荐主播/修改推荐权重
async function editItem(Item = {}) {
  const formValue = ref({
    acc_id: Item.acc_id,
    merch_id: Item.merch_id,
    acc_name: Item.acc_name,
    password: Item.password,
  })

  const isCreate = !Item.acc_id
  const formModalProps = {
    request: data => merchantAccountAddOrEditReq(isCreate ? null : Item.acc_id, data),
    getData(data) {
      return {
        ...data,
        acc_id: isCreate ? data.acc_id : undefined,
      }
    },
    option: {
      global: {
        '*': {
          wrap: {
            labelCol: { span: 6 },
          },
        },
      },
    },
    rule: [
      {
        type: 'select',
        field: 'merch_id',
        title: '所属商户',
        value: '',
        options: [],
        effect: {
          required: true,
          fetch: {
            action: '/api/v1/merchant/summary',
            to: 'props.options',
            method: 'get',
            parse: res => res.items.map(item => ({ value: item.merch_id, label: item.merch_name })),
          },
        },
        props: {
          placeholder: '请选择所属商户'
        },
      },
      {
        type: 'input',
        field: 'acc_name',
        title: '登录账号',
        value: '',
        props: {
          placeholder: '请输入 5~12 位字母、数字账号格式'
        },
        validate: [{ type: 'string', required: true, pattern: '^[A-Za-z][A-Za-z0-9]{4,11}$', message: '登录账号5～12位，字母开头，字母数字组合' }],
      },
      {
        type: 'input',
        field: 'password',
        title: '登录密码',
        value: '',
        validate: [{ type: 'pattern', required: true, pattern: '^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{8,16}$', message: '请输入 8~16位数字和字母组合密码' }],
        props: {
          type: 'password',
          placeholder: '请输入 8~16 位数字和字母组合密码',
        },
      },
    ],
  }

  createDialog({
    title: isCreate ? '添加商户后台账号' : '编辑商户后台账号',
    width: 500,
    component:
      <ModalForm
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

async function onActivate(item = {}) {

  createDialog({
    title: '提示',
    width: 500,
    component:
      <div>
        <div style="text-align: center; font-weight:bold;">是否停用当前商户后台账号？</div>
        <div style="text-align: center; font-size: 12px;">停用后该商户所有后台账号将禁止登录商户后台</div>
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
  title: '提示',
  width: 500,
  component:
    <div>
      <div style="text-align: center; font-weight:bold;">是否启用当前商户？</div>
      <div style="text-align: center; font-size: 12px;">启用后该商户所有后台账号可登录商户后台</div>
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
