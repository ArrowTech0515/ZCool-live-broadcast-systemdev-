<template>
    <a-tabs default-active-key="1">
    
        <a-tab-pane key="1" tab="充值活动">
            <activityPage />
        </a-tab-pane>
        <a-tab-pane key="2" tab="兑换活动">
            <redumptionPage />
        </a-tab-pane>
        <a-tab-pane key="3" tab="靓号活动">
            <goodNumberPage />
        </a-tab-pane>
        <a-tab-pane key="4" tab="签到活动">
            <signinPage />
        </a-tab-pane>
        <a-tab-pane key="5" tab="送礼活动">
            <giftGiving />
        </a-tab-pane>
        <a-tab-pane key="6" tab="转盘活动">
            <wheelPage />
        </a-tab-pane>

    </a-tabs>
</template>
  
<script>
import { Tabs } from 'ant-design-vue'

import activityPage from './index.vue';
import redumptionPage from './redumption/index.vue'; // junn
import goodNumberPage from './goodNumber/index.vue'; // junn
import signinPage from './signin/index.vue'; // junn
import giftGiving from './giftGiving/index.vue'; // junn
import wheelPage from './wheel/main.vue'; // junn

export default {
components: {
    'a-tabs': Tabs,
    'a-tab-pane': Tabs.TabPane,
    activityPage,
    redumptionPage,
    goodNumberPage,
    signinPage,
    giftGiving,
    wheelPage
}
}
</script>

<style scoped>
/* Add your custom styles here */
</style>
  