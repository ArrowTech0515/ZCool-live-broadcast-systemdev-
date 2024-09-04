<template>
    <a-tabs default-active-key="1">
        
      <a-tab-pane key="1" tab="返⽔策略">
          <rebateStrategy />
      </a-tab-pane>
      
      <a-tab-pane key="2" tab="提现策略">
          <withdrawalStrategy />
      </a-tab-pane>
  
    </a-tabs>
  </template>
  
  <script>
  import { Tabs } from 'ant-design-vue'

  import rebateStrategy from './rebate/index.vue'
  import withdrawalStrategy from './rebate/index.vue'
  
  export default {
    components: {
      'a-tabs': Tabs,
      'a-tab-pane': Tabs.TabPane,
      rebateStrategy,
      withdrawalStrategy,
    }
  }
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>
  