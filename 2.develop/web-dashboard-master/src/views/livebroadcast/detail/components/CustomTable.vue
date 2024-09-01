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
import LivebroadcastPanel from './livebroadcastPanel.vue';

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

async function onCategory(item = {}) {

  console.log("onCategory : " + item.value)
  const formValue = ref({
    // user_id: userItem.user_id,
  })

  const formModalProps = {

    rule: [
      {
        type: 'a-form-item',
        field: 'infoText',
        render: () => (
          <div style={{ color: 'black', marginTop: '10px' }}>
            设置后，主播仅对当前分类用户可见
          </div>
        ),
      },
      {
        type: 'checkbox',
        field: 'category_type',
        title: '选择分类',
        value: '',
        options: Object.keys(ENUM.category_type).map(key => ({ label: ENUM.category_type[key], value: parseInt(key) })),
        wrap: {
          labelCol: {
            span: 5,
          },
        },
      },
      {
        type: 'rangePicker',
        field: 'effective_time',
        title: '生效时间',
        value: '',
        props: {
          format: 'YYYY-MM-DD',
          valueFormat: 'X',
          placeholder: ['开始时间', '结束时间'],
        },
        wrap: {
          labelCol: {
            span: 5,
          },
        },
      }
    ],
  }

  createDialog({
    title: '分类',
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

async function onBlock(item = {}) {

  console.log("onBlock : " + item.value)
  const formValue = ref({
    // user_id: userItem.user_id,
  })

  const formModalProps = {

    rule: [
      {
        type: 'checkbox',
        field: 'block_type',
        title: '屏蔽直播类型',
        value: '',
        options: Object.keys(ENUM.block_type).map(key => ({ label: ENUM.block_type[key], value: parseInt(key) })),
        wrap: {
          labelCol: {
            span: 5,
          },
        },
      },
      {
        type: 'rangePicker',
        field: 'block_time',
        title: '屏蔽时间',
        value: '',
        props: {
          format: 'YYYY-MM-DD',
          valueFormat: 'X',
          placeholder: ['开始时间', '结束时间'],
        },
        wrap: {
          labelCol: {
            span: 5,
          },
        },
      },
      // {
      //   type: 'a-form-input', // This tells the form generator to treat this as a form item
      //   field: 'infoText',
      //   title: '',
   
      //   props: {
      //     style: {
      //       fontSize: '10px',
      //     }, 
      //   },
      //   render: () => (
      //     <div style={{ fontSize: '10px', color: '#8c8c8c' }}>
      //       屏蔽后对应类型的直播间将不在应用中展示，同时搜索页无法搜索，用户也不可进入屏蔽类型的主播直播间
      //     </div>
      //   ),
      // },
      {
        type: 'rangePicker',
        field: 'block_time',
        title: '屏蔽时间',
        value: '',
        props: {
          format: 'YYYY-MM-DD',
          valueFormat: 'X',
          placeholder: ['开始时间', '结束时间'],
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
    title: '屏蔽',
    width: 550,
    component:
      <ModalForm
        v-model={formValue.value}
        {...formModalProps}
      ></ModalForm>,
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

async function onOperationRecord(item = {}) {

  console.log("onBlock : " + item.value)
  const formValue = ref({
    // user_id: userItem.user_id,
  })

  const formModalProps1 = {
  rule: [

    ],
  };


  createDialog({
    title: '操作记录',
    width: 600,
    component: {
    setup() {
      const activeTabKey = ref('tab1');

      return () => (
      <div>
        <a-tabs v-model:activeKey={activeTabKey.value} centered class="custom-tabs">
          <a-tab-pane key="tab1" tab="分类">
          <div>
            <a-card hoverable style="width: 100%; margin-bottom: 16px; background:rgb(242, 242, 242);">
              <a-row type="flex" justify="space-between" align="middle" margin="0">
                <a-col span="18">
                  <div style="font-size: 12px;">主播昵称</div>
                  <a-row  justify="space-between">
                    <a-col>
                      <div style="margin-right: 10px;font-size: 12px;">充值用户/贵族用户</div>
                    </a-col>
                    <a-col>
                      <div style="font-size: 12px; white-space: nowrap; text-overflow: ellipsis; text-align: right;">
                        2022-12-12 12:21 —— 2022-12-12 12:21
                      </div>
                    </a-col>
                  </a-row>
                </a-col>
                <a-col span="4" style="display: flex; justify-content: flex-end; align-items: center;">
                  <a-button type="primary">
                    删除
                  </a-button>
                </a-col>
              </a-row>
            </a-card>

            <a-card hoverable style="width: 100%; margin-bottom: 16px; background:rgb(242, 242, 242);">
              <a-row type="flex" justify="space-between" align="middle">
                <a-col span="18">
                  <a href="#" style="font-size: 12px; color: #1890ff; ">25位主播</a>
                  <a-row justify="space-between">
                    <a-col>
                      <div style="font-size: 12px; margin-right: 10px;">XX层级/XX层级</div>
                    </a-col>
                    <a-col>
                      <div style="font-size: 12px; white-space: nowrap; text-overflow: ellipsis; text-align: right;">
                        2022-12-12 12:21 —— 2022-12-12 12:21
                      </div>
                    </a-col>
                  </a-row>
                </a-col>
                <a-col span="4" style="font-size: 12px; display: flex; justify-content: flex-end; align-items: center;">
                  <a-button type="primary">
                    删除
                  </a-button>
                </a-col>
              </a-row>
            </a-card>
          </div>
          </a-tab-pane>

          <a-tab-pane key="tab2" tab="隐藏">
            <div>
            <a-card hoverable style="width: 100%; margin-bottom: 16px; background:rgb(242, 242, 242);">
              <a-row type="flex" justify="space-between" align="middle" margin="0">
                <a-col span="18">
                  <a-row  justify="space-between">
                    <a-col>
                      <div style="margin-right: 10px;font-size: 12px;">主播昵称</div>
                    </a-col>
                    <a-col>
                      <div style="font-size: 12px; white-space: nowrap; text-overflow: ellipsis; text-align: right;">
                        本场直播
                      </div>
                    </a-col>
                  </a-row>
                </a-col>
                <a-col span="4" style="display: flex; justify-content: flex-end; align-items: center;">
                  <a-button type="primary">
                    删除
                  </a-button>
                </a-col>
              </a-row>
            </a-card>

            <a-card hoverable style="width: 100%; margin-bottom: 16px; background:rgb(242, 242, 242);">
              <a-row type="flex" justify="space-between" align="middle">
                <a-col span="18">
                  <a-row justify="space-between">
                    <a-col>
                      <a href="#" style="font-size: 12px; color: #1890ff; ">24位主播</a>
                    </a-col>
                    <a-col>
                      <div style="font-size: 12px; white-space: nowrap; text-overflow: ellipsis; text-align: right;">
                        2022-12-12 12:21 —— 2022-12-12 12:21
                      </div>
                    </a-col>
                  </a-row>
                </a-col>
                <a-col span="4" style="font-size: 12px; display: flex; justify-content: flex-end; align-items: center;">
                  <a-button type="primary">
                    删除
                  </a-button>
                </a-col>
              </a-row>
            </a-card>
          </div>
          </a-tab-pane>

          <a-tab-pane key="tab3" tab="屏蔽">
            <div>
            <a-card hoverable style="width: 100%; margin-bottom: 16px; background:rgb(242, 242, 242);">
              <a-row type="flex" justify="space-between" align="middle" margin="0">
                <a-col span="18">
                  <a-row  justify="space-between">
                    <a-col>
                      <div style="margin-right: 10px;font-size: 12px;">普通房间/贵族房间</div>
                    </a-col>
                    <a-col>
                      <div style="font-size: 12px; white-space: nowrap; text-overflow: ellipsis; text-align: right;">
                        2022-12-12 12:21 —— 2022-12-12 12:21
                      </div>
                    </a-col>
                  </a-row>
                </a-col>
                <a-col span="4" style="display: flex; justify-content: flex-end; align-items: center;">
                  <a-button type="primary">
                    删除
                  </a-button>
                </a-col>
              </a-row>
            </a-card>

            <a-card hoverable style="width: 100%; margin-bottom: 16px; background:rgb(242, 242, 242);">
              <a-row type="flex" justify="space-between" align="middle">
                <a-col span="18">
                  <a-row justify="space-between">
                    <a-col>
                      <div style="margin-right: 10px;font-size: 12px;">普通房间/贵族房间</div>
                    </a-col>
                    <a-col>
                      <div style="font-size: 12px; white-space: nowrap; text-overflow: ellipsis; text-align: right;">
                        2022-12-12 12:21 —— 2022-12-12 12:21
                      </div>
                    </a-col>
                  </a-row>
                </a-col>
                <a-col span="4" style="font-size: 12px; display: flex; justify-content: flex-end; align-items: center;">
                  <a-button type="primary">
                    删除
                  </a-button>
                </a-col>
              </a-row>
            </a-card>
          </div>
          </a-tab-pane>

          </a-tabs>
        </div>
      );
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
  onHideItems, onCategory, onBlock, onOperationRecord
})

</script>

<style scoped>
/* Add your scoped styles here */

</style>
