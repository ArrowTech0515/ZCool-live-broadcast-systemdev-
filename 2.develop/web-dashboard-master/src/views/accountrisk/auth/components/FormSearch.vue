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
import QueryButtonGroup from '@/components/Form/SearchForm/QueryButtonGroup.vue';

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
        labelCol: { span: 8 },
      },
    },
  },
}

const rule = ref([
  {
    type: 'input',
    field: 'real_name',
    title: '真实姓名',
    value: '',
    props: {
      placeholder: '请输入真实姓名',
    },
  },
  {
    type: 'input',
    field: 'phone_number',
    title: '手机号',
    value: '',
    props: {
      placeholder: '请输入手机号',
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
