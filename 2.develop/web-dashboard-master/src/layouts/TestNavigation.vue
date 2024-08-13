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
              <a-menu-item key="19">用户管理</a-menu-item>
              <a-menu-item key="20">平台自营直播</a-menu-item>
              <a-menu-item key="21">权限管理</a-menu-item>
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

  import { ref } from 'vue';
  import LHeader from '@/layouts/components/LHeader.vue';
  import LLogo from '@/layouts/components/LLogo.vue';
  import LBreadCrumb from '@/layouts/components/LBreadCrumb.vue';

  import permissionManagement from '@/views/permissions/index.vue';
  import smsManagement from '@/views/sms/channel/index.vue';
  import messageManagement from '@/views/message/list/index.vue';
  import anchorManagement from '@/views/anchor/list/index.vue';
  
  export default {
    name: 'NavigationMenu',
    components: {
      LHeader,
      LLogo,
      LBreadCrumb,

      permissionManagement,
      smsManagement,
      messageManagement,
      anchorManagement,
    },
    setup() {
      const collapse_flag = ref(false); // Reactive collapse state
  
      const handleMenuClick = ({ key }) => {
        switch (key) {
          case '21':
            currentComponent.value = 'permissionManagement';
            break;
          case '18':
            currentComponent.value = 'smsManagement';
            break;
          case '17':
            currentComponent.value = 'messageManagement';
            break;
          case '5':
            currentComponent.value = 'anchorManagement';
            break;
          default:
            currentComponent.value = 'permissionManagement';
        }
      };
  
      const currentComponent = ref('permissionManagement'); // Initial component
  
      return {
        collapse_flag,
        handleMenuClick,
        currentComponent,
      };
    },
  };
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
  