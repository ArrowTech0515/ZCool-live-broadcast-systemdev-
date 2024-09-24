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
</script>

<template>
  <a-card style="width: 100%; padding: 0; margin: 1%">
    <a-row type="flex" justify="space-between" align="middle" 
           style="padding: 10px; border-bottom: 1px solid lightgray">
      <a-col>
        <span style="font-size: 16px; font-weight: bold;">客服主线</span>
      </a-col>
      <a-col>
        <span>进线人数: {{ onlineUsers }}</span>
        <a-button type="link" @click="emit_clear" style="margin-left: 10px; color: #1890ff;">清空人数</a-button>
      </a-col>
    </a-row>
    
    <a-form ref="fApi" :model="fApi" style="padding: 10px;">
      <a-form-item label="线路配置" :label-col="{ span: 4 }" >
        <a-input v-model="lineConfig" placeholder="请输入线路配置" />
      </a-form-item>
      <a-form-item label="主线地址" :label-col="{ span: 4 }" >
        <a-input v-model="mainAddress" placeholder="超链接输入框，必须以 'http' 或 'https' 开头" />
      </a-form-item>
      <a-form-item label="主线人数比例" :label-col="{ span: 4 }" >
        <a-input v-model="userRatio" placeholder="请输入人数比例" />
      </a-form-item>
      <a-form-item label="网页标题" :label-col="{ span: 4 }" >
        <a-input v-model="pageTitle" placeholder="请输入网页标题" />
      </a-form-item>
    </a-form>
  </a-card>
</template>
