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
const { createDialog } = useDialog()

const centeredStyle = { textAlign: 'center' }

const dataSource = ref([
  {
    strategy_id: '100104',
    strategy_name: 'VIP专属返水',
    member_group: '高价值会员 | VIP会员',
    rebate_type: '自动返水',
    rebate_percentage: '1.5',
    rebate_period: '實時',
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
    member_group: null,
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
    const groups = record.member_group?.split('|') || []
    console.log("id : " + record.strategy_id)
    console.log("groups : " + groups.length)
    if (!groups.length) 
      return null

    return (
      <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 5px;"> 
        {groups.map((group, index) => (
          <span 
          key="index"
           style="font-size: 12px; background-color: grey; color: #fbfbfb; 
           text-align: center; padding: 3px; margin: 0; word-wrap: break-word; white-space: normal;
           border-radius: 2% 40%;">
              {group}
            </span>
      
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
    title: '返水週期',
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
    title: '備註',
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
          onClick={() => on_Add_Edit(record)}>
          编辑</span>
        <span style="text-decoration: underline;color: #1890ff; margin-right: 12px; cursor: pointer;"
          onClick={() => onApply(record)}>应用</span>
        <span style="text-decoration: underline;color: red; margin-right: 12px; cursor: pointer;"
          onClick={() => onDelete(record)}>删除</span>
      </div>
    )
  }
]

// 添加
async function on_Add_Edit(record) {
  const isCreate = !record // true: Add, false: Edit
  const formValue = ref({
    strategy_name: isCreate ? '' : record.strategy_name,
    rebate_type: isCreate ? null : record.rebate_type,
    rebate_percentage: isCreate ? '' : record.rebate_percentage,
    rebate_period: isCreate ? null : record.rebate_period,
    collection_method: isCreate ? null : record.collection_method,
    remark: isCreate ? '' : record.remark,
    strategy_status: record?.strategy_status === '启用',
  })

  const fApi = ref(null)
  const formModalProps = reactive({
    rule: [
      {
        type: 'input',
        field: 'strategy_name',
        title: '策略名称',
        value: formValue.value.strategy_name,
        props: {
          placeholder: '请输入',
        }
      },
      {
        type: 'select',
        field: 'rebate_type',
        title: '返水方式',
        value: formValue.value.rebate_type,
        props: {
          placeholder: '请选择返水方式',
        },
      },
      {
        type: 'input',
        field: 'rebate_percentage',
        title: '返水比例',
        value: formValue.value.rebate_percentage,
        props: {
          placeholder: '请输入',
        }
      },
      {
        type: 'select',
        field: 'rebate_period',
        title: '返水週期',
        value: formValue.value.rebate_period,
        props: {
          placeholder: '请选择返水週期',
        },
      },
      {
        type: 'select',
        field: 'collection_method',
        title: '领取方式',
        value: formValue.value.collection_method,
        props: {
          placeholder: '请选择领取方式',
        },
      },
      {
        type: 'input',
        field: 'remark',
        title: '備註',
        value: formValue.value.remark,
        props: {
          placeholder: '请输入',
          type: 'textarea'
        },
      },
      {
        type: 'switch',
        field: 'strategy_status',
        title: '策略状态',
        value: formValue.value.strategy_status,
      },
    ]
  })

  createDialog({
    title: isCreate ? '新增策略' : '编辑策略',
    width: 500,
    component:
      <ModalForm
        v-model={formValue.value}
        v-model:fApi={fApi.value}
        {...formModalProps}
      >
      <div v-if="!isCreate" >
        <a-form-item class="ml20" label="策略ID">
          <span>{ record?.strategy_id }</span>
        </a-form-item>
      </div>
      </ModalForm>
    ,
    async onConfirm() {
      // try {
      //   // Call the API to save the data
      //   await anchorAddOrEditReq(isCreate ? null : record.strategy_id, formValue.value)
      //   message.success(isCreate ? '新增策略成功' : '编辑策略成功')
      //   refresh() // Refresh the table after saving the data
      // } catch (error) {
      //   message.error('保存失败，请重试')
      // }
    },
  })
}

async function onApply(record) {

  const isCreate = !record // true: Add, false: Edit
  console.log("on_Add_Edit : " + record?.strategy_name)
  console.log("isCreate : " + isCreate)

  const formValue = ref({

  })

  const fApi = ref(null)
  // const anchorRule = useAnchorRule(false, true, fApi)
  const formModalProps = reactive({
    // request: data => anchorAddOrEditReq(null, data),
    // getData(data) {
    //   const { avatar_url, ...rest } = data
    //   return {
    //     ...rest,
    //     avatar_url: getPathFromUrlArray(avatar_url),
    //   }
    // },
    rule:// anchorRule,
    [
      {
        type: 'select',
        field: 'group_name',
        title: '分组名称',
        value: [],
        props: {
          mode: 'multiple',  // Enable multi-select
          options: [
            { label: '高价值会员', value: '高价值会员' },
            { label: 'VIP会员', value: 'VIP会员' },
          ],
          placeholder: '请选择会员分组',
        },
      },
    ]
  })

  createDialog({
    title: '应用',
    width: 500,
    component:
      <ModalForm
        v-model={formValue.value}
        v-model:fApi={fApi.value}
        {...formModalProps}
      >
      <div v-if="!isCreate" >
        <a-form-item class="ml20">
          <span>选择需应用的会员分组:下拉,多选,选项为系统中 已创建得会员分组。</span>
        </a-form-item>
      </div>
      </ModalForm>
    ,
    onConfirm() {
      pagination.page = 1
      pagination.total = 0
      props.resetSearch()
    },
  })
}

async function onDelete(record) {
}
defineExpose({
  on_Add_Edit,
})
</script>
