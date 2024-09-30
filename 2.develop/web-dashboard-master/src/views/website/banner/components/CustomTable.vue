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
import useAddBannerRule from '../hooks/useAddBannerRule';

import imageA from '@/assets/images/logo.png'; // Import images
import imageB from '@/assets/images/login_bg.png'; // Import images
import imageC from '@/assets/images/login_box_bg.png'; // Import images

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
    merchant: 'fun888',
    ID: '1',
    thumbnail: imageA,
    title: '商户A的标题',
    status: true,//'启用',
    display_sort: true,
    start_time: '2023-01-01 12:00:00',
    end_time: '2023-12-31 12:00:00',
    creator: 'Bob',
    create_time: '2023-01-01 12:00:00',
    modifier: 'Alice',
    last_modified_time: '2023-06-01 12:00:00',
  },
  {
    id: 2,
    merchant: 'fun888',
    ID: '2',
    thumbnail: imageB,
    title: '商户B的标题',
    status: false,//'停用',
    display_sort: 3,
    start_time: '2023-02-01 12:00:00',
    end_time: '2023-12-31 12:00:00',
    creator: 'Alice',
    create_time: '2023-02-01 12:00:00',
    modifier: 'Charlie',
    last_modified_time: '2023-06-02 12:00:00',
  },
  {
    id: 3,
    merchant: 'oka9',
    ID: '3',
    thumbnail: imageC,
    title: '商户C的标题',
    status: true,//'启用',
    display_sort: 4,
    start_time: '2023-03-01 12:00:00',
    end_time: '2023-12-31 12:00:00',
    creator: 'Bob',
    create_time: '2023-03-01 12:00:00',
    modifier: 'Alice',
    last_modified_time: '2023-06-03 12:00:00',
  },
]);

const columns = [
  {
    title: '商户',
    dataIndex: 'merchant',
    align: 'center',
  },
  {
    title: 'ID',
    dataIndex: 'ID',
    align: 'center',
  },
  {
    title: '缩图',
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
    title: '标题',
    dataIndex: 'title',
    align: 'center',
  },
  {
    title: '状态',
    dataIndex: 'status',
    align: 'center',
    customRender: ({ record }) =>
    <div>
        <a-tag color="green" v-if={record.status}>{ENUM.website_banner_status[1]}</a-tag>
        <a-tag color="red" v-else>{ENUM.website_banner_status[2]}</a-tag>
    </div>
  },
  {
    title: '展示排序',
    dataIndex: 'display_sort',
    align: 'center',
  },
  {
    title: '开始日期',
    dataIndex: 'start_time',
    align: 'center',
  },
  {
    title: '结束日期',
    dataIndex: 'end_time',
    align: 'center',
  },
  {
    title: '创建⼈',
    dataIndex: 'creator',
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
    align: 'center',
  },
  {
    title: '修改⼈',
    dataIndex: 'modifier',
    align: 'center',
  },
  {
    title: '最后修改时间',
    dataIndex: 'last_modified_time',
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
          style="text-decoration: underline;color: green; align-text:center; cursor: pointer;" 
          onClick={() => onAddBanner(record)}>
          编辑</span>
      </div>
  }
];

async function onDelete(item = {}) {
// loading.value = true
// delMessageReq({
//   message_ids: item.msg_id,
// }).then(() => {
//   loading.value = false
//   pagination.page = 1
//   pagination.total = 0
//   props.resetSearch()
// }).catch(() => {
//   loading.value = false
// })
}


async function onAddBanner(item = {}) {
  const merch_id = item.id || null // 兼容 id 和 merch_id
  const isCreate = !merch_id

  if(isCreate)
  {
    item = {
      merchant: null,
      ID: '1', // fix to generate new ID
      thumbnail: imageA,
      title: '',
      status: true,//'启用',
      display_sort: 1,
      start_time: '',
      end_time: '',
      creator: '',
      create_time: '',
      modifier: '',
      last_modified_time: '',
    }
  }
  const fApi = ref(null)
  const addoreditRule = useAddBannerRule(fApi)
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
    title: isCreate ? '新增' : '编辑',
    width: 500,
    component:
      <ModalForm
        v-model:fApi={fApi.value}
        v-model={item}
        {...formModalProps}
      >
        <a-form-item class="ml65" labelCol={16}>
          <span>ID : {item.ID}</span>
        </a-form-item>
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
  onAddBanner
})
</script>
