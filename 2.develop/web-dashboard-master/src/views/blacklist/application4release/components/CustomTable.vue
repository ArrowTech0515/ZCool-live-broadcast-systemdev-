<template>
  <a-table
    rowKey="id"
    :pagination="false"
    :dataSource="paginatedData"
    :columns="columns"
    :loading="loading"
  />

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
import { message } from 'ant-design-vue'

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

const dataSource = ref([
  {
    id: '1',
    appInfo: '应用名称: 打赏直播\n应用ID: 32423423',
    anchorInfo: '主播昵称: \n房间号: 3435545',
    blacklistInfo: '拉黑类型: 设备拉黑\n拉黑时效: 拉黑7天\n拉黑范围: 本平台\n拉黑原因: 理由理由',
    unbanEvidence: '解禁证据: 这是解禁证据',
    actionInfo: '操作人: 张三\n时间: 2022-12-21 21:21:21',
    unbanRequest: '申请账号: 管理员\n申请时间: 2022-12-21 21:21:21',
    status: '状态：待处理\n理由：',
    operation_info: '',
    action: '处理',
  },
  {
    id: '2',
    appInfo: '应用名称: 打赏直播\n应用ID: 32423423',
    anchorInfo: '主播昵称: \n房间号: 1234567',
    blacklistInfo: '拉黑类型: 全平台\n拉黑时效: 永久拉黑\n拉黑范围: 全平台\n拉黑原因: 违规内容',
    unbanEvidence: '解禁证据: 这是解禁证据',
    actionInfo: '拉黑平台：XXXX商户\n操作人: 李四\n时间: 2022-12-21 22:21:21',
    unbanRequest: '申请账号: 管理员\n申请时间: 2022-12-22 21:21:21',
    status: '状态：已解禁\n理由：我是反馈内容',
    operation_info: '操作账号：管理员\n操作时间：2022-03-03 12:22:21',
    action: '处理',
  },
  {
    id: '3',
    appInfo: '应用名称: 打赏直播\n应用ID: 32423423',
    anchorInfo: '主播昵称: \n房间号: 1234567',
    blacklistInfo: '拉黑类型: 全平台\n拉黑时效: 永久拉黑\n拉黑范围: 全平台\n拉黑原因: 违规内容',
    unbanEvidence: '解禁证据: 这是解禁证据',
    actionInfo: '操作人: 张三\n时间: 2022-12-21 22:21:21',
    unbanRequest: '申请账号: 管理员\n申请时间: 2022-12-22 21:21:21',
    status: '状态：已解禁\n理由：我是反馈内容',
    operation_info: '操作账号：管理员\n操作时间：2022-03-03 12:22:21',
    action: '处理',
  },
]);

const columns = [
  // 1st Column: 应用信息
  {
    title: '应用信息',
    dataIndex: 'appInfo',
    align: 'center',
    customRender: ({ record }) => (
      <div>
        {record.appInfo.split('\n').map((line, index) => (
          <span key={index}>{line}<br /></span>
        ))}
      </div>
    ),
  },
  // 2nd Column: 主播信息
  {
    title: '主播信息',
    dataIndex: 'anchorInfo',
    align: 'center',
    customRender: ({ record }) => (
      <div>
        {record.anchorInfo.split('\n').map((line, index) => (
          <span key={index} style="display: flex; justify-content: space-between;">
            <span>{line}</span>
            <span 
              style="text-decoration: underline; color: #1890ff; margin-right: 12px; cursor: pointer;" 
              onClick={() => copyText(line)}>
              复制</span>
          </span>
        ))}
      </div>
    ),
  },
  // 3rd Column: 黑名单信息
  {
    title: '黑名单信息',
    dataIndex: 'blacklistInfo',
    align: 'center',
    customRender: ({ record }) => (
      <div>
        {record.blacklistInfo.split('\n').map((line, index) => (
          <span key={index} style="display: flex; justify-content: space-between;">
            <span>{line}</span>
            <span v-if="index==3"
              style="text-decoration: underline; color: #1890ff; margin-right: 12px; cursor: pointer;" 
              onClick={() => viewEvidence(line)}>
              查看</span>
          </span>
        ))}
      </div>
    ),
  },
  // 5th Column: 操作信息
  {
    title: '操作信息',
    dataIndex: 'actionInfo',
    align: 'center',
    customRender: ({ record }) => (
      <div>
        {record.actionInfo.split('\n').map((line, index) => (
          <span key={index} style="display: flex; justify-content: space-between;">{line}<br /></span>
        ))}
      </div>
    ),
  },
  // 6th Column: 解禁申请
  {
    title: '解禁申请',
    dataIndex: 'unbanRequest',
    align: 'center',
    customRender: ({ record }) => (
      <div>
        {record.unbanRequest.split('\n').map((line, index) => (
          <span key={index} style="display: flex; justify-content: space-between;">{line}<br /></span>
        ))}
      </div>
    ),
  },
  // 4th Column: 解禁证据
  {
    title: '解禁证据',
    dataIndex: 'unbanEvidence',
    align: 'center',
    customRender: ({ record }) => (
      <div style="display: flex; justify-content: space-between;">
        <span>{record.unbanEvidence}</span>
        <span 
              style="text-decoration: underline; color: #1890ff; margin-right: 12px; cursor: pointer;" 
              onClick={() => viewEvidence(record.unbanEvidence)}>
              查看</span>
      </div>
    ),
  },
  // 7th Column: 状态
  {
    title: '状态',
    dataIndex: 'status',
    align: 'center',
    customRender: ({ record }) => (
      <div>
        {record.status.split('\n').map((line, index) => (
          <span key={index} style="display: flex; justify-content: space-between;">{line}<br /></span>
        ))}
      </div>
    ),
  },
  // 8th Column: 原因
  {
    title: '操作信息',
    dataIndex: 'operation_info',
    align: 'center',
    customRender: ({ record }) => (
      <div>
        {record.operation_info.split('\n').map((line, index) => (
          <span key={index} style="display: flex; justify-content: space-between;">{line}<br /></span>
        ))}
      </div>
    ),
  },
  // 9th Column: 操作
  {
    title: '操作',
    dataIndex: 'action',
    align: 'center',
    customRender: ({ record }) => (
      <div style="text-align: center; ">
        <span 
              style="text-decoration: underline; color: #1890ff; margin-right: 12px; cursor: pointer;" 
              onClick={() => onProcess(record)}>
              处理</span>
      </div>
    ),
  },
]

// Methods for handling copy and view actions
const copyText = (text) => {
  navigator.clipboard.writeText(text).then(() => {
    message.success('复制成功');
  }).catch(() => {
    message.error('复制失败');
  });
}

const viewEvidence = (record) => {
  // Handle viewing the evidence here
  createDialog({
    title: '查看证据',
    width: 500,
    component: `<div>${record.unbanEvidence}</div>`,
    onConfirm() {
      message.success('证据查看完成');
    },
  });
}
</script>
