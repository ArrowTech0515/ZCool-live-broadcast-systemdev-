<template>
  <a-table :data-source="paginatedData" :pagination="false">
    <a-table-column title="默认分组" key="default_grouping" align="center">
      <template #default="{ record }">
        <a-checkbox :checked="selectedGifts.includes(record.key)" @change="onGiftSelect(record.key)" />
      </template>
    </a-table-column>
    <a-table-column title="分组名称" dataIndex="group_name" key="group_name" align="center" />
    <a-table-column title="会员人数" dataIndex="member_count" key="member_count" align="center"/>
    <a-table-column title="充值策略" dataIndex="recharge_strategy" key="recharge_strategy" align="center" />
    <a-table-column title="提现策略" dataIndex="withdrawal_strategy" key="withdrawal_strategy" align="center" />
    <a-table-column title="返水策略" dataIndex="rebate_strategy" key="rebate_strategy" align="center" />
    <a-table-column title="最高返现金额" dataIndex="max_cashback_amount" key="max_cashback_amount" align="center"/>
    <a-table-column title="备注" dataIndex="remarks" key="remarks" align="center"/>
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
import { ref, computed } from 'vue';
import { getUserGroupListReq } from '@/api/usergroup';
import userGroupSelectRule from '@/rules/userGroupSelectRule';
import useAddGroupRule from '../hooks/useAddGroupRule';

const { createDialog } = useDialog()

// Define reactive state
const currentPage = ref(1);
const pageSize = ref(5);
const totalItems = ref(100);
const selectedGifts = ref([]);
const group_name = ref('');


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
// const { loading, refresh } = useRequest(() => getUserGroupListReq({
//   ...props.searchParams,
//   page: pagination.page,
//   limit: pagination.limit,
// }), {
//   refreshDeps: true,
//   onSuccess(data) {
//     dataSource.value = data.items
//     pagination.total = data.total_data
//   },
// })

const dataSource = ref([
  {
    key: 1,
    group_name: 'KY一组',
    member_count: 'ob_test',
    recharge_strategy: '809',
    withdrawal_strategy: '提现',
    rebate_strategy: '东方彩票',
    max_cashback_amount: '快三',
    remarks: '收入',
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

// Methods
const onGiftSelect = (key) => {
  if (selectedGifts.value.includes(key)) {
    selectedGifts.value = selectedGifts.value.filter(k => k !== key);
  } else {
    selectedGifts.value.push(key)
  }
}

async function onAddItem(item = {}) {
  const isCreate = !item.group_name

  if(isCreate) {
    item = {
      // group_name: '',
      // member_count: '',
      // recharge_strategy: '',
      // withdrawal_strategy: '',
      // rebate_strategy: '',
      // max_cashback_amount: '',
      // remarks: '',
    }
  }

  const fApi = ref(null)
  const useAddRule = useAddGroupRule(fApi)

  const formModalProps = {
    // request: setMuteReq,
    // getData(data) {
    //   const { user_id, ...params } = data
    //   return {
    //     ...params,
    //     user_ids: [user_id],
    //   }
    // },
    option: {
      global: {
        '*': {
          wrap: {
            labelCol: { span: 7 },
          },
        },
      },
    },
    rule: useAddRule,
  }

  createDialog({
    title: isCreate ? '新增会员分组' : '编辑会员分组',
    width: 500,
    component:
      <ModalForm        
        v-model:fApi={fApi.value}
        v-model={item}
        {...formModalProps}
      />
      ,
    onConfirm(status) {
      if (status) {
        const current = dataSource.value.find(item2 => item2.group_name === item.group_name)
        if (current) {
          // Save data code here
        }
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
