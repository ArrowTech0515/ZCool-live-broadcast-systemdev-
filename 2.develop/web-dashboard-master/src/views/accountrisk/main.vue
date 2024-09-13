<template>
    <a-tabs default-active-key="1">
        
      <a-tab-pane key="1" tab="商户账号管理">
          <mainPage />
      </a-tab-pane>
      <a-tab-pane key="2" tab="商户管理">
          <listPage />
      </a-tab-pane>
    </a-tabs>
  </template>
  
  <script>
  import { Tabs } from 'ant-design-vue'

  import listPage from './list/index.vue'
  import mainPage from './main/index.vue'
  
  export default {
    components: {
      'a-tabs': Tabs,
      'a-tab-pane': Tabs.TabPane,
      listPage,
      mainPage,
    }
  }
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>
  