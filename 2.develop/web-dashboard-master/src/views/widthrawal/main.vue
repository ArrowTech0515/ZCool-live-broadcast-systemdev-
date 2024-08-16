<template>
    <a-tabs default-active-key="1">
        
      <a-tab-pane key="代付管理" tab="代付管理">
          <noticeManagement />
      </a-tab-pane>
      
      <a-tab-pane key="2" tab="2">
          <test />
      </a-tab-pane>

      <!-- <a-tab-pane key="3" tab="3">
          <testTableManagement />
      </a-tab-pane> -->
  
    </a-tabs>
  </template>
  
  <script>
  import { Tabs } from 'ant-design-vue'

  import widthrawalManagement from '@/views/widthrawal/index.vue';
  import noticeManagement from '@/views/widthrawal/index_temp.vue'; // junn
  import test from './testTable.vue'; // junn
  
  export default {
    components: {
      'a-tabs': Tabs,
      'a-tab-pane': Tabs.TabPane,
      widthrawalManagement,
      noticeManagement,
      test
    }
  }
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>
  