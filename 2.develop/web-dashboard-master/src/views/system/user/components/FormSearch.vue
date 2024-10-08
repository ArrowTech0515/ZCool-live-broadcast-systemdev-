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
                class="ml20"
                type="primary"
                @click="emit('emit_add')"
              >添加</AButton>
              <AButton
                class="ml20"
                type="primary"
                @click="emit('emit_export')"
              >导出</AButton>
            </div>
        </template>
      </form-create>
    </div>
  </SearchPanel>
</template>

<script setup>
import SearchPanel from '@/components/Form/SearchForm/SearchPanel.vue';

const params = defineModel()
const data = reactive({
  merch_name: '',
  create_time: [],
})

const emit = defineEmits(['emit_add', 'emit_export', 'search'])
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
    field: 'user_name',
    title: '用户名',
    value: '',
    props: {
      placeholder: '请输入用户名',
    },
  },
  {
    type: 'input',
    field: 'name',
    title: '姓名',
    value: '',
    props: {
      placeholder: '请输入姓名',
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
