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
        </template>
      </form-create>
    </div>
  </SearchPanel>
</template>

<script setup>
import merchSelectRule from '@/rules/merchSelectRule';

const params = defineModel()
const data = reactive({
  source_id: 0,
  acct: '',
  nickname: '',
  live_status: 0,
  acct_status: 0,
  join_time: [],
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
        labelCol: { span: 10 },
      },
    },
  },
}

const rule = ref([
  merchSelectRule,
  {
    type: 'select',
    field: 'sub_channel',
    title: '子渠道',
    value: '全部',
    //options: Object.keys(ENUM.guild_status).map(key => ({ value: parseInt(key), label: ENUM.guild_status[key] })),
  },
  {
    type: 'input',
    field: 'game_id',
    title: '游戏ID',
    props: {
      placeholder: '请输入查询游戏ID',
    }
  },
  {
    type: 'input',
    field: 'payee',
    title: '收款人',
    props: {
      placeholder: '请输入收款人',
    }
  },
  {
    type: 'input',
    field: 'account',
    title: '账号',
    props: {
      placeholder: '请输入查询账号',
    }
  },
  {
    type: 'select',
    field: 'payment_method',
    title: '支付方式',
    props: {
      placeholder: '请选择支付方式',
    }
  },
  {
    type: 'select',
    field: 'blacklisted',
    title: '是否被拉黑',
    value: 1,
    options: Object.keys(ENUM.yes_no).map(key => ({ value: parseInt(key), label: ENUM.yes_no[key] })),
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
