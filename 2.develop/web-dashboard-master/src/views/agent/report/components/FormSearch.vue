<template>
  <a-card class="mb15">
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
  </a-card>
</template>

<script setup>
const params = defineModel()
const data = reactive({
  agent_account: '',
  agent_mode: 1,
  query_time: [],
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
    type: 'rangePicker',
    field: 'query_time',
    title: '查询区间',
    value: '',
    props: {
      format: 'YYYY-MM-DD',
      valueFormat: 'X',
      placeholder: ['开始日期', '结束日期'], // Placeholder for the rangePicker
    },
  },
  {
    type: 'input',
    field: 'agent_account',
    title: '代理帐号',
    value: '',
    props: {
      placeholder: '请输入代理帐号',
    },
    wrap: {
      // labelCol: { span: 10 },
    },
  },
  {
    type: 'select',
    field: 'agent_mode',
    title: '代理模式',
    value: 1,
    props: {
      placeholder: '请选择代理模式',
    },
    options: Object.keys(ENUM.agent_rebate_mode).map(key => ({
      value: parseInt(key),
      label: ENUM.agent_rebate_mode[key]
    })),
    wrap: {
      // labelCol: { span: 10 },
    },
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
    //query_time: data.query_time ? data.query_time?.join(',') : undefined,
  }
}

defineExpose({
  resetForm,
})
</script>
