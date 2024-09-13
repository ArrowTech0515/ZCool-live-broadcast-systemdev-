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

    <!-- Modal for showing login devices -->
  <a-modal
    v-model:visible="isModalVisible1"
    :title="null"
    @cancel="handleCancel"
    :footer="null"
  >
  <div style="margin-top: 30px;" v-if="isModalVisible1 === 1">
    <div v-for="device in loginDevices" :key="device.device">
      <div style="border: 1px solid #d9d9d9; padding: 8px; margin-bottom: 8px; border-radius: 4px;">
        登录设备: {{ device.device }} | {{ device.time }}
      </div>
    </div>
  </div>
  <div style="margin-top: 30px;" v-else-if="isModalVisible1 === 2">
    <div v-for="IP in loginIPs" :key="IP.IP">
      <div style="border: 1px solid #d9d9d9; padding: 8px; margin-bottom: 8px; border-radius: 4px;">
        登录IP: {{ IP.IP }} | {{ IP.time }}
      </div>
    </div>
  </div>
  </a-modal>
</template>

<script setup lang="jsx">
import { getAnchorListReq, anchorAddOrEditReq, setAnchorBlackReq } from '@/api/anchor'
import { message } from 'ant-design-vue'
import useRiskControlRule from '../hooks/useRiskControlRule'

const isModalVisible1 = ref(0) // 0:hide, 1:device, 2:IP

const loginDevices = ref([]) // Stores the list of devices for the modal
const loginIPs = ref([]) // Stores the list of devices for the modal

const showLoginDevices = (devices) => {
  loginDevices.value = devices // Set the devices to be shown
  isModalVisible1.value = 1 // Open the modal
}

const handleCancel = () => {
  isModalVisible1.value = 0  // Close the modal
}

const showLoginIPs = (IPs) => {
  loginIPs.value = IPs // Set the devices to be shown
  isModalVisible1.value = 2 // Open the modal
}

const { createDialog } = useDialog()

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

const centeredStyle = { textAlign: 'center' }

const dataSource = ref([
  {
    nickname: '打扫打扫打扫',
    id: '32423',
    registeredDevice: 'HJS-213123',
    registeredIP: '122.213.213.321',
    registrationTime: '2022-03-03 12:22:21',
    lastLoginDevice: 'HJS-213123',
    lastLoginIP: '122.213.213.321',
    multipleLoginDevices: [
      { device: 'iPhone 13', time: '2022-12-12 21:21:21' },
      { device: 'iPhone 15', time: '2022-12-12 21:21:21' },
      { device: 'iPhone 19', time: '2022-12-12 21:21:21' },
      { device: 'iPhone 8', time: '2022-12-12 21:21:21' },
    ],
    multipleLoginIPs: [
      { IP: '132.143.65.222', time: '2022-12-12 21:21:21' },
      { IP: '132.143.65.223', time: '2022-12-12 21:21:21' },
      { IP: '132.143.65.224', time: '2022-12-12 21:21:21' },
      { IP: '132.143.65.225', time: '2022-12-12 21:21:21' },
    ],
    boundPhone: '16581237132',
    boundEmail: '16581237132@163.com',
    accountStatus: 2, // 1:正常, 2:已拉黑
    action: '风控管理',
  },
  {
    nickname: '打扫打扫打扫',
    id: '32423',
    registeredDevice: 'HJS-213123',
    registeredIP: '122.213.213.321',
    registrationTime: '2022-03-03 12:22:21',
    lastLoginDevice: 'HJS-213123',
    lastLoginIP: '122.213.213.321',
    multipleLoginDevices: [
      { device: 'iPhone 13', time: '2022-12-12 21:21:21' },
      { device: 'iPhone 15', time: '2022-12-12 21:21:21' },
      { device: 'iPhone 19', time: '2022-12-12 21:21:21' },
      { device: 'iPhone 8', time: '2022-12-12 21:21:21' },
    ],
    multipleLoginIPs: [
      { IP: '132.143.65.222', time: '2022-12-12 21:21:21' },
      { IP: '132.143.65.223', time: '2022-12-12 21:21:21' },
      { IP: '132.143.65.224', time: '2022-12-12 21:21:21' },
      { IP: '132.143.65.225', time: '2022-12-12 21:21:21' },
    ],
    boundPhone: '16581237132',
    boundEmail: '16581237132@163.com',
    accountStatus: 1,
    action: '风控管理',
  },
  {
    nickname: '打扫打扫打扫',
    id: '32423',
    registeredDevice: 'HJS-213123',
    registeredIP: '122.213.213.321',
    registrationTime: '2022-03-03 12:22:21',
    lastLoginDevice: 'HJS-213123',
    lastLoginIP: '122.213.213.321',
    multipleLoginDevices: [
      { device: 'iPhone 13', time: '2022-12-12 21:21:21' },
      { device: 'iPhone 15', time: '2022-12-12 21:21:21' },
      { device: 'iPhone 19', time: '2022-12-12 21:21:21' },
      { device: 'iPhone 8', time: '2022-12-12 21:21:21' },
    ],
    multipleLoginIPs: [
      { IP: '132.143.65.222', time: '2022-12-12 21:21:21' },
      { IP: '132.143.65.223', time: '2022-12-12 21:21:21' },
      { IP: '132.143.65.224', time: '2022-12-12 21:21:21' },
      { IP: '132.143.65.225', time: '2022-12-12 21:21:21' },
    ],
    boundPhone: '16581237132',
    boundEmail: '16581237132@163.com',
    accountStatus: 2,
    action: '风控管理',
  },
  {
    nickname: '打扫打扫打扫',
    id: '32423',
    registeredDevice: 'HJS-213123',
    registeredIP: '122.213.213.321',
    registrationTime: '2022-03-03 12:22:21',
    lastLoginDevice: 'HJS-213123',
    lastLoginIP: '122.213.213.321',
    multipleLoginDevices: [
      { device: 'iPhone 13', time: '2022-12-12 21:21:21' },
      { device: 'iPhone 15', time: '2022-12-12 21:21:21' },
      { device: 'iPhone 19', time: '2022-12-12 21:21:21' },
      { device: 'iPhone 8', time: '2022-12-12 21:21:21' },
    ],
    multipleLoginIPs: [
      { IP: '132.143.65.222', time: '2022-12-12 21:21:21' },
      { IP: '132.143.65.223', time: '2022-12-12 21:21:21' },
      { IP: '132.143.65.224', time: '2022-12-12 21:21:21' },
      { IP: '132.143.65.225', time: '2022-12-12 21:21:21' },
    ],
    boundPhone: '16581237132',
    boundEmail: '16581237132@163.com',
    accountStatus: 1,
    action: '风控管理',
  },
  {
    nickname: '打扫打扫打扫',
    id: '32423',
    registeredDevice: 'HJS-213123',
    registeredIP: '122.213.213.321',
    registrationTime: '2022-03-03 12:22:21',
    lastLoginDevice: 'HJS-213123',
    lastLoginIP: '122.213.213.321',
    multipleLoginDevices: [
      { device: 'iPhone 13', time: '2022-12-12 21:21:21' },
      { device: 'iPhone 15', time: '2022-12-12 21:21:21' },
      { device: 'iPhone 19', time: '2022-12-12 21:21:21' },
      { device: 'iPhone 8', time: '2022-12-12 21:21:21' },
    ],
    multipleLoginIPs: [
      { IP: '132.143.65.221', time: '2022-12-12 21:21:21' },
      { IP: '132.143.65.222', time: '2022-12-12 21:21:21' },
      { IP: '132.143.65.223', time: '2022-12-12 21:21:21' },
      { IP: '132.143.65.224', time: '2022-12-12 21:21:21' },
      { IP: '132.143.65.225', time: '2022-12-12 21:21:21' },
    ],
    boundPhone: '16581237132',
    boundEmail: '16581237132@163.com',
    accountStatus: 2,
    action: '风控管理',
  },
  {
    nickname: '打扫打扫打扫',
    id: '32423',
    registeredDevice: 'HJS-213123',
    registeredIP: '122.213.213.321',
    registrationTime: '2022-03-03 12:22:21',
    lastLoginDevice: 'HJS-213123',
    lastLoginIP: '122.213.213.321',
    multipleLoginDevices: [
      { device: 'iPhone 13', time: '2022-12-12 21:21:21' },
      { device: 'iPhone 15', time: '2022-12-12 21:21:21' },
      { device: 'iPhone 19', time: '2022-12-12 21:21:21' },
      { device: 'iPhone 8', time: '2022-12-12 21:21:21' },
    ],
    multipleLoginIPs: [
      { IP: '132.143.65.221', time: '2022-12-12 21:21:21' },
      { IP: '132.143.65.222', time: '2022-12-12 21:21:21' },
      { IP: '132.143.65.223', time: '2022-12-12 21:21:21' },
      { IP: '132.143.65.224', time: '2022-12-12 21:21:21' },
      { IP: '132.143.65.225', time: '2022-12-12 21:21:21' },
    ],
    boundPhone: '16581237132',
    boundEmail: '16581237132@163.com',
    accountStatus: 2,
    action: '风控管理',
  }
]);


const columns = [
  {
    title: '用户昵称',
    dataIndex: 'nickname',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.nickname}</div>,
  },
  {
    title: '用户ID',
    dataIndex: 'id',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.id}</div>,
  },
  {
    title: '注册设备',
    dataIndex: 'registeredDevice',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.registeredDevice}</div>,
  },
  {
    title: '注册IP',
    dataIndex: 'registeredIP',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.registeredIP}</div>,
  },
  {
    title: '注册时间',
    dataIndex: 'registrationTime',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.registrationTime}</div>,
  },
  {
    title: '最近登录设备',
    dataIndex: 'lastLoginDevice',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.lastLoginDevice}</div>,
  },
  {
    title: '最近登录IP',
    dataIndex: 'lastLoginIP',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.lastLoginIP}</div>,
  },
  {
    title: '多个登录设备',
    dataIndex: 'multipleLoginDevices',
    align: 'center',
    customRender: ({ record }) => (
      <div style={centeredStyle}>
        <a
          style="color: #1890ff; text-decoration: underline; cursor: pointer;"
          onClick={() => showLoginDevices(record.multipleLoginDevices)}
        >
          {record.multipleLoginDevices.length}
        </a>
      </div>
    ),
  },
  {
    title: '多个登录IP',
    dataIndex: 'multipleLoginIPs',
    align: 'center',
    customRender: ({ record }) => (
      <div style={centeredStyle}>
        <a
          style="color: #1890ff; text-decoration: underline; cursor: pointer;"
          onClick={() => showLoginIPs(record.multipleLoginIPs)}
        >
          {record.multipleLoginIPs.length}
        </a>
      </div>
    ),
  },
  {
    title: '绑定手机',
    dataIndex: 'boundPhone',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.boundPhone}</div>,
  },
  {
    title: '绑定邮箱',
    dataIndex: 'boundEmail',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.boundEmail}</div>,
  },
  {
    title: '账号状态',
    dataIndex: 'accountStatus',
    align: 'center',
    customRender: ({ record }) => (
      <a-tag color={record.accountStatus === 1 ? '' : 'red'}>
        {record.accountStatus === 1 ? '正常' : '已拉黑'}
      </a-tag>
    ),
  },
  {
    title: '操作',
    dataIndex: 'action',
    fixed: 'right',
    width: 100,
    align: 'center',
    customRender: ({ record }) => (
      <div style={centeredStyle}>
        <span v-if="record.accountStatus === 1"
              style="text-decoration: underline; color: #1890ff; margin-right: 12px; cursor: pointer;" 
              onClick={() => onRelease(record)}>
              风控管理</span>
        <span v-else
              style="text-decoration: underline; color: lightgrey; margin-right: 12px; cursor: pointer;" 
              onClick={() => onRelease(record)}>
              风控管理</span>
      </div>
    ),
  },
]

// Junn
const allUsers = [
  { id: '1', name: '用户11' },
  { id: '2', name: '用户22' },
  { id: '3', name: '用户33' },
  { id: '4', name: 'user44' },
  { id: '5', name: 'user_abc' },
]

// 添加
function onRelease(record) {
  const formValue = ref({
    avatar_url: '',
  })

  const fApi = ref(null)
  const riskControlRule = useRiskControlRule(fApi)
  const formModalProps = reactive({
    request: data => anchorAddOrEditReq(null, data),
    getData(data) {
      const { avatar_url, ...rest } = data
      return {
        ...rest,
        avatar_url: getPathFromUrlArray(avatar_url),
      }
    },
    rule: riskControlRule,
  })

  createDialog({
    title: '风控拉黑',
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

// defineExpose({
//   onAddUser
// })
{/* <div field="unban_img_cnt_label" style="margin-left: 115px; margin-top: -30px; color: grey;">
          {unban_img_cnt.value}
        </div> */}
</script>
