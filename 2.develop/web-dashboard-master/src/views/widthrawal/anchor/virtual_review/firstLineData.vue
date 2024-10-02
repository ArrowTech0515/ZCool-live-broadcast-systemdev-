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
          <a-col :span="20" style="white-space: nowrap;">
            <span style="font-weight: bold;">主播昵称:</span> {{ anchorName }}
          </a-col>
        </a-row>

        <a-row style="margin-bottom: 5px;">
          <a-col :span="18" style="white-space: nowrap;">
            <span style="font-weight: bold;">登录设备号:</span> {{ deviceId }}
          </a-col>
          <a-col :span="6" style="text-align: right;">
            <span 
            style="font-size: 12px; text-decoration: underline; color: blue; cursor: pointer;"
                @click="copyText(deviceId)">
                详情</span>
          </a-col>
        </a-row>

        <a-row style="margin-bottom: 5px;">
          <a-col :span="20" style="white-space: nowrap;">
            <span style="font-weight: bold;">注册时间:</span> {{ registrationTime }}
          </a-col>
        </a-row>
      </a-col>

      <!-- Second Column -->
      <a-col :span="8" class="button-column" :style="{marginLeft :'30px', marginRight :'60px' }">
        <!-- Rows inside Second Column -->
        
        <a-row style="margin-bottom: 5px;">
          <a-col :span="18" style="white-space: nowrap;">
            <span style="font-weight: bold;">房间号:</span> {{ roomId }}
          </a-col>
          <a-col :span="6" style="text-align: right;">
            <span 
            style="font-size: 12px; text-decoration: underline; color: blue; cursor: pointer;"
                @click="copyText(roomId)">
                复制</span>
          </a-col>
        </a-row>

        <a-row style="margin-bottom: 5px;">
          <a-col :span="18" style="white-space: nowrap;">
            <span style="font-weight: bold;">登录IP:</span> {{ loginIP }}
          </a-col>
          <a-col :span="6" style="text-align: right;">
            <span 
            style="font-size: 12px; text-decoration: underline; color: blue; cursor: pointer;"
                @click="copyText(loginIP)">
                详情</span>
          </a-col>
        </a-row>

        <a-row style="margin-bottom: 5px;">
          <a-col :span="18" style="white-space: nowrap;">
            <span style="font-weight: bold;">最近登录时间:</span> {{ lastLoginTime }}
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
      anchorName: '大小事',
      deviceId: 'FHJ-32424',
      registrationTime: '2022-12-12 12:21:21',
      roomId: '500001',
      loginIP: '123.321.213.231',
      lastLoginTime: '2022-12-12 12:21:21',
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
