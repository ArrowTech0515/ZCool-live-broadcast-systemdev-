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
import useAddWhitelistIPRule from '../hooks/useAddWhitelistIPRule'
import useAddBatchRule from '../hooks/useAddBatchRule';

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

const dataSource = ref([
  {
    id: '1',
    IP: '45.119.5.188',
    status: '永久生效',//
    validity_period: '永久生效',  // Placeholder for VPN/Proxy detection
    remarks: '测试',
  },
  {
    id: '2',
    IP: '45.119.5.189',
    status: '永久生效',//
    validity_period: '永久生效',  // Placeholder for VPN/Proxy detection
    remarks: '测试',
  },
])

// Define a status mapping for <a-tag>
function renderStatusTag(status) {
  switch (status) {
    case "永久生效":
      return <a-tag color="blue">永久生效</a-tag>  // Active status
    default:
      return <a-tag color="green">{{status}}</a-tag>  // Default : Unknown
  }
}

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
    title: 'IP',
    dataIndex: 'IP',
    align: 'center',
  },
  {
    title: '状态',  // New column for IP status
    dataIndex: 'status',
    align: 'center',
    customRender: ({ record }) => renderStatusTag(record.status),  // Render the tag based on the status
  },
  {
    title: '有效期',
    dataIndex: 'validity_period',
    align: 'center',
  },
  {
    title: '备注',
    dataIndex: 'remarks',
    align: 'center',
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
          style="text-decoration: underline;color: green; margin-right: 12px; cursor: pointer;" 
          onClick={() => onAddIPAddress(record)}>
          编辑</span>
        <a-popconfirm title='您确定要删除吗？' onConfirm={() => onDelete(record)}>
          <span 
          style="text-decoration: underline;color: red; margin-right: 12px; cursor: pointer;" 
          >删除</span>
        </a-popconfirm>
      </div>
  }
]

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


async function onAddIPAddress(item = {}) {
  const merch_id = item.id || null // 兼容 id 和 merch_id
  const isCreate = !merch_id

  if(isCreate)
  {
    item = {
      IP: '',
      status: '永久生效',//
      validity_period: 1,//'永久生效',  // Placeholder for VPN/Proxy detection
      remarks: '',
    }
  }
  const fApi = ref(null)
  const addoreditRule = useAddWhitelistIPRule(fApi)
  const formModalProps = {
    // request: data => merchantAddOrEditReq(isCreate ? null : merch_id, data),
    // getData(data) {
    //   return {
    //     ...data,
    //     // 如果是修改商户，body 里 merch_id 传 null，merch_id 放到 url path中。反之，创建用户，merch_id 放到 body 中
    //     merch_id: isCreate ? data.merch_id : undefined,
    //   }
    // },
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
    title: isCreate ? '新增白名单IP' : '编辑白名单IP',
    width: 500,
    component:
      <ModalForm
        v-fApi:value={fApi.value}
        v-model={item}
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


async function onAddBatch(item = {}) {
  const merch_id = item.id || item.merch_id || null // 兼容 id 和 merch_id
  const isCreate = !merch_id

  if(isCreate)
  {
    item = {
      IP: '',
      status: '永久生效',//
      validity_period: 1,//'永久生效',  // Placeholder for VPN/Proxy detection
      remarks: '',
    }
  }
  const fApi = ref(null)
  const addoreditRule = useAddBatchRule(fApi)
  const formModalProps = {
    // request: data => merchantAddOrEditReq(isCreate ? null : merch_id, data),
    // getData(data) {
    //   return {
    //     ...data,
    //     // 如果是修改商户，body 里 merch_id 传 null，merch_id 放到 url path中。反之，创建用户，merch_id 放到 body 中
    //     merch_id: isCreate ? data.merch_id : undefined,
    //   }
    // },
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
    title: isCreate ? '批量修改生效期' : '批量修改生效期',
    width: 500,
    component:
      <ModalForm
        v-fApi:value={fApi.value}
        v-model={item}
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

// Fetch geolocation for each IP in the dataSource on component mount

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

defineExpose({
  onAddIPAddress, onAddBatch
})
</script>
