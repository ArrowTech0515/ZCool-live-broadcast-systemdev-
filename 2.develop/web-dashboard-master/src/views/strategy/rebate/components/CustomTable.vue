<template>
  <a-table
    rowKey="strategy_id"
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
//import { getStrategyListReq } from '@/api/strategy'
import { getAnchorListReq } from '@/api/anchor'
import { message } from 'ant-design-vue'

const emit = defineEmits(['emit_editData', 'emit_apply', 'emit_delete'])

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

const { loading, refresh } = useRequest(() => getAnchorListReq({
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

const centeredStyle = { textAlign: 'center' }

const dataSource = ref([
  {
    strategy_id: '100104',
    strategy_name: 'VIP专属返水',
    member_group: '高价值会员 | VIP会员',
    rebate_type: '自动返水',
    rebate_percentage: '1.5',
    rebate_period: '实时',
    collection_method: '自动派发',
    strategy_status: '启用',
    created_time: '2024-08-29 12:30:12',
    last_modified: '2024-08-29 12:30:12',
    last_operator: 'admin',
    remark: 'VIP专属',
    action: { edit: true, apply: true, delete: true }
  },
  {
    strategy_id: '100103',
    strategy_name: '黄金会员返水',
    member_group: '黄金会员',
    rebate_type: '定时返水',
    rebate_percentage: '1.2',
    rebate_period: '每日',
    collection_method: '自动派发',
    strategy_status: '启用',
    created_time: '2024-08-28 12:30:12',
    last_modified: '2024-08-28 12:30:12',
    last_operator: 'admin',
    remark: '',
    action: { edit: true, apply: true, delete: true }
  },
  {
    strategy_id: '100102',
    strategy_name: '白银会员返水',
    member_group: '白银会员',
    rebate_type: '会员领取',
    rebate_percentage: '1',
    rebate_period: '每小时',
    collection_method: '自动派发',
    strategy_status: '停用',
    created_time: '2024-08-26 12:30:12',
    last_modified: '2024-08-28 12:30:12',
    last_operator: 'op01',
    remark: '',
    action: { edit: true, apply: true, delete: true }
  },
  {
    strategy_id: '100101',
    strategy_name: '新手会员返水',
    member_group: '',
    rebate_type: '手动返水',
    rebate_percentage: '0.8',
    rebate_period: '—',
    collection_method: '会员领取',
    strategy_status: '启用',
    created_time: '2024-08-23 12:30:12',
    last_modified: '2024-08-23 12:30:12',
    last_operator: 'op01',
    remark: '',
    action: { edit: true, apply: true, delete: true }
  }
]);

const columns = [
  {
    title: '策略ID',
    dataIndex: 'strategy_id',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.strategy_id}</div>
  },
  {
    title: '策略名称',
    dataIndex: 'strategy_name',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.strategy_name}</div>
  },
  {
    title: '会员分组',
    dataIndex: 'member_group',
    align: 'center',
    customRender: ({ record }) => {
      const groups = record.member_group.split(' | ')
      if (!record.member_group) 
        return null
      return (
        <div style="display: flex; flex-wrap: wrap; justify-content: center;">
          {groups.map((group, index) => (
            <a-card 
              key={index} 
              style="background-color: grey; border-radius: 5% 40%; padding: 0; display: flex; justify-content: center; align-items: center; height: 24px; min-width: 60px;">
              <span style="font-size: 12px; color: #fbfbfb;">{group}</span>
            </a-card>
          ))}
        </div>
      );
    }
  },
  {
    title: '返水方式',
    dataIndex: 'rebate_type',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.rebate_type}</div>
  },
  {
    title: '返水比例%',
    dataIndex: 'rebate_percentage',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.rebate_percentage}</div>
  },
  {
    title: '返水周期',
    dataIndex: 'rebate_period',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.rebate_period}</div>
  },
  {
    title: '领取方式',
    dataIndex: 'collection_method',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.collection_method}</div>
  },
  {
    title: '策略状态',
    dataIndex: 'strategy_status',
    align: 'center',
    customRender: ({ record }) => (
      <div style={centeredStyle}>
        {record.strategy_status}
        <a-switch checked={record.strategy_status === '启用'}  style="margin-top:10px;"/>
      </div>
    )
  },
  {
    title: '创建时间',
    dataIndex: 'created_time',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.created_time}</div>
  },
  {
    title: '最近修改时间',
    dataIndex: 'last_modified',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.last_modified}</div>
  },
  {
    title: '最后操作人',
    dataIndex: 'last_operator',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.last_operator}</div>
  },
  {
    title: '备注',
    dataIndex: 'remark',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.remark}</div>
  },
  {
    title: '操作',
    dataIndex: 'action',
    align: 'center',
    customRender: ({ record }) => (
      <div style={centeredStyle}>
        <span 
          style="text-decoration: underline;color: green; margin-right: 12px; cursor: pointer;" 
          onClick={() => emit('emit_editData', record)}>
          编辑</span>
        <span style="text-decoration: underline;color: blue; margin-right: 12px; cursor: pointer;"
          onClick={() => emit('emit_apply', record)}>应用</span>
        <span style="text-decoration: underline;color: red; cursor: pointer;"
          onClick={() => emit('emit_delete', record)}>删除</span>
      </div>
    )
  }
];
</script>
