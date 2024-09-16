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
import useAddIPaddressRule from '../hooks/useAddIPaddressRule'
import useAddIPsegmentRule from '../hooks/useAddIPsegmentRule'
import axios from 'axios'

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

// Define a function to get geolocation data based on an IP address
async function getGeolocation(ip) {
  try {
    const response = await axios.get(`https://ipapi.co/${ip}/json/`)
    return `${response.data.city}, ${response.data.region}, ${response.data.country}`
  } catch (error) {
    console.error(`Error fetching geolocation for IP: ${ip}`, error)
    return 'Unknown Location'
  }
}

const dataSource = ref([
  {
    id: '1',
    IP_address: '203.146.170.174',
    geolocation: '正在获取...', // Placeholder for geolocation
    create_time: '2023-08-22 21:51',
    status: '2023-08-22 21:58',
    oper_info: 'buhu90o',
    oper_info2: 'buhu90o',
    oper_info3: '测试服务器',
  },
  {
    id: '2',
    IP_address: '222.222.222.222',
    geolocation: '正在获取...', // Placeholder for geolocation
    create_time: '2023-08-22 21:51',
    status: '2023-08-22 21:58',
    oper_info: 'buhu90o',
    oper_info2: 'buhu90o',
    oper_info3: '测试服务器',
  },
  {
    id: '3',
    IP_address: '62.251.62.70',
    geolocation: '正在获取...', // Placeholder for geolocation
    create_time: '2023-08-22 21:51',
    status: '2023-08-22 21:58',
    oper_info: 'buhu90o',
    oper_info2: 'buhu90o',
    oper_info3: '测试服务器',
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
    title: '序号',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: 'IP地址',
    dataIndex: 'IP_address',
    align: 'center',
  },
  {
    title: '地理位置',  // New column for geolocation
    dataIndex: 'geolocation',
    align: 'center',
  },
  {
    title: '添加时间',
    dataIndex: 'create_time',
    align: 'center',
  },
  {
    title: '最后编辑时间',
    dataIndex: 'status',
    align: 'center',
  },
  {
    title: '添加人',
    dataIndex: 'oper_info',
    align: 'center',
  },
  {
    title: '最后编辑人',
    dataIndex: 'oper_info2',
    align: 'center',
  },
  {
    title: '备注',
    dataIndex: 'oper_info3',
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
  const formValue = ref({
    IP_address: item.IP_address,
    oper_info3: item.oper_info3,
  })

  const isCreate = !merch_id
  const fApi = ref(null)
  const addoreditRule = useAddIPaddressRule(false, false, fApi)
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
    title: isCreate ? '新增IP地址' : '编辑IP地址',
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


async function onAddIPSegment(item = {}) {
  const merch_id = item.id || item.merch_id || null // 兼容 id 和 merch_id
  const formValue = ref({
    merch_id,
    IP_address: item.IP_address,
  })

  const isCreate = !merch_id
  const fApi = ref(null)
  const addoreditRule = useAddIPsegmentRule(false, false, fApi)
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
    title: isCreate ? '新增IP段' : '编辑IP段',
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

// Fetch geolocation for each IP in the dataSource on component mount
onMounted(() => {
  dataSource.value.forEach(async (item, index) => {
    const location = await getGeolocation(item.IP_address)
    dataSource.value[index].geolocation = location
  })
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

defineExpose({
  onAddIPAddress, onAddIPSegment
})
</script>
