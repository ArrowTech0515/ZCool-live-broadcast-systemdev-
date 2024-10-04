<template>
    <a-tabs default-active-key="1">
        
      <a-tab-pane key="1" tab="人脸配置">
          <configPage />
      </a-tab-pane>
        
        <!-- <a-tab-pane key="2" tab="人脸流水">
            <waterPage />
        </a-tab-pane> -->

    </a-tabs>
  </template>
  
  <script>
  import { Tabs } from 'ant-design-vue'

  import configPage from './config/index.vue'
  import waterPage from './water/index.vue'
  
  export default {
    components: {
      'a-tabs': Tabs,
      'a-tab-pane': Tabs.TabPane,
      configPage,
      waterPage
    }
  }
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>
  