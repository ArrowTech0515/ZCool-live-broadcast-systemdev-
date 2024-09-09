<template>
    <a-tabs default-active-key="1">
        
      <a-tab-pane key="1" tab="黑名单管理">
          <mainPage/>
      </a-tab-pane>
      <a-tab-pane key="2" tab="解禁申请">
          <application4release />
      </a-tab-pane>
    </a-tabs>
  </template>
  
  <script>
  import { Tabs } from 'ant-design-vue'

  import mainPage from './main/index.vue'
  import application4release from './application4release/index.vue'

  export default {
    components: {
      'a-tabs': Tabs,
      'a-tab-pane': Tabs.TabPane,
      mainPage,
      application4release
    }
  }
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>
  