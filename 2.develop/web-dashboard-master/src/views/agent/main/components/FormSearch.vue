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
          <section class="flex mb30" style="flex: auto;">
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
                class="ml20"
                type="primary"
                @click="emit('emit_add')"
              >新增代理</AButton>
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
  agent_id: '', // Placeholder for game name
  agent_account: '', // Placeholder for platform ID/room number
  agent_level: '', // Placeholder for platform ID/room number
  open_time: '',
  user_acct_status: ENUM.yes_no[1], // Placeholder for identity selection
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
    field: 'agentId',
    title: '代理ID',
    value: '',
    props: {
      placeholder: '请输入代理ID',
    },
  },
  {
    type: 'input',
    field: 'agentAccount',
    title: '代理帐号',
    value: '',
    props: {
      placeholder: '请输入代理帐号',
    },
  },
  {
    type: 'input',
    field: 'agentLevel',
    title: '代理级别',
    value: '',
    props: {
      placeholder: '请输入代理级别',
    },
  },
  {
    type: 'rangePicker',
    field: 'registrationTime',
    title: '开通时间',
    value: '',
    props: {
      format: 'YYYY-MM-DD',
      valueFormat: 'X',
    },
  },
  {
    type: 'select',
    field: 'yes_no',
    title: '是否结算',
    value: 1,
    props: {
      placeholder: '全部',
    },
    options: Object.keys(ENUM.yes_no).map(key => ({ label: ENUM.yes_no[key], value: parseInt(key) })),
    wrap: {
      labelCol: { span: 10 },
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
