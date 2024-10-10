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
            class="flex1 flex_end" 
            :reset-form="resetForm" 
            :submit-form="submitForm"
          />
        </template>
      </form-create>
      <a-row class="mb15 ml10">
        <div class="mr15" style="color: green;">
          下注总金额: {{ total_bet_amount }}
        </div>
        <div style="color: green;">
          用户盈亏: {{ user_profit_loss }}
        </div>
      </a-row>
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

const emit = defineEmits(['export_csv', 'search'])

const total_bet_amount = ref(69600436.00)
const user_profit_loss = ref(-2368032.26)

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
    type: 'rangePicker',
    field: 'join_time',
    title: '查询时间',
    props: {
      format: 'YYYY-MM-DD HH:mm',
      valueFormat: 'X',
      showTime: true,
      placeholder: ['开始日期', '结束日期'], // Placeholder for the rangePicker
    },
  },
  {
    type: 'select',
    field: 'lottery_type',
    title: '彩种',
    value: 1,
    props: {
      placeholder: '请选择彩种',
    },
    options: Object.keys(ENUM.order_status).map(key => ({value: parseInt(key), label: ENUM.order_status[key]}))
    ,
    wrap: {
      labelCol: { span: 8},
    },
  },
  {
    type: 'input',
    field: 'user_id',
    title: '用户ID',
    props: {
      placeholder: '请输入用户ID',
    },
    wrap: {
      labelCol: { span: 8},
    },
  },
  {
    type: 'input',
    field: 'issue_number',
    title: '期号',
    props: {
      placeholder: '请输入期号',
    },
    wrap: {
      labelCol: { span: 8},
    },
  },
  {
    type: 'input',
    field: 'serial_number',
    title: '流水号',
    props: {
      placeholder: '请输入流水号',
    },
    wrap: {
      labelCol: { span: 8},
    },
  },
  {
    type: 'input',
    field: 'live_broadcast_room',
    title: '直播间',
    props: {
      placeholder: '请输入直播间',
    },
    wrap: {
      labelCol: { span: 8},
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
