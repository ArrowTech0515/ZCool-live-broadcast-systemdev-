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
import merchSelectRule from '@/rules/merchSelectRule';

// eslint-disable-next-line vue/require-prop-types
const params = defineModel()
const data = reactive({
  source_id: 0,
  acct: '',
  nickname: '',
  live_status: 0,
  acct_status: 0,
  join_time: [],
})

const emit = defineEmits(['search', 'export_csv'])
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
  merchSelectRule,
  {
    type: 'select',
    field: 'application_type',
    title: '应用',
    value: 1,
    props: {
      placeholder: '请选择应用',
    },
    options: Object.keys(ENUM.application_type).map(key => ({
      value: parseInt(key),
      label: ENUM.application_type[key]
    })),
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
    field: 'user_id',
    title: '用户ID',
    value: '',
    props: {
      placeholder: '请输入用户ID',
    },
  },
  {
    type: 'input',
    field: 'user_nickname',
    title: '用户昵称',
    value: '',
    props: {
      placeholder: '请输入用户昵称',
    },
  },
  {
    type: 'input',
    field: 'anchor_nickname',
    title: '主播昵称',
    value: '',
    props: {
      placeholder: '请输入主播昵称',
    },
  },
  {
    type: 'rangePicker',
    field: 'time_interval',
    title: '时间',
    value: '',
    props: {
      format: 'YYYY-MM-DD',
      valueFormat: 'X',
      placeholder: ['开始日期', '结束日期'], // Add placeholders for the rangePicker
    },
  },
  {
    type: 'select',
    field: 'consumption_type',
    title: '消费类型',
    value: 1,
    props: {
      placeholder: '请选择消费类型',
    },
    options: Object.keys(ENUM.consumption_type).map(key => ({
      value: parseInt(key),
      label: ENUM.consumption_type[key]
    })),
    wrap: {
      labelCol: { span: 10 },
    },
  },
  { 
    type: 'btns',
    wrap: {
        labelCol: { span: 10 },
      },
   },
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
