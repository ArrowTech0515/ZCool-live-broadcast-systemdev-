<template>
  <a-table :data-source="paginatedData" :pagination="false">
    <a-table-column title="会员账号" dataIndex="member_account" key="member_account" align="center" />
    <a-table-column title="金额" dataIndex="amount" key="amount" align="center"/>
    <a-table-column title="盈利金额" dataIndex="profit_amount" key="profit_amount" align="center" />
    <a-table-column title="是否预警" dataIndex="whether_alert" key="whether_alert" align="center" />
    <a-table-column title="预警有效期" dataIndex="validity_period" key="validity_period" align="center" />
    <a-table-column title="备注" dataIndex="remarks" key="remarks" align="center"/>
    <a-table-column title="添加时间" dataIndex="added_time" key="added_time" align="center"/>
    <a-table-column title="更新时间" dataIndex="updated_time" key="updated_time" align="center"/>  
    <a-table-column title="操作" dataIndex="operate" key="operate" align="center">
      <template #default="{ record }">
        <span style="text-decoration: underline; color: #1890ff; margin-right: 12px; cursor: pointer;" @click="onAddItem(record)">编辑</span>
        <a-popconfirm title='确定删除当前分组吗？' @confirm="() => onDelItem(record)">
          <span style="text-decoration: underline; color: red; cursor: pointer;">删除</span>
        </a-popconfirm>
      </template>
    </a-table-column>
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

const { createDialog } = useDialog()

// Define reactive state
const currentPage = ref(1);
const pageSize = ref(5);
const totalItems = ref(100);
const selectedGifts = ref([]);
const member_account = ref('');


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
    amount: 100.00,
    profit_amount: 50.00,
    whether_alert: 2,
    validity_period: '30天',
    remarks: '-',
    added_time: '2024-8-19 10:01',
    updated_time: '2024-8-19 10:01',
    // operate: '编辑 删除',
  },
  {
    key: 2,
    member_account: '100io90',
    amount: 10.00,
    profit_amount: 70.00,
    whether_alert: 3,
    validity_period: '30天',
    remarks: '-',
    added_time: '2024-8-19 10:01',
    updated_time: '2024-8-19 10:01',
    // operate: '编辑 删除',
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
    title: isCreate ? '新增预警' : '编辑预警',
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

const onDelItem = (item) => {

  console.log("onDelItem : " + 1)

  // loading.value = true;
  delMessageReq({
    message_ids: item.msg_id,
  })
  .then(() => {
    // loading.value = false;
    pagination.page = 1
    pagination.total = 0
    props.resetSearch()
  })
  .catch(() => {
    // loading.value = false;
  })
}

const handlePageChange = (page) => {
  currentPage.value = page
}

const handleSizeChange = (current, size) => {
  pageSize.value = size
  currentPage.value = 1 // Reset to the first page when page size changes
}

defineExpose({
  onAddItem,
})

</script>

<style scoped>
/* Add your scoped styles here */
</style>
