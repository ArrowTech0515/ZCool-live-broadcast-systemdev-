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
          <section class="flex mb24" style="flex: auto">
             <QueryButtonGroup  
            :reset-form="resetForm" 
            :submit-form="submitForm"
          />
           <div class="flex1 flex_end">
             <AButton
                type="primary"
                @click="emit('emit_cover')"
              >封面配置</AButton>
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
  // team_name: '',
  // live_event: null,
  // sale_status: null,
  // live_status: null,
})

const emit = defineEmits(['emit_cover', 'search'])
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
    field: 'team_name',
    title: '球队名称',
    value: '',
    wrap: {
      labelCol: { span: 10 },
    },
    props: {
      placeholder: '请输入球队名称',
    },
  },
  {
    type: 'select',
    field: 'live_status',
    title: '直播状态',
    value: ENUM.live_broadcast_status[1],
    props: {
      placeholder: '请选择直播状态',
    },
    options: Object.keys(ENUM.live_broadcast_status).map(key => ({ value: parseInt(key), label: ENUM.live_broadcast_status[key] })),
  },
  {
    type: 'select',
    field: 'live_event',
    title: '赛事',
    value: ENUM.live_event[1],
    props: {
      placeholder: '请选择赛事',
    },
    options: Object.keys(ENUM.live_event).map(key => ({ value: parseInt(key), label: ENUM.live_event[key] })),
  },
  {
    type: 'select',
    field: 'sale_status',
    title: '部状态',
    value: ENUM.sale_status[1],
    props: {
      placeholder: '请选择部状态',
    },
    options: Object.keys(ENUM.sale_status).map(key => ({ value: parseInt(key), label: ENUM.sale_status[key] })),
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
  }
}

defineExpose({
  resetForm,
})
</script>

<style lang="sass scoped">
</style>
