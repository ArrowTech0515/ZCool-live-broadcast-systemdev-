<template>
    <a-tabs default-active-key="1">
        
      <a-tab-pane key="1" tab="商户管理">
          <listPage />
      </a-tab-pane>
      <a-tab-pane key="2" tab="商户账号管理">
          <accountPage />
      </a-tab-pane>

    </a-tabs>
  </template>
  
  <script>
  import { Tabs } from 'ant-design-vue'

  import listPage from './list/index.vue'; // junn
  import accountPage from './account/index.vue'; // junn
  
  export default {
    components: {
      'a-tabs': Tabs,
      'a-tab-pane': Tabs.TabPane,
      listPage,
      accountPage,
    }
  }
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>
  