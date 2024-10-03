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
            class="flex mb24"  style="flex: auto;"
          >
             <QueryButtonGroup  
            :reset-form="resetForm" 
            :submit-form="submitForm"
          />
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
import merchSelectRule from '@/rules/merchSelectRule';

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
  merchSelectRule,
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
