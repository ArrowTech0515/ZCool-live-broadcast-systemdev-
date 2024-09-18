<template>
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="举报用户">
          <userPage />
      </a-tab-pane>
      <a-tab-pane key="2" tab="举报主播">
          <anchorPage />
      </a-tab-pane>
    </a-tabs>
  </template>
  
  <script>
  import { Tabs } from 'ant-design-vue'

  import userPage from './user/index.vue'
  import anchorPage from './anchor/index.vue'

  export default {
    components: {
      'a-tabs': Tabs,
      'a-tab-pane': Tabs.TabPane,
      userPage,
      anchorPage
    }
  }
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>
  