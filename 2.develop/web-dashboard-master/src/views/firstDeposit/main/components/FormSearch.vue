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
          <section class="flex mb30" style="flex: auto; margin-left: 0%;">
            <AButton
              class="ml20"
              @click="submitForm"
              type="primary"
            ><SearchOutlined/>查询</AButton>
            <AButton
              class="ml20"
              @click="resetForm"
            ><ReloadOutlined/>重置</AButton>
            <div class="flex1 flex_end">
              <AButton
                type="primary"
                @click="emit('emit_export_list')"
              >導出列表</AButton>
            </div>
          </section>
        </template>
      </form-create>
    </div>
  </a-card>
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

const emit = defineEmits(['emit_export_list'])
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
    field: 'register_time',
    title: '註冊時間',
    value: '',
    className: 'form-time-picker',
    props: {
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'X',
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
    type: 'input',
    field: 'user_account',
    title: '用户账号',
    value: '',
    props: {
      placeholder: '请输入用户账号', // Add placeholder
    },
  },
  {
    type: 'rangePicker',
    field: 'create_time',
    title: '創建時間',
    value: '',
    className: 'form-time-picker',
    props: {
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'X',
    },
  },
  {
    type: 'input',
    field: 'first_deposit_order_number',
    title: '首存訂單單號',
    value: '',
    props: {
      placeholder: '请输入首存訂單單號', // Add placeholder
    },
  },
  {
    type: 'select',
    field: 'recharge_type',
    title: '充值類型',
    value: ENUM.recharge_type[1],
    options: Object.keys(ENUM.recharge_type).map(key => ({ label: ENUM.recharge_type[key], value: parseInt(key) })),
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