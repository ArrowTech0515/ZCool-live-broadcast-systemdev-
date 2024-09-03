<template>
    <a-tabs default-active-key="1">
        
      <a-tab-pane key="1" tab="直播管理">
          <mainPage />
      </a-tab-pane>
      <a-tab-pane key="2" tab="直播详情">
          <detailPage />
      </a-tab-pane>
      <a-tab-pane key="3" tab="体育直播管理">
          <sportsPage />
      </a-tab-pane>

    </a-tabs>
  </template>
  
  <script>
  import { Tabs } from 'ant-design-vue'

  import mainPage from './main/index.vue'; // junn
  import detailPage from './detail/index.vue'; // junn
  import sportsPage from './sports/index.vue'; // junn
  
  export default {
    components: {
      'a-tabs': Tabs,
      'a-tab-pane': Tabs.TabPane,
      mainPage,
      detailPage,
      sportsPage
    }
  }
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>
  