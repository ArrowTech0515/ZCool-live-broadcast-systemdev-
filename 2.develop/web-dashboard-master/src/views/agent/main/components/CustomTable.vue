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
import useAddAgentRule from '../hooks/useAddAgentRule'

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
  agentId: '100104',
  agentAccount: 'tiktok999',
  agentLevel: 1,
  registrationTime: '2024-05-01 12:12:12',
  members: 10,
  subAgents: 2,
  invitationCode: 'tiktok999',
  rebateSetting: '一般代理模式A',
  settlementStatus: '是',
},
{
  agentId: '100103',
  agentAccount: 'facebookjohn01',
  agentLevel: 2,
  registrationTime: '2024-04-01 12:12:12',
  members: 200,
  subAgents: 3,
  invitationCode: 'facebookjohn01',
  rebateSetting: '一般代理模式A',
  settlementStatus: '否',
},
{
  agentId: '100102',
  agentAccount: 'kevin001',
  agentLevel: 3,
  registrationTime: '2024-03-01 12:12:12',
  members: 34,
  subAgents: 1,
  invitationCode: 'kevin001',
  rebateSetting: '一般代理模式B',
  settlementStatus: '是',
},
{
  agentId: '100101',
  agentAccount: 'agnet002',
  agentLevel: 1,
  registrationTime: '2024-02-01 12:12:12',
  members: 32,
  subAgents: 4,
  invitationCode: 'agnet002',
  rebateSetting: '平行代理模式',
  settlementStatus: '是',
},
{
  agentId: '100101',
  agentAccount: 'agnet001',
  agentLevel: 1,
  registrationTime: '2024-01-01 12:12:12',
  members: 99,
  subAgents: 2,
  invitationCode: 'agnet001',
  rebateSetting: '全民代理模式',
  settlementStatus: '是',
},
]);

const columns = [
{
  title: '代理ID',
  dataIndex: 'agentId',
  align: 'center',
  customRender: ({ record }) => <div style={centeredStyle}>{record.agentId}</div>,
},
{
  title: '代理帳號',
  dataIndex: 'agentAccount',
  align: 'center',
  customRender: ({ record }) => <div style={centeredStyle}>{record.agentAccount}</div>,
},
{
  title: '代理級別',
  dataIndex: 'agentLevel',
  align: 'center',
  customRender: ({ record }) => <div style={centeredStyle}>{record.agentLevel}</div>,
},
{
  title: '開通時間',
  dataIndex: 'registrationTime',
  align: 'center',
  customRender: ({ record }) => <div style={centeredStyle}>{record.registrationTime}</div>,
},
{
  title: '下線會員數量',
  dataIndex: 'members',
  align: 'center',
  customRender: ({ record }) => 
    <span 
      style="text-decoration: underline;color: #1890ff; margin-right: 12px; cursor: pointer;" 
      onClick={() => onNumberofMembers(record.members)}>
      {record.members}
    </span>,
},
{
  title: '下線代理數量',
  dataIndex: 'subAgents',
  align: 'center',
  customRender: ({ record }) => 
    <span 
      style="text-decoration: underline;color: #1890ff; margin-right: 12px; cursor: pointer;" 
      onClick={() => onNumberofMembers(record.subAgents)}>
      {record.subAgents}
    </span>,
},
{
  title: '邀請碼',
  dataIndex: 'invitationCode',
  align: 'center',
  customRender: ({ record }) => <div style={centeredStyle}>{record.invitationCode}</div>,
},
{
  title: '返點設置',
  dataIndex: 'rebateSetting',
  align: 'center',
  customRender: ({ record }) => 
    <span 
      style="text-decoration: underline; color: #1890ff; margin-right: 12px; cursor: pointer;" 
      onClick={() => onNumberofMembers(record.rebateSetting)}>
      {record.rebateSetting}
    </span>,
},
{
  title: '是否結算',
  dataIndex: 'settlementStatus',
  align: 'center',
  customRender: ({ record }) => 
    <div>
      <div v-if="record.settlementStatus == '是'" style="color: #1890ff">{record.settlementStatus}</div>
      <div v-else style="color: red">{record.settlementStatus}</div>
    </div>,
},
{
  title: '操作',
  dataIndex: 'action',
  align: 'center',
  customRender: ({ record }) => 
    <span 
      style="text-decoration: underline;color: green; margin-right: 12px; cursor: pointer;" 
      onClick={() => onAddorEdit(record)}>
      编辑
    </span>
},
]

async function onAddorEdit(item = {}) {
  const merch_id = item.id || null // 兼容 id 和 merch_id

  const isCreate = !merch_id

  const formValue = ref({
    label: item.label,
    param1: !isCreate ? item.function_config.param1 : false,
    param2: !isCreate ? item.function_config.param2 : false,
    param3: !isCreate ? item.function_config.param3 : false,
  })

  const fApi = ref(null)
  const addagentRule = useAddAgentRule(false, false, fApi)
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
    rule: addagentRule,
  }

  createDialog({
    title: isCreate ? '新增' : '编辑',
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
  onAddorEdit,
})
</script>

<style scoped>
.scroll-container {
overflow-x: auto; /* Enable horizontal scrolling */
}
</style>
