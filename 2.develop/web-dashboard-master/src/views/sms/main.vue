<template>
    <a-tabs default-active-key="1">
    
        <a-tab-pane key="1" tab="渠道配置">
            <channelPage />
        </a-tab-pane>
        <a-tab-pane key="2" tab="模版管理">
            <recordPage />
        </a-tab-pane>
        <a-tab-pane key="3" tab="短信列表">
            <templatePage />
        </a-tab-pane>

    </a-tabs>
</template>
  
<script setup lang="jsx">

import { Tabs } from 'ant-design-vue'

import channelPage from './channel/index.vue';
import recordPage from './record/index.vue';
import templatePage from './template/index.vue';

const components = {
    'a-tabs': Tabs,
    'a-tab-pane': Tabs.TabPane,
    channelPage,
    recordPage,
    templatePage
}

</script>

<style scoped>
/* Add your custom styles here */
</style>
  
