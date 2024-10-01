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
          <section class="flex mb20" style="width: 100%;">
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
                @click="emit('emit_add')"
              >新增</AButton>
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
    type: 'select',
    field: 'merchant',
    title: '商户',
    value: '所有商户',
    options: [],
    effect: {
      fetch: {
        action: '/api/v1/merchant/list',
        to: 'options',
        method: 'get',
        parse: res => [
          { value: 0, label: '所有来源' },
          ...res.items.map(item => ({ value: item.source_id, label: item.source_name })),
        ],
      },
    },
    wrap: {
      labelCol: { span: 8 },
    },
  },
  {
    type: 'input',
    field: 'title',
    title: '标题',
    value: '',
    props: {
      placeholder: '请输入标题',
    },
    wrap: {
      labelCol: { span: 8 },
    },
  },
  {
    type: 'select',
    field: 'status',
    title: '状态',
    value: 0,
    options: Object.keys(ENUM.website_banner_status).map(key => ({ value: parseInt(key), label: ENUM.website_banner_status[key] })),
    wrap: {
      labelCol: { span: 8 },
    },
  },
  {
    type: 'rangePicker',
    field: 'start_end_time',
    title: '日期',
    value: '',
    props: {
      showTime: true,
      format: 'YYYY-MM-DD hh:mm:ss',
      valueFormat: 'X',
      placeholder: ['开始日期', '结束日期'],
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
