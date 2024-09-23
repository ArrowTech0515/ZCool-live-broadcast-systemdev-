<template>
    <a-tabs default-active-key="1">
        
      <a-tab-pane key="1" tab="代理列表">
        <mainPage />
      </a-tab-pane>
        
      <a-tab-pane key="2" tab="代理返点管理">
        <rebatePage />
      </a-tab-pane>
        
      <!-- <a-tab-pane key="3" tab="代理報表">
        <reportPage />
      </a-tab-pane> -->

    </a-tabs>
  </template>
  
  <script>
  import { Tabs } from 'ant-design-vue'

  import mainPage from './main/index.vue'
  import rebatePage from './rebate/index.vue'
  import reportPage from './report/index.vue'
  
  export default {
    components: {
      'a-tabs': Tabs,
      'a-tab-pane': Tabs.TabPane,

      mainPage,
      rebatePage,
      reportPage,
    }
  }
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>
  