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
              class="ml20"
              type="primary"
              @click="emit('emit_handleReportType')"
            >设置举报类型</AButton>
          </div>
        </template>
      </form-create>
    </div>
  </SearchPanel>
</template>

<script setup>

const params = defineModel()
const data = reactive({
  banker_name: 1,
  bank_name: 1,
  bank_card_number: '',
  user_id: '',
  order_number: 1,
  order_status: 1,
})

const emit = defineEmits(['emit_handleReportType'])
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
    type: 'select',
    field: 'banker_name',
    title: '全部商户',
    props: {
      placeholder: '请选择商户',
    },
    value: 1,
    options: Object.keys(ENUM.merchant_type).map(key => ({ label: ENUM.merchant_type[key], value: parseInt(key) })),
  },
  {
    type: 'select',
    field: 'bank_name',
    title: '全部应用',
    props: {
      placeholder: '请选择应用',
    },
    value: 1,
    options: Object.keys(ENUM.application_type).map(key => ({ label: ENUM.application_type[key], value: parseInt(key) })),
  },
  {
    type: 'input',
    field: 'user_nickname',
    title: '昵称搜索',
    props: {
      placeholder: '请输入用户昵称',
    },
  },
  {
    type: 'input',
    field: 'user_id',
    title: 'ID搜索',
    props: {
      placeholder: '请输入ID',
    },
  },
  {
    type: 'select',
    field: 'order_status',
    title: '全部状态',
    props: {
      placeholder: '请选择状态',
    },
    value: 1,
    options: Object.keys(ENUM.report_status).map(key => ({ label: ENUM.report_status[key], value: parseInt(key) })),
  },
  {
    type: 'select',
    field: 'report_type',
    title: '全部举报类型',
    props: {
      placeholder: '请选择举报类型',
    },
    wrap: {
      labelCol: { span: 10 }, // Setting labelCol to span 10 for "全部举报类型"
      style: { width: '250px' },
    },
    value: 1,
    options: Object.keys(ENUM.report_type).map(key => ({ label: ENUM.report_type[key], value: parseInt(key) })),
  },
  {
    type: 'rangePicker',
    field: 'time',
    title: '时间',
    props: {
      placeholder: ['开始时间', '结束时间'],
      format: 'YYYY-MM-DD',
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
    join_time: data.join_time ? data.join_time?.join(',') : undefined,
  }
}

defineExpose({
  resetForm,
})
</script>

<style scoped>
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
.reset-btn {
  
  border: 1px solid #d9d9d9;
}
</style>
