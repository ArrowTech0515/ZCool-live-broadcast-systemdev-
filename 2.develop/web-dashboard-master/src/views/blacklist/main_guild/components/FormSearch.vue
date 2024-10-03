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
        </template>
      </form-create>
    </div>
  </a-card>
</template>

<script setup>

const params = defineModel()
const data = reactive({
  merchant_type: '所有商户', // Select all merchants
  application_type: '所有应用', // Select all apps
  merchant_name: '', // Placeholder for game name
  room_number: '', // Placeholder for platform ID/room number
  all_identities: '全部身份', // Placeholder for identity selection
  time: '', // Date picker (start and end time)
})

const emit = defineEmits(['emit_adduser', 'emit_addanchor'])

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
    field: 'room_number',
    title: '房间号',
    value: '',
    props: {
      placeholder: '请输入房间号',
    },
    // wrap: {
    //   labelCol: { span: 10 },
    // },
  },
  {
    type: 'input',
    field: 'merchant_name',
    title: '主播昵称',
    value: '',
    props: {
      placeholder: '请输入主播昵称',
    },
  },
  {
    type: 'rangePicker',
    field: 'time',
    title: '开始时间-结束时间',
    value: '',
    props: {
      format: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    type: 'select',
    field: 'status',
    title: '状态',
    value: 1,
    props: {
      //mode: 'multiple',  // Enable multi-select
      options: Object.keys(ENUM.ban_status).map(key => ({ label: ENUM.ban_status[key], value: parseInt(key) })),
      placeholder: '请选择状态',
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
    join_time: data.time ? data.time.join(',') : undefined,
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
