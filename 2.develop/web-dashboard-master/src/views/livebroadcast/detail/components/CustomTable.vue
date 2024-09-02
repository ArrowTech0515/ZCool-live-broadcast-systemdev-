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
import BlacklistForm from './blacklistForm.vue';

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

async function onWithdraw(item = {}) {
  console.log("onForceStop : " + item.value);
  
  const formValue = ref({
    // user_id: userItem.user_id,
  });

  createDialog({
    title: '撤回弹幕',
    width: 500,
    component: {
      setup() {
        return () => (
          <div>
            <div style="padding: 20px; text-align: center;">
              是否撤回XXX用户的聊天弹幕？
            </div>
            <div style="padding: 20px; text-align: center;">
              发言内容：发言内容内容内容
            </div>
          </div>
        )
      },
    },
    onConfirm(status) {
      if (status) {
        const current = dataSource.value.find(
          item2 => item2.gift_type === item.gift_type
        )
        if (!current) {
          // Add new data code here
        } else {
          // Handle case where same name already exists
        }
      }
    },
  });
}

async function onOut(item = {}) {
  console.log("onForceStop : " + item.value);
  
  const formValue = ref({
    // user_id: userItem.user_id,
  });

  createDialog({
    title: '踢出房间',
    width: 500,
    component: {
      setup() {
        return () => (
          <div style="padding: 20px; text-align: center;">
            是否将用户“用户昵称”踢出直播间？
          </div>
        )
      },
    },
    onConfirm(status) {
      if (status) {
        const current = dataSource.value.find(
          item2 => item2.gift_type === item.gift_type
        )
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

async function onBlackList(item = {}) {

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
    content: '内容内容内容',
    blacklist_type: 'type1',
    duration: '1',
    customMuteTime: null,
    reason: '',
  });

  createDialog({
    title: '拉黑',
    width: 600,
    component: {
    setup() {
      return () => (
      <div>
        <ModalForm>
          <BlacklistForm formData={formData.value}/>
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
  onForceStop, onMute, onBlackList, onWithdraw, onOut
})

</script>

<style scoped>
/* Add your scoped styles here */

</style>
