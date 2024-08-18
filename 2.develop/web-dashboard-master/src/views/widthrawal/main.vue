<template>
    <a-tabs default-active-key="1">
        
      <a-tab-pane key="代付管理" tab="代付管理">
          <noticeManagement />
      </a-tab-pane>
      
      <a-tab-pane key="2" tab="2">
          <test />
      </a-tab-pane>

      <a-tab-pane key="3" tab="3">
          <testTableManagement />
      </a-tab-pane>

    <a-tab-pane key="4" tab="4">
        <testNewComponent />
    </a-tab-pane>
  
    </a-tabs>
  </template>
  
  <script>
  import { Tabs } from 'ant-design-vue'

  import widthrawalManagement from './index.vue';
  import noticeManagement from './index_temp.vue'; // junn
  import testTableManagement from './testTable.vue'; // junn
  import test from './test.vue'; // junn
  import testNewComponent from './test_newComponent.vue'; // junn
  
  export default {
    components: {
      'a-tabs': Tabs,
      'a-tab-pane': Tabs.TabPane,
      widthrawalManagement,
      noticeManagement,
      test,
      testTableManagement,
      testNewComponent
    }
  }
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>
  