<template>
  <a-tabs default-active-key="1">
    
    <a-tab-pane key="1" tab="角色管理">
        <div>
            <RoleComponent />
            <RoleComponent2 />
        </div>
    </a-tab-pane>

    <a-tab-pane key="2" tab="部门管理">
        <DepartmentComponent />
    </a-tab-pane>
    
    <a-tab-pane key="3" tab="账号权限">
        <AccountComponent />
    </a-tab-pane>

  </a-tabs>
</template>

<script>
import { Tabs } from 'ant-design-vue'
import AccountComponent from './account/index.vue'
import DepartmentComponent from './department/index.vue'
import RoleComponent from './role/index.vue'
import RoleComponent2 from './role/index2.vue'

export default {
  components: {
    'a-tabs': Tabs,
    'a-tab-pane': Tabs.TabPane,
    AccountComponent,
    DepartmentComponent,
    RoleComponent,
    RoleComponent2
  }
}
</script>

<style scoped>
/* Add your custom styles here */
</style>
