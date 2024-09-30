<template>
    <a-tabs default-active-key="1">
        
      <a-tab-pane key="1" tab="Banner管理">
          <bannerPage />
      </a-tab-pane>

    </a-tabs>
  </template>
  
  <script>
  import { Tabs } from 'ant-design-vue'

  import bannerPage from './banner/index.vue'
  
  export default {
    components: {
      'a-tabs': Tabs,
      'a-tab-pane': Tabs.TabPane,
      bannerPage,
    }
  }
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>
  