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
          <QueryButtonGroup  
            :reset-form="resetForm" 
            :submit-form="submitForm"
          />
          <div class="flex1 flex_end mb24">
              <AButton
                type="primary"
                @click="emit('addItem')"
              >添加分类</AButton>
            </div>
        </template>
      </form-create>
    </div>
  </a-card>
</template>

<script setup>
const props = defineProps({
  isParent: { // 是否为一级分类
    type: Boolean,
    default: true,
  },
})
const params = defineModel()
const route = useRoute()
const parentId = route.query.parentId || null

const data = reactive({
  name: '',
  create_time: [],
  parentId,
})
const fApi = ref({})

watch(() => route.query.parentId, (val) => {
  if (val) {
    fApi.value.setValue({
      parentId: val,
    })
  }
})

const emit = defineEmits(['addItem', 'search'])

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
    field: 'parentId',
    title: '一级分类',
    value: '',
    hidden: props.isParent, // 只有二级分类才展示分类筛选
    props: {
      allowClear: true,
    },
    options: [],
    effect: {
      fetch: {
        action: '/api/v1/setting/live/category',
        data: {
          page: 1,
          limit: 99,
          level: 1,
        },
        to: 'options',
        method: 'get',
        parse: res => res.items.map(item => ({ value: item.category_id, label: item.name })),
      },
    },
  },
  {
    type: 'input',
    field: 'name',
    title: '分类名称',
    value: '',
  },
  {
    type: 'rangePicker',
    field: 'create_time',
    title: '创建时间',
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
    create_time: data.create_time ? data.create_time?.join(',') : undefined,
  }
}

defineExpose({
  resetForm,
})
</script>

<style lang="sass scoped">
</style>
