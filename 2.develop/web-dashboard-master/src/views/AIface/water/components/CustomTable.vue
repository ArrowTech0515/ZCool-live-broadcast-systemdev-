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

  <a-modal
    v-model:open="isModalVisible1"
    :title="null"
    @cancel="handleCancel"
    :footer="null"
  >
    <div style="margin-top: 30px;">
      <div v-for="income in currentRecord.face_income" :key="income.type">
        <div style="border: 1px solid #d9d9d9; padding: 8px; margin-bottom: 8px; border-radius: 4px;">
          <div>{{ income.type }} : {{ income.content }}钻石</div>
        </div>
        
      </div>
    </div>
  </a-modal>

</template>

<script setup lang="jsx">
import { getMerchantListReq, merchantAddOrEditReq, setMerchantStatusReq } from '@/api/merchant'
import useExportCSVRule from '../hooks/useExportCSVRule';

const props = defineProps({
  searchParams: {
    type: Object,
    default: () => ({}),
  },
  resetSearch: {
    type: Function,
    default: () => { },
  },
})

const pagination = reactive({
  page: 1,
  limit: 5,
  total: 100,
})

const { loading, refresh } = useRequest(() => getMerchantListReq({
    ...props.searchParams,
    page: pagination.page,
    limit: pagination.limit,
  }), {
    refreshDeps: true,
    onSuccess(data) {
      dataSource.value = data.items
      pagination.total = data.total_data
    },
})

const { createDialog } = useDialog()
const isModalVisible1 = ref(0); // 0:hide, 1:device, 2:IP
const currentRecord = ref(null); // 0:hide, 1:device, 2:IP

const dataSource = ref([
  {
    id: 1,
    merchant: '商户1',
    guild: '工会1',
    anchor_nickname: '张三',
    room_number: 231312,
    use_face: '张三人脸',
    payment_price: 423423,
    gift_user: '张三',
    user_id: 231312,
    face_income: [
      { type: '平台分成', content: '32432423' },
      { type: '商户分成', content: '324242423' },
      { type: '工会分成', content: '43243243242' },
      { type: '主播分成', content: '324324' },
    ],//'全部商户',
    purchase_time: '2012-12-12  12:21:21',
    status: 2,//'使用中',
  },
  {
    id: 2,
    merchant: '商户2',
    guild: '工会2',
    anchor_nickname: '李白',
    room_number: 32131,
    use_face: '李白人脸',
    payment_price: 43242,
    gift_user: '李白',
    user_id: 32131,
    face_income: [
    ],//'全部商户',
    purchase_time: '2012-12-12  12:21:21',
    status: 3,//'使用中',
  },
  {
    id: 3,
    merchant: '商户1',
    guild: '',
    anchor_nickname: '王维',
    room_number: 231312,
    use_face: '张三人脸',
    payment_price: 43244,
    gift_user: '王维',
    user_id: 231312,
    face_income: [
      { type: '平台分成', content: '2344' },
      { type: '商户分成', content: '3424' },
      { type: '工会分成', content: '2344' },
    ],//'全部商户',
    purchase_time: '2012-12-12  12:21:21',
    status: 2,//'使用中',
  },
]);

const columns = [
  {
    title: '所属商户',
    dataIndex: 'merchant',
    align: 'center',
  },
  {
    title: '所属工会',
    dataIndex: 'guild',
    align: 'center',
  },
  {
    title: '主播名称',
    dataIndex: 'anchor_nickname',
    align: 'center',
  },
  {
    title: '房间号',
    dataIndex: 'room_number',
    align: 'center',
  },
  {
    title: '使用人脸',
    dataIndex: 'use_face',
    align: 'center',
  },
  {
    title: '付款价格',
    dataIndex: 'payment_price',
    align: 'center',
  },
  {
    title: '赠送用户',
    dataIndex: 'gift_user',
    align: 'center',
  },
  {
    title: '用户ID',
    dataIndex: 'user_id',
    align: 'center',
  },
  {
    title: '人脸收益',
    dataIndex: 'face_income',
    align: 'center',
    customRender: ({ record }) =>
      <div onClick={() => handleOperation(record)}>
        <div>
          <span v-for={(w, index) in record.face_income} key={w.type} style="text-decoration: underline; color: #1890ff; text-align: center; cursor: pointer;">
            { w.content }
            { index < record.face_income.length - 1 ? ' | ' : '' }
          </span>
        </div>
      </div>
  },
  {
    title: '购买时间',
    dataIndex: 'purchase_time',
    align: 'center',
  },
  {
    title: '状态',
    dataIndex: 'status',
    align: 'center',
    fixed: 'right',
    width: '100px',
    customRender: ({ record }) =>
    <div>
        <a-tag color="green" v-if={record.status === 2}>{ENUM.face_water_status[2]}</a-tag>
        <a-tag color="red" v-else>{ENUM.face_water_status[3]}</a-tag>
    </div>
  },
];

const handleOperation = (record) => {
    isModalVisible1.value = 1
    currentRecord.value = record
};

async function exportCSV() {
  const formValue = ref({
    agent_mode: null,
    agent_id: null,
  })

  const fApi = ref(null)
  const exportCSVRule = useExportCSVRule(fApi)

  console.log("导出CSV : fApi = " + fApi.value)
  
  const formModalProps = reactive({
    request: data => anchorAddOrEditReq(null, data),
    getData(data) {
      const { avatar_url, ...rest } = data
      return {
        ...rest,
        avatar_url: getPathFromUrlArray(avatar_url),
      }
    },
    rule: exportCSVRule,
  })

  // console.log("user_id: " + formValue.user_id)

  createDialog({
    title: '导出CSV',
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

defineExpose({
  exportCSV
})
</script>
