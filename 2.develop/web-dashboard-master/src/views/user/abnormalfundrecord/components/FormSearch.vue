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
            <AButton
              class="ml20"
              type="primary"
              @click="emit('emit_export')"
            >导出</AButton>
          </div>
        </template>
      </form-create>
    </div>
  </SearchPanel>
</template>

<script setup>
import SearchPanel from '@/components/Form/SearchForm/SearchPanel.vue';

const params = defineModel()
const data = reactive({
  merch_name: '',
  create_time: [],
})

const emit = defineEmits(['emit_export', 'search'])
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
    field: 'member_account',
    title: '会员账号',
    props: {
      placeholder: '请输入会员账号',
    },
  },
  {
    type: 'input',
    field: 'profit_amount',
    title: '订单号',
    props: {
      placeholder: '请输入订单号',
    },
  },
  {
    type: 'rangePicker',
    field: 'query_time',
    title: '查询区间',
    props: {
      format: 'YYYY-MM-DD',
      valueFormat: 'X',
      placeholder: ['开始日期', '结束日期'], // Placeholder for the rangePicker
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
