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
  </a-card>
</template>

<script setup>
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
    field: 'role_name',
    title: '角色名称',
    value: '',
    props: {
      placeholder: '请输入角色名称',
    },
  },
  {
    type: 'input',
    field: 'role_id',
    title: '角色标识',
    value: '',
    props: {
      placeholder: '请输入角色标识',
    },
  },
  {
    type: 'select',
    field: 'data_permission',
    title: '数据权限',
    value: 1,
    options: Object.keys(ENUM.data_permission).map(key => ({ value: parseInt(key), label: ENUM.data_permission[key] })),
    wrap: {
      labelCol: { span: 9 },
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
