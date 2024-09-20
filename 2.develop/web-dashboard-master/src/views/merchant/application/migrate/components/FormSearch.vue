<template>
  <a-col type="flex" align="center">

    <a-col :flex="auto" style="width: 40%;">
      <a-form-item label="当前应用" :label-col="{ span: 6 }">
        <div style="text-align: center;">
          <img
            :src="iconImg"
            alt="应用图标"
            width="100"
            height="100"
          />
          <!-- Title displayed below the image -->
          <div style="margin-top: 10px; font-size: 14px; color: grey;">
            {{ selectedRecord.application_name }}
          </div>
        </div>
      </a-form-item>
    </a-col>

    <a-col :flex="auto" style="width: 40%;">
      <a-form-item label="当前所属商户" :label-col="{ span: 6 }" >
        <a-input v-model:value="selectedRecord.__merchant" style="text-align: center;" placeholder="当前所属商户" disabled="true"/>
      </a-form-item>
    </a-col>

    <a-col :flex="auto" style=" width: 40%; margin-bottom: -25px">
      <a-form-item label="迁移商户" :label-col="{ span: 6 }" >
        <a-select v-model:value="migrate_application" placeholder="请选择迁移商户" default-value='请选择迁移商户'>
          <a-select-option value="app1">{{ ENUM.merchant_type[2] }}</a-select-option>
          <a-select-option value="app2">{{ ENUM.merchant_type[3] }}</a-select-option>
          <a-select-option value="app3">{{ ENUM.merchant_type[4] }}</a-select-option>
        </a-select>
      </a-form-item>
    </a-col>

    <a-col :flex="auto" style="margin-left: 5%;">
      <span style="font-size: 12px; color: grey; ">
        迁移后，原有商户将无法管理当前应用，仅可查看对应的应用数据
      </span>
    </a-col>

    <a-col :flex="1" style=" width: 20%; margin-top: 30px;  margin-left: 5%;">
      <a-form-item>
        <a-button type="primary" block @click="onMigrateApp">
          保存
        </a-button>
      </a-form-item>
    </a-col>
  </a-col>
</template>

<script setup>

import iconImg  from '@/assets/images/logo.png'

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

const emit = defineEmits(['emit_migrate', 'search'])

const fApi = ref({})

const onMigrateApp = () => {
  emit('emit_migrate')
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
