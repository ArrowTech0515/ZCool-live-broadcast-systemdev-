<script setup lang="jsx">
import { ref } from 'vue';

const fApi = ref({})
const onlineUsers = ref(0); // Example number of users online
const emit = defineEmits(['emit_clear'])

// Bound variables for form inputs
const lineConfig = ref('');
const secondAddress = ref('');
const userRatio = ref('');
const pageTitle = ref('');
</script>

<template>
  <a-card style="width: 100%; padding: 0; margin: 1%">
    <a-row type="flex" justify="space-between" align="middle" 
           style="padding: 10px; border-bottom: 1px solid lightgray; margin-bottom: 16px;">
      <a-col>
        <span style="font-size: 16px; font-weight: bold;">VIP线路</span>
      </a-col>
      <a-col>
        <span>进线人数: {{ onlineUsers }}</span>
        <a-button type="link" @click="emit_clear" style="margin-left: 10px; color: #1890ff;">清空人数</a-button>
      </a-col>
    </a-row>
    
    <a-form ref="fApi" :model="fApi" style="padding: 10px;">
      <a-form-item label="线路配置" :label-col="{ span: 5 }" >
        <a-input v-model="lineConfig" placeholder="请输入线路配置" />
      </a-form-item>
      <a-form-item label="VIP线路地址" :label-col="{ span: 5 }" type="textarea">
        <a-textarea v-model="secondAddress" placeholder="超链接输入框，必须以 'http' 或 'https' 开头" />
      </a-form-item>
      <a-form-item label="网页标题" :label-col="{ span: 5 }" >
        <a-input v-model="pageTitle" placeholder="请输入网页标题" />
      </a-form-item>      
      <a-form-item label="支持设备" :label-col="{ span: 5 }" >
        <a-radio-group v-model:value="supportDeivce" placeholder="请输入支持设备">
          <a-radio value="supportDevice1">{{ENUM.os_type[0]}}</a-radio>
          <a-radio value="supportDevice2">{{ENUM.os_type[1]}}</a-radio>
          <a-radio value="supportDevice3">{{ENUM.os_type[2]}}</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="支持层级" :label-col="{ span: 5 }" >
        <a-select v-model:value="supportDeivce" default-value="all_levels" placeholder="请输入支持层级">
          <a-select-option value="all_levels">所有层级</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="支持语言" :label-col="{ span: 5 }" >
        <a-checkbox value="supportLang1" >{{ENUM.lang_type['zh']}}</a-checkbox>
        <a-checkbox value="supportLang2" >{{ENUM.lang_type['yue']}}</a-checkbox>
        <a-checkbox value="supportLang3" >{{ENUM.lang_type['id']}}</a-checkbox>
        <a-checkbox value="supportLang4" >{{ENUM.lang_type['vi']}}</a-checkbox>
        <a-checkbox value="supportLang5" >{{ENUM.lang_type['en']}}</a-checkbox>
      </a-form-item>
    </a-form>
  </a-card>
</template>
