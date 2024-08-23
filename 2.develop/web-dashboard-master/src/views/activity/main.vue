<template>
    <a-tabs default-active-key="1">
        
      <a-tab-pane key="1" tab="1">
          <activityPage1 />
      </a-tab-pane>
  
    </a-tabs>
  </template>
  
  <script>
  import { Tabs } from 'ant-design-vue'

  import activityPage1 from './index.vue';
  
  export default {
    components: {
      'a-tabs': Tabs,
      'a-tab-pane': Tabs.TabPane,
      activityPage1,
    }
  }
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>
  