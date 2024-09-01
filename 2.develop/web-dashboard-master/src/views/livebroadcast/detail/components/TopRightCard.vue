<script setup lang="jsx">
import { Card, Row, Col, Avatar, Button, Divider } from 'ant-design-vue';

const charmValue = 348458;
const onlineUsers = 345223;
const messages = [
  { id: 1, user: '东方幻梦', content: '加入了直播间', type: 'notification' },
  { id: 2, user: '东方幻梦', content: '加入了直播间', type: 'notification' },
  { id: 3, user: '冬至的诗', content: '我是用户说的话，能看到吗？', type: 'message' },
  { id: 4, user: '冬至的诗', content: '来了', type: 'message' },
  { id: 5, user: '冬至的诗', content: '我是用户说的话，能看到吗？', type: 'message' },
  { id: 6, user: '冬至的诗', content: '我是用户说的话，能看到吗？', type: 'message' },
  { id: 7, user: '冬至的诗', content: '我是用户说的话，能看到吗？', type: 'message' },
  { id: 8, user: '冬至的诗', content: '我是用户说的话，能看到吗？', type: 'message' },
  { id: 9, user: '冬至的诗', content: '我是用户说的话，能看到吗？', type: 'message' },
];

</script>

<template>
  <a-card style="width: 100%; padding: 20px; margin: 1%;">
    <a-row 
        justify="space-between" align="middle"
        style="padding: 10px; margin-bottom: 20px;border-bottom: 1px solid lightgray">
      <span style="font-weight: bold;">魅力值: {{ charmValue }}</span>
      <span style="font-weight: bold;">在线人数: {{ onlineUsers }}</span>
    </a-row>

    <div>
      <a-row v-for="message in messages" :key="message.id" align="middle" style="margin-bottom: 10px;">
        <a-col flex="40px">
          <Avatar icon="user" />
        </a-col>
        <a-col flex="auto">
          <span style="color: #1890ff; font-weight: bold;">{{ message.user }}:</span>
          <span style="margin-left: 5px; background-color: #f0f0f0; padding: 5px 10px; border-radius: 15px;">{{ message.content }}</span>
        </a-col>
      </a-row>
    </div>

    <a-row justify="end" style="margin-top: 20px;">
      <Button style="background-color: #66ccff; color: white; margin-right: 5px;">禁言</Button>
      <Button style="background-color: #99cc33; color: white; margin-right: 5px;">拉黑</Button>
      <Button style="background-color: #cc6600; color: white;">踢出房间</Button>
    </a-row>
  </a-card>
</template>
