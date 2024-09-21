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
    v-model:visible="isModalVisible"
    title="查看数据"
    :width="500"
    @cancel="handleCancel"
    :footer="null"
  >
     <a-table
      :dataSource="selectedRecord?.inviteDetails"
      :columns="modalColumns"
      rowKey="id"
      :pagination="false"
      style="margin-top: 10px;"
    />
  </a-modal>
</template>

<script setup lang="jsx">
import { message } from 'ant-design-vue'
import useAddAgentRule from '../hooks/useAddAgentRule'

const isModalVisible = ref(false)
const selectedRecord = ref(null)

const showHistoryofRebate = (record) => {
  selectedRecord.value = record
  isModalVisible.value = true
}

const handleCancel = () => {
  isModalVisible.value = 0  // Close the modal 
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
    inviteDetails: [
        { id: '1', rebateSettings: '一般代理模式A', effectiveTime: '2023-03-01 12:12:12' },
        { id: '2', rebateSettings: '全民代理模式', effectiveTime: '2022-12-12 12:21:21' },
        { id: '3', rebateSettings: '一般代理模式A', effectiveTime: '2023-03-01 12:12:12' },
        { id: '4', rebateSettings: '全民代理模式', effectiveTime: '2022-12-12 12:21:21' },
      ],
    yes_no: true,//'是',
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
    inviteDetails: [
        { id: '1', rebateSettings: '一般代理模式A', effectiveTime: '2023-03-01 12:12:12' },
        { id: '2', rebateSettings: '全民代理模式', effectiveTime: '2022-12-12 12:21:21' },
      ],
    yes_no: false,//'否',
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
    inviteDetails: [
        { id: '1', rebateSettings: '一般代理模式A', effectiveTime: '2023-03-01 12:12:12' },
        { id: '2', rebateSettings: '全民代理模式', effectiveTime: '2022-12-12 12:21:21' },
        { id: '3', rebateSettings: '一般代理模式A', effectiveTime: '2023-03-01 12:12:12' },
      ],
    yes_no: true,//'是',
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
    inviteDetails: [
        { id: '1', rebateSettings: '一般代理模式A', effectiveTime: '2023-03-01 12:12:12' },
      ],
    yes_no: true,//'是',
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
    inviteDetails: [
        { id: '1', rebateSettings: '一般代理模式A', effectiveTime: '2023-03-01 12:12:12' },
        { id: '2', rebateSettings: '全民代理模式', effectiveTime: '2022-12-12 12:21:21' },
        { id: '3', rebateSettings: '一般代理模式A', effectiveTime: '2023-03-01 12:12:12' },
        { id: '4', rebateSettings: '全民代理模式', effectiveTime: '2022-12-12 12:21:21' },
      ],
    yes_no: false,//'是',
  },
])

const columns = [
{
  title: '代理ID',
  dataIndex: 'agentId',
  align: 'center',
  customRender: ({ record }) => <div style={centeredStyle}>{record.agentId}</div>,
},
{
  title: '代理帐号',
  dataIndex: 'agentAccount',
  align: 'center',
  customRender: ({ record }) => <div style={centeredStyle}>{record.agentAccount}</div>,
},
{
  title: '代理级别',
  dataIndex: 'agentLevel',
  align: 'center',
  customRender: ({ record }) => <div style={centeredStyle}>{record.agentLevel}</div>,
},
{
  title: '开通时间',
  dataIndex: 'registrationTime',
  align: 'center',
  customRender: ({ record }) => <div style={centeredStyle}>{record.registrationTime}</div>,
},
{
  title: '下线会员数量',
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
  title: '下线代理数量',
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
  title: '邀请码',
  dataIndex: 'invitationCode',
  align: 'center',
  customRender: ({ record }) => <div style={centeredStyle}>{record.invitationCode}</div>,
},
{
  title: '返点设置',
  dataIndex: 'rebateSetting',
  align: 'center',
  customRender: ({ record }) => 
  <div style={centeredStyle}>
    <a
      style="color: #1890ff; text-decoration: underline; cursor: pointer;"
      onClick={() => showHistoryofRebate(record)}
    >
      {record.rebateSetting}
    </a>
  </div>,
},
{
  title: '是否结算',
  dataIndex: 'yes_no',
  align: 'center',
  customRender: ({ record }) => 
    <div>
      <div v-if="record.yes_no" style="color: #1890ff">是</div>
      <div v-else style="color: red">否</div>
    </div>,
},
{
  title: '操作',
  dataIndex: 'action',
  align: 'center',
  fixed: 'right',
  customRender: ({ record }) => 
    <span 
      style="text-decoration: underline;color: green; margin-right: 12px; cursor: pointer;" 
      onClick={() => onAddorEdit(record)}>
      编辑
    </span>
},
]


// Modal table columns for invite details
const modalColumns = [
  {
    title: '返点设置',
    dataIndex: 'rebateSettings',
    align: 'center',
  },
  {
    title: '生效时间',
    dataIndex: 'effectiveTime',
    align: 'center',
  },
]

async function onAddorEdit(item = {}) {
  const merch_id = item.agentId || null // 兼容 id 和 merch_id
  const isCreate = !merch_id

  const formValue = ref({
    agentAccount: item.agentAccount,
    rebateSetting: item.rebateSetting,
    yes_no: item.yes_no,
    superiorAgent: 'john',//item.agentAccount,
  })

  const fApi = ref(null)
  const addagentRule = useAddAgentRule(fApi)
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
  onAddorEdit,
})
</script>

<style scoped>
.scroll-container {
overflow-x: auto; /* Enable horizontal scrolling */
}
</style>
