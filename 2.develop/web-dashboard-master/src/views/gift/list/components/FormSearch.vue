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
              type="primary"
              @click="emit('addItem')"
            >添加礼物</AButton>
          </div>
        </template>
      </form-create>
    </div>
  </a-card>
</template>

<script setup>
const params = defineModel()
const data = reactive({
  gift_name: '',
  gift_type: 0,
  gift_status: 0,
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
    field: 'gift_name',
    title: '礼物名称',
    value: '',
  },
  {
    type: 'select',
    field: 'gift_type',
    title: '礼物类型',
    value: '',
    options: Object.keys(ENUM.gift_type).map(key => ({ value: parseInt(key), label: ENUM.gift_type[key] })),
  },
  {
    type: 'select',
    field: 'gift_status',
    title: '礼物状态',
    value: '',
    options: [
      { value: 0, label: '全部' },
      { value: 1, label: '上架中' },
      { value: 2, label: '已下架' },
    ],
  },
  {
    type: 'rangePicker',
    field: 'create_time',
    title: '创建时间',
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
