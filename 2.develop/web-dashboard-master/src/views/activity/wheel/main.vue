<template>
    <a-tabs default-active-key="1">
    
        <a-tab-pane key="1" tab="转盘活动">
            <mainPage />
        </a-tab-pane>
        <a-tab-pane key="2" tab="转盘基础配置">
            <basicConfigPage />
        </a-tab-pane>

    </a-tabs>
</template>
  
<script>
import { Tabs } from 'ant-design-vue'

import mainPage from './index.vue';
import basicConfigPage from './basicConfiguration/index.vue';

export default {
components: {
    'a-tabs': Tabs,
    'a-tab-pane': Tabs.TabPane,
    mainPage,
    basicConfigPage,
}
}
</script>

<style scoped>
/* Add your custom styles here */
</style>
  