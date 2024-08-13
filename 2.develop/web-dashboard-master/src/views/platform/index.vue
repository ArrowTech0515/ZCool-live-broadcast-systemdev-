<script setup lang="jsx">
import { ref } from 'vue';
import { Card, Checkbox, Radio, Space, Typography } from 'ant-design-vue';

const { Title, Text } = Typography;

const registerSettings = ref({
  accountRegister: [],
  accountLogin: false,
  otherSettings: 'sameAccount'
});

const selectedSidebarItem = ref('settings'); // Add this ref to track selected sidebar item

const handleRegisterChange = (checkedValues) => {
  registerSettings.value.accountRegister = checkedValues;
};

const handleLoginChange = (e) => {
  registerSettings.value.accountLogin = e.target.checked;
};

const handleOtherSettingsChange = (e) => {
  registerSettings.value.otherSettings = e.target.value;
};
</script>

<template>
  <div v-if="selectedSidebarItem === 'settings'"> <!-- Conditionally render component -->
    <Title class="returnText" style="margin-left: 20px; font-weight: bold; font-size:24px; color: #333;">返回</Title>

    <div class="center-layout">
      <Space direction="vertical">
        <Title class="title" level={5} style="font-weight: bold; font-size:24px; color: #333;">综合配置</Title>
        <Card style="border-radius: 8px; padding: 20px; border: 1px solid #d9d9d9;">
          <Space direction="vertical" style="width: 100%">
            <!-- Registration Settings -->
            <div>
              <Title level={5} style="font-weight: bold; font-size:20px; color: #333;">注册设置</Title>
            </div>

            <!-- Account Registration -->
            <div>
              <Space direction="vertical" style="width: 100%;">
                <Space direction="horizontal" size="large" style="align-items: flex-start;">
                  <Text level={3} style="font-weight: bold; font-size:18px; color: #333;">账号注册</Text>
                  <Space direction="horizontal" size="large" style="margin-left: 20px;">
                    <Checkbox value="phone" onChange={handleRegisterChange}>手机号</Checkbox>
                    <Checkbox value="email" onChange={handleRegisterChange}  style="margin-left: 20px;">邮箱</Checkbox>
                    <Radio value="inviteCode" style="margin-left: 60px;" onChange={handleRegisterChange}>注册邀请码</Radio>
                  </Space>
                </Space>
                <Space direction="horizontal" style="margin-left: 70px;">
                  <Text type="secondary" style="margin-left: 20px;">选择后，用户需要提供相应信息进行注册</Text>
                  <Text type="secondary" style="margin-left: 20px;">选中后, 用户需获输入邀请后才能主</Text>
                </Space>
              </Space>
            </div>

            <!-- Account Login -->
            <div>
              <Space direction="horizontal" size="large" style="align-items: flex-start;">
                <Text level={5} style="font-weight: bold; font-size:18px; color: #333;">账号登录</Text>
                <Space direction="vertical" style="margin-left: 20px;">
                  <Radio onChange={handleLoginChange}>允许游客登录</Radio>
                  <Text type="secondary">选择后，自动分配游客账号</Text>
                </Space>
              </Space>
            </div>

            <!-- Other Settings -->
            <div>
              <Space direction="horizontal" style="align-items: flex-start;">
                <Text level={5} style="font-weight: bold; font-size:18px; color: #333;">其他设置</Text>
                <Radio.Group onChange={handleOtherSettingsChange} value={registerSettings.value.otherSettings} style="margin-left: 20px;">
                  <Space direction="vertical">
                    <Radio value="sameAccount">同账号多应用注册</Radio>
                    <Text type="secondary" style="margin-left: 24px;">选择后，用户同一账号在多个不同应用中使用</Text>

                    <Radio value="sameIP">同IP注册</Radio>
                    <Text type="secondary" style="margin-left: 24px;">选择后，用户同一个IP可以注册多少账号</Text>

                    <Radio value="sameDevice">同设备注册</Radio>
                    <Text type="secondary" style="margin-left: 24px;">选择后，用户同一个设备可以注册多少账号</Text>
                  </Space>
                </Radio.Group>
              </Space>
            </div>
          </Space>
        </Card>
      </Space>
    </div>
  </div>
</template>

<style scoped>
.center-layout {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
}
.title {
  display: flex;
  justify-content: center;
  align-items: center;
}
.returnText {
  display: flex;
  text-align: left;
}
.card {
  border-radius: 8px;
  padding: 20px;
}

.ant-space-item {
  margin-bottom: 12px;
}

.ant-typography {
  margin-bottom: 8px;
}

.ant-checkbox-wrapper, .ant-radio-wrapper {
  display: inline-flex;
  align-items: center;
  margin-bottom: 8px;
}

.ant-radio-group {
  margin-top: 10px;
}

.ant-card-body {
  padding: 20px;
  background-color: #fafafa;
}
</style>
