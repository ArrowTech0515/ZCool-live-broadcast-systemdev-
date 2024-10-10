<template>
  <a-table :data-source="paginatedData" :pagination="false">
    <a-table-column title="会员账号" dataIndex="member_account" key="member_account" align="center" />
    <a-table-column title="返佣时间" dataIndex="rebate_time" key="rebate_time" align="center"/>
    <a-table-column title="游戏分类" dataIndex="game_category" key="game_category" align="center" />
    <a-table-column title="总资金" dataIndex="total_funds" key="total_funds" align="center" />
    <a-table-column title="总业绩" dataIndex="total_performance" key="total_performance" align="center"/>
    <a-table-column title="一级团队佣金" dataIndex="level1_team_commission" key="level1_team_commission" align="center"/>
    <a-table-column title="一级团队业绩" dataIndex="level1_team_performance" key="level1_team_performance" align="center"/>  
    <a-table-column title="二级团队佣金" dataIndex="level2_team_commission" key="level2_team_commission" align="center"/>
    <a-table-column title="二级团队业绩" dataIndex="level2_team_performance" key="level2_team_performance" align="center"/>  
    <a-table-column title="三级团队佣金" dataIndex="level3_team_commission" key="level3_team_commission" align="center"/>
    <a-table-column title="三级团队业绩" dataIndex="level3_team_performance" key="level3_team_performance" align="center"/>
  </a-table>

  <div style="display: flex; align-items: center; justify-content: flex-end; margin-top: 16px;">
    <span style="margin-right: 8px;">共 {{ totalItems }}条</span>
    <a-pagination
      v-model:current="currentPage"
      :total="totalItems"
      :page-size="pageSize"
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

import { getUserGroupListReq } from '@/api/usergroup';
import useAddWarningRule from '../hooks/useAddWarningRule';
import useExportCSVRule from '../hooks/useExportCSVRule';

const { createDialog } = useDialog()

// Define reactive state
const currentPage = ref(1);
const pageSize = ref(5);
const totalItems = ref(100);

const props = defineProps({
  searchParams: {
    type: Object,
    default: () => ({}),
  },
  resetSearch: {
    type: Function,
    default: () => {},
  },
})

const pagination = reactive({
  page: 1,
  limit: 10,
  total: 0,
})

// const dataSource = ref([])
const { loading, refresh } = useRequest(() => getUserGroupListReq({
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

const dataSource = ref([
  {
    key: 1,
    member_account: '98io90',
    rebate_time: '2024-08-20',
    game_category: '棋牌',
    total_funds: 0.00,
    total_performance: 28.00,
    level1_team_commission: 0.00,
    level1_team_performance: 28.00,
    level2_team_commission: 0.00,
    level2_team_performance: 28.00,
    level3_team_commission: 0.00,
    level3_team_performance: 28.00,
    // operate_admin: '编辑 删除',
  },
]);

function submitForm() {
  fApi.value.submit(formData => {
    getData(formData)
  })
}

// Computed property for paginated data
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return dataSource.value.slice(start, end);
});

const handlePageChange = (page) => {
  currentPage.value = page
}

const handleSizeChange = (current, size) => {
  pageSize.value = size
  currentPage.value = 1 // Reset to the first page when page size changes
}

async function onAddItem(item = {}) {
  const isCreate = !item.member_account

  if(isCreate) {
    item = {
      // member_account: '',
      // amount: 0,
      // profit_amount: 0,
      // whether_alert: 2,
      // validity_period: '',
      // remarks: '-',
      // added_time: '',
      // updated_time: '',
    }
  }

  const fApi = ref(null)
  const useAddRule = useAddWarningRule(fApi)

  // if (!item.group_id) {
  //   // user_id 需要生成
  //   const [err, { group_id } = {}] = await to(createUserGroupIdReq())
  //   if (err) {
  //     console.log(err)
  //     return
  //   }
  //   formValue.value.group_id = group_id
  // }
  const formModalProps = {
    // request: data => userAddOrEditReq(isCreate ? null : userItem.user_id, data),
    // getData(data) {
    //   const { avatar_url, ...rest } = data
    //   return {
    //     ...rest,
    //     avatar_url: getPathFromUrlArray(avatar_url),
    //     // 如果是修改用户，body 里 user_id 传 null，user_id 放到 url path中。反之，创建用户，user_id 放到 body 中
    //     user_id: isCreate ? data.user_id : undefined,
    //   }
    // }
    option: {
      global: {
        '*': {
          wrap: {
            labelCol: { span: 5 },
          },
        },
      },
    },
    rule: useAddRule,
  }

  createDialog({
    title: isCreate ? '新增异常资金记录' : '编辑异常资金记录',
    width: 500,
    component:
      <ModalForm        
        v-model:fApi={fApi.value}
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

async function exportCSV() {
  const formValue = ref({
    // agent_mode: null,
    // agent_id: null,
  })

  const fApi = ref(null)
  const exportCSVRule = useExportCSVRule(false, true, fApi)

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
    option: {
      global: {
        '*': {
          wrap: {
            labelCol: { span: 5 },
          },
        },
      },
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

defineExpose({
  exportCSV
})

</script>

<style scoped>
/* Add your scoped styles here */
</style>
