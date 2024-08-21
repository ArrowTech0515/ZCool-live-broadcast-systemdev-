<template>
    <a-tabs default-active-key="1">
        
      <a-tab-pane key="1" tab="代付管理">
          <paymentWithdrawal2 />
      </a-tab-pane>
      <a-tab-pane key="2" tab="主播提现">
          <streamerWithdrawal />
      </a-tab-pane>
      <a-tab-pane key="3" tab="用户提现">
          <userWithdrawal />
      </a-tab-pane>
      <a-tab-pane key="4" tab="提现策略设置">
          <strategyWithdrawal />
      </a-tab-pane>
      
      <a-tab-pane key="5" tab="test">
          <test />
      </a-tab-pane>
      <a-tab-pane key="6" tab="testTable">
          <testTableManagement />
      </a-tab-pane>
      <a-tab-pane key="7" tab="testNewComponent">
          <testNewComponent />
      </a-tab-pane>
  
    </a-tabs>
  </template>
  
  <script>
  import { Tabs } from 'ant-design-vue'

  import paymentWithdrawal from './payment/index.vue';
  import paymentWithdrawal2 from './payment/index_temp.vue'; // junn
  import streamerWithdrawal from './streamer/index.vue'; // junn
  import userWithdrawal from './user/index.vue'; // junn
  import strategyWithdrawal from './strategy/index.vue'; // junn
  import testTableManagement from './testTable.vue'; // junn
  import test from './test.vue'; // junn
  import testNewComponent from './test_newComponent.vue'; // junn
  
  export default {
    components: {
      'a-tabs': Tabs,
      'a-tab-pane': Tabs.TabPane,
      paymentWithdrawal,
      paymentWithdrawal2,
      userWithdrawal,
      streamerWithdrawal,
      strategyWithdrawal,
      test,
      testTableManagement,
      testNewComponent
    }
  }
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>
  