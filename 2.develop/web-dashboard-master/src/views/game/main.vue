<template>
    <a-tabs default-active-key="1">
        
      <a-tab-pane key="游戏列表" tab="游戏列表">
          <listManagement />
      </a-tab-pane>
      
      <!-- <a-tab-pane key="2" tab="2">
          <noticeManagement />
      </a-tab-pane> -->

      <!-- <a-tab-pane key="3" tab="3">
          <testTableManagement />
      </a-tab-pane> -->
  
    </a-tabs>
  </template>
  
  <script>
  import { Tabs } from 'ant-design-vue'

  import listManagement from './list/list.vue';
  
  export default {
    components: {
      'a-tabs': Tabs,
      'a-tab-pane': Tabs.TabPane,
      listManagement
    }
  }
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>
  