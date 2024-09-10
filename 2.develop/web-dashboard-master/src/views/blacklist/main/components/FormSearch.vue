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
                type="primary"
                @click="emit('emit_adduser')"
              >添加用户</AButton>
              <AButton
                type="primary"
                @click="emit('emit_addanchor')"
              >添加主播</AButton>
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
  merchant_type: '所有商户', // Select all merchants
  application_type: '所有应用', // Select all apps
  merchant_name: '', // Placeholder for game name
  application_id: '', // Placeholder for platform ID/room number
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
    type: 'select',
    field: 'merchant_type',
    title: '商户',
    value: '所有商户',
    props: {
      placeholder: '请选择商户',
    },
  },
  {
    type: 'select',
    field: 'application_type',
    title: '应用',
    value: '所有应用',
    props: {
      placeholder: '请选择应用',
    },
  },
  {
    type: 'input',
    field: 'merchant_name',
    title: '商户名称/昵称',
    value: '',
    props: {
      placeholder: '请选择所商户名称/昵称',
    },
    wrap: {
      labelCol: { span: 10 },
    },
  },
  {
    type: 'input',
    field: 'application_id',
    title: '应用ID/房间号',
    value: '',
    props: {
      placeholder: '请选择应用ID/房间号',
    },
    wrap: {
      labelCol: { span: 10 },
    },
  },
  {
    type: 'select',
    field: 'all_identities',
    title: '身份',
    value: 1,
    props: {
      placeholder: '请选择身份',
    },
    options: Object.keys(ENUM.user_or_anchor).map(key => ({ label: ENUM.user_or_anchor[key], value: parseInt(key) })),
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
