<template>
    <a-tabs default-active-key="1">
        
      <a-tab-pane key="1" tab="活动管理">
          <activityPage1 />
      </a-tab-pane>
          
      <a-tab-pane key="2" tab="充值活动">
          <rechargeActivity />
      </a-tab-pane>

    </a-tabs>
  </template>
  
  <script>
  import { Tabs } from 'ant-design-vue'

  import activityPage1 from './index.vue';
  import rechargeActivity from './details.vue';
  
  export default {
    components: {
      'a-tabs': Tabs,
      'a-tab-pane': Tabs.TabPane,
      activityPage1,
      rechargeActivity
    }
  }
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>
  