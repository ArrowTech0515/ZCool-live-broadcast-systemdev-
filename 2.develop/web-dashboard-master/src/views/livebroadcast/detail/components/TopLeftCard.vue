<script setup lang="jsx">
import { ref } from 'vue';
import { Card, Row, Col, Button, Avatar } from 'ant-design-vue';

const broadcasterName = '主播昵称';
const liveDuration = '8: 43: 32';
const broadcasterImage = 'https://via.placeholder.com/40'; // Placeholder image URL
</script>

<template>
  <a-card style="width: 100%; padding: 0; margin: 1%">
    <a-row type="flex" justify="space-between" align="middle" 
        style="padding: 10px; border-bottom: 1px solid lightgray">
      <a-col style="display: flex; align-items: center;">
        <a-avatar :src="broadcasterImage" size="large" style="margin-right: 10px;"/>
        <span style="margin-right: 20px;">{{ broadcasterName }}</span>
        <a-input style="width: 60px; text-align: center;" placeholder="计时"></a-input>
      </a-col>
      <a-col style="display: flex; align-items: center;">
        <span style="font-weight: bold;">直播时长: {{ liveDuration }}</span>
      </a-col>
      <a-col>
        <Button type="primary">强制下播</Button>
      </a-col>
    </a-row>

    <div style="height: 300px; display: flex; align-items: center; justify-content: center; font-size: 20px; color: #8c8c8c;">
      主播画面
    </div>
  </a-card>
</template>
