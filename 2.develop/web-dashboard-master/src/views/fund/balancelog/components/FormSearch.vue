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
          <section class="flex mb24" style="flex: auto;">
            <AButton
              style="margin-left: auto;"
              @click="submitForm"
              type="primary"
            ><SearchOutlined/>查询</AButton>
            <AButton
              class="ml20"
              @click="resetForm"
            ><ReloadOutlined/>重置</AButton>
          </section>
        </template>
      </form-create>
    </div>
  </a-card>
</template>

<script setup>

const params = defineModel()
const data = reactive({
  number_id: '', // This will trigger the placeholder in the select field
  game_id: '', // Same here for bank_name select field
  game_name: '', // Same here for bank_card_number select field
  game_platform: null, // Input fields can use empty string to show placeholder
  time: '', // This will trigger the placeholder in the select field
  category: null, // Input fields can use empty string to show placeholder
  specific_type: null, // This will trigger the placeholder in the select field
})

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
    field: 'game_id',
    title: '游戏ID',
    value: '',
    props: {
      placeholder: '请输入游戏ID', // Add placeholder
    },
  },
  {
    type: 'input',
    field: 'game_name',
    title: '游戏名称',
    value: '',
    props: {
      placeholder: '请输入游戏名称', // Add placeholder请选择状态
    },
  },
  {
    type: 'select',
    field: 'game_platform',
    title: '游戏平台',
    props: {
      placeholder: '请选择游戏平台', // Add placeholder请选择状态
    },
    //options: Object.keys(ENUM.recharge_type).map(key => ({ label: ENUM.recharge_type[key], value: parseInt(key) })),
  },
  {
    type: 'rangePicker',
    field: 'time',
    title: '註冊時間',
    value: '',
    className: 'form-time-picker',
    props: {
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'X',
    },
  },
  {
    type: 'select',
    field: 'category',
    title: '充值類型',
    props: {
      placeholder: '请选择充值類型', // Add placeholder请选择状态
    },
    //options: Object.keys(ENUM.recharge_type).map(key => ({ label: ENUM.recharge_type[key], value: parseInt(key) })),
  },
  {
    type: 'select',
    field: 'specific_type',
    title: '充值類型',
    props: {
      placeholder: '请选择充值類型', // Add placeholder请选择状态
    },
    //options: Object.keys(ENUM.recharge_type).map(key => ({ label: ENUM.recharge_type[key], value: parseInt(key) })),
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