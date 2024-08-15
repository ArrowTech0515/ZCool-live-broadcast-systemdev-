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
          <section class="flex mb15" style="width: 100%;">
            <div class="flex1 flex_end">

              <AButton
              type="primary"
                @click="emit('func1')"
            >导出大数据</AButton>

            <AButton
              class="ml11"
              type="primary"
                @click="emit('func2')"
            >导出代付方式</AButton>

              <AButton
              type="default"
                @click="emit('func3')"
              >免验证器设置</AButton>
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

const emit = defineEmits(['func1', 'func2'])
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
  // {
  //   type: 'select',
  //   field: 'source_id',
  //   title: '来源',
  //   value: '',
  //   options: [],
  //   effect: {
  //     fetch: {
  //       action: '/api/v1/source/summary',
  //       to: 'options',
  //       method: 'get',
  //       parse: res => [
  //         { value: 0, label: '所有来源' },
  //         ...res.items.map(item => ({ value: item.source_id, label: item.source_name })),
  //       ],
  //     },
  //   },
  // },
  {
    type: 'text',
    field: 'acct',
    title: '成功金额: 0',
    value: '',
    wrap: {
      labelCol: { span: 10 },
    },
  },
  {
    type: 'text',
    field: 'nickname',
    title: '失败金额: 0',
    value: '',
    wrap: {
      labelCol: { span: 10 },
    },
  },
  {
    type: 'text',
    field: 'nickname',
    title: '拒绝金额: 0',
    value: '',
    wrap: {
      labelCol: { span: 10 },
    },
  },
  {
    type: 'text',
    field: 'nickname',
    title: '待审核金额: 0',
    value: '',
    wrap: {
      labelCol: { span: 15 },
    },
  },
  {
    type: 'select',
    field: 'acct_status',
    title: '数据更新',
    value: '30秒',
  //  options: Object.keys(ENUM.anchor_acct_status).map(key => ({ value: parseInt(key), label: ENUM.anchor_acct_status[key] })),
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

