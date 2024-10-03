<template>
    <a-tabs default-active-key="1">
    
        <a-tab-pane key="1" tab="活动管理">
            <mainPage />
        </a-tab-pane>
        <a-tab-pane key="2" tab="兑换活动">
            <redumptionPage />
        </a-tab-pane>
        <a-tab-pane key="3" tab="转盘活动">
            <wheelPage />
        </a-tab-pane>
        <a-tab-pane key="4" tab="新注册会员彩金">
            <newMemberBonusPage />
        </a-tab-pane>
        <a-tab-pane key="5" tab="赠送彩金活动">
            <bonusPage />
        </a-tab-pane>
        <a-tab-pane key="6" tab="赠送贵族活动">
            <noblePage />
        </a-tab-pane>
    </a-tabs>
</template>
  
<script setup lang="jsx">

import { Tabs } from 'ant-design-vue'

import mainPage from './main/index.vue';
import redumptionPage from './redumption/index.vue';
import wheelPage from './wheel/main.vue';
import newMemberBonusPage from './newRegisteredMemberBonus/index.vue';
import bonusPage from './bonus/index.vue';
import noblePage from './noble/index.vue';

const components = {
    'a-tabs': Tabs,
    'a-tab-pane': Tabs.TabPane,
    mainPage,
    redumptionPage,
    wheelPage,
    newMemberBonusPage,
    bonusPage,
    noblePage
}

</script>

<style scoped>
/* Add your custom styles here */
</style>
  
