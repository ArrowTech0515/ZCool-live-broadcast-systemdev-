<template>
  <SearchPanel>
    <div class="__table_form_search_component">
      <form-create
        v-model:api="fApi"
        v-model="data"
        :option
        :rule
      >
        <template #type-btns>
          <QueryButtonGroup  
            :reset-form="resetForm" 
            :submit-form="submitForm"
          />
          <div class="flex1 flex_end mb24">
            <AButton
              type="primary"
              @click="emit('export_csv')"
            >导出CSV</AButton>
          </div>
        </template>
      </form-create>
    </div>
  </SearchPanel>
</template>

<script setup>
const params = defineModel()
const data = reactive({
  source_id: 0,
  acct: '',
  nickname: '',
  live_status: 0,
  acct_status: 0,
  join_time: [],
})

const emit = defineEmits(['export_csv', 'search'])
const fApi = ref({})
const option = {
  resetBtn: false,
  submitBtn: false,
  global: {
    '*': {
      col: {
        show: false,
      },
      wrap: {
        labelCol: { span: 8 },
      },
    },
  },
}

const rule = ref([
  {
    type: 'input',
    field: 'acct',
    title: '商户/用户名称',
    value: '',
    props: {
      placeholder: '请输入名称',
    },
    wrap: {
      labelCol: { span: 10 },
    },
  },
  {
    type: 'input',
    field: 'order_number',
    title: '订单号',
    value: '',
    props: {
      placeholder: '请输入订单号',
    },
  },
  {
    type: 'input',
    field: 'ID',
    title: 'ID搜索',
    value: '',
    props: {
      placeholder: '请输入ID',
    },
  },
  {
    type: 'rangePicker',
    field: 'join_time',
    title: '时间区间',
    value: '',
    props: {
      format: 'YYYY-MM-DD',
      valueFormat: 'X',
      placeholder: ['开始日期', '结束日期'], // Placeholder for the rangePicker
    },
  },
  {
    type: 'select',
    field: 'live_status',
    title: '所有商户',
    value: ENUM.guild_status[0],
    props: {
      placeholder: '请选择商户状态',
    },
    options: Object.keys(ENUM.guild_status).map(key => ({
      value: parseInt(key),
      label: ENUM.guild_status[key]
    })),
    wrap: {
      labelCol: { span: 10 },
    },
  },
  {
    type: 'select',
    field: 'acct_status',
    title: '所有应用',
    value: ENUM.anchor_acct_status[0],
    props: {
      placeholder: '请选择应用状态',
    },
    options: Object.keys(ENUM.anchor_acct_status).map(key => ({
      value: parseInt(key),
      label: ENUM.anchor_acct_status[key]
    })),
  },
  { type: 'btns' },
])

function resetForm() {
  fApi.value.resetFields()
  getData(data)
}

function submitForm() {
  fApi.value.submit(formData => {
    getData(formData)
  })
}

function getData(data) {
  params.value = {
    ...data,
    join_time: data.join_time ? data.join_time?.join(',') : undefined,
  }
}

defineExpose({
  resetForm,
})
</script>
