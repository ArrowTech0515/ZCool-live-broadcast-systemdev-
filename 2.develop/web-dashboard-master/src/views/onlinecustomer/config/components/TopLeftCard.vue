<script setup lang="jsx">
import { ref } from 'vue';

const fApi = ref({})
const onlineUsers = ref(2850); // Example number of users online
const emit = defineEmits(['emit_clear'])

// Bound variables for form inputs
const lineConfig = ref('');
const mainAddress = ref('');
const userRatio = ref('');
const pageTitle = ref('');
// Bound variable for a-select
const supportLevel = ref('all_levels') // Default value

// Bound variable for radio group and checkbox selection
const supportDevice = ref('supportDevice1')
const supportLang = ref([])

const clearNumberOfPeople = () => {
  onlineUsers.value = 0
}

</script>

<template>
  <a-card style="width: 100%; padding: 0; margin: 1%">
    <a-row type="flex" justify="space-between" align="middle" 
           style="padding: 10px; border-bottom: 1px solid lightgray; margin-bottom: 16px;">
      <a-col>
        <a-divider type="vertical" style="background-color: #1890ff; width: 3px; height: 20px;"></a-divider>
        <span style="font-size: 16px; font-weight: bold;">客服主线</span>
      </a-col>
      <a-col>
        <span>进线人数: {{ onlineUsers }}</span>
        <a-button type="link" @click="clearNumberOfPeople" style="margin-left: 10px; color: #1890ff;">清空人数</a-button>
      </a-col>
    </a-row>
    
    <a-form ref="fApi" :model="fApi" style="padding: 10px;">
      <a-form-item label="线路配置" :label-col="{ span: 5 }" >
        <a-input v-model="lineConfig" placeholder="请输入线路配置" />
      </a-form-item>
      <a-form-item label="主线地址" :label-col="{ span: 5 }" >
        <a-textarea v-model="mainAddress" placeholder="超链接输入框，必须以 'http' 或 'https' 开头" />
      </a-form-item>
      <a-form-item label="主线人数比例" :label-col="{ span: 5 }" >
        <a-input v-model="userRatio" placeholder="请输入数字" />
      </a-form-item>
      <a-form-item label="网页标题" :label-col="{ span: 5 }" >
        <a-input v-model="pageTitle" placeholder="请输入网页标题" />
      </a-form-item>
      <a-form-item label="支持设备" :label-col="{ span: 5 }" >
        <a-radio-group v-model:value="supportDevice" placeholder="请选择支持设备">
          <a-radio value="supportDevice1">{{ENUM.os_type[0]}}</a-radio>
          <a-radio value="supportDevice2">{{ENUM.os_type[1]}}</a-radio>
          <a-radio value="supportDevice3">{{ENUM.os_type[2]}}</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="支持层级" :label-col="{ span: 5 }" >
        <a-select v-model:value="supportLevel" default-value="all_levels" placeholder="请选择支持层级">
          <a-select-option value="all_levels">所有层级</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="支持语言" :label-col="{ span: 5 }" >
        <a-checkbox-group v-model="supportLang">
          <a-checkbox value="zh">{{ENUM.lang_type['zh']}}</a-checkbox>
          <a-checkbox value="id">{{ENUM.lang_type['id']}}</a-checkbox>
          <a-checkbox value="vi">{{ENUM.lang_type['vi']}}</a-checkbox>
          <a-checkbox value="en">{{ENUM.lang_type['en']}}</a-checkbox>
        </a-checkbox-group>
      </a-form-item>
    </a-form>
  </a-card>
</template>
