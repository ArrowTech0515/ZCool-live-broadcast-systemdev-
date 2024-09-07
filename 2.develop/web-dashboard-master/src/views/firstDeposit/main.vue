<template>
    <a-tabs default-active-key="1">
        
      <a-tab-pane key="1" tab="余额订单">
          <balance />
      </a-tab-pane>
      
  
    </a-tabs>
  </template>
  
  <script>
  import { Tabs } from 'ant-design-vue'

  import balance from './main/index.vue'
  
  export default {
    components: {
      'a-tabs': Tabs,
      'a-tab-pane': Tabs.TabPane,
      balance,
    }
  }
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>
  