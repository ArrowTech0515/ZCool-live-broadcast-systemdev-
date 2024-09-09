<template>
    <a-tabs default-active-key="1">
        
      <a-tab-pane key="1" tab="代付管理">
          <paymentWithdrawal2 />
      </a-tab-pane>
      <a-tab-pane key="2" tab="主播提现">
          <anchorWithdrawal />
      </a-tab-pane>
      <a-tab-pane key="3" tab="用户提现">
          <userWithdrawal />
      </a-tab-pane>
      <a-tab-pane key="4" tab="提现策略设置">
          <strategyWithdrawal />
      </a-tab-pane>
      
      <a-tab-pane key="5" tab="工会提现">
          <unionWithdrawal />
      </a-tab-pane>

      <a-tab-pane key="6" tab="1">
          <test />
      </a-tab-pane>
      <a-tab-pane key="7" tab="2">
          <testTableManagement />
      </a-tab-pane>
      <a-tab-pane key="8" tab="3">
          <testNewComponent />
      </a-tab-pane>
      
      <a-tab-pane key="9" tab="虚拟币提现_1">
          <anchor_review />
      </a-tab-pane>

      <a-tab-pane key="10" tab="虚拟币提现_2">
          <virtual_review />
      </a-tab-pane>
  
    </a-tabs>
  </template>
  
  <script>
  import { Tabs } from 'ant-design-vue'

  import paymentWithdrawal from './payment/index.vue';
  import paymentWithdrawal2 from './payment/index_temp.vue'; // junn
  import anchorWithdrawal from './anchor/index.vue'; // junn
  import userWithdrawal from './user/index.vue'; // junn
  import unionWithdrawal from './union/index.vue'; // junn
  import strategyWithdrawal from './strategy/index.vue'; // junn
  import testTableManagement from './testTable.vue'; // junn
  import test from './test.vue'; // junn
  import testNewComponent from './test_newComponent.vue'; // junn
  import virtual_review from './user/virtual_review/index.vue'; // junn
  import anchor_review from './anchor/virtual_review/index.vue'; // junn
  
  export default {
    components: {
      'a-tabs': Tabs,
      'a-tab-pane': Tabs.TabPane,
      paymentWithdrawal,
      paymentWithdrawal2,
      userWithdrawal,
      unionWithdrawal,
      anchorWithdrawal,
      strategyWithdrawal,
      test,
      testTableManagement,
      testNewComponent,
      virtual_review,
      anchor_review
    }
  }
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>
  