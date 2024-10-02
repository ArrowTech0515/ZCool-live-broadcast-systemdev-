<template>
    <a-tabs default-active-key="1">
    
        <a-tab-pane key="1" tab="支付渠道">
            <listPage />
        </a-tab-pane>
        <a-tab-pane key="2" tab="支付方式">
            <marqueePage />
        </a-tab-pane>

    </a-tabs>
</template>
  
<script setup lang="jsx">

import { Tabs } from 'ant-design-vue'

import listPage from './channel/index.vue';
import marqueePage from './method/index.vue';

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
  
