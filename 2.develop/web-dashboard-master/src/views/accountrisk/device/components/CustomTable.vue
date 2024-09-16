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
//import { getMerchantListReq, merchantAddOrEditReq, setMerchantStatusReq } from '@/api/merchant'
import useAddDeviceRule from '../hooks/useAddDeviceRule'
import UAParser from 'ua-parser-js'

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
    device_number: '3099829D-CDF7-487A-AC6A-41EF86',
    create_time: '2023-08-22 21:51',
    latest_time: '2023-08-22 21:58',
    oper_info: 'buhu90o',
    oper_info2: 'buhu90o',
    oper_info3: '测试服务器',
    device_type: 'Desktop', // Device Type
    os: 'iOS 14.4',       // Operating System
    browser: 'Safari 14',  // Browser
  },
  {
    id: '2',
    device_number: '3099829D-CDF7-487A-AC6A-41EF86',
    create_time: '2023-08-22 21:51',
    latest_time: '2023-08-22 21:58',
    oper_info: 'buhu90o',
    oper_info2: 'buhu90o',
    oper_info3: '测试服务器',
    device_type: 'Mobile', // Device Type
    os: 'Android 30',       // Operating System
    browser: 'Safari 14',  // Browser
  },
  {
    id: '3',
    device_number: '3099829D-CDF7-487A-AC6A-41EF86',
    create_time: '2023-08-22 21:51',
    latest_time: '2023-08-22 21:58',
    oper_info: 'buhu90o',
    oper_info2: 'buhu90o',
    oper_info3: '测试服务器',
    device_type: 'Mobile', // Device Type
    os: 'iOS 14.4',       // Operating System
    browser: 'Chrome',  // Browser
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
    title: '设备号',
    dataIndex: 'device_number',
    align: 'center',
  },
  {
    title: '设备类型',
    dataIndex: 'device_type',  // New column for device type
    align: 'center',
  },
  {
    title: '操作系统',
    dataIndex: 'os',  // New column for operating system
    align: 'center',
  },
  {
    title: '浏览器',
    dataIndex: 'browser',  // New column for browser information
    align: 'center',
  },
  {
    title: '添加时间',
    dataIndex: 'create_time',
    align: 'center',
  },
  {
    title: '最后编辑时间',
    dataIndex: 'latest_time',
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
          onClick={() => onAddDevice(record)}>
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

async function onAddDevice(item = {}) {
  const merch_id = item.id || null // 兼容 id 和 merch_id
  const deviceInfo = getDeviceInfo()  // Automatically detect device info
  const formValue = ref({
    device_number: item.device_number,
    oper_info3: item.oper_info3,
    // device_type: deviceInfo.device_type,  // Automatically fill detected values
    // os: deviceInfo.os,
    // browser: deviceInfo.browser,
    device_type: item.device_type,  // Automatically fill detected values
    os: item.os,
    browser: item.browser,
  })

  const isCreate = !merch_id
  const fApi = ref(null)
  const addoreditRule = useAddDeviceRule(false, false, fApi)
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
    title: isCreate ? '新增设备号' : '编辑设备号',
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

function getDeviceInfo() {
  const parser = new UAParser()
  const result = parser.getResult()

  return {
    device_type: result.device.type || 'Desktop',
    os: `${result.os.name} ${result.os.version}`,
    browser: `${result.browser.name} ${result.browser.version}`,
  }
}

defineExpose({
  onAddDevice,
})
</script>
