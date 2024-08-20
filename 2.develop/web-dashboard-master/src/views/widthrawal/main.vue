<template>
    <a-tabs default-active-key="1">
        
      <a-tab-pane key="1" tab="代付管理">
          <noticeManagement />
      </a-tab-pane>
      
      <a-tab-pane key="2" tab="主播提现">
          <streamerManagement />
      </a-tab-pane>
      <a-tab-pane key="3" tab="test">
          <test />
      </a-tab-pane>

      <a-tab-pane key="4" tab="testTable">
          <testTableManagement />
      </a-tab-pane>

    <a-tab-pane key="5" tab="testNewComponent">
        <testNewComponent />
    </a-tab-pane>
  
    </a-tabs>
  </template>
  
  <script>
  import { Tabs } from 'ant-design-vue'

  import widthrawalManagement from './payment/index.vue';
  import noticeManagement from './payment/index_temp.vue'; // junn
  import streamerManagement from './streamer/index.vue'; // junn
  import testTableManagement from './testTable.vue'; // junn
  import test from './test.vue'; // junn
  import testNewComponent from './test_newComponent.vue'; // junn
  
  export default {
    components: {
      'a-tabs': Tabs,
      'a-tab-pane': Tabs.TabPane,
      widthrawalManagement,
      noticeManagement,
      streamerManagement,
      test,
      testTableManagement,
      testNewComponent
    }
  }
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>
  