<template>
    <a-tabs default-active-key="1">
        
      <a-tab-pane key="1" tab="用户管理">
          <userlistManagement />
      </a-tab-pane>
      
      <a-tab-pane key="2" tab="星级扫描">
          <starManagement />
      </a-tab-pane>

      <a-tab-pane key="3" tab="层级管理">
          <hierarchyManagement />
      </a-tab-pane>

      <a-tab-pane key="4" tab="分组管理">
          <groupManagement />
      </a-tab-pane>

      <a-tab-pane key="5" tab="异常资金记录">
          <abnormalfundrecordManagement />
      </a-tab-pane>

      <a-tab-pane key="6" tab="用户预警">
          <warningManagement />
      </a-tab-pane>

      <a-tab-pane key="7" tab="返佣记录">
          <rebateRecordManagement />
      </a-tab-pane>

    </a-tabs>
  </template>
  
  <script>
  import { Tabs } from 'ant-design-vue'

  import userlistManagement from './list/index.vue'; // junn
  import starManagement from './star/index.vue'; // junn
  import hierarchyManagement from './hierarchy/index.vue'; // junn
  import groupManagement from './group/index.vue'; // junn
  import warningManagement from './warning/index.vue'; // junn
  import abnormalfundrecordManagement from './abnormalfundrecord/index.vue'; // junn
  import rebateRecordManagement from './rebateRecord/index.vue'; // junn
  
  export default {
    components: {
      'a-tabs': Tabs,
      'a-tab-pane': Tabs.TabPane,
      userlistManagement,
      starManagement,
      hierarchyManagement,
      groupManagement,
      warningManagement,
      abnormalfundrecordManagement,
      rebateRecordManagement
    }
  }
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>
  