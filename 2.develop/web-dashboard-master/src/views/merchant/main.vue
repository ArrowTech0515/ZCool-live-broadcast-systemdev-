<template>
    <a-tabs default-active-key="1">
        
      <a-tab-pane key="1" tab="商户管理">
          <listPage />
      </a-tab-pane>
      <a-tab-pane key="2" tab="商户账号管理">
          <accountPage />
      </a-tab-pane>
      <a-tab-pane key="3" tab="商户授信">
          <creditPage />
      </a-tab-pane>
      <a-tab-pane key="4" tab="应用管理">
          <fourthPage />
      </a-tab-pane>
    </a-tabs>
  </template>
  
  <script>
  import { Tabs } from 'ant-design-vue'

  import listPage from './list/index.vue'
  import accountPage from './account/index.vue'
  import creditPage from './credit/index.vue' //junn
  import fourthPage from './credit copy/index.vue' //junn
  
  export default {
    components: {
      'a-tabs': Tabs,
      'a-tab-pane': Tabs.TabPane,
      listPage,
      accountPage,
      creditPage,
      fourthPage
    }
  }
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>
  