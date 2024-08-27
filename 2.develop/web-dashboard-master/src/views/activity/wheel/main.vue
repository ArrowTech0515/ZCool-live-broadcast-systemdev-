<template>
    <a-tabs default-active-key="1">
    
        <a-tab-pane key="1" tab="转盘活动">
            <mainPage />
        </a-tab-pane>
        <a-tab-pane key="2" tab="转盘基础配置">
            <basicConfigPage />
        </a-tab-pane>
        <a-tab-pane key="3" tab="奖励配置">
            <rewardConfigPage />
        </a-tab-pane>
        <a-tab-pane key="4" tab="中奖记录">
            <winRecordPage />
        </a-tab-pane>
        <a-tab-pane key="5" tab="提现记录">
            <withdrawalRecordPage />
        </a-tab-pane>
    </a-tabs>
</template>
  
<script>
import { Tabs } from 'ant-design-vue'

import mainPage from './index.vue';
import basicConfigPage from './basicConfig/index.vue';
import rewardConfigPage from './rewardConfig/index.vue';
import winRecordPage from './winRecord/index.vue';
import withdrawalRecordPage from './withdrawalRecord/index.vue';

export default {
components: {
    'a-tabs': Tabs,
    'a-tab-pane': Tabs.TabPane,
    mainPage,
    basicConfigPage,
    rewardConfigPage,
    winRecordPage,
    withdrawalRecordPage
}
}
</script>

<style scoped>
/* Add your custom styles here */
</style>
  