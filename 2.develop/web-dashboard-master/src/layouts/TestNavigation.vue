<template>
    <a-layout class="layout">
      <LHeader class="layout-header-fixed"
                v-model:collapse="collapse_flag">
        <template #logo>
          <LLogo style="margin: 0 20px 0 0" />
        </template>
      </LHeader>
      <a-layout class="layout-main">
        <a-layout-sider
            class="layout-sider"
            theme="light"
            v-model:collapsed="collapse_flag"
            :collapsed-width="50"
            collapsible
            :trigger="null"
        >
          <div class="sider-scroll">
            <a-menu
              mode="inline"
              theme="light"
              :default-selected-keys="['1']"
              @click="handleMenuClick"
            >
              <a-menu-item key="1">数据总览</a-menu-item>
              <a-menu-item key="2">用户管理</a-menu-item>
              <a-menu-item key="3">账号风控管理</a-menu-item>
              <a-menu-item key="4">工会管理</a-menu-item>
              <a-menu-item key="5">主播管理</a-menu-item>
              <a-menu-item key="6">推荐位配置</a-menu-item>
              <a-menu-item key="7">直播管理</a-menu-item>
              <a-menu-item key="8">广告位管理</a-menu-item>
              <a-menu-item key="9">礼物管理</a-menu-item>
              <a-menu-item key="10">充值管理</a-menu-item>
              <a-menu-item key="11">订单管理</a-menu-item>
              <a-menu-item key="12">提现管理</a-menu-item>
              <a-menu-item key="13">AI人脸管理</a-menu-item>
              <a-menu-item key="14">在线客服</a-menu-item>
              <a-menu-item key="15">游戏管理</a-menu-item>
              <a-menu-item key="16">任务管理</a-menu-item>
              <a-menu-item key="17">活动管理</a-menu-item>
              <a-menu-item key="18">消息管理</a-menu-item>
              <a-menu-item key="19">商户管理</a-menu-item>
              <a-menu-item key="20">平台自营直播</a-menu-item>
              <a-menu-item key="21">权限管理</a-menu-item>
              <a-menu-item key="22">支付管理</a-menu-item>
              <a-menu-item key="23">策略管理</a-menu-item>
              <a-menu-item key="24">⾸存管理</a-menu-item>
              <a-menu-item key="25">资金管理</a-menu-item>
              <a-menu-item key="26">黑名单管理</a-menu-item>
              <a-menu-item key="27">举报管理</a-menu-item>
              <a-menu-item key="28">分佣管理</a-menu-item>
              <a-menu-item key="29">代理管理</a-menu-item>
              <a-menu-item key="30">系统管理</a-menu-item>
              <a-menu-item key="31">网站管理</a-menu-item>
              <a-menu-item key="32">公告管理</a-menu-item>
              <a-menu-item key="33">平台配置</a-menu-item>
              <a-menu-item key="34">短信管理</a-menu-item>
              <a-menu-item key="35">绑定管理</a-menu-item>
            </a-menu>
          </div>
        </a-layout-sider>
        <a-layout-content class="app-scroll-wrap">
          <LBreadCrumb v-model:collapse="collapse_flag"/>
          <div class="app-main">
            <transition mode="out-in" name="slide">
              <component :is="currentComponent" />
            </transition>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </template>
  
  <script lang="ts">

  import { ref } from 'vue'
  import LHeader from '@/layouts/components/LHeader.vue'
  import LLogo from '@/layouts/components/LLogo.vue'
  import LBreadCrumb from '@/layouts/components/LBreadCrumb.vue'

  
  import statisticsManagement from '@/views/statistics/index/index.vue'
  import permissionManagement from '@/views/permissions/index.vue'
  import messageManagement from '@/views/message/list/index.vue'
  import anchorManagement from '@/views/anchor/main.vue'
  import payManagement from '@/views/payment/main.vue'
  import merchantManagement from '@/views/merchant/main.vue'
  import settingManagement from '@/views/setting/main.vue'
  import giftManagement from '@/views/gift/list/index.vue'
  import noticeManagement from '@/views/notice/main.vue'
  import platformManagement from '@/views/platform/index.vue'
  import recommendManagement from '@/views/recweight/list/index.vue'
  import smsManagement from '@/views/sms/main.vue'
  import guildManagement from '@/views/guild/list/index.vue'

  // new added
  import orderManagement from '@/views/order/main.vue'
  import widthrawalManagement from '@/views/widthrawal/main.vue'
  import gameManagement from '@/views/game/main.vue'
  import userManagement from '@/views/user/main.vue'
  import activityManagement from '@/views/activity/main.vue'
  import taskManagement from '@/views/task/main.vue'
  import livebroadcastManagement from '@/views/livebroadcast/main.vue'
  import strategyManagement from '@/views/strategy/main.vue'
  import firstDepositManagement from '@/views/firstDeposit/main/index.vue'
  import fundManagement from '@/views/fund/main.vue'
  import blacklistManagement from '@/views/blacklist/main.vue'
  import accountRiskControlManagement from '@/views/accountrisk/main.vue'
  import reportManagement from '@/views/report/main.vue'
  import commisionManagement from '@/views/commision/index.vue'
  import agentManagement from '@/views/agent/main.vue'
  import onlinecustomerserviceManagement from '@/views/onlinecustomer/main.vue'
  import systemManagement from '@/views/system/main.vue'
  import websiteManagement from '@/views/website/main.vue'
  import bindingManagement from '@/views/binding/index.vue'
  import AIfaceManagement from '@/views/AIface/main.vue'
  
  export default {
    name: 'NavigationMenu',
    components: {
      LHeader,
      LLogo,
      LBreadCrumb,

      statisticsManagement,
      permissionManagement,
      messageManagement,
      anchorManagement,
      giftManagement,
      payManagement,
      settingManagement,
      userManagement,
      noticeManagement,
      platformManagement,
      recommendManagement,
      smsManagement,
      guildManagement,

      merchantManagement,

      orderManagement,
      widthrawalManagement,
      gameManagement,
      activityManagement,
      taskManagement,
      livebroadcastManagement,
      strategyManagement,
      firstDepositManagement,
      fundManagement,
      blacklistManagement,
      accountRiskControlManagement,
      reportManagement,
      commisionManagement,
      agentManagement,
      onlinecustomerserviceManagement,
      systemManagement,
      websiteManagement,
      bindingManagement,
      AIfaceManagement
    },
    setup() {
      const collapse_flag = ref(false) // Reactive collapse state
  
      const handleMenuClick = ({ key }) => {
        switch (key) {
          case '35':
            currentComponent.value = 'bindingManagement'
            break
          case '34':
            currentComponent.value = 'smsManagement'
            break
          case '33':
            currentComponent.value = 'platformManagement'
            break
          case '32':
            currentComponent.value = 'noticeManagement'
            break
          case '31':
            currentComponent.value = 'websiteManagement'
            break
          case '30':
            currentComponent.value = 'systemManagement'
            break
          case '29':
            currentComponent.value = 'agentManagement'
            break
          case '28':
            currentComponent.value = 'commisionManagement'
            break
          case '27':
            currentComponent.value = 'reportManagement'
            break
          case '26':
            currentComponent.value = 'blacklistManagement'
            break
          case '25':
            currentComponent.value = 'fundManagement'
            break
          case '24':
            currentComponent.value = 'firstDepositManagement'
            break
          case '23':
            currentComponent.value = 'strategyManagement'
            break
          case '22':
            currentComponent.value = 'payManagement'
            break
          case '21':
            currentComponent.value = 'permissionManagement'
            break
          case '20':
            currentComponent.value = 'settingManagement'
            break
          case '19':
            currentComponent.value = 'merchantManagement'
            break
          case '18':
            currentComponent.value = 'messageManagement'
            break
          case '17':
            currentComponent.value = 'activityManagement'
            break
          case '16':
            currentComponent.value = 'taskManagement'
            break
          case '15':
            currentComponent.value = 'gameManagement'
            break
          case '14':
            currentComponent.value = 'onlinecustomerserviceManagement'
            break
          case '13':
            currentComponent.value = 'AIfaceManagement'
            break
          case '12':
            currentComponent.value = 'widthrawalManagement'
            break
          case '11':
            currentComponent.value = 'orderManagement'
            break
          case '9':
            currentComponent.value = 'giftManagement'
            break
          case '7':
            currentComponent.value = 'livebroadcastManagement'
            break
          case '6':
            currentComponent.value = 'recommendManagement'
            break
          case '5':
            currentComponent.value = 'anchorManagement'
            break
          case '4':
            currentComponent.value = 'guildManagement'
            break
          case '3':
            currentComponent.value = 'accountRiskControlManagement'
            break
          case '2':
            currentComponent.value = 'userManagement'
            break
          case '1':
            currentComponent.value = 'statisticsManagement'
            break
          default:
            currentComponent.value = 'activityManagement'
        }
      }
  
      const currentComponent = ref('activityManagement') // Initial component
  
      return {
        collapse_flag,
        handleMenuClick,
        currentComponent,
      }
    },
  }
  </script>
  
  <style scoped>
  .layout {
    min-width: 1200px;
    height: 100vh;
    background: #f0f2f5;
  }
  .layout-header-fixed {
    position: fixed;
    width: 100%;
  }
  .app-scroll-wrap {
    width: 100%;
    height: calc(100vh - 64px); /* Adjust based on header height */
    overflow-y: auto;
  }
  .layout-main {
    padding-top: 64px; /* Adjust based on header height */
  }
  .app-main {
    width: 100%;
    padding: 16px;
    border-radius: 5px;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .layout-sider {
    min-width: 200px;
    display: block;
  }
  .sider-scroll {
    height: 100%;
    overflow-y: auto;
  }
  </style>
  