<template>
    <a-tabs default-active-key="1">
    
        <a-tab-pane key="1" tab="公告配置">
            <listPage />
        </a-tab-pane>
        <a-tab-pane key="2" tab="跑马灯配置">
            <marqueePage />
        </a-tab-pane>

    </a-tabs>
</template>
  
<script setup lang="jsx">

import { Tabs } from 'ant-design-vue'

import listPage from './list/index.vue';
import marqueePage from './marquee/index.vue';

const components = {
    'a-tabs': Tabs,
    'a-tab-pane': Tabs.TabPane,
    listPage,
    marqueePage,
}

</script>

<style scoped>
/* Add your custom styles here */
</style>
  
