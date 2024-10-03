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
                    <QueryButtonGroup  
          :reset-form="resetForm" 
          :submit-form="submitForm"
          />
 <div class="flex1 flex_end">   <a-dropdown>
                <a-button type="primary">
                  新增返点 <DownOutlined />
                </a-button>
                <template #overlay>
                  <a-menu >
                    <a-menu-item key="1" @click="emit('emit_add', 2, null)">{{ ENUM.agent_rebate_mode[2] }}</a-menu-item>
                    <a-menu-item key="2" @click="emit('emit_add', 3, null)">{{ ENUM.agent_rebate_mode[3] }}</a-menu-item>
                    <a-menu-item key="3" @click="emit('emit_add', 4, null)">{{ ENUM.agent_rebate_mode[4] }}</a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
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
    field: 'reabteModeID',
    title: '返点模式ID',
    value: '',
    props: {
      placeholder: '请输入返点模式ID',
    },
    wrap: {
      labelCol: { span: 8 },
    },
  },
  {
    type: 'input',
    field: 'modeName',
    title: '模式名称',
    value: '',
    props: {
      placeholder: '请输入模式名称',
    },
  },
  {
    type: 'select',
    field: 'mode',
    title: '模式',
    value: 1,
    props: {
      placeholder: '全部代理',
    },
    options: Object.keys(ENUM.agent_rebate_mode).map(key => ({ label: ENUM.agent_rebate_mode[key], value: parseInt(key) })),
  },
  {
    type: 'rangePicker',
    field: 'creationTime',
    title: '创建时间',
    value: '',
    props: {
      format: 'YYYY-MM-DD',
      valueFormat: 'X',
    },
  },
  {
    type: 'rangePicker',
    field: 'lastModifiedTime',
    title: '最后修改时间',
    value: '',
    props: {
      format: 'YYYY-MM-DD',
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
