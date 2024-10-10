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
  user_id: null, // Input fields can use empty string to show placeholder
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
      // wrap: {
      //   labelCol: { span: 8 },
      // },
    },
  },
}

const rule = ref([
  {
    type: 'select',
    field: 'user_id',
    title: '应用',
    value: '所有应用',
    props: {
      placeholder: '请输入应用', // Add placeholder
    },
    wrap: {
      labelCol: { span: 8 },
    },
  },
  {
    type: 'input',
    field: 'user_nickname',
    title: '用户昵称',
    value: '',
    props: {
      placeholder: '请输入用户昵称', // Add placeholder
    },
    wrap: {
      labelCol: { span: 8 },
    },
  },
  {
    type: 'select',
    field: 'user_id',
    title: '应用ID/用户ID',
    props: {
      placeholder: '请选择应用ID/用户ID', // Add placeholder
    },
    wrap: {
      labelCol: { span: 10 },
    },
    //options: Object.keys(ENUM.recharge_type).map(key => ({ label: ENUM.recharge_type[key], value: parseInt(key) })),
  },
  {
    type: 'select',
    field: 'status',
    title: '状态',
    value: 1,
    props: {
      //mode: 'multiple',  // Enable multi-select
      options: Object.keys(ENUM.ban_status2).map(key => ({ label: ENUM.ban_status2[key], value: parseInt(key) })),
      placeholder: '请选择状态',
    },
    wrap: {
      labelCol: { span: 8 },
    },
  },
  {
    type: 'rangePicker',
    field: 'time',
    title: '时间',
    value: '',
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

</style>