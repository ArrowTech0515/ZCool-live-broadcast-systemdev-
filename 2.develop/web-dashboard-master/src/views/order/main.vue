<template>
    <a-tabs default-active-key="1">
        
      <a-tab-pane key="1" tab="余额订单">
          <balanceOrder />
      </a-tab-pane>
      
      <a-tab-pane key="2" tab="钻石订单">
          <diamondOrder />
      </a-tab-pane>
      
      <a-tab-pane key="3" tab="人工存款">
          <manualDeposit />
      </a-tab-pane>
      
      <a-tab-pane key="4" tab="人工存款记录">
          <manualDepositRecord />
      </a-tab-pane>
  
    </a-tabs>
  </template>
  
  <script>
  import { Tabs } from 'ant-design-vue'

  import balanceOrder from '@/views/order/balance/index.vue'
  import diamondOrder from '@/views/order/diamond/index.vue'
  import manualDeposit from '@/views/order/deposit/index.vue'
  import manualDepositRecord from '@/views/order/depositRecord/index.vue'
  
  export default {
    components: {
      'a-tabs': Tabs,
      'a-tab-pane': Tabs.TabPane,
      balanceOrder,
      diamondOrder,
      manualDeposit,
      manualDepositRecord
    }
  }
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>
  