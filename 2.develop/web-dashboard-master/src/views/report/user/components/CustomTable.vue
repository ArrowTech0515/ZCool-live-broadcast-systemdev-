<template>
  <div>
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
  </div>
</template>

<script setup lang="jsx">

import { message } from 'ant-design-vue'
import useWarnRule from '../hooks/useWarnRule'
import useMaliciousRule from '../hooks/useMaliciousRule'
import useCheckRule from '../hooks/useCheckRule'
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
  pagination.page = 1
}

const dataSource = ref([
  {
    id: '1',
    merchantInfo: '张三商户\n应用名称: 打赏直播\nAPPID: 324424243',
    reportedUser: '用户昵称: 张三\nID: 3435545',
    accusedUser: '用户昵称: 李四\nID: 3435545',
    reportChannel: '弹幕举报',
    evidence: '证据类型: 广告推广\n证据内容: 聊天弹幕内容\n举报时间: 2022-12-12 12:22:21',
    status: 2,//'待处理',
    processingResult: '处理时间: \n处理人: ',
    actions: true,
  },
  {
    id: '2',
    merchantInfo: '张三商户\n应用名称: 打赏直播\nAPPID: 324424243',
    reportedUser: '用户昵称: 张三\nID: 3435545',
    accusedUser: '用户昵称: 王五\nID: 123456',
    reportChannel: '主页举报',
    evidence: '证据类型: 政治敏感\n证据内容: 图片证据\n举报时间: 2022-12-12 12:22:21',
    status: 3,//'已处理',
    processingResult: '处理时间: 2022-12-12 12:22:21\n处理人: 管理员张三',
    actions: false,
  },
]);

const leftStyle = { textAlign: 'left' }
const topleftStyle = { verticalAlign: 'top', textAlign: 'left' }

const columns = [
  // 1st Column: 商户信息 (Merchant Info)
  {
    title: '商户信息',
    dataIndex: 'merchantInfo',
    align: 'center',  // Left alignment for this column
    customRender: ({ record }) => (
      <div  style={leftStyle}>
        {record.merchantInfo.split('\n').map((line, index) => (
          <span key={index}>{line}<br /></span>
        ))}
      </div>
    ),
  },
  // 2nd Column: 举报用户信息 (Reported User Info)
  {
    title: '举报用户信息',
    dataIndex: 'reportedUser',
    align: 'center',
    customRender: ({ record }) => (
      <div>
        {record.reportedUser.split('\n').map((line, index) => (
          <span key={index} style="display: flex; justify-content: space-between;">
            <span>{line}</span>
              <span
                style="text-decoration: underline; color: #1890ff; margin-left: 12px; cursor: pointer;"
                onClick={() => copyText(line)}
              >
                复制
              </span>
          </span>
        ))}
      </div>
    ),
  },
  // 3rd Column: 被举报用户信息 (Accused User Info)
  {
    title: '被举报用户信息',
    dataIndex: 'accusedUser',
    align: 'center',
    customRender: ({ record }) => (
      <div>
        {record.accusedUser.split('\n').map((line, index) => (
          <span key={index} style="display: flex; justify-content: space-between;">
            <span>{line}</span>
              <span
                style="text-decoration: underline; color: #1890ff; margin-left: 12px; cursor: pointer;"
                onClick={() => copyText(line)}
              >
                复制
              </span>
          </span>
        ))}
      </div>
    ),
  },
  // 4th Column: 举报渠道 (Report Channel)
  {
    title: '举报渠道',
    dataIndex: 'reportChannel',
    align: 'center',
  },
  // 5th Column: 证据内容 (Evidence Content)
  {
    title: '证据内容',
    dataIndex: 'evidence',
    align: 'center',
    customRender: ({ record }) => (
      <div>
        {record.evidence.split('\n').map((line, index) => (
          <span key={index} style="display: flex; justify-content: space-between;">
            <span>{line}</span>
            {index === 1 ? (
              <span
                style="text-decoration: underline; color: #1890ff; margin-left: 12px; cursor: pointer;"
                onClick={() => viewEvidence(line)}
              >
                查看
              </span>
            ) : null}
          </span>
        ))}
      </div>
    ),
  },
  // 6th Column: 状态 (Status Only)
  {
    title: '状态',
    dataIndex: 'status',
    align: 'center',
    customRender: ({ record }) => (
      <div style="display: flex; justify-content: space-between; align-items: justify;">
        <a-tag v-if="record.status === 2" color="green" style="vertical-align: top;">{ENUM.report_status[record.status]}</a-tag>
        <a-tag v-else-if="record.status === 3" color="red" style="vertical-align: top;">{ENUM.report_status[record.status]}</a-tag>
        <a-tag v-else color="lightgrey" style="vertical-align: top;">{ENUM.report_status[record.status]}</a-tag>
        <span v-if="record.status === 3"
          style="color: #1890ff; cursor: pointer; margin-left: 12px; vertical-align: top;" 
          onClick={() => viewProcessingResult(record)}
        >
          处理结果
        </span>
      </div>
    ),
  }
  ,
  // 7th Column: 处理结果 (Processing Result)
  {
    title: '处理结果',
    dataIndex: 'processingResult',
    align: 'center',
    customRender: ({ record }) => (
      <div style={leftStyle}>
        {record.processingResult.split('\n').map((line, index) => (
          <span key={index}>{line}<br /></span>
        ))}
      </div>
    ),
  },
  // 8th Column: 操作 (Actions)
  {
    title: '操作',
    dataIndex: 'actions',
    align: 'center',
    fixed: 'right',
    width: '150px',
    customRender: ({ record }) => (
      <div>
        <div v-if="record.status === 3"
            style="text-align: center;">
          <span style="color: lightgrey; margin-right: 12px; cursor: pointer;"
                >警告</span>
          <span 
            style="color: lightgrey; margin-right: 12px; cursor: pointer;" 
          >无违规处理</span>
          <span style="color: lightgrey; margin-right: 12px; cursor: pointer;"
                >为恶意举报</span>
        </div>
        <div v-else
            style="text-align: center;">
          <span style="color: #1890ff; margin-right: 12px; cursor: pointer;"
                onClick={() => onWarn(record)}>警告</span>
          <a-popconfirm
            title="无违规处理"
            cancelButtonProps={{ style: { display: 'none' } }}
            onConfirm={() => onNoViolation(record)} 
            overlayStyle={{ width: '150px' }}
          >
            <span 
              style="color: #1890ff; margin-right: 12px; cursor: pointer;" 
            >无违规处理</span>
          </a-popconfirm>
          <span style="color: #1890ff; margin-right: 12px; cursor: pointer;"
                onClick={() => onMaliciousFeedback(record)}>为恶意举报</span>
        </div>
      </div>
    ),
  },
];

// Copy text method
const copyText = (text) => {
  navigator.clipboard.writeText(text).then(() => {
    message.success({
      content: '已成功复制到剪贴板。',
      duration: 1,
    });
  }).catch(() => {
    message.error({
      content: '复制到剪贴板失败，请重试。',
      duration: 1,
    });
  });
};

// View evidence method

const viewEvidence = (record) => {
  // Handle viewing the evidence here
  const formValue = ref({
    avatar_url: '',
  })

  const fApi = ref(null)
  const checkRule = useCheckRule(record, fApi)
  const formModalProps = reactive({
    request: data => anchorAddOrEditReq(null, data),
    getData(data) {
      const { avatar_url, ...rest } = data
      return {
        ...rest,
        avatar_url: getPathFromUrlArray(avatar_url),
      }
    },
    rule: checkRule,
  })

  createDialog({
    title: '查看',
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


const onMaliciousFeedback = (record) => {
  const formValue = ref({
    avatar_url: '',
  })

  const fApi = ref(null)
  const maliciousRule = useMaliciousRule(record, fApi)
  const formModalProps = reactive({
    request: data => anchorAddOrEditReq(null, data),
    getData(data) {
      const { avatar_url, ...rest } = data
      return {
        ...rest,
        avatar_url: getPathFromUrlArray(avatar_url),
      }
    },
    rule: maliciousRule,
  })

  createDialog({
    title: '恶意举报反馈',
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


const onNoViolation = (record) => {

}
const onWarn = (record) => {
  const formValue = ref({
    avatar_url: '',
  })

  const fApi = ref(null)
  const warnRule = useWarnRule(record, fApi)
  const formModalProps = reactive({
    request: data => anchorAddOrEditReq(null, data),
    getData(data) {
      const { avatar_url, ...rest } = data
      return {
        ...rest,
        avatar_url: getPathFromUrlArray(avatar_url),
      }
    },
    rule: warnRule,
  })

  createDialog({
    title: '警告',
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

</script>

<style scoped>

.scroll-container {
  overflow-x: auto; /* Enable horizontal scrolling */
}

.same-width-button {
  width: 100px;
  text-align: center;
}
.flex1 {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.flex_end {
  gap: 10px;
}
</style>
