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
  merch_name: '',
  create_time: [],
})

const emit = defineEmits(['emit_add_label', 'search'])
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
        labelCol: { span: 9 },
      },
    },
  },
}

const rule = ref([
  {
    type: 'input',
    field: 'username',
    title: '用户名',
    value: '',
    props: {
      placeholder: '请输入用户名',
    },
  },
  {
    type: 'input',
    field: 'payment_method',
    title: '支付方式',
    value: '',
    props: {
      placeholder: '请输入支付方式',
    },
  },
  {
    type: 'input',
    field: 'last_time',
    title: '上次支付时间',
    value: '',
    props: {
      placeholder: '请输入上次支付时间',
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
