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
                @click="emit('addItem')"
              >添加应用</AButton>
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
  merch_name: '',
  create_time: [],
})

const emit = defineEmits(['addItem', 'search'])
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
    field: 'application_name',
    title: '应用名称',
    value: '',
    props: {
      placeholder: '请输入应用名称',
    },
  },
  {
    type: 'input',
    field: 'application_id',
    title: '应用ID',
    value: '',
    props: {
      placeholder: '请输入应用ID',
    },
  },
  merchSelectRule,
  {
    type: 'select',
    field: 'application_status',
    title: '状态',
    value: 1,
    props: {
      placeholder: '请选择状态',
    },
    options: Object.keys(ENUM.application_status).map(key => ({ label: ENUM.application_status[key], value: parseInt(key) })),
  },
  {
    type: 'rangePicker',
    field: 'create_time',
    title: '时间',
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
    create_time: data.create_time ? data.create_time?.join(',') : undefined,
  }
}

defineExpose({
  resetForm,
})
</script>

<style lang="sass scoped">
</style>
