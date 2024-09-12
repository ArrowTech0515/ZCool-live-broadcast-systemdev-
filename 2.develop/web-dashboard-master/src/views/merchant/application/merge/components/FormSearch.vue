<template>
  <a-col type="flex" align="center">
    <a-col :flex="auto" style="width: 40%;">
      <a-form-item label="原始应用">
        <a-input v-model:value="selectedRecord.application_name" style="text-align: center;" placeholder="请输入活动名称搜索" disabled="true"/>
      </a-form-item>
    </a-col>

    <a-col :flex="auto" style=" width: 40%; margin-bottom: -25px">
      <a-form-item label="合并应用">
        <a-select v-model:value="merge_application" placeholder="选择要合并的应用" default-value='选择要合并的应用'>
          <a-select-option value="app1">{{ ENUM.application_type[2] }}</a-select-option>
          <a-select-option value="app2">{{ ENUM.application_type[3] }}</a-select-option>
        </a-select>
        
      </a-form-item>
    </a-col>
    <a-col :flex="auto" style="margin-left: 10%;">
      <span style="font-size: 12px; color: grey; ">
          确定合并后，原始应用中的所有运营相关的配置（活动、任务等）将会被选中应用覆盖，其他数据不变
      </span>
    </a-col>

    <a-col :flex="1" style=" width: 20%; margin-top: 30px;">
      <a-form-item>
        <a-button type="primary" block @click="onMergeApp">
          保存
        </a-button>
      </a-form-item>
    </a-col>
  </a-col>
</template>

<script setup>

const props = defineProps({
  selectedRecord: {
    type: Object,
    default: () => ({}),
  },
})

const params = defineModel()

const data = reactive({
  merch_name: '',
  recharge_time: [],
})

const emit = defineEmits(['emit_merge', 'search'])

const fApi = ref({})

const onMergeApp = () => {
  emit('emit_merge')
}

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
