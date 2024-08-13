<template>
    <a-layout>
      <a-layout-sider width="240" class="navigation-menu">
        <div class="menu-title">XX直播运营平台</div>
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
      </a-layout-sider>
  
      <a-layout-content class="content-area">
        <component :is="currentComponent" />
      </a-layout-content>
    </a-layout>
  </template>
  
  <script>
  import permissionComponents from '@/views/permissions/index.vue'
  // Import other components similarly...
  
  export default {
    name: 'NavigationMenu',
    components: {
        permissionComponents,
      // Register other components here...
    },
    data() {
      return {
        currentComponent: 'permissionComponents',
      };
    },
    methods: {
      handleMenuClick({ key }) {
        switch (key) {
          case '21':
            this.currentComponent = 'permissionComponents';
            break;
          case '2':
            this.currentComponent = 'UserManagement';
            break;
          case '3':
            this.currentComponent = 'AccountRiskControl';
            break;
          // Add cases for other keys...
          default:
            this.currentComponent = 'DataOverview';
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .navigation-menu {
    background-color: #f0f2f5;
    height: 60vh; /* Full height of the viewport */
  }
  
  .menu-title {
    padding: 12px;
    font-size: 16px;
    font-weight: bold;
    color: black;
    text-align: center;
    border-bottom: 1px solid #d9d9d9;
  }
  
  .content-area {
    padding: 10px;
    background: #fff;
    min-height: 60vh;
  }


    .custom-menu .a-menu-item {
    height: 18px; /* Adjust this value to your desired height */
    line-height: 20px; /* This should match the height */
    font-size: 12px; /* You can also adjust the font size if needed */
    }
  </style>
  