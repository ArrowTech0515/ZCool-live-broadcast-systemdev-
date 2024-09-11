<template>
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
                style="background-color:green;"
                @click="emit('export_csv')"
              >导出CSV</AButton>
            </div>
          </section>
        </template>
      </form-create>
    </div>
</template>

<script setup>
const params = defineModel()
const data = reactive({
  merch_name: '',
  recharge_time: [],
})

const emit = defineEmits(['export_csv', 'search'])

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
    type: 'select',
    field: 'merchant_type',
    title: '商户',
    value: 1,
    props: {
      placeholder: '请选择商户',
    },
    options: Object.keys(ENUM.merchant_type).map(key => ({ label: ENUM.merchant_type[key], value: parseInt(key) })),
  },
  {
    type: 'rangePicker',
    field: 'recharge_time',
    title: '充值时间',
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
    recharge_time: data.recharge_time ? data.recharge_time?.join(',') : undefined,
  }
}

defineExpose({
  resetForm,
})
</script>

<style lang="sass scoped">
</style>
