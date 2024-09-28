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
import useExportCSVRule from '../hooks/useExportCSVRule';
import useAddRoleRule from '../hooks/useAddRoleRule';

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

const dataSource = ref([
  {
    id: '1',
    index: '1',                    // 序号
    user_name: '15262221870',        // 用户名
    name: '运营经理',                // 姓名
    phone_number: '15262221870',    // 手机号
    role: '运营经理',                // 角色
    remarks: '运营经理',             // 备注
    created_time: '2023-06-26 16:37', // 创建时间
    updated_time: '2023-06-26 16:37', // 更新时间
  },
]);

const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    align: 'center',
  },
  {
    title: '用户名',
    dataIndex: 'user_name',
    align: 'center',
  },
  {
    title: '姓名',
    dataIndex: 'name',
    align: 'center',
  },
  {
    title: '手机号',
    dataIndex: 'phone_number',
    align: 'center',
  },
  {
    title: '角色',
    dataIndex: 'role',
    align: 'center',
  },
  {
    title: '备注',
    dataIndex: 'remarks',
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'created_time',
    align: 'center',
  },
  {
    title: '更新时间',
    dataIndex: 'updated_time',
    align: 'center',
  },
  {
    title: '操作',
    fixed: 'right',
    width: 140,
    dataIndex: 'action',
    align: 'center',
    customRender: ({ record }) =>
      <div>
        <span 
          style="text-decoration: underline;color: blue; margin-right: 12px; cursor: pointer;" 
          onClick={() => onView(record)}>
          查看</span>
        <span 
          style="text-decoration: underline;color: green; margin-right: 12px; cursor: pointer;" 
          onClick={() => onAddUser(record)}>
          编辑</span>
        <a-popconfirm title='您确定要删除吗？' onConfirm={() => onDelete(record)}>
          <span 
          style="text-decoration: underline;color: red; margin-right: 12px; cursor: pointer;" 
          >删除</span>
        </a-popconfirm>
      </div>
  }
];

// Function to view the record
async function onView(item = {}) {
  console.log("Viewing item: ", item);
  // Implement the logic to view the record here
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


async function onAddUser(item = {}) {
  const merch_id = item.id || null // 兼容 id 和 merch_id
  const isCreate = !merch_id

  if(isCreate)
  {
    item = {
      index: '1',                    // 序号
      role_name: '',          // 角色名称
      role_id: '',  // 角色标识
      role_description: '',      // 角色描述
      role_permission: 2,//'本级',         // 角色权限
      created_time: '2023-06-26 16:37', // 创建时间
      updated_time: '2023-06-26 16:37', // 更新时间
    }
  }
  const fApi = ref(null)
  const addoreditRule = useAddRoleRule(fApi)
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
    title: isCreate ? '添加新角色' : '编辑角色',
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


async function onExport(item = {}) {
  const formValue = ref({
    // agent_mode: null,
    // agent_id: null,
  })

  const fApi = ref(null)
  const exportCSVRule = useExportCSVRule(fApi)

  console.log("导出CSV : fApi = " + fApi.value)
  
  const formModalProps = reactive({
    request: data => anchorAddOrEditReq(null, data),
    getData(data) {
      const { avatar_url, ...rest } = data
      return {
        ...rest,
        avatar_url: getPathFromUrlArray(avatar_url),
      }
    },
    rule: exportCSVRule,
  })

  // console.log("user_id: " + formValue.user_id)

  createDialog({
    title: '导出CSV',
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
  onAddUser, onExport
})
</script>
