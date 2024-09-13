<template>
    <a-tabs default-active-key="1">
        
      <a-tab-pane key="1" tab="账号风控管理">
          <mainPage />
      </a-tab-pane>
      <a-tab-pane key="2" tab="IP地址管理">
          <IPaddressSegmentPage />
      </a-tab-pane>
      <a-tab-pane key="3" tab="设备管理">
          <IPaddressSegment2Page />
      </a-tab-pane>
      <a-tab-pane key="4" tab="风控标签设置">
          <IPaddressSegment3Page />
      </a-tab-pane>
    </a-tabs>
  </template>
  
  <script>
  import { Tabs } from 'ant-design-vue'

  import IPaddressSegmentPage from './IPaddrSegment/index.vue'
  import IPaddressSegment2Page from './IPaddrSegment2/index.vue'
  import IPaddressSegment3Page from './IPaddrSegment3/index.vue'
  import mainPage from './main/index.vue'
  
  export default {
    components: {
      'a-tabs': Tabs,
      'a-tab-pane': Tabs.TabPane,
      IPaddressSegmentPage,
      IPaddressSegment2Page,
      IPaddressSegment3Page,
      mainPage,
    }
  }
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>
  