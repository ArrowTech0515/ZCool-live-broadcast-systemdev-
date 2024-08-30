<template>
    <a-tabs default-active-key="1">
        
      <a-tab-pane key="1" tab="直播管理">
          <mainPage />
      </a-tab-pane>

    </a-tabs>
  </template>
  
  <script>
  import { Tabs } from 'ant-design-vue'

  import mainPage from './main/index.vue'; // junn
  
  export default {
    components: {
      'a-tabs': Tabs,
      'a-tab-pane': Tabs.TabPane,
      mainPage,
    }
  }
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>
  