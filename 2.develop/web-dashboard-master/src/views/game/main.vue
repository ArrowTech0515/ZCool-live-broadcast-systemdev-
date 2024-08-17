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
  
      <a-tab-pane key="4" tab="游戏订单">
          <orderManagement />
      </a-tab-pane>

      <a-tab-pane key="5" tab="主播业绩">
          <anchorManagement />
      </a-tab-pane>

      <a-tab-pane key="6" tab="数据分析">
          <data_analysisManagement />
      </a-tab-pane>

    </a-tabs>
  </template>
  
  <script>
  import { Tabs } from 'ant-design-vue'

  import listManagement from './list/index.vue';
  import summaryManagement from './summary/index.vue';
  import profit_detail_Management from './profit_detail/index.vue';
  import orderManagement from './order/index.vue';
  import data_analysisManagement from './data_analysis/index.vue';
  import anchorManagement from './anchor/index.vue';
  
  export default {
    components: {
      'a-tabs': Tabs,
      'a-tab-pane': Tabs.TabPane,
      listManagement,
      summaryManagement,
      profit_detail_Management,
      orderManagement,
      data_analysisManagement,
      anchorManagement
    }
  }
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>
  