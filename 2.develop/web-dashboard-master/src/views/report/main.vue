<template>
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="举报用户">
          <userPage />
      </a-tab-pane>
    </a-tabs>
  </template>
  
  <script>
  import { Tabs } from 'ant-design-vue'

  import userPage from './user/index.vue'

  export default {
    components: {
      'a-tabs': Tabs,
      'a-tab-pane': Tabs.TabPane,
      userPage,
    }
  }
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>
  