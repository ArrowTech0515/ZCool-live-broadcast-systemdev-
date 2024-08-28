<template>
    <a-tabs default-active-key="1">
    
        <a-tab-pane key="1" tab="活动管理">
            <activityPage />
        </a-tab-pane>
        <a-tab-pane key="2" tab="任务数据">
            <taskPage />
        </a-tab-pane>
        <a-tab-pane key="3" tab="靓号活动">
            <goodNumberPage />
        </a-tab-pane>
        <a-tab-pane key="4" tab="签到活动">
            <signinPage />
        </a-tab-pane>
        <a-tab-pane key="5" tab="送礼活动">
            <giftgiving />
        </a-tab-pane>
        <a-tab-pane key="6" tab="转盘活动">
            <wheelPage />
        </a-tab-pane>

    </a-tabs>
</template>
  
<script>
import { Tabs } from 'ant-design-vue'

import activityPage from './index.vue';
import taskPage from './task/index.vue'; // junn
import goodNumberPage from './goodNumber/index.vue'; // junn
import signinPage from './signin/index.vue'; // junn
import giftgiving from './giftgiving/index.vue'; // junn
import wheelPage from './wheel/main.vue'; // junn

export default {
components: {
    'a-tabs': Tabs,
    'a-tab-pane': Tabs.TabPane,
    activityPage,
    taskPage,
    goodNumberPage,
    signinPage,
    giftgiving,
    wheelPage
}
}
</script>

<style scoped>
/* Add your custom styles here */
</style>
  