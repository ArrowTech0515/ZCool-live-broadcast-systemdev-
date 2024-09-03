<template>
    <a-tabs default-active-key="1">
        
      <a-tab-pane key="1" tab="等级配置">
          <levelPage />
      </a-tab-pane>
      
      <a-tab-pane key="2" tab="分类配置">
          <categoryPage />
      </a-tab-pane>
      
      <a-tab-pane key="3" tab="版本配置">
          <clientPage />
      </a-tab-pane>
      
      <a-tab-pane key="4" tab="noble配置">
          <noblePage />
      </a-tab-pane>
      
      <a-tab-pane key="5" tab="跳转页面配置">
          <redirectPage />
      </a-tab-pane>
      
      <a-tab-pane key="6" tab="直播间付费设置">
          <generalPage />
      </a-tab-pane>
  
    </a-tabs>
  </template>
  
  <script>
  import { Tabs } from 'ant-design-vue'

  import levelPage from './level/index.vue'
  import categoryPage from './category/index.vue'
  import clientPage from './client/index.vue'
  import noblePage from './noble/index.vue'
  import redirectPage from './redirect/index.vue'
  import generalPage from './general/index.vue'
  
  export default {
    components: {
      'a-tabs': Tabs,
      'a-tab-pane': Tabs.TabPane,
      levelPage,
      categoryPage,
      clientPage,
      noblePage,
      redirectPage,
      generalPage
    }
  }
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>
  