<template>
    <a-tabs default-active-key="1">
        
      <a-tab-pane key="1" tab="直播列表">
          <listPage />
      </a-tab-pane>

      <a-tab-pane key="2" tab="直播详情">
          <detailPage />
      </a-tab-pane>

      <a-tab-pane key="3" tab="直播统计">
          <statisticsPage />
      </a-tab-pane>

    </a-tabs>
  </template>
  
  <script>
  import { Tabs } from 'ant-design-vue'

  import listPage from './list/index.vue'
  import detailPage from './detail/index.vue'
  import statisticsPage from './statistics/index.vue'
  
  export default {
    components: {
      'a-tabs': Tabs,
      'a-tab-pane': Tabs.TabPane,
      listPage,
      detailPage,
      statisticsPage
    }
  }
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>
  