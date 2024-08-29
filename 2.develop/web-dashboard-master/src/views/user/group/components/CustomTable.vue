<template>
  <a-table :data-source="paginatedData" :pagination="false">
    <a-table-column title="默认分组" key="defaultGrouping" align="center">
      <template #default="{ record }">
        <a-checkbox :checked="selectedGifts.includes(record.key)" @change="onGiftSelect(record.key)" />
      </template>
    </a-table-column>
    <a-table-column title="分组名称" dataIndex="groupName" key="groupName" align="center" />
    <a-table-column title="会员人数" dataIndex="nMemberIndex" key="nMemberIndex" align="center"/>
    <a-table-column title="充值策略" dataIndex="rechargeStrategy" key="rechargeStrategy" align="center" />
    <a-table-column title="提现策略" dataIndex="withdrawalStrategy" key="withdrawalStrategy" align="center" />
    <a-table-column title="返水策略" dataIndex="rebateStrategy" key="rebateStrategy" align="center" />
    <a-table-column title="最高返现金额" dataIndex="maxCashbackAmount" key="maxCashbackAmount" align="center"/>
    <a-table-column title="备注" dataIndex="remark" key="remark" align="center"/>
    <a-table-column title="操作" dataIndex="operate" key="operate" align="center">
      <template #default="{ record }">
        <span style="color: blue; margin-right: 8px; cursor: pointer;" @click="onEditItem(record)">编辑</span>
        <a-popconfirm title='确定删除当前分组吗？' @confirm="() => onDelItem(record)">
          <a-button type="link" danger size="small">删除</a-button>
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

const { createDialog } = useDialog()

// Define reactive state
const currentPage = ref(1);
const pageSize = ref(5);
const totalItems = ref(100);
const selectedGifts = ref([]);
const groupName = ref('');


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
    key: '1',
    groupName: 'KY一组',
    nMemberIndex: 'ob_test',
    rechargeStrategy: '809',
    withdrawalStrategy: '提现',
    rebateStrategy: '东方彩票',
    maxCashbackAmount: '快三',
    remark: '收入',
    operate: '编辑 删除',
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

  console.log("onAddItem : " + item.value)
  const formValue = ref({
    // user_id: userItem.user_id,
    // avatar_url: userItem.avatar_url,
    // nickname: userItem.nickname,
    // phone: userItem.phone,
    // email: userItem.email,
    // password: userItem.password,
  })

  // const isCreate = !item.group_id
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

    rule: [
      {
        type: 'input',
        field: 'groupName',
        title: '分组名称',
        props: {
          placeholder: '请输入分组名称',
          allowClear:true
        },
        effect: {
          required: true,
        },
        wrap: {
          labelCol: {
            span: 5,
          },
        },
      },
      // userGroupSelectRule,
      {
        type: 'select',
        field: 'nMemberIndex',
        title: '分组会员',
        mode: 'multiple',
        props: {
          placeholder: '请选择',
          allowClear:true
        },
        effect: {
          required: true,
        },
        wrap: {
          labelCol: {
            span: 5,
          },
        },
      },
      {
        type: 'select',
        field: 'rechargeStrategy',
        title: '充值策略',
        props: {
          placeholder: '请选择',
          allowClear:true
        },
        effect: {
          required: true,
        },
        wrap: {
          labelCol: {
            span: 5,
          },
        },
      },
      {
        type: 'select',
        field: 'withdrawalStrategy',
        title: '提现策略',
        props: {
          placeholder: '请选择',
          allowClear:true
        },
        effect: {
          required: true,
        },
        wrap: {
          labelCol: {
            span: 5,
          },
        },
      },
      {
        type: 'select',
        field: 'nMemberIndex',
        title: '返水策略',
        props: {
          placeholder: '请选择',
          allowClear:true
        },
        effect: {
          required: true,
        },
        wrap: {
          labelCol: {
            span: 5,
          },
        },
      },
      {
        type: 'input',
        field: 'maxCashbackAmount',
        title: '最高返现金额',
        props: {
          placeholder: '请输入最高返水金额',
          allowClear:true
        },
        effect: {
          required: true,
        },
        wrap: {
          labelCol: {
            span: 5,
          },
        },
      },
      {
        type: 'input',
        field: 'remark',
        title: '备注',
        props: {
          placeholder: '请输入分组名称',
          allowClear:true
        },
        effect: {
          required: true,
        },
        wrap: {
          labelCol: {
            span: 5,
          },
        },
      },
    ],
  }

  createDialog({
    title: '新增会员分组',
    width: 550,
    component:
      <ModalForm
        v-model={formValue.value}
        {...formModalProps}
      />,
    onConfirm(status) {
      if (status) {
        const current = dataSource.value.find(item2 => item2.groupName === item.groupName)
        if (! current) {
          // Add new data code here
        }
        else {
          // Same name already exists.
        }
      }
    },
  })
}

async function onEditItem(item = {}) {
  const formValue = ref({
    // user_id: item.group,
    // mute_type: '',
    // mute_end_time: '',
    // reason: '',
  })

  const formModalProps = {
    // request: setMuteReq,
    // getData(data) {
    //   const { user_id, ...params } = data
    //   return {
    //     ...params,
    //     user_ids: [user_id],
    //   }
    // },

    rule: [
      {
        type: 'input',
        field: 'groupName',
        title: '分组名称',
        value: item.groupName,
        effect: {
          required: true,
        },
        wrap: {
          labelCol: {
            span: 5,
          },
        },
      },
      {
        type: 'input',
        field: 'nMemberIndex',
        title: '会员人数',
        value: item.nMemberIndex,
        effect: {
          required: true,
        },
        wrap: {
          labelCol: {
            span: 5,
          },
        },
      },
      {
        type: 'select',
        field: 'rechargeStrategy',
        title: '充值策略',
        value: item.rechargeStrategy,
        effect: {
          required: true,
        },
        wrap: {
          labelCol: {
            span: 5,
          },
        },
      },
      {
        type: 'select',
        field: 'withdrawalStrategy',
        title: '提现策略',
        value: item.withdrawalStrategy,
        effect: {
          required: true,
        },
        wrap: {
          labelCol: {
            span: 5,
          },
        },
      },
      {
        type: 'select',
        field: 'nMemberIndex',
        title: '返水策略',
        value: item.rebateStrategy,
        effect: {
          required: true,
        },
        wrap: {
          labelCol: {
            span: 5,
          },
        },
      },
      {
        type: 'input',
        field: 'maxCashbackAmount',
        title: '最高返现金额',
        value: item.maxCashbackAmount,
        effect: {
          required: true,
        },
        wrap: {
          labelCol: {
            span: 5,
          },
        },
      },
      {
        type: 'input',
        field: 'remark',
        title: '备注',
        value: item.remark,
        effect: {
          required: true,
        },
        wrap: {
          labelCol: {
            span: 5,
          },
        },
      },
    ],
  }

  createDialog({
    title: '禁言分组',
    width: 550,
    component:
      <ModalForm
        v-model={formValue.value}
        {...formModalProps}
      />,
    onConfirm(status) {
      if (status) {
        const current = dataSource.value.find(item2 => item2.groupName === item.groupName)
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
