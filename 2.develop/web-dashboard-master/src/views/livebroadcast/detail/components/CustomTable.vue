<template>
    <a-table :data-source="paginatedData" :pagination="false">
    <a-table-column title="礼物类型" dataIndex="gift_type" key="gift_type" align="center" />
    <a-table-column title="礼物数量" dataIndex="gift_quantity" key="gift_quantity" align="center" />
    <a-table-column title="礼物价值" dataIndex="gift_value" key="gift_value" align="center" />
    <a-table-column title="总价值" dataIndex="total_value" key="total_value" align="center" />
    <a-table-column title="送礼用户" dataIndex="gift_user" key="gift_user" align="center" />
    <a-table-column title="赠送时间" dataIndex="gift_time" key="gift_time" align="center" />
    <a-table-column title="所属商户" dataIndex="merchant" key="merchant" align="center" />
    <a-table-column title="应用名称" dataIndex="app_name" key="app_name" align="center" />
    <a-table-column title="应用ID" dataIndex="app_id" key="app_id" align="center" />
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
import MuteForm from './muteForm.vue';
import ModalForm from '@/components/Form/ModalForm/ModalForm.vue';

const { createDialog } = useDialog()

// Define reactive state

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

function submitForm() {
  fApi.value.submit(formData => {
    getData(formData)
  })
}
const currentPage = ref(1);
const pageSize = ref(5);
const totalItems = ref(100);
const selectedGifts = ref([]);
const group_name = ref('');

const dataSource = ref([
{
    key: '1',
    gift_type: '鲜花',
    gift_quantity: '222',
    gift_value: '1',
    total_value: '222',
    gift_user: '想你的夜',
    gift_time: '2022-03-23 23:32:32',
    merchant: '平台',
    app_name: 'XXXXX应用',
    app_id: '324234',
  },
  {
    key: '2',
    gift_type: '蓝色妖姬',
    gift_quantity: '1',
    gift_value: '666',
    total_value: '666',
    gift_user: '春风者',
    gift_time: '2022-03-23 23:32:32',
    merchant: 'XXXXX商户',
    app_name: 'XXXXX应用',
    app_id: '3424234',
  },
])


// Handle page change
const handlePageChange = (page) => {
  currentPage.value = page
}

// Handle page size change
const handleSizeChange = (current, size) => {
  pageSize.value = size
  currentPage.value = 1 // Reset to the first page when page size changes
}

// Computed property for paginated data
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return dataSource.value.slice(start, end);
});


async function onHideItems(item = {}) {

  console.log("onAddItem : " + item.value)
  const formValue = ref({
    // user_id: userItem.user_id,

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
        type: 'radio',
        field: 'hidden_time',
        title: '本场直播',
        value: '',
        options: Object.keys(ENUM.hidden_time).map(key => ({ label: ENUM.hidden_time[key], value: parseInt(key) })),
        wrap: {
          labelCol: {
            span: 5,
          },
        },
      },
      {
        type: 'a-time-picker',
        field: 'hidden_time',
        title: '隐藏时段',
        props: {
          placeholder: '选择时间',
          allowClear: true,
          format: 'HH:mm:ss',  // You can customize the format if needed
        },
        wrap: {
          labelCol: {
            span: 5,
          },
        },
      },
      {
        type: 'a-form-item',
        field: 'infoText',
        render: () => (
          <div style={{ color: 'black', marginTop: '10px' }}>
            设置后，主播不在客户端展示，也无法通过搜索或者关注进入主播直播间.
          </div>
        ),
      },
    ],
  }

  createDialog({
    title: '隐藏',
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

async function onForceStop(item = {}) {
  console.log("onForceStop : " + item.value);
  
  const formValue = ref({
    // user_id: userItem.user_id,
  });

  createDialog({
    title: '强制下播',
    width: 500,
    component: {
      setup() {
        return () => (
          <div style="padding: 20px; text-align: center;">
            是否强制结束当前直播？
          </div>
        )
      },
    },
    onConfirm(status) {
      if (status) {
        const current = dataSource.value.find(
          item2 => item2.gift_type === item.gift_type
        );
        if (!current) {
          // Add new data code here
        } else {
          // Handle case where same name already exists
        }
      }
    },
  });
}

async function onMute(item = {}) {

  console.log("onBlock : " + item.value)
  const formValue = ref({
    // user_id: userItem.user_id,
  })

  const formModalProps1 = {
  rule: [

    ],
  };

  const formData = ref({
    username: '用户昵称',
    content: 'XXXXXXXXXXX',
    muteDuration: '1',
    customMuteTime: null,
    reason: '',
  });

  createDialog({
    title: '禁言',
    width: 600,
    component: {
    setup() {
      return () => (
      <div>
        <ModalForm>
          <MuteForm formData={formData.value}/>
        </ModalForm>
      </div>
      )
    },
  },
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

defineExpose({
  onForceStop, onMute
})

</script>

<style scoped>
/* Add your scoped styles here */

</style>
