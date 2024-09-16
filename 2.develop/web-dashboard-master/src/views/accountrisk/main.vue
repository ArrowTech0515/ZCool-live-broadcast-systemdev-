<template>
    <a-tabs default-active-key="1">
        
      <a-tab-pane key="1" tab="账号风控管理">
          <mainPage />
      </a-tab-pane>
      <a-tab-pane key="2" tab="IP地址管理">
          <IPaddressSegmentPage />
      </a-tab-pane>
      <a-tab-pane key="3" tab="设备管理">
          <deviceManagementPage />
      </a-tab-pane>
      <a-tab-pane key="4" tab="风控标签设置">
          <labelSettingsPage />
      </a-tab-pane>
    </a-tabs>
  </template>
  
  <script>
  import { Tabs } from 'ant-design-vue'

  import IPaddressSegmentPage from './IPaddress/index.vue'
  import deviceManagementPage from './device/index.vue'
  import labelSettingsPage from './labelsettings/index.vue'
  import mainPage from './main/index.vue'
  
  export default {
    components: {
      'a-tabs': Tabs,
      'a-tab-pane': Tabs.TabPane,
      IPaddressSegmentPage,
      deviceManagementPage,
      labelSettingsPage,
      mainPage,
    }
  }
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>
  