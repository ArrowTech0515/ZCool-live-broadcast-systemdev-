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
    v-model:open="isModalVisible"
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

const emit = defineEmits(['emit_edit'])

const isModalVisible = ref(false)
const selectedRecord = ref(null)

const showHistoryofRebate = (record) => {
  selectedRecord.value = record
  isModalVisible.value = true
}

const handleCancel = () => {
  isModalVisible.value = 0  // Close the modal 
}


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
    rebateModeId: '100104',
    modeName: '(一般)赔率差代理模式A',
    agentMode: 2, //'（一般）赔率差代理模式',
    agentCount: 20,
    creationTime: '2024-01-23 12:12:12',
    createdBy: 'Admin',
    lastModifiedTime: '2024-01-24 12:12:12',
    modifiedBy: 'user01',
  },
  {
    rebateModeId: '100103',
    modeName: '平行代理模式A',
    agentMode: 3, //'平行代理模式',
    agentCount: 10,
    creationTime: '2024-01-12 13:12:12',
    createdBy: 'Admin',
    lastModifiedTime: '2024-01-12 13:12:12',
    modifiedBy: 'user02',
  },
  {
    rebateModeId: '100102',
    modeName: '全民代理模式A',
    agentMode: 4, //'全民代理模式',
    agentCount: 13321,
    creationTime: '2024-01-02 12:12:12',
    createdBy: 'Admin',
    lastModifiedTime: '2024-01-02 14:12:12',
    modifiedBy: 'user04',
  },
]);

const columns = [
  {
    title: '返点模式ID',
    dataIndex: 'rebateModeId',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.rebateModeId}</div>,
  },
  {
    title: '模式名称',
    dataIndex: 'modeName',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.modeName}</div>,
  },
  {
    title: '模式',
    dataIndex: 'agentMode',
    align: 'center',
    customRender: ({ record }) => 
    <div 
      style={centeredStyle}>{record.agentMode === 2 ? '(一般)' : ''}
      {ENUM.agent_rebate_mode[record.agentMode]}
    </div>,
  },
  {
    title: '代理人数',
    dataIndex: 'agentCount',
    align: 'center',
    customRender: ({ record }) => (
      <span 
        style="text-decoration: underline;color: #1890ff; cursor: pointer;" 
        onClick={() => onNumberofMembers(record.agentCount)}>
        {record.agentCount}
      </span>
    ),
  },
  {
    title: '创建时间',
    dataIndex: 'creationTime',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.creationTime}</div>,
  },
  {
    title: '创建人',
    dataIndex: 'createdBy',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.createdBy}</div>,
  },
  {
    title: '最后修改时间',
    dataIndex: 'lastModifiedTime',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.lastModifiedTime}</div>,
  },
  {
    title: '修改人',
    dataIndex: 'modifiedBy',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.modifiedBy}</div>,
  },
  {
    title: '操作',
    dataIndex: 'action',
    align: 'center',
    fixed: 'right',
    customRender: ({ record }) => (
      <span 
        style="text-decoration: underline;color: green; cursor: pointer;" 
        onClick={() => emit('emit_edit', record.agentMode, record)}>
        编辑
      </span>
    ),
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

</script>

<style scoped>
.scroll-container {
overflow-x: auto; /* Enable horizontal scrolling */
}
</style>
