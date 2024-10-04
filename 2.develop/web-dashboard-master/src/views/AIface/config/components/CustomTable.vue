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
import { getMerchantListReq, merchantAddOrEditReq, setMerchantStatusReq } from '@/api/merchant'
import { message } from 'ant-design-vue';

import imageA from '@/assets/images/logo.png'; // Import images
import imageB from '@/assets/images/login_bg.png'; // Import images
import imageC from '@/assets/images/login_box_bg.png'; // Import images
import useAddAIface from '../hooks/useAddAIface';

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

const dataSource = ref([
  {
    id: 1,
    thumbnail: imageA,
    name: '张三',
    filename: imageA,
    price: 423423,
    time_mins: 3,
    authorized_merchants_count: -1,//'全部商户',
    
    status: 3,//'上架中',
    upload_time: '2012-12-12  12:21:21',
    operate_account: '管理员-张三',
  },
  {
    id: 2,
    thumbnail: imageB,
    name: '李白',
    filename: imageB,
    price: 423423,
    time_mins: 3,
    authorized_merchants_count: 14,//'14个商户',
    status: 2,//'上架中',
    upload_time: '2012-12-12  12:21:21',
    operate_account: '管理员-张三',
  },
  {
    id: 3,
    thumbnail: imageC,
    name: '王维',
    filename: imageC,
    price: 423423,
    time_mins: 21,
    authorized_merchants_count: 12,//'全部商户',
    status: 3,//'上架中',
    upload_time: '2012-12-12  12:21:21',
    operate_account: '运营-李四',
  },
]);

const columns = [
  {
    title: '人脸图片',
    dataIndex: 'thumbnail',
    align: 'center',
    customRender: ({ record }) => (
      <img
        src={record.thumbnail}
        alt={record.title} // Optional: alt text for accessibility
        style={{ width: '60px', height: 'auto' }} // Set desired width
      />
    ),
  },
  {
    title: '人脸名称',
    dataIndex: 'name',
    align: 'center',
  },
  {
    title: '人脸文件',
    dataIndex: 'filename',
    align: 'center',
  },
  {
    title: '人脸价格',
    dataIndex: 'price',
    align: 'center',
  },
  {
    title: '人脸时间（分钟）',
    dataIndex: 'time_mins',
    align: 'center',
  },
  {
    title: '授权商户',
    dataIndex: 'authorized_merchants_count',
    align: 'center',
    customRender: ({ record }) =>
      <div>
        <span 
          v-if="record.authorized_merchants_count < 0">
          全部商户</span>
        <span v-else
          style="text-decoration: underline; color: #1890ff; align-text:center; cursor: pointer;" 
          onClick={() => onAddAIface(record)}>
          {record.authorized_merchants_count}个商户</span>
      </div>
  },
  {
    title: '人脸状态',
    dataIndex: 'status',
    align: 'center',
    customRender: ({ record }) =>
    <div>
        <a-tag color="green" v-if={record.status === 2}>{ENUM.sale_status[2]}</a-tag>
        <a-tag color="red" v-else>{ENUM.sale_status[3]}</a-tag>
    </div>
  },
  {
    title: '上传时间',
    dataIndex: 'upload_time',
    align: 'center',
  },
  {
    title: '修改⼈',
    dataIndex: 'operate_account',
    align: 'center',
  },
  {
    title: '操作',
    fixed: 'right',
    dataIndex: 'action',
    align: 'center',
    customRender: ({ record }) =>
      <div>
        <span 
          style="text-decoration: underline; color: green; align-text:center; cursor: pointer; margin-right:12px;" 
          onClick={() => onAddAIface(record)}>
          编辑</span>
        <span 
          v-if="record.status === 2"
          style="text-decoration: underline; color: red; align-text:center; cursor: pointer;" 
          onClick={() => onRemove(record)}>
          下架</span>
        <span v-else
          style="text-decoration: underline; color: #1890ff; align-text:center; cursor: pointer;" 
          onClick={() => onAvailable(record)}>
          上架</span>
      </div>
  }
];

async function onRemove(item = {}) {

  createDialog({
    title: '下架',
    width: 400,
    component:
      <span style="font-size: 14px; font-weight:bold; display: block; margin-bottom: 20px; text-align: center;">
        是否下架当前人脸？
      </span>
    ,
    onConfirm() {
      message.success({
        content: `下架成功`,
        duration: 1,
      })
    },
  })
}

async function onAvailable(item = {}) {

  createDialog({
    title: '上架',
    width: 400,
    component:
      <span style="font-size: 14px; font-weight:bold; display: block; margin-bottom: 20px; text-align: center;">
        是否上架当前人脸？
      </span>
    ,
    onConfirm() {
      message.success({
        content: `上架成功`,
        duration: 1,
      })
    },
  })
}

async function onAddAIface(item = {}) {
  const merch_id = item.id || null // 兼容 id 和 merch_id
  const isCreate = !merch_id

  if(isCreate)
  {
    item = {
      thumbnail: '',
      name: '',
      filename: '',
      price: 0,
      time_mins: 0,
      //authorized_merchants_count: -1,//'全部商户',
      status: 3,//'上架中',
      upload_time: '2012-12-12  12:21:21',
      operate_account: '管理员-张三',
    }
  }
  const fApi = ref(null)
  const addoreditRule = useAddAIface(item, fApi)
  const formModalProps = {
    // request: data => merchantAddOrEditReq(isCreate ? null : merch_id, data),
    // getData(data) {
    //   return {
    //     ...data,
    //     // 如果是修改商户，body 里 merch_id 传 null，merch_id 放到 url path中。反之，创建用户，merch_id 放到 body 中
    //     merch_id: isCreate ? data.merch_id : undefined,
    //   }
    // },
    option: {
      global: {
        '*': {
          wrap: {
            labelCol: { span: 5 },
          },
        },
      },
    },
    rule: addoreditRule,
  }

  createDialog({
    title: isCreate ? '添加AI人脸' : '编辑AI人脸',
    width: 500,
    component:
      <ModalForm
        v-model:fApi={fApi.value}
        v-model={item}
        {...formModalProps}
      >
      </ModalForm>
    ,
    onConfirm() {
      if (isCreate) {
        pagination.page = 1
        pagination.total = 0
        props.resetSearch()
      } else {
        refresh()
      }
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
  onAddAIface
})
</script>
