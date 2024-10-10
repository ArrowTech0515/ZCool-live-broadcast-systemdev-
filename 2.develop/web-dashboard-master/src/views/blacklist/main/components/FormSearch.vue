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
                @click="emit('emit_adduser')"
              >添加用户</AButton>
              <AButton
                type="primary"
                @click="emit('emit_addanchor')"
              >添加主播</AButton>
            </div>
        </template>
      </form-create>
    </div>
  </SearchPanel>
</template>

<script setup>
import merchSelectRule from '@/rules/merchSelectRule';


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
  merchSelectRule,
  {
    type: 'select',
    field: 'application_type',
    title: '应用',
    value: 1,
    props: {
      placeholder: '请选择应用',
    },
    options: Object.keys(ENUM.application_type).map(key => ({
      value: parseInt(key),
      label: ENUM.application_type[key]
    })),
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
