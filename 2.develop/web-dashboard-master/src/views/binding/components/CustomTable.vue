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
import { message } from 'ant-design-vue';
import useProcessRule from '../hooks/useProcessRule';
import useCheckRule from '../hooks/useCheckRule.ts';

const { createDialog } = useDialog();

const pagination = reactive({
  page: 1,
  limit: 5,
  total: 100,
});

const paginatedData = computed(() => {
  const start = (pagination.page - 1) * pagination.limit;
  const end = start + pagination.limit;
  return dataSource.value.slice(start, end);
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
    game_id: '1300033853',
    payment_channel: '',
    bank_name: 'GoPay',
    payee: 'GoPay',
    payment_account: '13343513423124',
    open_branch: '--',
    create_time: '2021-10-01 17:24:39',
    remarks: '300',
    acct_status: 2, //解除拉黑
  },
  {
    id: '2',
    game_id: '130003853',
    payment_channel: '',
    bank_name: 'CgPay',
    payee: 'GoPay',
    payment_account: '4351332423423124',
    open_branch: '--',
    create_time: '2021-10-01 17:24:39',
    remarks: '353',
    acct_status: 1, //拉黑
  },
  {
    id: '2',
    game_id: '2095300638',
    payment_channel: '银行',
    bank_name: '工商银行',
    payee: '哈哈哈',
    payment_account: '6222021447552213668',
    open_branch: '本办法',
    create_time: '2021-09-23 23:03:43',
    remarks: '353',
    acct_status: 1, //拉黑
  },
]);

const columns = [
  {
    title: '游戏ID',
    dataIndex: 'game_id',
    align: 'center',
    customRender: ({ record }) => (
      <div>
        <span>{record.game_id}</span>
        <span 
          style="text-decoration:underline; font-size:11px; color: #1890ff; margin-left: 12px; cursor: pointer;" 
          onClick={() => copyText(record.game_id)}>
          复制
        </span>
      </div>
    ),
  },
  {
    title: '支付渠道',
    dataIndex: 'payment_channel',
    align: 'center',
  },
  {
    title: '银行名称',
    dataIndex: 'bank_name',
    align: 'center',
  },
  {
    title: '收款人',
    dataIndex: 'payee',
    align: 'center',
  },
  {
    title: '收款账号/卡号',
    dataIndex: 'payment_account',
    align: 'center',
  },
  {
    title: '开户支行',
    dataIndex: 'open_branch',
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
    align: 'center',
  },
  {
    title: '备注',
    dataIndex: 'remarks',
    align: 'center',
  },
  {
    title: '操作',
    fixed: 'right',
    width: 150,
    dataIndex: 'action',
    align: 'center',
    customRender: ({ record }) =>
      <div>
        <a-button style="color:red;" type="link" size="small" onClick={() => onBlacklist(record)} v-if={record.acct_status === 2}>拉黑</a-button>
        <a-button style="color:red;" type="link" size="small" onClick={() => onUnBlacklist(record)} v-else-if={record.acct_status === 1}>解除拉黑</a-button>
        <a-button style="margin-left:10px;" type="link" size="small" onClick={() => onUnBind(record)}>解除绑定</a-button>
      </div>
  }
];

// Methods for handling copy and view actions
const copyText = (text) => {
  navigator.clipboard.writeText(text).then(() => {
    message.success({
      content: `已成功复制到剪贴板。`,
      duration: 1, // Duration in seconds
    });
  }).catch(() => {
    message.error({
      content: '复制到剪贴板失败，请重试。',
      duration: 1, // Duration in seconds
    });
  });
}

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



const onProcess = (record) => {
  const formValue = ref({
    avatar_url: '',
  })

  const fApi = ref(null)
  const processRule = useProcessRule(record, fApi)
  const formModalProps = reactive({
    request: data => anchorAddOrEditReq(null, data),
    getData(data) {
      const { avatar_url, ...rest } = data
      return {
        ...rest,
        avatar_url: getPathFromUrlArray(avatar_url),
      }
    },
    rule: processRule,
  })

  createDialog({
    title: '处理',
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

</style>
