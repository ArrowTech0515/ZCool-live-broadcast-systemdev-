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
import useAddLabelRule from '../hooks/useAddLabelRule'

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
    real_name: '张三', // Real Name
    id_card_number: '123456789012345678', // ID Card Number
    phone_number: '13812345678', // Phone Number
    auth_status: '待处理', // pending
  },
  {
    id: '2',
    real_name: '李四',
    id_card_number: '987654321098765432',
    phone_number: '13798765432',
    auth_status: '已验证',// verified
  },
  {
    id: '3',
    real_name: '王五',
    id_card_number: '135792468013579246',
    phone_number: '13924681357',
    auth_status: '已拒绝', // rejected
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
    title: '真实姓名',
    dataIndex: 'real_name',
    align: 'center',
  },
  {
    title: '身份证号',
    dataIndex: 'id_card_number',
    align: 'center',
  },
  {
    title: '手机号',
    dataIndex: 'phone_number',
    align: 'center',
  },
  {
    title: '认证状态',
    dataIndex: 'auth_status',
    align: 'center',
    customRender: ({ record }) =>
      <a-tag color={record.auth_status === '待处理' ? 'grey' : record.auth_status === '已验证' ? 'green' : 'red'}>
        {record.auth_status}
      </a-tag>
  },
  {
    title: '操作',
    fixed: 'right',
    width: 170,
    dataIndex: 'action',
    align: 'center',
    customRender: ({ record }) =>
      <div>
        <span 
          style="text-decoration: underline;color: green; margin-right: 12px; cursor: pointer;" 
          onClick={() => onEditAuth(record)}>
          编辑</span>
        <a-popconfirm title='您确定要删除吗？' onConfirm={() => onDeleteAuth(record)}>
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
  setMerchantStatusReq(item.merch_id, { latest_time: item.latest_time === 1 ? 2 : 1 }).then(() => {
    loading.value = false
    item.latest_time = item.latest_time === 1 ? 2 : 1
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
  const auth_id = item.id || null
  const formValue = ref({
    real_name: item.real_name,
    id_card_number: item.id_card_number,
    phone_number: item.phone_number,
    auth_status: item.auth_status || 'Pending',
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
    title: isCreate ? '新增实名认证信息' : '编辑实名认证信息',
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
