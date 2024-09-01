<script setup lang="jsx">
import { Row, Col, Divider } from 'ant-design-vue';

const data = [
  { value: 73857, label: '当前收益' },
  { value: 73857, label: '观看人数' },
  { value: 73857, label: '送礼人数' },
  { value: 73857, label: '新增的签约' },
  { value: 73857, label: '新增关注' },
  { value: 73857, label: '新增点赞' },
];
</script>

<template>
  <a-card style="width: 100%; margin-bottom: 1%;">
    <a-row type="flex" justify="space-between" align="middle" 
    style="height: 100%; padding-left: 4%; padding-right: 4%;">
      <template v-for="(item, index) in data" :key="index">
        <a-col
          style="text-align: center; display: flex; flex-direction: column; justify-content: center;"
        >
          <div style="font-size: 24px; font-weight: bold;">{{ item.value }}</div>
          <div style="margin-top: 10px;">{{ item.label }}</div>
        </a-col>
        <Divider
          v-if="index < data.length - 1"
          type="vertical"
          style="height: auto; align-self: stretch; background-color: lightgrey; "
        />
      </template>
    </a-row>
  </a-card>
</template>

<style scoped>
/* Any additional styles can go here */
</style>
