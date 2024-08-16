<template>
    <a-tabs default-active-key="1">
        
      <a-tab-pane key="1" tab="游戏列表">
          <listManagement />
      </a-tab-pane>
      
      <a-tab-pane key="2" tab="游戏汇总">
          <summaryManagement />
      </a-tab-pane>

      <a-tab-pane key="3" tab="游戏盈利详情">
          <profit_detail_Management />
      </a-tab-pane>
  
    </a-tabs>
  </template>
  
  <script>
  import { Tabs } from 'ant-design-vue'

  import listManagement from './list/index.vue';
  import summaryManagement from './summary/index.vue';
  import profit_detail_Management from './profit_detail/index.vue';
  
  export default {
    components: {
      'a-tabs': Tabs,
      'a-tab-pane': Tabs.TabPane,
      listManagement,
      summaryManagement,
      profit_detail_Management
    }
  }
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>
  