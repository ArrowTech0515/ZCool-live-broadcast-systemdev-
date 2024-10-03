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
          <section class="flex mb24" style="flex: auto; margin-left: 0%;">
             <QueryButtonGroup  
            :reset-form="resetForm" 
            :submit-form="submitForm"
          />
           <div class="flex1 flex_end">
             <AButton
                class="same-width-button"
                type="primary"
                @click="emit('emit_add')"
              >新增</AButton>
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
  strategy_id: '', // Input field for Strategy ID
  strategy_name: '', // Input field for Strategy Name
  strategy_status: 1, // Select field for Strategy Status
  created_time: '', // RangePicker for Created Time
})

const emit = defineEmits(['emit_add'])

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
    field: 'strategy_id',
    title: '策略ID',
    value: '',
    props: {
      placeholder: '请输入策略ID', // Add placeholder
    },
  },
  {
    type: 'input',
    field: 'strategy_name',
    title: '策略名称',
    value: '',
    props: {
      placeholder: '请输入策略名称', // Add placeholder
    },
  },
  {
    type: 'select',
    field: 'strategy_status',
    title: '策略状态',
    value: 1,
    options: Object.keys(ENUM.strategy_status).map(key => ({ value: parseInt(key), label: ENUM.strategy_status[key] })),
  },
  {
    type: 'rangePicker',
    field: 'created_time',
    title: '创建时间',
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
