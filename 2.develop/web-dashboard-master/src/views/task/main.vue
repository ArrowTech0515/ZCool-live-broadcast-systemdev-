<template>
    <a-tabs default-active-key="1">
    
        <a-tab-pane key="1" tab="任务管理">
            <taskPage />
        </a-tab-pane>
        <a-tab-pane key="2" tab="任务记录">
            <recordPage />
        </a-tab-pane>

    </a-tabs>
</template>
  
<script>
import { Tabs } from 'ant-design-vue'

import taskPage from './main/index.vue';
import recordPage from './recordPage.vue';

export default {
components: {
    'a-tabs': Tabs,
    'a-tab-pane': Tabs.TabPane,
    taskPage,
    recordPage
}
}
</script>

<style scoped>
/* Add your custom styles here */
</style>
  