<template>
  <a-card bordered class="custom-card" :style="{background: 'gray'}">
    <a-row :gutter="16" type="flex" justify="space-between">
      <!-- Vertical Text -->
      <a-col :style="{ marginLeft:'5%', display: 'flex', justifyContent: 'center', alignItems: 'center' }">
        <span class="label" :style="{ writingMode: 'vertical-rl', textAlign: 'center', fontSize: '16px', fontWeight: 'bold' }">
          基 础 数 据</span>
      </a-col>
      
      <!-- Separator -->
      <a-col>
        <a-divider type="vertical" :style="{ background: 'black', height: '100%' }" />
      </a-col>

      <!-- First Column -->
      <a-col :span="8" class="button-column">
        <!-- Rows inside First Column -->
        <a-row style="margin-bottom: 5px;">
          <a-col :span="18" style="white-space: nowrap;">
            <span style="font-weight: bold;">用户昵称:</span> 哈哈哈哈部是
          </a-col>
        </a-row>

        <a-row style="margin-bottom: 5px;">
          <a-col :span="18" style="white-space: nowrap;">
            <span style="font-weight: bold;">账号ID:</span> 4353535
          </a-col>
          <a-col :span="6" style="text-align: right;">
            <span
              style="font-size: 12px; text-decoration: underline; color: blue; cursor: pointer;"
              @click="copyText('4353535')">
              复制
            </span>
          </a-col>
        </a-row>

        <a-row style="margin-bottom: 5px;">
          <a-col :span="18" style="white-space: nowrap;">
            <span style="font-weight: bold;">登录设备号:</span> FHJ-32424
          </a-col>
          <a-col :span="6" style="text-align: right;">
            <span
              style="font-size: 12px; text-decoration: underline; color: blue; cursor: pointer;"
              @click="copyText('FHJ-32424')">
              详情
            </span>
          </a-col>
        </a-row>

        <a-row style="margin-bottom: 5px;">
          <a-col :span="24" style="white-space: nowrap;">
            <span style="font-weight: bold;">注册时间:</span> 2022-12-12 12:21:21
          </a-col>
        </a-row>

        <a-row style="margin-bottom: 5px;">
          <a-col :span="24" style="white-space: nowrap;">
            <span style="font-weight: bold;">所属商户:</span> XXXX商户
          </a-col>
        </a-row>
      </a-col>

      <!-- Second Column -->
      <a-col :span="8" class="button-column" :style="{marginLeft :'30px', marginRight :'60px' }">
        <!-- Rows inside Second Column -->
        <a-row style="margin-bottom: 5px;">
          <a-col :span="18" style="white-space: nowrap;">
            <span style="font-weight: bold;">登录账号:</span> dem32e3
          </a-col>
          <a-col :span="6" style="text-align: right;">
            <span
              style="font-size: 12px; text-decoration: underline; color: blue; cursor: pointer;"
              @click="copyText('dem32e3')">
              复制
            </span>
          </a-col>
        </a-row>

        <a-row style="margin-bottom: 5px;">
          <a-col :span="24" style="white-space: nowrap;">
            <span style="font-weight: bold;">用户层级:</span> 贵族用户 | 高价值用户 | 驾驭用户 | 付费用户
          </a-col>
        </a-row>

        <a-row style="margin-bottom: 5px;">
          <a-col :span="18" style="white-space: nowrap;">
            <span style="font-weight: bold;">登录IP:</span> 123.321.213.231
          </a-col>
          <a-col :span="6" style="text-align: right;">
            <span
              style="font-size: 12px; text-decoration: underline; color: blue; cursor: pointer;"
              @click="copyText('123.321.213.231')">
              详情
            </span>
          </a-col>
        </a-row>

        <a-row style="margin-bottom: 5px;">
          <a-col :span="24" style="white-space: nowrap;">
            <span style="font-weight: bold;">最近登录时间:</span> 2022-12-12 12:21:21
          </a-col>
        </a-row>

        <a-row style="margin-bottom: 5px;">
          <a-col :span="24" style="white-space: nowrap;">
            <span style="font-weight: bold;">所属应用:</span> XXXXX应用
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
import { message } from 'ant-design-vue';

export default {
  data() {
    return {
      anchorName: '哈哈哈哈部是',
      accountId: '4353535',
      deviceId: 'FHJ-32424',
      registrationTime: '2022-12-12 12:21:21',
      merchant: 'XXXX商户',
      loginAccount: 'dem32e3',
      userLevel: '贵族用户 | 高价值用户 | 驾驭用户 | 付费用户',
      loginIP: '123.321.213.231',
      lastLoginTime: '2022-12-12 12:21:21',
      application: 'XXXXX应用'
    };
  },
  methods: {
    copyText(text) {
      navigator.clipboard.writeText(text).then(() => {
        message.success({
          content: `已成功复制到剪贴板。`,
          duration: 1, // Duration in seconds
        });
      }).catch(() => {
        message.error({
          content: '复制到剪贴板失败，请重试。',
          duration: 1, // Duration in seconds
        });
      });
    },
  }
};
</script>

<style scoped>
.custom-card {
  background: rgb(242, 242, 242);
}

.label {
  font-size: 16px;
  font-weight: bold;
  writing-mode: vertical-rl;
  text-align: center;
}
</style>
