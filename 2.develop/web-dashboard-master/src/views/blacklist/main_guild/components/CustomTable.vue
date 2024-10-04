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
import { getAnchorListReq, anchorAddOrEditReq, setAnchorBlackReq } from '@/api/anchor'
import { message } from 'ant-design-vue'
import useReleaseFeedbackRule from '../hooks/useReleaseFeedbackRule'

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
    anchor_nickname: '打扫打扫打扫',
    room_number: '32423',
    blacklistType: '设备拉黑',
    blacklistEffect: '拉黑7天',
    reason: '发广告',
    operate_time: '2022-03-03 12:22:21',
    blacklistPlatform: '平台',
    operate_account: '管理员·张三',
    status: '已拉黑',
    action: '申请解禁',
  },
  {
    anchor_nickname: '打扫打扫打扫',
    room_number: '32423',
    blacklistType: '设备拉黑',
    blacklistEffect: '永久拉黑',
    reason: '发广告',
    operate_time: '2022-03-03 12:22:21',
    blacklistPlatform: 'XXX商户',
    operate_account: '管理员·张三',
    status: '解禁中',
    action: '申请解禁',
  },
  {
    anchor_nickname: '打扫打扫打扫',
    room_number: '32423',
    blacklistType: '设备拉黑',
    blacklistEffect: '拉黑7天',
    reason: '发广告',
    operate_time: '2022-03-03 12:22:21',
    blacklistPlatform: '工会',
    operate_account: '管理员·张三',
    status: '已拉黑',
    action: '解禁',
  },
  {
    anchor_nickname: '打扫打扫打扫',
    room_number: '32423',
    blacklistType: 'IP拉黑',
    blacklistEffect: '永久拉黑',
    reason: '发广告',
    operate_time: '2022-03-03 12:22:21',
    blacklistPlatform: 'XXX商户',
    operate_account: '管理员·张三',
    status: '已拒绝',
    action: '申请解禁',
  },
  {
    anchor_nickname: '打扫打扫打扫',
    room_number: '32423',
    blacklistType: '设备拉黑',
    blacklistEffect: '拉黑23天',
    reason: '发广告',
    operate_time: '2022-03-03 12:22:21',
    blacklistPlatform: '平台',
    operate_account: '管理员·张三',
    status: '已拉黑',
    action: '申请解禁',
  },
  {
    anchor_nickname: '打扫打扫打扫',
    room_number: '32423',
    blacklistType: '设备拉黑',
    blacklistEffect: '永久拉黑',
    reason: '发广告',
    operate_time: '2022-03-03 12:22:21',
    blacklistPlatform: 'XXX商户',
    operate_account: '管理员·张三',
    status: '解禁中',
    action: '申请解禁',
  },

]);

const columns = [
  {
    title: '主播昵称',
    dataIndex: 'anchor_nickname',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.anchor_nickname}</div>,
  },
  {
    title: '房间号',
    dataIndex: 'room_number',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.room_number}</div>,
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
    title: '理由',
    dataIndex: 'reason',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.reason}</div>,
  },
  {
    title: '操作时间',
    dataIndex: 'operate_time',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.operate_time}</div>,
  },
  {
    title: '操作平台',
    dataIndex: 'blacklistPlatform',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.blacklistPlatform}</div>,
  },
  {
    title: '操作账号',
    dataIndex: 'operate_account',
    align: 'center',
    customRender: ({ record }) => <div style={centeredStyle}>{record.operate_account}</div>,
  },
  {
    title: '状态',
    dataIndex: 'status',
    align: 'center',
    customRender: ({ record }) => (
      <div style={centeredStyle}>
        <span v-if="record.status === '已拒绝'"
              style="text-decoration: underline; color: #1890ff; cursor: pointer;" 
              onClick={() => releaseFeedback(record)}>
              已拒绝</span>
        <span v-else>{record.status}</span>
      </div>
    ),
  },
  {
    title: '操作',
    dataIndex: 'action',
    align: 'center',
    customRender: ({ record }) => (
      <div style={centeredStyle}>
        <span v-if="record.status === '解禁中'"
              style="text-decoration: underline; color: lightgrey; margin-right: 12px; cursor: pointer;" 
              >
              申请解禁</span>
        <span v-else-if="record.action === '解禁'"
              style="text-decoration: underline; color: #1890ff; margin-right: 12px; cursor: pointer;" 
              onClick={() => onRelease(record)}>
              解禁</span>
        <span v-else
              style="text-decoration: underline; color: #e76f00; margin-right: 12px; cursor: pointer;" 
              onClick={() => applyForBan(record)}>
              申请解禁</span>
      </div>
    ),
  },
]

// 添加主播，不可编辑
function applyForBan(record) {
  const formValue = ref({
    avatar_url: '',
  })

  const fApi = ref(null)
  const anchorRule = useReleaseFeedbackRule('主播', fApi)
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
    title: '申请解禁',
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

const releaseFeedback = (record) => {

  createDialog({
    title: '解禁反馈',
    width: 500,
    footer: '',
    component:
      <div>
        <a-form-item label="解禁状态">
          <span style="font-size: 14px; display: block; ">
            {record.status}
          </span>
        </a-form-item>
        <a-form-item label="拒绝理由">
          <a-textarea 
            value="XXX理由XXX理由XXX理由XXX理由XXX理由XXX理由XXX理由XXX理由XXX理由" 
            rows="4" 
            disabled />
        </a-form-item>
      </div>
     ,
    onConfirm() {
      pagination.page = 1
      pagination.total = 0
      props.resetSearch()
    },
  })
}

const onRelease = (record) => {

  createDialog({
    title: '解除拉黑',
    width: 400,
    component:
      <div>
        <a-form-item>
          <span style="font-size: 14px; display: block; margin: 10px auto; text-align: center;">
            是否解除当前主播账号拉黑？
          </span>
          <span style="font-size: 11px; display: block; margin: 10px auto; text-align: center;">
            解除后主播可正常登录账号
          </span>
        </a-form-item>
      </div>,
    onConfirm() {
      pagination.page = 1
      pagination.total = 0
      props.resetSearch()
    },
  })
}

defineExpose({

})

</script>
