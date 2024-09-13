<template>
  <a-card class="mb15">
    <div class="__table_form_search_component">
      <form-create
        class="form-create"
        v-model:api="fApi"
        v-model="data"
        :option="options"
        :rule="rule"
      >
      <template #type-btns>
          <section class="flex mb15" style="width: 100%;">
            <AButton
              @click="submitForm"
              type="primary"
            >查询</AButton>
            <AButton
              class="ml20"
              @click="resetForm"
            >重置</AButton>
            <div class="flex1 flex_end">
              <AButton
                type="primary"
                @click="emit('addItem')"
              >添加主播</AButton>
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
const options = {
  // resetBtn: false,
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
  form: {
    // layout: 'inline', // Set form layout to inline
  },
}

const rule = ref([
  {
    type: 'text',
    field: 'acct',
    title: '成功金额: 0',
    value: '',
    wrap: {
      labelCol: { offset: 0 },
    },
  },
  {
    type: 'text',
    field: 'nickname',
    title: '失败金额: 0',
    value: '',
    wrap: {
      labelCol: { offset: -10 },
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
  },
  {
    type: 'button',
    field: 'aaa',
    children: '提交',
    props: {
      text: '提交',
      type: 'primary',
      style: {
        width: 'auto',  // Ensure width is enough to display text
        whiteSpace: 'nowrap',  // Prevent text from breaking into multiple lines
      },
    },
  },
  {
    type: 'button',
    field: 'aaa',
    children: '提交',
    props: {
      text: '提交',
      type: 'primary',
      style: {
        width: 'auto',  // Ensure width is enough to display text
        whiteSpace: 'nowrap',  // Prevent text from breaking into multiple lines
      },
    },
  },
  {
    type: 'button',
    field: 'aaa',
    children: '提交',
    props: {
      text: '提交',
      type: 'primary',
      style: {
        width: 'auto',  // Ensure width is enough to display text
        whiteSpace: 'nowrap',  // Prevent text from breaking into multiple lines
      },
    },
  },
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

<style scoped>
.__table_form_search_component {
  display: flex;
  align-items: center;
  gap: 10px;
}

.form-create {
  display: flex; /* Ensure the form components are aligned in a single line */
  align-items: center;
  width: 100%;
  flex-wrap: nowrap; /* Prevent wrapping to the next line */
}

.form-create .fc-item {
  margin-right: 10px; /* Space between form items */
  flex-shrink: 0; /* Prevent items from shrinking */
}

.form-create .ant-form-item-control {
  width: auto !important; /* Ensure items take only the necessary width */
}
</style>
