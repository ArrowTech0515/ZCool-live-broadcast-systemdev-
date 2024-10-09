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
              @click="emit('emit_add')"
            >新增预警</AButton>
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
    value: '',
    props: {
      placeholder: '请输入会员账号',
    },
  },
  {
    type: 'input',
    field: 'profit_amount',
    title: '盈利金额',
    value: '',
    props: {
      placeholder: '请输入盈利金额',
    },
  },
  {
    type: 'select',
    field: 'whether_alert',
    title: '是否预警',
    value: 1,
    options: Object.keys(ENUM.yes_no).map(key => ({ label: ENUM.yes_no[key], value: parseInt(key) })),
    // props: {
    //   placeholder: '请输入IP',
    // },
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
