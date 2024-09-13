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
          <section
            class="flex mb30"  style="flex: auto;"
          >
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
                @click="emit('addItem')"
              >添加商户</AButton>
              <AButton
                type="primary"
                @click="emit('addItem')"
              >添加商户</AButton>
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
        labelCol: { span: 9 },
      },
    },
  },
}

const rule = ref([
  {
    type: 'input',
    field: 'merch_name',
    title: '商户名称',
    value: '',
    props: {
      placeholder: '请输入商户名称',
    },
  },
  {
    type: 'input',
    field: 'merch_name',
    title: '商户名称',
    value: '',
    props: {
      placeholder: '请输入商户名称',
    },
  },
  {
    type: 'input',
    field: 'merch_name',
    title: '商户名称',
    value: '',
    props: {
      placeholder: '请输入商户名称',
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
