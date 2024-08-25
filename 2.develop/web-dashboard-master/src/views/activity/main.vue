<template>
    <a-tabs default-active-key="1">
    
        <a-tab-pane key="1" tab="活动管理">
            <activityPage />
        </a-tab-pane>
        <a-tab-pane key="2" tab="任务数据">
            <taskPage />
        </a-tab-pane>
        <a-tab-pane key="3" tab="送礼活动">
            <giftPage />
        </a-tab-pane>
        <a-tab-pane key="4" tab="签到活动">
            <signinPage />
        </a-tab-pane>
        <a-tab-pane key="5" tab="送礼活动">
            <gift22Page />
        </a-tab-pane>

    </a-tabs>
</template>
  
<script>
import { Tabs } from 'ant-design-vue'

import activityPage from './index.vue';
import taskPage from './task/index.vue'; // junn
import giftPage from './gift/index.vue'; // junn
import signinPage from './signin/index.vue'; // junn
import gift22Page from './gift copy 2/index.vue'; // junn

export default {
components: {
    'a-tabs': Tabs,
    'a-tab-pane': Tabs.TabPane,
    activityPage,
    taskPage,
    giftPage,
    signinPage,
    gift22Page,
}
}
</script>

<style scoped>
/* Add your custom styles here */
</style>
  