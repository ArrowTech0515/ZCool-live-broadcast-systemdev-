<template>
    <a-tabs default-active-key="1">
        
      <a-tab-pane key="1" tab="1">
          <orderManagement />
      </a-tab-pane>
      
      <a-tab-pane key="2" tab="2">
          <orderManagement2 />
      </a-tab-pane>
  
    </a-tabs>
  </template>
  
  <script>
  import { Tabs } from 'ant-design-vue'

  import orderManagement from '@/views/order/index.vue';
  import orderManagement2 from '@/views/order/index2.vue';
  
  export default {
    components: {
      'a-tabs': Tabs,
      'a-tab-pane': Tabs.TabPane,
      orderManagement,
      orderManagement2
    }
  }
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>
  