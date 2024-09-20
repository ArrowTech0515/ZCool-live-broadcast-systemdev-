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
import useAnchor_UserRule from '../hooks/useAnchor_UserRule'
import useUnbanUserRule from '../hooks/useUnbanUserRule';
import { getAnchorListReq, anchorAddOrEditReq, setAnchorBlackReq } from '@/api/anchor'
import { message } from 'ant-design-vue'

const { createDialog } = useDialog()


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

const centeredStyle = { textAlign: 'center' }

const dataSource = ref([
  {
    nickname: '打扫打扫打扫',
    id: '32423',
    identity: '用户',
    merchant: 'XXXX商户',
    application: 'XXX应用',
    blacklistType: '禁言',
    blacklistEffect: '禁言7天',
    blacklistPlatform: '全平台',
    reason: '发广告',
    time: '2022-03-03 12:22:21',
    operator: '平台',
    admin: '管理员·张三',
    action: '解除',
  },
  {
    nickname: '打扫打扫打扫',
    id: '32423',
    identity: '主播',
    merchant: 'XXXX商户',
    application: 'XXX应用',
    blacklistType: '账号拉黑',
    blacklistEffect: '永久拉黑',
    blacklistPlatform: 'XXX商户',
    reason: '发广告',
    time: '2022-03-03 12:22:21',
    operator: '',
    admin: '管理员·张三',
    action: '申请解禁',
  },
  {
    nickname: '打扫打扫打扫',
    id: '32423',
    identity: '用户',
    merchant: 'XXXX商户',
    application: 'XXX应用',
    blacklistType: '设备拉黑',
    blacklistEffect: '拉黑7天',
    blacklistPlatform: '全平台',
    reason: '发广告',
    time: '2022-03-03 12:22:21',
    operator: '平台',
    admin: '管理员·张三',
    action: '解除',
  },
  {
    nickname: '打扫打扫打扫',
    id: '32423',
    identity: '用户',
    merchant: 'XXXX商户',
    application: 'XXX应用',
    blacklistType: 'IP拉黑',
    blacklistEffect: '永久拉黑',
    blacklistPlatform: 'XXX商户',
    reason: '发广告',
    time: '2022-03-03 12:22:21',
    operator: '',
    admin: '管理员·张三',
    action: '申请解禁',
  },
]);

const columns = [
  {
    title: '昵称',
    dataIndex: 'nickname',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.nickname}</div>,
  },
  {
    title: 'ID/房间号',
    dataIndex: 'id',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.id}</div>,
  },
  {
    title: '身份',
    dataIndex: 'identity',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.identity}</div>,
  },
  {
    title: '所属商户',
    dataIndex: 'merchant',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.merchant}</div>,
  },
  {
    title: '所属应用',
    dataIndex: 'application',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.application}</div>,
  },
  {
    title: '拉黑类型',
    dataIndex: 'blacklistType',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.blacklistType}</div>,
  },
  {
    title: '拉黑时效',
    dataIndex: 'blacklistEffect',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.blacklistEffect}</div>,
  },
  {
    title: '拉黑平台',
    dataIndex: 'blacklistPlatform',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.blacklistPlatform}</div>,
  },
  {
    title: '理由',
    dataIndex: 'reason',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.reason}</div>,
  },
  {
    title: '时间',
    dataIndex: 'time',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.time}</div>,
  },
  {
    title: '操作商户',
    dataIndex: 'operator',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.operator}</div>,
  },
  {
    title: '操作者',
    dataIndex: 'admin',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.admin}</div>,
  },
  {
    title: '操作',
    dataIndex: 'action',
    align: 'center',
    fixed: 'right',
    customRender: ({ record }) => (
      <div style={centeredStyle}>
        <span v-if="record.action == '解除'"
              style="text-decoration: underline; color: #1890ff; margin-right: 12px; cursor: pointer;" 
              onClick={() => onRelease(record)}>
              {record.action}</span>
        <span v-else
              style="text-decoration: underline; color: #1890ff; margin-right: 12px; cursor: pointer;" 
              onClick={() => onApplyUnban(record)}>
              {record.action}</span>
      </div>
    )
  },
]

// Junn
const allUsers = [
  { id: '1', name: '用户11' },
  { id: '2', name: '用户22' },
  { id: '3', name: '用户33' },
  { id: '4', name: 'user44' },
  { id: '5', name: 'user_abc' },
];


const allAnchors = [
  { id: '1', name: '主播11' },
  { id: '2', name: '主播22' },
  { id: '3', name: '主播33' },
  { id: '4', name: 'aaa44' },
  { id: '5', name: 'anchor_111' },
];


const searchUsers = async (searchText, user_or_anchor) => {

  console.log("searchText : " + searchText)

  if(user_or_anchor === '用户') {
  // Simulate search based on input
    return allUsers
      .filter(user => user.name.toLowerCase().includes(searchText.toLowerCase()) || user.id.includes(searchText))
      .map(user => ({ value: user.name, label: `${user.name}` }))
  }
  return allAnchors
  .filter(user => user.name.toLowerCase().includes(searchText.toLowerCase()) || user.id.includes(searchText))
  .map(user => ({ value: user.name, label: `${user.name}` }))
}

// 添加
async function onAddUser() {
  const formValue = ref({
    avatar_url: '',
  })

  const fApi = ref(null)
  const userRule = useAnchor_UserRule('用户', searchUsers, fApi)
  const formModalProps = reactive({
    request: data => anchorAddOrEditReq(null, data),
    getData(data) {
      const { avatar_url, ...rest } = data
      return {
        ...rest,
        avatar_url: getPathFromUrlArray(avatar_url),
      }
    },
    rule: userRule,
  })

  createDialog({
    title: '添加用户',
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


// 添加主播，不可编辑
async function onAddAnchor() {
  const formValue = ref({
    avatar_url: '',
  })

  const fApi = ref(null)
  const anchorRule = useAnchor_UserRule('主播', searchUsers, fApi)
  const formModalProps = reactive({
    request: data => anchorAddOrEditReq(null, data),
    getData(data) {
      const { avatar_url, ...rest } = data
      return {
        ...rest,
        avatar_url: getPathFromUrlArray(avatar_url),
      }
    },
    rule: anchorRule,
  })

  createDialog({
    title: '添加主播',
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

const onRelease = (record) => {

  const formValue = ref({
    avatar_url: '',
  })

  const fApi = ref(null)
  // const anchorRule = useAnchor_UserRule('主播', fApi)
  const formModalProps = reactive({
  //   request: data => anchorAddOrEditReq(null, data),
  //   getData(data) {
  //     const { avatar_url, ...rest } = data
  //     return {
  //       ...rest,
  //       avatar_url: getPathFromUrlArray(avatar_url),
  //     }
  //   },
  //   rule: anchorRule,
  })

  createDialog({
    title: '解除状态',
    width: 500,
    component:
      <ModalForm
        v-model={formValue.value}
        {...formModalProps}
      >
        <a-form-item>
          <span style="font-size: 14px; display: block; margin: 10px auto; text-align: center;">
            是否解除当前禁言？
          </span>
        </a-form-item>
      </ModalForm>,
    onConfirm() {
      pagination.page = 1
      pagination.total = 0
      props.resetSearch()
    },
  })
}

const unban_img_cnt = ref(0)

// 添加主播，不可编辑
async function onApplyUnban(record) {
  const formValue = ref({
    avatar_url: '',
  });

  const fApi = ref(null);

  const anchorRule = useUnbanUserRule(record, unban_img_cnt, fApi);
  const formModalProps = reactive({
    request: data => anchorAddOrEditReq(null, data),
    getData(data) {
      const { avatar_url, ...rest } = data;
      return {
        ...rest,
        avatar_url: getPathFromUrlArray(avatar_url),
      };
    },
    rule: anchorRule,
  });

  watch(unban_img_cnt, (newVal) => {
    if (fApi.value) {
      fApi.value.setValue('unban_img_cnt_label', newVal);
      console.log("watch: " + unban_img_cnt.value);
    }
  });

  const renderImgCount = computed(() => `${unban_img_cnt.value}/${ENUM.MAX_UPLOAD_UNBAN}`);

  createDialog({
    title: '解禁' + record.identity,
    width: 500,
    component: (
      <div>
        <ModalForm
          v-model={formValue.value}
          v-model:fApi={fApi.value}
          {...formModalProps}
        />
        {/* Dynamically bind the value */}

      </div>
    ),
    onConfirm() {
      pagination.page = 1;
      pagination.total = 0;
      props.resetSearch();
    },
  });
}

defineExpose({
  onAddAnchor, onAddUser
})
{/* <div field="unban_img_cnt_label" style="margin-left: 115px; margin-top: -30px; color: grey;">
          {unban_img_cnt.value}
        </div> */}
</script>
