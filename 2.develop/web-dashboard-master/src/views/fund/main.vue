<template>
    <a-tabs default-active-key="1">
        
      <a-tab-pane key="1" tab="餘額⽇誌">
          <balancelog />
      </a-tab-pane>
      <a-tab-pane key="2" tab="優惠記錄">
          <discountRecord />
      </a-tab-pane>
      <a-tab-pane key="3" tab="打码设置">
          <coding />
      </a-tab-pane>
    </a-tabs>
  </template>
  
  <script>
  import { Tabs } from 'ant-design-vue'

  import balancelog from './balancelog/index.vue'
  import discountRecord from './discountRecord/index.vue'
  import coding from './coding/index.vue'
  
  export default {
    components: {
      'a-tabs': Tabs,
      'a-tab-pane': Tabs.TabPane,
      balancelog,
      discountRecord,
      coding
    }
  }
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>
  