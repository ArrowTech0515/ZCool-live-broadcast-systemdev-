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
              @click="emit('emit_export_list')"
            >导出列表</AButton>
            <AButton
              type="primary"
              @click="emit('emit_add')"
            >新增优惠</AButton>
          </div>
        </template>
      </form-create>
    </div>
  </SearchPanel>
</template>

<script setup>

const params = defineModel()
const data = reactive({
  banker_name: null, // This will trigger the placeholder in the select field
  bank_name: null, // Same here for bank_name select field
  bank_card_number: null, // Same here for bank_card_number select field
  user_id: '', // Input fields can use empty string to show placeholder
  order_number: '', // Input fields can use empty string to show placeholder
  order_status: null, // This will trigger the placeholder in the select field
})

const emit = defineEmits(['emit_export_list', 'emit_add'])
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
    field: 'number_id',
    title: '编号ID',
    value: '',
    props: {
      placeholder: '请输入编号ID', // Add placeholder
    },
  },
  {
    type: 'input',
    field: 'user_id',
    title: '用户ID',
    value: '',
    props: {
      placeholder: '请输入用户ID', // Add placeholder
    },
  },
  {
    type: 'select',
    field: 'activity_name',
    title: '活动名称',
    props: {
      placeholder: '请选择活动名称', // Add placeholder
    },
    //options: Object.keys(ENUM.recharge_type).map(key => ({ label: ENUM.recharge_type[key], value: parseInt(key) })),
  },
  {
    type: 'rangePicker',
    field: 'application_time',
    title: '申请时间',
    value: '',
    className: 'form-time-picker',
    props: {
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'X',
    },
  },
  {
    type: 'input',
    field: 'user_account',
    title: '用户账号',
    value: '',
    props: {
      placeholder: '请输入用户账号', // Add placeholder
    },
  },
  {
    type: 'input',
    field: 'activity_id',
    title: '活动ID',
    value: '',
    props: {
      placeholder: '请输入活动ID', // Add placeholder
    },
  },
  {
    type: 'select',
    field: 'status',
    title: '状态',
    options: Object.keys(ENUM.discount_status).map(key => ({ label: ENUM.discount_status[key], value: parseInt(key) })),
    props: {
      mode: 'multiple',  // Enable multi-select
      placeholder: '请选择状态',
    },
  },
  {
    type: 'rangePicker',
    field: 'award_time',
    title: '派奖时间',
    value: '',
    className: 'form-time-picker',
    props: {
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'X',
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
  width: 100px; /* Set a fixed width here */
  text-align: center;
}
.flex1 {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.flex_end {
  gap: 10px; /* Adjust gap between buttons if needed */
}
.form-time-picker {
  margin-left: -10px; /* Apply a small negative margin to bring it closer */
}
</style>