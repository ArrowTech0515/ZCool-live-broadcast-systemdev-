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
          <div class="flex1 flex_start mb24">
            <AButton
              type="primary"
              @click="emit('emit_add')"
            >添加人脸</AButton>
          </div>
        </template>
      </form-create>
    </div>
  </SearchPanel>
</template>

<script setup>

const params = defineModel()
const data = reactive({
  source_id: 0,
  acct: '',
  nickname: '',
  live_status: 0,
  acct_status: 0,
  join_time: [],
})

const emit = defineEmits(['emit_add', 'search'])
const fApi = ref({})
const option = {
  resetBtn: false,
  submitBtn: false,
  global: {
    '*': {
      col: {
        show: false,
      },
      // wrap: {
      //   labelCol: { span: 8 },
      // },
    },
  },
}

const rule = ref([
  {
    type: 'input',
    field: 'name',
    title: '人脸名称',
    props: {
      placeholder: '请输入人脸名称',
    },
    wrap: {
      labelCol: { span: 8 },
    },
  },
  {
    type: 'select',
    field: 'status',
    title: '状态',
    value: 1,
    options: Object.keys(ENUM.sale_status).map(key => ({ value: parseInt(key), label: ENUM.sale_status[key] })),
    wrap: {
      labelCol: { span: 8 },
    },
  },
  {
    type: 'rangePicker',
    field: 'start_end_time',
    title: '时间',
    props: {
      showTime: true,
      format: 'YYYY-MM-DD hh:mm:ss',
      valueFormat: 'X',
      placeholder: ['开始时间', '结束时间'],
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
    join_time: data.join_time ? data.join_time?.join(',') : undefined,
  }
}

defineExpose({
  resetForm,
})
</script>

<style lang="sass scoped">
</style>
