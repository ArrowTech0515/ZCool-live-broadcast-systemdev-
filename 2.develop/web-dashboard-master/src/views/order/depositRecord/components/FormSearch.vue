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
            <a-button
              type="primary"
              @click="emit('emit_same_day')"
            >当日</a-button>
            <a-button
              class="ml10"
              type="primary"
              @click="emit('emit_previous_day')"
            >上一日</a-button>
            <!-- Dropdown Button -->
            <a-dropdown>
              <a-button 
                class="ml10">
                更多 <DownOutlined />
              </a-button>
              <template #overlay>
                <a-menu >
                  <a-menu-item key="1" @click="handleMenuClick('option1')">选项1</a-menu-item>
                  <a-menu-item key="2" @click="handleMenuClick('option2')">选项2</a-menu-item>
                  <a-menu-item key="3" @click="handleMenuClick('option3')">选项3</a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </template>
      </form-create>
    </div>
  </SearchPanel>
</template>

<script setup>

const params = defineModel()
const data = reactive({
  banker_name: null, // This will trigger the placeholder in the select field
  bank_name: null, // Same here for bank_name select field
  bank_card_number: null, // Same here for bank_card_number select field
  user_id: '', // Input fields can use empty string to show placeholder
  order_number: '', // Input fields can use empty string to show placeholder
  order_status: null, // This will trigger the placeholder in the select field
})


const handleMenuClick = (option) => {
  message.info(`You selected ${option}`)
  this.$emit('emit_more', option)
}

const emit = defineEmits(['emit_same_day', 'emit_previous_day', 'emit_more'])
const fApi = ref({})
const option = {
  resetBtn: false,
  submitBtn: false,
  global: {
    '*': {
      col: {
        show: false,
      },
    },
  },
}

const rule = ref([
  {
    type: 'select',
    field: 'banker_name',
    title: '银商名称',
    props: {
      placeholder: '请选择银商名称', // Add placeholder
    },
    effect: {
      fetch: {
        action: '/api/v1/source/banker_name',
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
    type: 'select',
    field: 'bank_name',
    title: '银行名称',
    props: {
      placeholder: '请选择银行名称', // Add placeholder
    },
    effect: {
      fetch: {
        action: '/api/v1/source/bank_name',
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
    type: 'select',
    field: 'bank_card_number',
    title: '银行卡号',
    props: {
      placeholder: '请选择银行卡号', // Add placeholder
    },
    effect: {
      fetch: {
        action: '/api/v1/source/bank_card_number',
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
    field: 'user_id',
    title: '用户ID',
    value: '',
    props: {
      placeholder: '请输入用户ID', // Add placeholder
    },
    wrap: {
      labelCol: { span: 8 },
    },
  },
  {
    type: 'input',
    field: 'order_number',
    title: '订单号',
    value: '',
    props: {
      placeholder: '请输入订单号', // Add placeholder
    },
    wrap: {
      labelCol: { span: 8 },
    },
  },
  {
    type: 'select',
    field: 'order_status',
    title: '订单状态',
    value: 1,
    props: {
      placeholder: '全部', // Add placeholder
    },
    wrap: {
      labelCol: { span: 8 },
    },
    options: Object.keys(ENUM.success_status).map(key => ({ value: parseInt(key), label: ENUM.success_status[key] })),
  },
  {
    type: 'rangePicker',
    field: 'time',
    title: '时间',
    props: {
      format: 'YYYY-MM-DD HH:mm:ss',
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
    join_time: data.join_time ? data.join_time?.join(',') : undefined,
  }
}

defineExpose({
  resetForm,
})
</script>

<style scoped>

</style>