<template>
    <a-tabs default-active-key="1">
        
      <a-tab-pane key="1" tab="系统IP限制">
          <IPrestrictionPage />
      </a-tab-pane>

      <a-tab-pane key="2" tab="角色管理">
          <rolePage />
      </a-tab-pane>

      <a-tab-pane key="3" tab="用户管理">
          <userPage />
      </a-tab-pane>

    </a-tabs>
  </template>
  
  <script>
  import { Tabs } from 'ant-design-vue'

  import IPrestrictionPage from './IPrestriction/index.vue'
  import rolePage from './role/index.vue'
  import userPage from './user/index.vue'
  
  export default {
    components: {
      'a-tabs': Tabs,
      'a-tab-pane': Tabs.TabPane,
      IPrestrictionPage,
      rolePage,
      userPage
    }
  }
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>
  