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
          <div class="flex1 flex_start mb24">
             <AButton
              class="ml20"
                type="primary"
                @click="emit('emit_add_IP')"
              >新增IP地址</AButton>
              <AButton
              class="ml20"
                type="primary"
                @click="emit('emit_add_IP_segment')"
              >新增IP段</AButton>
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

const emit = defineEmits(['emit_add_IP', 'emit_add_IP_segment', 'search'])
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
  {
    type: 'select',
    field: 'IP_status',
    title: 'IP状态',
    value: 1,
    options: Object.keys(ENUM.IP_status).map(key => ({ label: ENUM.IP_status[key], value: parseInt(key) })),
    props: {
      placeholder: '请输入IP',
    },
  },   
  {
    type: 'input',
    field: 'add_person',
    title: '添加人',
    value: '',
    props: {
      placeholder: '请输入添加人账号',
    },
  },
  {
    type: 'input',
    field: 'last_edited_person',
    title: '最后编辑人',
    value: '',
    props: {
      placeholder: '请输入编辑人账号',
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
