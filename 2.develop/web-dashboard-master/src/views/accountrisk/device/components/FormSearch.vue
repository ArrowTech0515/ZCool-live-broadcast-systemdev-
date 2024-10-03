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
              @click="emit('emit_add_device')"
            >新增设备号</AButton>
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

const emit = defineEmits(['emit_add_device', 'emit_add_IP_segment', 'search'])
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
    field: '_number',
    title: '设备号',
    value: '',
    props: {
      placeholder: '请输入设备号',
    },
  },
  {
    type: 'input',
    field: 'device_type',
    title: '设备类型',
    value: '',
    props: {
      placeholder: '请输入设备类型',
    },
  },
  {
    type: 'input',
    field: 'os',
    title: '操作系统',
    value: '',
    props: {
      placeholder: '请输入操作系统',
    },
  },
  {
    type: 'input',
    field: 'add_person',
    title: '添加人',
    value: '',
    props: {
      placeholder: '请输入添加人账号',
    },
  },
  {
    type: 'input',
    field: 'last_edited_person',
    title: '最后编辑人',
    value: '',
    props: {
      placeholder: '请输入编辑人账号',
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
