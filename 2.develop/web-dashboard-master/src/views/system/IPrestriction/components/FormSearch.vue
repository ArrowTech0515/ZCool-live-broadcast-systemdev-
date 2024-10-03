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
          <section
            class="flex mb24"  style="flex: auto;"
          >
             <QueryButtonGroup  
            :reset-form="resetForm" 
            :submit-form="submitForm"
          />
           <div class="flex1 flex_end">
             <AButton
              class="ml20"
                type="primary"
                @click="emit('emit_add_whitelist_IP')"
              >新增白名单IP</AButton>
              <AButton
              class="ml20"
                type="primary"
                @click="emit('emit_add_batch_modify_effective_period')"
              >批量修改生效期</AButton>
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
  merch_name: '',
  create_time: [],
})

const emit = defineEmits(['emit_add_whitelist_IP', 'emit_add_batch_modify_effective_period', 'search'])
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
    type: 'input',
    field: 'IP',
    title: 'IP',
    value: '',
    props: {
      placeholder: '请输入IP',
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
