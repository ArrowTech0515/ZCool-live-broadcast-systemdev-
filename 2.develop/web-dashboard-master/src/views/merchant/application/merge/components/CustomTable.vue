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
import useExportCSVRule from '../hooks/useExportCSVRule'

const emit = defineEmits(['emit_func1'])

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
    id: 1,
    original_application: '站酷直播',
    selected_application: 'K得直播',
    status: '合并应用',
    time: '2021-12-12 12:21:21',
    account: '管理员-张三',
  },
  {
    id: 2,
    original_application: '站酷直播',
    selected_application: 'K得直播',
    status: '合并应用',
    time: '2021-12-12 12:21:21',
    account: '管理员-张三',
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
    title: '原始应用',
    dataIndex: 'original_application',
    align: 'center',
  },
  {
    title: '选中应用',
    dataIndex: 'selected_application',
    align: 'center',
  },
  {
    title: '状态',
    dataIndex: 'status',
    align: 'center',
  },
  {
    title: '时间',
    dataIndex: 'time',
    align: 'center',
  },
  {
    title: '操作账号',
    dataIndex: 'account',
    align: 'center',
  },
]

const onMergeApplication = () => {
  // const formValue = ref({
  //   user_id: null,
  //   application_id: null,
  // })

  // const fApi = ref(null)
  // const exportCSVRule = useExportCSVRule(false, true, fApi)

  // console.log("导出CSV : fApi = " + fApi.value)
  
  // const formModalProps = reactive({
  //   request: data => anchorAddOrEditReq(null, data),
  //   getData(data) {
  //     const { avatar_url, ...rest } = data
  //     return {
  //       ...rest,
  //       avatar_url: getPathFromUrlArray(avatar_url),
  //     }
  //   },
  //   rule: exportCSVRule,
  // })

  // console.log("user_id: " + formValue.user_id)

  // createDialog({
  //   title: '导出CSV',
  //   width: 500,
  //   component:
  //     <ModalForm
  //       v-model={formValue.value}
  //       v-model:fApi={fApi.value}
  //       {...formModalProps}
  //     >
  //     </ModalForm>
  //   ,
  //   onConfirm() {
  //     pagination.page = 1
  //     pagination.total = 0
  //     props.resetSearch()
  //   },
  // })
}

defineExpose({
  onMergeApplication
})

</script>
